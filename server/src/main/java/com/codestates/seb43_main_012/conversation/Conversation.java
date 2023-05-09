package com.codestates.seb43_main_012.conversation;

import com.codestates.seb43_main_012.qna.QnA;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;


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
    private String summary;
    private LocalDateTime modifiedAt = LocalDateTime.now();
    public Conversation(long id)
    {
        this.id = id;
    }
//    @OneToMany(mappedBy = "conversation")
//    private List<QnA> qnAList = new ArrayList<>();
}
