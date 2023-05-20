package com.codestates.seb43_main_012.qna;

import com.codestates.seb43_main_012.conversation.Conversation;
import com.codestates.seb43_main_012.conversation.ConversationMapper;
import com.codestates.seb43_main_012.conversation.ConversationService;
import com.codestates.seb43_main_012.exception.BusinessLogicException;
import com.codestates.seb43_main_012.exception.ExceptionCode;
import com.codestates.seb43_main_012.member.entity.MemberEntity;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDateTime;
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
        long conversationId = dto.getConversationId();
        if(conversationId == 0) throw new BusinessLogicException(ExceptionCode.CONV_NOT_FOUND);

        QnA savedQnA = qnaService.requestAnswer(dto);

        return new ResponseEntity<>(qnaMapper.qnaToQnAResponseDto(savedQnA), HttpStatus.OK);
    }
}
