package com.codestates.seb43_main_012.member.controller;

import com.codestates.seb43_main_012.member.dto.MemberDto;
import com.codestates.seb43_main_012.member.entity.MemberEntity;
import com.codestates.seb43_main_012.member.security.CustomUserDetails;
import com.codestates.seb43_main_012.member.service.MemberService;
import com.codestates.seb43_main_012.member.security.JwtUtil;
import com.codestates.seb43_main_012.error.NotFoundException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.Cookie;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/")
@CrossOrigin(origins = "http://localhost:3000")
public class MemberController {
    @Autowired
    private MemberService memberService;
    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/signup")
    public ResponseEntity<Map<String, Object>> signUp(@RequestBody MemberDto memberDto) {
        MemberDto createdMember = memberService.signup(memberDto);
        createdMember.setCreatedAt(LocalDateTime.now());

        Map<String, Object> responseData = new HashMap<>();
        responseData.put("message", "회원가입에 성공했습니다.\n로그인 페이지로 이동됩니다.");
        responseData.put("userid", createdMember.getUserId());

        return ResponseEntity.status(HttpStatus.CREATED).body(responseData);
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody MemberDto memberDto, HttpServletResponse response) throws IOException {
        MemberEntity loggedInMember = memberService.login(memberDto);
        String accessToken = jwtUtil.generateToken(loggedInMember.getUsername());
        String refreshToken = "REFRESH_TOKEN";  // 임시로 사용할 리프레시 토큰

        // JWT 토큰을 응답 헤더 Authorization에 추가
        String authorizationHeader = "Bearer " + accessToken;
        response.setHeader("Authorization", authorizationHeader);

        // 리프레시 토큰을 응답 헤더 Refresh에 추가
        response.setHeader("Refresh", refreshToken);

        Cookie cookie = new Cookie("jwt_token", accessToken);
        cookie.setPath("/");
        cookie.setSecure(false);
        cookie.setHttpOnly(true);
        cookie.setMaxAge(3600);
        response.addCookie(cookie);

        // CustomUserDetails 객체 생성 및 설정
        CustomUserDetails customUserDetails = new CustomUserDetails();
        customUserDetails.setId(loggedInMember.getId());
        customUserDetails.setUsername(loggedInMember.getUsername());
        customUserDetails.setUserId(loggedInMember.getUserId());

        // 인증 객체로 설정
        Authentication authentication = new UsernamePasswordAuthenticationToken(customUserDetails, memberDto.getPassword());
        SecurityContextHolder.getContext().setAuthentication(authentication);

        // 로그인 성공 응답 데이터
        Map<String, Object> responseData = new HashMap<>();
        responseData.put("message", "로그인에 성공했습니다.");
        responseData.put("memberId", customUserDetails.getId());
        responseData.put("username", customUserDetails.getUsername());
        responseData.put("userid", customUserDetails.getUserId());
        responseData.put("authorization", authorizationHeader);
        responseData.put("Refresh", refreshToken);

        return ResponseEntity.ok(responseData);
    }
    @GetMapping("/user/{id}")
    public ResponseEntity<MemberDto> getMemberById(@PathVariable Long id) {
        MemberDto memberDto = memberService.getMemberById(id);
        if (memberDto == null) {
            throw new NotFoundException("Member not found with id: " + id);
        }
        return ResponseEntity.ok(memberDto);
    }

    @ExceptionHandler(NotFoundException.class)
    public ResponseEntity<String> handleNotFoundException(NotFoundException ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
    }

    @GetMapping("/users")
    public ResponseEntity<List<MemberDto>> getAllMembers() {
        return ResponseEntity.ok(memberService.getAllMembers());
    }

    @PatchMapping("/user/{id}")
    public ResponseEntity<Map<String, String>> updateUser(@PathVariable Long id, @RequestBody Map<String, Object> updateFields) {
        MemberDto memberDto = memberService.getMemberById(id);
        if (memberDto == null) {
            throw new NotFoundException("Member not found with id: " + id);
        }

        // 유저 정보 업데이트
        if (updateFields.containsKey("password")) {
            String password = (String) updateFields.get("password");
            memberDto.setPassword(password);
        }
        if (updateFields.containsKey("username")) {
            String username = (String) updateFields.get("username");
            memberDto.setUsername(username);
        }
        if (updateFields.containsKey("userId")) {
            String userId = (String) updateFields.get("userId");
            memberDto.setUserId(userId);
        }
        if (updateFields.containsKey("avatarLink")) {
            String avatarLink = (String) updateFields.get("avatarLink");
            memberDto.setAvatarLink(avatarLink);
        }


        // 유저 정보 저장
        memberService.updateMember(memberDto);

        Map<String, String> responseData = new HashMap<>();
        responseData.put("message", "'" + memberDto.getUsername() + "'님의 정보를 수정했습니다.");

        return ResponseEntity.ok(responseData);
    }

    @DeleteMapping("/user/{id}")
    public ResponseEntity<Map<String, Object>> deleteMember(@PathVariable Long id) {
        if (memberService.getMemberName(id)!=null) {
            // 삭제 전에 멤버의 이름을 가져옴
            String name = memberService.getMemberName(id);

            // 응답 생성
            String message = "'" + name + "'님의 회원탈퇴에 성공했습니다.";
            Map<String, Object> responseData = new HashMap<>();
            responseData.put("message", message);

            // 멤버를 삭제
            memberService.deleteMember(id);

            return ResponseEntity.ok(responseData);
        }
        else return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
    }
    @PostMapping("/logout")
    public ResponseEntity<String> logout(HttpServletRequest request, HttpServletResponse response) {
        // 현재 인증된 사용자 확인
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication != null) {
            // 로그아웃 처리
            SecurityContextHolder.getContext().setAuthentication(null);

            // 쿠키 제거
            removeJwtTokenFromCookie(response);
        }

        // 로그아웃 성공 응답 반환
        return ResponseEntity.ok("로그아웃 되었습니다.");
    }

    private void removeJwtTokenFromCookie(HttpServletResponse response) {
        Cookie cookie = new Cookie("jwt_token", null);
        cookie.setPath("/");
        cookie.setMaxAge(0);
        response.addCookie(cookie);
    }


}
