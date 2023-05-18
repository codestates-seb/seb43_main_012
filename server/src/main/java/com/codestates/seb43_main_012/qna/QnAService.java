package com.codestates.seb43_main_012.qna;

import com.codestates.seb43_main_012.conversation.Conversation;
import com.codestates.seb43_main_012.conversation.ConversationRepository;
import com.codestates.seb43_main_012.conversation.ConversationService;
import com.codestates.seb43_main_012.member.entity.MemberEntity;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDateTime;
import java.util.*;

@Service
public class QnAService {

    @Value("${apikey}")
    private String API_KEY;
    private final int MAX_TOKENS = 500;
    private static final String API_ENDPOINT = "https://api.openai.com/v1/chat/completions";
    private final QnARepository qnaRepository;
    private final ConversationRepository conversationRepository;
    //private final QnAMapper qnaMapper;

    public QnAService(QnARepository qnaRepository,
                      ConversationRepository conversationRepository,
                      QnAMapper qnaMapper)
    {
        this.qnaRepository = qnaRepository;
        this.conversationRepository = conversationRepository;
        //this.qnaMapper = qnaMapper;
    }


    public QnA saveQnA(QnA qna)
    {
        return qnaRepository.save(qna);
    }

    public List<QnA> findQnAs(long conversationId)
    {
        //List<QnA> QnAs = qnaRepository.findAllByConversationId(conversationId);
        List<QnA> QnAs = qnaRepository.findQnAsByConversationId(conversationId);
        return QnAs;
    }

    public List<Map<String, String>> buildMessage(long conversationId)
    {
        List<QnA> qnaList = findQnAs(conversationId);

        List<Map<String, String >> messages = new ArrayList<>();
        qnaList.stream().forEach(qna ->
                {
                    Map<String, String> userMessage = new HashMap<>();
                    userMessage.put("role","user");
                    userMessage.put("content", qna.getQuestion());
                    messages.add(userMessage);
                    Map<String, String> assistantMessage = new HashMap<>();
                    assistantMessage.put("role","assistant");
                    assistantMessage.put("content", qna.getAnswer());
                    messages.add(assistantMessage);
                }
        );

        return messages;
    }


    public QnA requestAnswer(QnADto.Post dto)
    {
        // set header
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("Authorization", "Bearer " + API_KEY);

        // mapping
        long conversationId = dto.getConversationId();
        String question = dto.getQuestion();
        int max_tokens = MAX_TOKENS;

        // 질문
        List<Map<String, String>> messages = buildMessage(conversationId);
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

        // 이전 대화 저장
        List<Object> a = (List<Object>) response.getBody().get("choices");
        Map<String, Object> b = (Map<String, Object>) a.get(0);
        Map<String, Object> c = (Map<String, Object>) b.get("message");
        String answer = (String) c.get("content");
        QnA qna = new QnA(question,answer);

        Conversation conversation = conversationRepository.findById(conversationId).orElseThrow();
        if(conversation.getTitle() == null)
        {
            conversation.setTitle(question);
            conversation.setAnswerSummary(answer);
        }
        qna.setConversation(conversation);

        conversation.setModifiedAt(String.valueOf(LocalDateTime.now()));
        conversationRepository.save(conversation);
        QnA savedQnA = saveQnA(qna);
        conversation.addQnA(savedQnA);

        Map<String, String> message2 = new HashMap<>();
        message2.put("role", "assistant");
        message2.put("content", answer);
        messages.add(message2);

        System.out.println();
        System.out.println(String.format("%d 번 대화방 ----",conversationId));
        System.out.println(messages);
        System.out.println();

        return savedQnA;
    }
}
