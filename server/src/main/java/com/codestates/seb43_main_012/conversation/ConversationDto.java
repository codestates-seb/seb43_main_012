package com.codestates.seb43_main_012.conversation;

import com.codestates.seb43_main_012.qna.QnADto;
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
    public static class Response
    {
        @Setter
        private long conversationId;
        private String title;
        private List<String> bookmarks;
        private List<String> tags;
        private List<QnADto.Response> qnaList;
    }

    @NoArgsConstructor
    @AllArgsConstructor
    @Getter
    public static class ResponseForAll
    {
        @Setter
        private long conversationId;
        private long memberId;
        private String title;
        private String answerSummary;
        private LocalDateTime modifiedAt;
        private List<String> bookmarks;
        private List<String> tags;
        private Boolean saved;
        private Boolean pinned;
    }
}
