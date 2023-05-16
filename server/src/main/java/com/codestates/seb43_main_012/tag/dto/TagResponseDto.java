package com.codestates.seb43_main_012.tag.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class TagResponseDto {

    private long conversationId;
    private List<Tags> tags;


    @Getter
    @Setter
    @NoArgsConstructor
    public static class Tags {
        private Long id;
        private String tagName;

    }
}

