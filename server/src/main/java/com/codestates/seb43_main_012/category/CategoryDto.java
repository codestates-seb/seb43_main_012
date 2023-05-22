package com.codestates.seb43_main_012.category;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;


public class CategoryDto {

    @NoArgsConstructor
    @Getter
    public static class Post
    {
        private String bookmarkName;
    }

    @NoArgsConstructor
    @Getter
    public static class Patch
    {
        private String bookmarkName;
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
