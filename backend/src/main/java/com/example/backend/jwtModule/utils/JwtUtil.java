package com.example.backend.jwtModule.utils;

import java.util.Date;
import java.util.Map;

import javax.crypto.SecretKey;

import org.springframework.stereotype.Component;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Deserializer;
import io.jsonwebtoken.io.Serializer;
import io.jsonwebtoken.jackson.io.JacksonDeserializer;
import io.jsonwebtoken.jackson.io.JacksonSerializer;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtUtil {

    private final SecretKey key = Keys.hmacShaKeyFor("supersecretkey12345678901234567890".getBytes()); // at least 256-bit
    private final Serializer<Map<String, ?>> serializer = new JacksonSerializer<>();
    private final Deserializer<Map<String, ?>> deserializer = new JacksonDeserializer<>();

    public String generateToken(String email,String role) {
        return Jwts.builder()
                .subject(email)
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + 86400000)) // 1 day
                .claim("role", role)
                .json(serializer)
                .signWith(key, Jwts.SIG.HS256)
                .compact();
    }

    public String extractEmail(String token) {
        return Jwts.parser()
                .verifyWith(key)
                .json(deserializer)
                .build()
                .parseSignedClaims(token)
                .getPayload()
                .getSubject();  
    }
    public String extractRole(String token) {
        return Jwts.parser()
                .verifyWith(key)
                .json(deserializer)
                .build()
                .parseSignedClaims(token)
                .getPayload()
                .get("role", String.class);  // ✅ تستخرج role من claims
    }
    public boolean validateToken(String token) {
        try {
            Jwts.parser()
                .verifyWith(key)
                .json(deserializer)
                .build()
                .parseSignedClaims(token);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}
