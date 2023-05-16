package com.codestates.seb43_main_012.tag.repository;

import com.codestates.seb43_main_012.tag.entitiy.ConversationTag;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ConversationTagRepository extends JpaRepository<ConversationTag, Long> {
    //void deleteAllByConversationId(long conversationId);
}
