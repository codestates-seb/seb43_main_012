package com.codestates.seb43_main_012.member.repository;

import com.codestates.seb43_main_012.member.entity.MemberEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MemberRepository extends JpaRepository<MemberEntity, Long> {
    Optional<MemberEntity> findByUsername(String username);
    //Optional<MemberEntity> findByEmail(String email);

    //    Optional<MemberEntity> findByUsernameOrEmail(String username, String email);
    Optional<MemberEntity> findByUserId(String userId);

    boolean existsByUsername(String username);

    boolean existsByUserId(String userId);
    void deleteById(Long id);
}
