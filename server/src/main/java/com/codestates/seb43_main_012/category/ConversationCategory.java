package com.codestates.seb43_main_012.category;

import com.codestates.seb43_main_012.conversation.Conversation;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@NoArgsConstructor
@Getter
@Entity
public class ConversationCategory {
    @Id
    @JsonIgnore
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    //나중에 연관관계 맺어줘야함
    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "CONVERSATION_ID")
    private Conversation conversation;
    private long categoryId;
    private String categoryName;

    public ConversationCategory(Conversation conversation, long categoryId, String categoryName)
    {
        this.conversation = conversation;
        this.categoryId = categoryId;
        this.categoryName = categoryName;
    }
}
