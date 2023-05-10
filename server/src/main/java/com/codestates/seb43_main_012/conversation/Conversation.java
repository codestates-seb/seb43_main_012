package com.codestates.seb43_main_012.conversation;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Conversation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private long memberId;
    private String title;
    private String answerSummary;
    private LocalDateTime modifiedAt = LocalDateTime.now();
    private Boolean bookmarked = false;
    public Conversation(long id)
    {
        this.id = id;
    }
//    @OneToMany(mappedBy = "conversation")
//    private List<QnA> qnAList = new ArrayList<>();
}
