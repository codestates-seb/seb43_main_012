package com.codestates.seb43_main_012.member.dto;

import com.codestates.seb43_main_012.member.entity.MemberEntity;
import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class MemberDto {
    private Long id;
    private String username;
    private String password;
    private String email;

    public static MemberDto from(MemberEntity memberEntity) {

        return MemberDto.builder()
                .id(memberEntity.getId())
                .username(memberEntity.getUsername())
                .password(memberEntity.getPassword())
                .email(memberEntity.getEmail())
                .build();
    }

    @AllArgsConstructor
    @NoArgsConstructor
    @Getter
    public static class ResponseForConversation
    {
        private long memberId;
        private String username;
    }
}
