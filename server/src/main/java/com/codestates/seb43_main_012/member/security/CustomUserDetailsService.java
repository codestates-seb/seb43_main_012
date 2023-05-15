package com.codestates.seb43_main_012.member.security;
import com.codestates.seb43_main_012.member.entity.MemberEntity;
import com.codestates.seb43_main_012.member.repository.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private MemberRepository memberRepository;

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String userId) throws UsernameNotFoundException {
        MemberEntity member;
        if(userId.contains("@")) {
            member = memberRepository.findByEmail(userId)
                    .orElseThrow(() -> new UsernameNotFoundException("User Not Found with email: " + userId));
        } else {
            member = memberRepository.findByUsername(userId)
                    .orElseThrow(() -> new UsernameNotFoundException("User Not Found with username: " + userId));
        }

        return member;
    }
}
