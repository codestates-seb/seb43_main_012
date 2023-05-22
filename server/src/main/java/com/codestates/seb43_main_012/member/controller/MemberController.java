package com.codestates.seb43_main_012.member.controller;

import com.codestates.seb43_main_012.member.dto.MemberDto;
import com.codestates.seb43_main_012.member.entity.MemberEntity;
import com.codestates.seb43_main_012.member.security.CustomUserDetails;
import com.codestates.seb43_main_012.member.service.MemberService;
import com.codestates.seb43_main_012.member.security.JwtUtil;
import com.codestates.seb43_main_012.error.NotFoundException;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.annotation.Transactional;
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
@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*")
public class MemberController {
    @Autowired
    private MemberService memberService;
    @Autowired
    private JwtUtil jwtUtil;
    @Autowired
    private PasswordEncoder passwordEncoder;

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
        String refreshToken = jwtUtil.generateRefreshToken(loggedInMember.getUsername());

        // JWT 토큰을 응답 헤더 Authorization에 추가
        String authorizationHeader = "Bearer " + accessToken;
        response.setHeader("Authorization", authorizationHeader);

        // 리프레시 토큰을 응답 헤더 Refresh에 추가
        response.setHeader("Refresh", refreshToken);

        Cookie cookie = new Cookie("jwt_token", accessToken);
        cookie.setPath("/");
        cookie.setSecure(true); // 0519 수정
        cookie.setHttpOnly(true);
        cookie.setMaxAge(86400);
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

    @PostMapping("/refresh")
    public ResponseEntity<Map<String, Object>> refresh(@RequestBody Map<String, String> request) {
        String refreshToken = request.get("refreshToken");
        if (!jwtUtil.isTokenExpired(refreshToken)) {
            String username = jwtUtil.getUsernameFromToken(refreshToken);
            String accessToken = jwtUtil.generateToken(username);

            Map<String, Object> responseData = new HashMap<>();
            responseData.put("Authorization", "Bearer " + accessToken);

            return ResponseEntity.ok(responseData);
        } else {
            Map<String, Object> responseData = new HashMap<>();
            responseData.put("error", "Refresh token expired");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(responseData);
        }
    }
    @GetMapping("/user/{id}")
    public ResponseEntity<MemberDto> getMemberById(@PathVariable Long id, @RequestHeader("Authorization") String authorizationHeader) {
        String token = extractJwtTokenFromAuthorizationHeader(authorizationHeader);
        if (token == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } else {
            // If the token starts with "Bearer ", remove it before validation
            if (token.startsWith("Bearer ")) {
                token = token.substring(7);
            }
            if (isTokenValid(token)) {
                MemberDto memberDto = memberService.getMemberById(id);
                if (memberDto == null) {
                    throw new NotFoundException("Member not found with id: " + id);
                }
                return ResponseEntity.ok(memberDto);
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }
        }
    }

    private String extractJwtTokenFromAuthorizationHeader(String authorizationHeader) {
        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            return authorizationHeader.substring(7);
        }
        return null;
    }



    @ExceptionHandler(NotFoundException.class)
    public ResponseEntity<String> handleNotFoundException(NotFoundException ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
    }

    @GetMapping("/users")
    public ResponseEntity<List<MemberDto>> getAllMembers(HttpServletRequest request) {
        String token = extractJwtTokenFromCookie(request);
        if (token == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        } else {
            if (isTokenValid(token)) {
                List<MemberDto> members = memberService.getAllMembers();
                return ResponseEntity.ok(members);
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }
        }
    }

    @PatchMapping("/user/{id}")
    public ResponseEntity<Map<String, String>> updateUser(@PathVariable Long id, @RequestBody Map<String, Object> updateFields, HttpServletRequest request, HttpServletResponse response) {
        MemberDto memberDto = memberService.getMemberById(id);

        if (memberDto == null) {
            throw new NotFoundException("Member not found with id: " + id);
        }


        // 유저 정보 업데이트
        if (updateFields.containsKey("password")) {
            String password = (String) updateFields.get("password");
            String encryptedPassword = passwordEncoder.encode(password);
            memberDto.setPassword(encryptedPassword);
        }
        if (updateFields.containsKey("username")) {
            String username = (String) updateFields.get("username");
            memberDto.setUsername(username);
            memberService.updateMember(memberDto);
            String newAccessToken = jwtUtil.generateToken(username);
            String authorizationHeader = "Bearer " + newAccessToken;
            response.setHeader("Authorization", authorizationHeader);
            Cookie cookie = new Cookie("jwt_token", newAccessToken);
            cookie.setPath("/");
            cookie.setSecure(true);
            cookie.setHttpOnly(true);
            cookie.setMaxAge(86400);
            response.addCookie(cookie);

            Map<String, String> responseData = new HashMap<>();
            responseData.put("message", "'" + memberDto.getUsername() + "'님의 정보를 수정했습니다.");
            responseData.put("Authorization", authorizationHeader);

            return ResponseEntity.ok(responseData);
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
    private String extractJwtTokenFromCookie(HttpServletRequest request) {
        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if (cookie.getName().equals("jwt_token")) {
                    return cookie.getValue();
                }
            }
        }
        return null;
    }
    private String extractUsername(String token) {
        String secretkey="q2KLu/ULqHXrNXm2gjwA/vfp+H7KWfe7p2sxCKd0eFhmEXmgPeWyqHcVylLg4N2cH0GNxjtuDfap3PZNJbg1+g==";
        Claims claims = Jwts.parserBuilder().setSigningKey(Keys.hmacShaKeyFor(secretkey.getBytes())).build()
                .parseClaimsJws(token).getBody();
        return claims.getSubject();
    }
    private boolean isTokenValid(String token) {
        String secretkey="q2KLu/ULqHXrNXm2gjwA/vfp+H7KWfe7p2sxCKd0eFhmEXmgPeWyqHcVylLg4N2cH0GNxjtuDfap3PZNJbg1+g==";
        try {
            Claims claims = Jwts.parserBuilder().setSigningKey(jwtUtil.getSecretKey()).build()
                    .parseClaimsJws(token).getBody();
            // 토큰의 유효성 검사 로직을 구현
            // 필요한 경우 추가적인 검증을 수행하고 결과를 반환
            return true; // 유효한 토큰인 경우 true 반환
        } catch (Exception e) {
            // 토큰이 유효하지 않은 경우 또는 예외가 발생한 경우 false 반환
            return false;
        }
    }
}
