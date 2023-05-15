package com.codestates.seb43_main_012.tag.dto;

import com.sun.istack.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

public class TagDto {

    @Getter
    @Setter
    @NoArgsConstructor
    public static class Post {
        private Long conversationId;
        @NotNull
        private String tagName;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    public static class Patch {
        private Long conversationId;
        private Long tagId;


        @NotNull
        private String tagName;
    }

}
