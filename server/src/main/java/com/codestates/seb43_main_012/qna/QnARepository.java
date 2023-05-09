package com.codestates.seb43_main_012.qna;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface QnARepository extends JpaRepository<QnA, Long> {
    List<QnA> findAllByConversationId(long conversationId);
}
