package com.codestates.seb43_main_012.category;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ConversationCategoryRepository extends JpaRepository<ConversationCategory,Long> {
    void deleteAllByConversationConversationId(long conversationId);
    void deleteByConversationConversationIdAndBookmarkId(long conversationId, long bookmarkId);
    void deleteAllByBookmarkId(long categoryId);
    List<ConversationCategory> findAllByConversationConversationId(long conversationId);
    Optional<ConversationCategory> findByConversationConversationIdAndBookmarkName(long conversationId, String bookmarkName);
    List<ConversationCategory> findAllByBookmarkName(String categoryName);
    List<ConversationCategory> findAllByBookmarkId(long categoryId);
}
