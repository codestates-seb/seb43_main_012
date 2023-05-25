package com.codestates.seb43_main_012.collection;

import com.codestates.seb43_main_012.bookmark.BookmarkDto;
import com.codestates.seb43_main_012.category.ConversationCategory;
import com.codestates.seb43_main_012.category.ConversationCategoryDto;
import com.codestates.seb43_main_012.conversation.ConversationDto;
import com.codestates.seb43_main_012.tag.dto.TagResponseDto;
import com.codestates.seb43_main_012.tag.entitiy.ConversationTag;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

public class CollectionDto {

    @NoArgsConstructor
    @AllArgsConstructor
    @Getter
    public static class Response
    {
        @Setter
        private long conversationId;
        private List<ConversationCategoryDto> bookmarks;
        private List<ConversationTag> tags;
        private Boolean pinned;
        private String title;
    }

    @NoArgsConstructor
    @AllArgsConstructor
    @Getter
    public static class Page {
        private List<BookmarkDto.Response> bookmarks;
        private List<TagResponseDto> tags;
        private List<ConversationDto.ResponseForAll> conversations;
    }

}
