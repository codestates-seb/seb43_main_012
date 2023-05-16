package com.codestates.seb43_main_012.collection;

import com.codestates.seb43_main_012.conversation.ConversationDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
public class CollectionPageDto {
    private List<String> bookmarks;
    private List<String> tags;
    private List<ConversationDto.ResponseForAll> conversations;
}
