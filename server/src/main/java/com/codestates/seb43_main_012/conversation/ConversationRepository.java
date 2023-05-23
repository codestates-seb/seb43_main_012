package com.codestates.seb43_main_012.conversation;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


public interface ConversationRepository  extends JpaRepository<Conversation, Long> {
    List<Conversation> findAllByMemberIdAndSavedAndDeleteStatus(long memberId, boolean isSaved, boolean deleteStatus);
    List<Conversation> findAllByMemberIdAndSavedAndDeleteStatus(long memberId, boolean isSaved, boolean deleteStatus, Sort sort);

    Page<Conversation> findAllByDeleteStatusAndConversationIdIn(boolean deleteStatus, List<Long> IDs, Pageable pageable);

//    @Modifying
//    @Query("UPDATE conversation c SET c.deleteStatus = true")
//    void updateAllDeleteStatusToTrue();
}
