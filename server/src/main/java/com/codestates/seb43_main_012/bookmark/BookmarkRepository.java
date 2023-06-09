package com.codestates.seb43_main_012.bookmark;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface BookmarkRepository extends JpaRepository<Bookmark, Long> {
    List<Bookmark> findAllByMemberId(long memberId);

    @Query(value = "select b from Bookmark b where b.memberId = ?1 and b.bookmarkName like %?2%")
    List<Bookmark> findAllByBookmarkName(long memberId, String bookmarkName);

    Optional<Bookmark> findByMemberIdAndConversationConversationId(long memberId, long conversationId);

    void deleteByMemberIdAndConversationConversationId(long memberId, long conversationId);
}
