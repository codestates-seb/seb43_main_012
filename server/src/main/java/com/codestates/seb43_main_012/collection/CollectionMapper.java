package com.codestates.seb43_main_012.collection;

import com.codestates.seb43_main_012.bookmark.BookmarkCategory;
import com.codestates.seb43_main_012.category.Category;
import com.codestates.seb43_main_012.conversation.Conversation;
import com.codestates.seb43_main_012.conversation.ConversationMapper;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Component
public class CollectionMapper {
    private final ConversationMapper conversationMapper;
    public CollectionMapper(ConversationMapper conversationMapper)
    {
        this.conversationMapper = conversationMapper;
    }
    public CollectionPageDto responseForGetCollectionPage(List<Conversation> conversations, List<Category> categories)
    {
        List<String> names = new ArrayList<>();
        categories.stream().forEach(category -> names.add(category.getName()));

        var response = new CollectionPageDto(
                names,
                new ArrayList<>(),
                conversationMapper.conversationsToConversationResponseDtos(conversations)
        );
        return response;
    }

    private List<String> stringToList(String str)
    {
        List<String> list = new ArrayList<>();
        if(str == null || str.equals("[]")) return list;

        Arrays.stream(str.substring(1,str.length()-1).split(","))
                .forEach(subStr -> list.add(subStr.replace("\"","")));

        return list;
    }
}
