package com.codestates.seb43_main_012.member.repository;

import com.codestates.seb43_main_012.member.entity.MemberEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MemberRepository extends JpaRepository<MemberEntity, Long> {
    Optional<MemberEntity> findByUsername(String username);
    Optional<MemberEntity> findByEmail(String email);
}
