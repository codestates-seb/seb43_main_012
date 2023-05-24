package com.codestates.seb43_main_012.member.security;

import javax.servlet.*;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class SimpleCORSFilter implements Filter {
    public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain) throws IOException, ServletException{
        HttpServletResponse response = (HttpServletResponse) res;
        response.setHeader("Access-Control-Allow-Origin", "http://localhost:3000, http://chatcrawlbucket.s3-website.ap-northeast-2.amazonaws.com");
        response.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE, PUT, PATCH");
        response.setHeader("Access-Control-Max-Age", "3600");
        response.setHeader("Access-Control-Allow-Headers", "ngrok-skip-browser-warning, Authorization, Cookie, Access-Control-Allow-Origin, Access-Control-Allow-Methods," +
                "Access-Control-Max-Age,Access-Control-Allow-Credentials,Content-type");
        response.setHeader("Access-Control-Allow-Credentials", "true");
        chain.doFilter(req, res);
    }

    public void init(FilterConfig filterConfig) {}

    public void destroy() {}
}
