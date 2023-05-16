package com.codestates.seb43_main_012.tag.repository;

import com.codestates.seb43_main_012.tag.entitiy.ConversationTag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ConversationTagRepository extends JpaRepository<ConversationTag, Long> {
    //void deleteAllByConversationId(long conversationId);

//    @Query("select ct from ConversationTag ct where ct.conversationId in ?1")
//    List<ConversationTag> findAllByConversationIdIn(List<Long> conversationIds);
}
