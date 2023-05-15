package com.codestates.seb43_main_012.member.controller;

import com.codestates.seb43_main_012.member.dto.MemberDto;
import com.codestates.seb43_main_012.member.entity.MemberEntity;
import com.codestates.seb43_main_012.member.security.CustomUserDetails;
import com.codestates.seb43_main_012.member.service.MemberService;
import com.codestates.seb43_main_012.member.security.JwtUtil;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.Cookie;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/")
public class MemberController {
    @Autowired
    private MemberService memberService;
    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/signup")
    public ResponseEntity<Map<String, Object>> signUp(@RequestBody MemberDto memberDto) {
        MemberDto createdMember = memberService.signup(memberDto);

        Map<String, Object> responseData = new HashMap<>();
        responseData.put("message", "회원가입에 성공했습니다.\n로그인 페이지로 이동됩니다.");
        responseData.put("email", createdMember.getEmail());

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
        cookie.setSecure(true);
        cookie.setHttpOnly(true);
        cookie.setMaxAge(7 * 24 * 60 * 60);
        response.addCookie(cookie);

        // CustomUserDetails 객체 생성 및 설정
        CustomUserDetails customUserDetails = new CustomUserDetails();
        customUserDetails.setId(loggedInMember.getId());
        customUserDetails.setUsername(loggedInMember.getUsername());
        customUserDetails.setEmail(loggedInMember.getEmail());

        // 인증 객체로 설정
        Authentication authentication = new UsernamePasswordAuthenticationToken(customUserDetails, memberDto.getPassword());
        SecurityContextHolder.getContext().setAuthentication(authentication);

        // 로그인 성공 응답 데이터
        Map<String, Object> responseData = new HashMap<>();
        responseData.put("message", "로그인에 성공했습니다.");
        responseData.put("memberId", customUserDetails.getId());
        responseData.put("username", customUserDetails.getUsername());
        responseData.put("email", customUserDetails.getEmail());

        return ResponseEntity.ok(responseData);
    }


    @GetMapping("/users")
    public ResponseEntity<List<MemberDto>> getAllMembers() {
        return ResponseEntity.ok(memberService.getAllMembers());
    }

    @DeleteMapping("/user/{userId}")
    public ResponseEntity<Map<String, Object>> deleteMember(@PathVariable Long id) {
        memberService.deleteMember(id);

        String message = "회원탈퇴에 성공했습니다.";
        String name = memberService.getMemberName(id);
        message = "'" + name + "'님의 회원탈퇴에 성공했습니다.";

        Map<String, Object> responseData = new HashMap<>();
        responseData.put("message", message);

        return ResponseEntity.status(HttpStatus.NO_CONTENT).body(responseData);
    }
}
