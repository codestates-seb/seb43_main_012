package com.codestates.seb43_main_012.bookmark;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

public class BookmarkDto {
    @NoArgsConstructor
    @Getter
    public static class Post
    {
        private long bookmarkId;
    }

    @NoArgsConstructor
    @AllArgsConstructor
    @Getter
    public static class Response
    {
        private long bookmarkId;
        private String bookmarkName;
    }
}
