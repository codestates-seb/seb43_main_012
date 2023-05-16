package com.codestates.seb43_main_012.tag.entitiy;

import com.codestates.seb43_main_012.conversation.Conversation;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class ConversationTag {
    @Id
    @JsonIgnore
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long conversationTagId;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "CONVERSATION_ID")
    private Conversation conversation;
    //private long conversationId;
    private long tagId;
    private String tagName;
    public ConversationTag(Conversation conversation, long tagId, String tagName)
    {
        this.conversation = conversation;
        this.tagId = tagId;
        this.tagName = tagName;
    }




//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "TAG_ID")
//    private Tag tag;
//
//    public ConversationTag(Conversation conversation, Tag tag)
//    {
//        this.conversation = conversation;
//        this.tag = tag;
//    }

}
