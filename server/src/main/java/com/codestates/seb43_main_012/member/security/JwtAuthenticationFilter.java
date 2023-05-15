package com.codestates.seb43_main_012.member.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import io.jsonwebtoken.ExpiredJwtException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;
import javax.servlet.http.Cookie;

public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    private final CustomUserDetailsService customUserDetailsService;
    private final JwtUtil jwtUtil;

    public JwtAuthenticationFilter(CustomUserDetailsService customUserDetailsService, JwtUtil jwtUtil, AuthenticationManager authenticationManager) {
        this.customUserDetailsService = customUserDetailsService;
        this.jwtUtil = jwtUtil;
        setAuthenticationManager(authenticationManager);

    }
    @Override
    public Authentication attemptAuthentication(HttpServletRequest request,HttpServletResponse response) throws AuthenticationException {
        String username = obtainUsername(request);
        String password = obtainPassword(request);
        System.out.println("Attempting authentication for username: " + username);
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(username, password);
        return getAuthenticationManager().authenticate(authenticationToken);
    }

        private void setJwtTokenToCookie(HttpServletResponse response, String token) {
            Cookie cookie = new Cookie("JWT-TOKEN", token);
            cookie.setHttpOnly(true);
            cookie.setMaxAge(7 * 24 * 60 * 60); // expires in 7 days
            cookie.setPath("/"); // allow the cookie to be accessed throughout the entire website
            cookie.setDomain("null");
            response.addCookie(cookie);
        }
    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authResult) throws IOException, ServletException {
        UserDetails userDetails = (UserDetails) authResult.getPrincipal();
        String token = jwtUtil.generateToken(userDetails.getUsername());
        setJwtTokenToCookie(response, token);

        CustomUserDetails customUserDetails = (CustomUserDetails) authResult.getPrincipal();

        // Create a map to store the response data
        Map<String, Object> responseData = new HashMap<>();
        responseData.put("message", "로그인에 성공했습니다.\n메인페이지로 이동됩니다.");
        responseData.put("memberId", customUserDetails.getId());
        responseData.put("createdAt", customUserDetails.getCreatedAt());
        responseData.put("userName", customUserDetails.getUsername());
        responseData.put("email", customUserDetails.getEmail());

        // Create a new ObjectMapper
        ObjectMapper mapper = new ObjectMapper();

        // Convert the response data to JSON
        String jsonResponse = mapper.writeValueAsString(responseData);

        // Set the response content type and character encoding
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        // Write the JSON response
        response.getWriter().write(jsonResponse);

        System.out.println("Successful authentication for username: " + customUserDetails.getUsername());

        // Call the next filter in the chain
        chain.doFilter(request, response);
    }
}


