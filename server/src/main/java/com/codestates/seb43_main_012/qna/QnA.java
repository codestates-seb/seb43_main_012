package com.codestates.seb43_main_012.qna;

import com.codestates.seb43_main_012.conversation.Conversation;
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

//    @Setter
//    private long conversationId;
    private String question;
    @Column(length=1000)
    private String answer;

    @ManyToOne
    @JoinColumn(name = "CONVERSATION_ID")
    private Conversation conversation;

    private BookmarkStatus bookmarkStatus = BookmarkStatus.N;

    private DisplayStatus displayStatus = DisplayStatus.Y;

    public enum BookmarkStatus
    {
        Y,
        N;
    }
    public enum DisplayStatus
    {
        Y,
        N;
    }

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
