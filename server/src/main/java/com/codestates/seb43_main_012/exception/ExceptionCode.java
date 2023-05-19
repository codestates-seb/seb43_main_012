package com.codestates.seb43_main_012.exception;

import lombok.Getter;

public enum ExceptionCode {

    CONV_NOT_FOUND(404, "wrong conversation id"),
    BOOKMARK_NOT_EMPTY(406, "bookmark category is not empty"),
    TAG_NOT_FOUND(404, "Tag not found"),
    TAG_EXISTS(409, "Tag exists");

    @Getter
    private int status;

    @Getter
    private String message;

    ExceptionCode(int code, String message) {
        this.status = code;
        this.message = message;
    }
}
