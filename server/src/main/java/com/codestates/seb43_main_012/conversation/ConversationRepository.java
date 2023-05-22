package com.codestates.seb43_main_012.conversation;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface ConversationRepository  extends JpaRepository<Conversation, Long> {
    List<Conversation> findAllByMemberIdAndSavedAndDeleteStatus(long memberId, boolean isSaved, boolean deleteStatus);
    List<Conversation> findAllByMemberIdAndSavedAndDeleteStatus(long memberId, boolean isSaved, boolean deleteStatus, Sort sort);

    List<Conversation> findAllByDeleteStatusAndConversationIdIn(boolean deleteStatus, List<Long> IDs, Sort sort);
}
