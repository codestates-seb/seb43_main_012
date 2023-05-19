package com.codestates.seb43_main_012.qna;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface QnARepository extends JpaRepository<QnA, Long> {

    @Query("select q from QnA q where q.conversation.conversationId = ?1")
    List<QnA> findQnAsByConversationId(long conversationId);

    List<QnA> findAllByQuestionContainingOrAnswerContaining(String keyword1, String keyword2);
}
