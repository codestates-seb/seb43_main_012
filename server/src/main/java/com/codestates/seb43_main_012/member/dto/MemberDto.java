package com.codestates.seb43_main_012.member.dto;

import com.codestates.seb43_main_012.member.entity.MemberEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class MemberDto {
    private Long id;
    private String username;
    private String email;
    private String userId;
    private String password;

    public static MemberDto from(MemberEntity memberEntity) {

        return MemberDto.builder()
                .id(memberEntity.getId())
                .username(memberEntity.getUsername())
                .password(memberEntity.getPassword())
                .email(memberEntity.getEmail())
                .build();
    }
}
