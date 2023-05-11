package com.codestates.seb43_main_012.conversation;

import com.codestates.seb43_main_012.collection.CollectionDto;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Service
public class ConversationService {

    private final ConversationRepository conversationRepository;

    public ConversationService(ConversationRepository conversationRepository)
    {
        this.conversationRepository = conversationRepository;
    }

    public Conversation saveConversation(Conversation conversation)
    {
        return conversationRepository.save(conversation);
    }

    public Conversation createConversation(long memberId)
    {
        Conversation conversation = new Conversation();
        conversation.setMemberId(memberId);

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

    public Conversation createCollection(long conversationId, CollectionDto.Post collection)
    {
        Conversation conversation = findConversation(conversationId);

        Optional.ofNullable(collection.getBookmarks()).ifPresent(b -> conversation.setBookmarks(listToString(b)));
        //Optional.ofNullable(collection.getTags()).ifPresent();
        Optional.ofNullable(collection.getPinned()).ifPresent(pin -> conversation.setPinned(pin));
        //Optional.ofNullable(collection.getPublished()).ifPresent(publish -> conversation.setPublished(publish));
        Optional.ofNullable(collection.getTitle()).ifPresent(title -> conversation.setTitle(title));

        return conversationRepository.save(conversation);
    }


    private String listToString(List list)
    {
        if(list.isEmpty()) return null;

        String str = "[\"";

        str += list.get(0);
        for(int i = 1; i<list.size();i++)
        {
            str += "\",\"";
            str += list.get(i);
        }
        str += "\"]";

        return str;
    }
}
