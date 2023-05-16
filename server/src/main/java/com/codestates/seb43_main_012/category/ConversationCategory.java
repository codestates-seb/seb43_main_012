package com.codestates.seb43_main_012.category;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@NoArgsConstructor
@Getter
@Entity
public class ConversationCategory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    //나중에 연관관계 맺어줘야함
    private long conversationId;
    private long categoryId;

    public ConversationCategory(long conversationId, long categoryId)
    {
        this.conversationId = conversationId;
        this.categoryId = categoryId;
    }
}
