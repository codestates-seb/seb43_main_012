package com.codestates.seb43_main_012.conversation;

import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

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

    public Conversation updateConversation(long conversationId)
    {
        Optional<Conversation> optional = conversationRepository.findById(conversationId);
        Conversation findConversation = optional.orElseThrow(()->new RuntimeException());

        findConversation.setModifiedAt(LocalDateTime.now());
        return conversationRepository.save(findConversation);
    }

    public Conversation findConversation(long conversationId)
    {
        Optional<Conversation> optional = conversationRepository.findById(conversationId);
        Conversation conversation = optional.orElseThrow(()->new RuntimeException());
        return conversation;
    }

    public List<Conversation> findConversations(String sort)
    {
        if(sort.equals("desc"))
            return conversationRepository.findAll(Sort.by(Sort.Direction.DESC, "modifiedAt"));
        else
            return conversationRepository.findAll(Sort.by(Sort.Direction.ASC, "modifiedAt"));
    }
}
