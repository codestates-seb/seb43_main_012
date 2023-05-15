package com.codestates.seb43_main_012.bookmark;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface BookmarkCategoryRepository extends JpaRepository<BookmarkCategory, Long>{
    Optional<BookmarkCategory> findByName(String name);
    List<BookmarkCategory> findAllByMemberId(long memberId);
}
