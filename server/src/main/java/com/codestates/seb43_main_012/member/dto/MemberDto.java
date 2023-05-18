package com.codestates.seb43_main_012.member.dto;

import com.codestates.seb43_main_012.member.entity.MemberEntity;
import lombok.*;

import java.time.LocalDateTime;
import java.util.Date;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class MemberDto {
    private Long id;
    private String username;
    private String userId;
    private String password;
    private LocalDateTime createdAt;
    private String avatarLink;

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
    public void setAvatarLink(String avatarLink) {
        this.avatarLink = avatarLink;
    }


    public static MemberDto from(MemberEntity memberEntity) {

        return MemberDto.builder()
                .id(memberEntity.getId())
                .username(memberEntity.getUsername())
                .password(memberEntity.getPassword())
                .userId(memberEntity.getUserId())
                .createdAt(memberEntity.getCreatedAt())
                .avatarLink(memberEntity.getAvatarLink())
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
