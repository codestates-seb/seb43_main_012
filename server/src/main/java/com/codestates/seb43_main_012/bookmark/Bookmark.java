package com.codestates.seb43_main_012.bookmark;

import com.codestates.seb43_main_012.conversation.Conversation;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@NoArgsConstructor
@Getter
@Entity
public class Bookmark {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long bookmarkId;
    @Setter
    private long memberId;

    @ManyToOne
    @JoinColumn(name = "CONVERSATION_ID")
    private Conversation conversation;

    @Setter
    private String bookmarkName;
    public void addConversation(Conversation conversation)
    {
        this.conversation = conversation;
    }
}
