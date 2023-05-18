package com.codestates.seb43_main_012.category;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CategoryRepository extends JpaRepository<Category, Long> {

    Optional<Category> findByName(String name);
    List<Category> findAllByMemberId(long memberId);

    List<Category> findAllByMemberIdAndIdNotIn(long memberId, List<Long> id);
}
