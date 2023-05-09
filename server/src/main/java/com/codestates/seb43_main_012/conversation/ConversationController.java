package com.codestates.seb43_main_012.conversation;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/conversation")
public class ConversationController {

    @Value("${apikey}")
    private String API_KEY;
    private static final String API_ENDPOINT = "https://api.openai.com/v1/chat/completions";
    private final ConversationService conversationService;

    public ConversationController(ConversationService conversationService)
    {
        this.conversationService = conversationService;
    }

    @PostMapping
    public ResponseEntity generateConversation(long memberId) // memberId 대신 토큰
    {
        Conversation conversation = new Conversation();
        // conversation.setTitle("abc"); // 자동생성 또는 처음질문
        conversation.setMemberId(memberId);
        Conversation savedConversation = conversationService.createConversation(conversation);

        return new ResponseEntity<>(savedConversation,HttpStatus.CREATED);
    }
}
