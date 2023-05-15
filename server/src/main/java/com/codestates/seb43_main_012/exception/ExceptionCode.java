package com.codestates.seb43_main_012.exception;

import lombok.Getter;

public enum ExceptionCode {

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
