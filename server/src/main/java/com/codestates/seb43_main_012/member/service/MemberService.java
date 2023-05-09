package com.codestates.seb43_main_012.member.service;

import com.codestates.seb43_main_012.member.dto.MemberDto;
import com.codestates.seb43_main_012.member.entity.MemberEntity;
import com.codestates.seb43_main_012.member.repository.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;


import java.lang.reflect.Member;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class MemberService {
    @Autowired
    private MemberRepository memberRepository;
    private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

/*    public MemberDto signUp(MemberDto memberDto) {
        memberDto.setPassword(passwordEncoder.encode(memberDto.getPassword()));

        MemberEntity memberEntity = MemberEntity.builder()
                .username(memberDto.getUsername())
                .password(memberDto.getPassword())
                .email(memberDto.getEmail())
                .build();
        memberRepository.save(memberEntity);
        return memberDto;
    }*/
    public MemberDto signup(MemberDto memberDto) {
    BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
    String encodedPassword = passwordEncoder.encode(memberDto.getPassword());

    MemberEntity memberEntity = MemberEntity.builder()
            .username(memberDto.getUsername())
            .password(encodedPassword)
            .email(memberDto.getEmail())
            .build();

    MemberEntity savedMember = memberRepository.save(memberEntity);
    return MemberDto.from(savedMember);
}

    public MemberDto login(MemberDto memberDto) {
        Optional<MemberEntity> optionalMemberEntity = memberRepository.findByUsername(memberDto.getUsername());
        if (optionalMemberEntity.isPresent() && passwordEncoder.matches(memberDto.getPassword(), optionalMemberEntity.get().getPassword())) {
            return memberDto;
        } else {
            throw new RuntimeException("Invalid username or password");
        }
    }
    public List<MemberDto> getAllMembers() {
        return memberRepository.findAll().stream()
                .map(memberEntity -> MemberDto.builder()
                        .id(memberEntity.getId())
                        .username(memberEntity.getUsername())
                        .password(memberEntity.getPassword())
                        .email(memberEntity.getEmail())
                        .build())
                .collect(Collectors.toList());
    }
    public void deleteMember(Long id) {
        memberRepository.deleteById(id);
    }
}
