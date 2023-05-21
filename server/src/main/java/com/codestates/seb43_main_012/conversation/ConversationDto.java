package com.codestates.seb43_main_012.conversation;

import com.codestates.seb43_main_012.category.Category;
import com.codestates.seb43_main_012.category.ConversationCategory;
import com.codestates.seb43_main_012.category.ConversationCategoryDto;
import com.codestates.seb43_main_012.member.dto.MemberDto;
import com.codestates.seb43_main_012.member.entity.MemberEntity;
import com.codestates.seb43_main_012.qna.QnADto;
import com.codestates.seb43_main_012.tag.entitiy.Tag;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;


public class ConversationDto {

    @NoArgsConstructor
    @AllArgsConstructor
    @Getter
    @Setter
    public static class Patch
    {
        private String title;
        private Boolean pinned;
    }

    @NoArgsConstructor
    @AllArgsConstructor
    @Getter
    public static class Response
    {
        @Setter
        private long conversationId;
        private MemberDto.ResponseForConversation member;
        private String title;
        private List<QnADto.Response> qnaList;
        private List<ConversationCategoryDto> bookmarks;
        private List<ConversationCategoryDto> bookmarkList;
        private List<Tag> tags;
        private Boolean saved;
        private Boolean pinned;
        private Boolean published;
        private int viewCount;
        private int activityLevel;
    }

    @NoArgsConstructor
    @AllArgsConstructor
    @Getter
    public static class ResponseForAll
    {
        @Setter
        private long conversationId;
        private MemberDto.ResponseForConversation member;
        private String title;
        private String answerSummary;
        private String modifiedAt;
        private List<ConversationCategoryDto> bookmarks;
        private List<Tag> tags;
        private Boolean saved;
        private Boolean pinned;
        private Boolean published;
        private int viewCount;
        private int activityLevel;
    }

}
