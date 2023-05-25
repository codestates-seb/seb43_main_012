package com.codestates.seb43_main_012.category;

import com.codestates.seb43_main_012.conversation.Conversation;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@NoArgsConstructor
@Getter
@Entity
public class ConversationCategory {
    @Id
    @JsonIgnore
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "CONVERSATION_ID")
    private Conversation conversation;

    @ManyToOne
    @JoinColumn(name = "CATEGORY_ID")
    private Category category;

    @Setter
    private String bookmarkName;

    public ConversationCategory(Conversation conversation, Category category)
    {
        this.conversation = conversation;
        this.category = category;
        this.bookmarkName = category.getName();
    }
}
