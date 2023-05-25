package com.codestates.seb43_main_012.collection;

import com.codestates.seb43_main_012.bookmark.Bookmark;
import com.codestates.seb43_main_012.bookmark.BookmarkDto;
import com.codestates.seb43_main_012.category.Category;
import com.codestates.seb43_main_012.conversation.Conversation;
import com.codestates.seb43_main_012.conversation.ConversationMapper;
import com.codestates.seb43_main_012.tag.dto.TagResponseDto;
import com.codestates.seb43_main_012.tag.entitiy.ConversationTag;
import com.codestates.seb43_main_012.tag.entitiy.Tag;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class CollectionMapper {
    private final ConversationMapper conversationMapper;
    public CollectionMapper(ConversationMapper conversationMapper)
    {
        this.conversationMapper = conversationMapper;
    }
    public CollectionDto.Page responseForGetCollectionPage(List<Conversation> conversations, List<Category> categories, List<ConversationTag> tags)
    {
        List<BookmarkDto.Response> bookmarks = new ArrayList<>();
        categories.stream().forEach(category -> bookmarks.add(categoryToBookmarkResponseDto(category)));

        List<TagResponseDto> tagResponses = new ArrayList<>();
        List<Long> IDs = new ArrayList<>();
        tags.stream().forEach(tag -> {
            if(!IDs.contains(tag.getTagId())) {
                tagResponses.add(tagToTagResponseDto(tag));
                IDs.add(tag.getTagId());
            }
        });

        var response = new CollectionDto.Page(
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

    private TagResponseDto tagToTagResponseDto(ConversationTag tag)
    {
        var response = new TagResponseDto(
                tag.getTagId(),
                tag.getTagName()
        );
        return response;
    }

}
