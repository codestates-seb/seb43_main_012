package com.codestates.seb43_main_012.conversation;

import org.springframework.stereotype.Service;

@Service
public class ConversationService {

    private final ConversationRepository conversationRepository;

    public ConversationService(ConversationRepository conversationRepository)
    {
        this.conversationRepository = conversationRepository;
    }

    public Conversation createConversation(Conversation conversation)
    {
        return conversationRepository.save(conversation);
    }

}
