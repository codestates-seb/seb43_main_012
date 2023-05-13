package com.codestates.seb43_main_012.qna;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


public class QnADto {

    @NoArgsConstructor
    @Getter
    public static class Post
    {
        @Setter
        private long conversationId;
        private String question;
    }

    @NoArgsConstructor
    @AllArgsConstructor
    @Getter
    public static class Response
    {
        private long qnaId;
        private String question;
        private String answer;
        private Boolean bookmarkStatus;
    }
}
