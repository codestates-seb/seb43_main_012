package com.codestates.seb43_main_012.tag.dto;

import com.sun.istack.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

public class TagDto {

    @Getter
    @Setter
    @NoArgsConstructor
    public static class Post {
        @NotNull
        private String tagName;
    }

}
