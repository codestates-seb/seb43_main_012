package com.codestates.seb43_main_012.member.service;

import com.codestates.seb43_main_012.error.NotFoundException;
import com.codestates.seb43_main_012.member.dto.MemberDto;
import com.codestates.seb43_main_012.member.entity.MemberEntity;
import com.codestates.seb43_main_012.member.repository.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;


import java.lang.reflect.Member;
import java.time.LocalDateTime;
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
    String encodedPassword = passwordEncoder.encode(memberDto.getPassword());

    MemberEntity memberEntity = MemberEntity.builder()
            .username(memberDto.getUsername())
            .password(encodedPassword)
            .userId(memberDto.getUserId())
            .createdAt(LocalDateTime.now())
            .avatarLink(memberDto.getAvatarLink())
            .build();

    MemberEntity savedMember = memberRepository.save(memberEntity);
    return MemberDto.from(savedMember);
}
    public MemberEntity login(MemberDto memberDto) {
    Optional<MemberEntity> optionalMemberEntity;
    String identifier = memberDto.getIdentifier();

    // 입력이 userId 형식인지 확인
    if (identifier.contains("@")) {
        optionalMemberEntity = memberRepository.findByUserId(identifier);
    } else { // 그렇지 않으면 username으로 간주
        optionalMemberEntity = memberRepository.findByUsername(identifier);
    }

    if (optionalMemberEntity.isPresent()) {
        MemberEntity memberEntity = optionalMemberEntity.get();
        if (passwordEncoder.matches(memberDto.getPassword(), memberEntity.getPassword())) {
            return memberEntity;
        }
    }
    throw new BadCredentialsException("로그인 정보가 유효하지 않습니다.");
}

    public List<MemberDto> getAllMembers() {
        return memberRepository.findAll().stream()
                .map(memberEntity -> MemberDto.builder()
                        .id(memberEntity.getId())
                        .username(memberEntity.getUsername())
                        .password(memberEntity.getPassword())
                        .userId(memberEntity.getUserId())
                        .createdAt(memberEntity.getCreatedAt())
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
    public MemberDto getMemberById(Long id) {
        MemberEntity memberEntity = memberRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Member not found with id: " + id));
        return MemberDto.from(memberEntity);
    }

    public void updateMember(MemberDto memberDto) {
        MemberEntity memberEntity = MemberEntity.builder()
                .id(memberDto.getId())
                .username(memberDto.getUsername())
                .password(memberDto.getPassword())
                .userId(memberDto.getUserId())
                .createdAt(memberDto.getCreatedAt())
                .avatarLink(memberDto.getAvatarLink())
                .build();
        memberRepository.save(memberEntity);
    }

}
