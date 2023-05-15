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

    public MemberEntity login(MemberDto memberDto) {
        Optional<MemberEntity> optionalMemberEntity = memberRepository.findByUsernameOrEmail(memberDto.getUserId(), memberDto.getUserId());
        if (optionalMemberEntity.isPresent() && passwordEncoder.matches(memberDto.getPassword(), optionalMemberEntity.get().getPassword())) {
            return optionalMemberEntity.get();
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
    public String getMemberName(Long id) {
        Optional<MemberEntity> optionalMemberEntity = memberRepository.findById(id);
        if (optionalMemberEntity.isPresent()) {
            MemberEntity memberEntity = optionalMemberEntity.get();
            return memberEntity.getUsername();  // 이름 필드가 있는 경우에 해당 필드를 반환하도록 수정
        }
        throw new RuntimeException("Member not found with id: " + id);
    }
}
