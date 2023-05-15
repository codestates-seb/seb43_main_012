package com.codestates.seb43_main_012.tag.entitiy;

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
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long conversationTagId;

    @ManyToOne
    private Tag tag;

    // Conversation 다대일 매핑 추가 예정
}
