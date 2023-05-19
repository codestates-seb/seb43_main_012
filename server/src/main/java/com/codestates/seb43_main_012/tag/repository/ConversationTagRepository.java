package com.codestates.seb43_main_012.tag.repository;

import com.codestates.seb43_main_012.tag.entitiy.ConversationTag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ConversationTagRepository extends JpaRepository<ConversationTag, Long> {
    //void deleteAllByConversationId(long conversationId);

//    @Query("select ct from ConversationTag ct where ct.conversationId in ?1")
//    List<ConversationTag> findAllByConversationIdIn(List<Long> conversationIds);

    void deleteByConversationConversationIdAndTagId(long conversationId, long tagId);
    List<ConversationTag> findAllByConversationConversationId(long conversationId);
    Optional<ConversationTag> findByConversationConversationIdAndTagName(long conversationId, String tagName);
    List<ConversationTag> findAllByTagName(String tagName);
}
