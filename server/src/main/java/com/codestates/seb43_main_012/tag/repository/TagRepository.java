package com.codestates.seb43_main_012.tag.repository;

import com.codestates.seb43_main_012.tag.entitiy.Tag;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TagRepository extends JpaRepository<Tag, Long> {
    Optional<Tag> findById(Long tagId);

    Optional<Tag> findByTagName(String tagName);
}
