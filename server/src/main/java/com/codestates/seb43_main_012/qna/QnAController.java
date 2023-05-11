package com.codestates.seb43_main_012.qna;

import com.codestates.seb43_main_012.conversation.Conversation;
import com.codestates.seb43_main_012.conversation.ConversationMapper;
import com.codestates.seb43_main_012.conversation.ConversationService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/openai/question")
public class QnAController {

    @Value("${apikey}")
    private String API_KEY;
    private final int MAX_TOKENS = 500;
    private static final String API_ENDPOINT = "https://api.openai.com/v1/chat/completions";

    private final QnAService qnaService;
    private final QnAMapper qnaMapper;
    private final ConversationService conversationService;
    private final ConversationMapper conversationMapper;

    public QnAController(QnAService qnaService,
                         QnAMapper qnaMapper,
                         ConversationService conversationService,
                         ConversationMapper conversationMapper)
    {
        this.qnaService = qnaService;
        this.qnaMapper = qnaMapper;
        this.conversationService = conversationService;
        this.conversationMapper = conversationMapper;
    }

    @PostMapping
    public ResponseEntity postQuestion(@RequestBody QnADto.Post dto)
    {
        int mode = 0;

        // set header
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("Authorization", "Bearer " + API_KEY);

        // mapping
        long conversationId = dto.getConversationId();
        if(conversationId == 0)
        {
            conversationId = conversationService.createConversation(1L).getConversationId();
            mode = 1;
        }
        String question = dto.getQuestion();
        int max_tokens = MAX_TOKENS;

        // 질문
        List<Map<String, String>> messages = qnaService.buildMessage(conversationId);
        if(messages.size() == 0) mode = 1;
        Map<String, Object> requestBody = new HashMap<>();
        Map<String, String> message = new HashMap<>();
        message.put("role", "user");
        message.put("content", question);
        messages.add(message);

        // api 호출
        requestBody.put("model", "gpt-3.5-turbo");
        requestBody.put("messages", messages);
        requestBody.put("max_tokens", max_tokens);

        // 답변 생성
        HttpEntity<Map<String, Object>> requestEntity = new HttpEntity<>(requestBody, headers);
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<Map> response = restTemplate.postForEntity(API_ENDPOINT, requestEntity, Map.class);

        // 이전 대화 저장, 문맥 파악을 위함 // 오래된 대화는 빼는 식으로 or 요약
        List<Object> a = (List<Object>) response.getBody().get("choices");
        Map<String, Object> b = (Map<String, Object>) a.get(0);
        Map<String, Object> c = (Map<String, Object>) b.get("message");
        System.out.println(String.format("%d 번 대화방 ----",conversationId));

        String answer = (String) c.get("content");
        QnA qna = new QnA(question,answer);
        Conversation conversation = conversationService.updateConversation(conversationId);
        if(conversation.getTitle() == null)
        {
            conversation.setTitle(question);
            conversation.setAnswerSummary(answer);
            conversationService.saveConversation(conversation);
        }
        qna.setConversation(conversation);
        QnA savedQnA = qnaService.saveQnA(qna);

        Map<String, String> message2 = new HashMap<>();
        message2.put("role", "assistant");
        message2.put("content", answer);
        messages.add(message2);

        System.out.println(messages);
        System.out.println();

        //return new ResponseEntity<>(c.get("content"), HttpStatus.OK);
        // 답변하나만 보내줘도 되는가, 아니면 여태까지의 질문-답변을 모두 보내줘야 하는가
        if(mode == 0)
            return new ResponseEntity<>(qnaMapper.qnaToQnAResponseDto(savedQnA), HttpStatus.OK);
        else
            return new ResponseEntity<>(conversationMapper.conversationToConversationResponseDto(qnaService.findQnAs(conversationId)),HttpStatus.OK);
    }
}
