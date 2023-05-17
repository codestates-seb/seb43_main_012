package com.codestates.seb43_main_012.qna;

import com.codestates.seb43_main_012.conversation.Conversation;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

/**
 * conversation과 관계를 맺을 필요가 있을까 고민
 *
 */
@Getter
@NoArgsConstructor
@Entity
public class QnA {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long qnaId;
    private String question;
    @Column(length=10000)
    private String answer;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "CONVERSATION_ID")
    private Conversation conversation;

    private boolean bookmarkStatus = false;

    public QnA(String question, String answer)
    {
        this.question = question;
        this.answer = answer;
    }

    public void setConversation(Conversation conversation)
    {
        this.conversation = conversation;
    }

}
