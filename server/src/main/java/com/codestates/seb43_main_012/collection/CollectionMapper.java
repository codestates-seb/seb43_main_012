package com.codestates.seb43_main_012.collection;

import com.codestates.seb43_main_012.bookmark.Bookmark;
import com.codestates.seb43_main_012.bookmark.BookmarkDto;
import com.codestates.seb43_main_012.category.Category;
import com.codestates.seb43_main_012.conversation.Conversation;
import com.codestates.seb43_main_012.conversation.ConversationMapper;
import com.codestates.seb43_main_012.tag.dto.TagResponseDto;
import com.codestates.seb43_main_012.tag.entitiy.Tag;
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
    public CollectionPageDto responseForGetCollectionPage(List<Conversation> conversations, List<Category> categories, List<Tag> tags)
    {
        List<BookmarkDto.Response> bookmarks = new ArrayList<>();
        categories.stream().forEach(category -> bookmarks.add(categoryToBookmarkResponseDto(category)));

        List<TagResponseDto> tagResponses = new ArrayList<>();
        tags.stream().forEach(tag -> tagResponses.add(tagToTagResponseDto(tag)));

        var response = new CollectionPageDto(
                bookmarks,
                tagResponses,
                conversationMapper.conversationsToConversationResponseDtos(conversations)
        );
        return response;
    }

    private BookmarkDto.Response categoryToBookmarkResponseDto(Category category)
    {
        var response = new BookmarkDto.Response(
                category.getId(),
                category.getName()
        );
        return response;
    }

    private TagResponseDto tagToTagResponseDto(Tag tag)
    {
        var response = new TagResponseDto(
                tag.getTagId(),
                tag.getTagName()
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
