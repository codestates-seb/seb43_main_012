package com.codestates.seb43_main_012.bookmark;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@NoArgsConstructor
@Getter
@Entity
public class BookmarkCategory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

//    @ManyToOne
//    @JoinColumn(name = "MEMBER_ID")
//    private MemberEntity member;
    private long memberId;
    private String name;

    public BookmarkCategory(long memberId, String name)
    {
        this.memberId = memberId;
        this.name = name;
    }
}
