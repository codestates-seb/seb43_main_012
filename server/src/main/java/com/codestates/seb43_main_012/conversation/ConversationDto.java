package com.codestates.seb43_main_012.conversation;

import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Getter
public class ConversationDto {

    private int id;
    private String prompt;
    private int max_tokens;
}
