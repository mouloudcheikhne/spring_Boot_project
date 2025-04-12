package com.example.backend.jwtModule.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.jwtModule.Dto.LoginRequest;
import com.example.backend.jwtModule.Dto.ResponceLogin;
import com.example.backend.jwtModule.Dto.SignupRequest;
import com.example.backend.jwtModule.models.AppUser;
import com.example.backend.jwtModule.models.CustomUserDetails;
import com.example.backend.jwtModule.repositories.UserRepository;
import com.example.backend.jwtModule.services.MyUserDetailsService;
import com.example.backend.jwtModule.utils.JwtUtil;
@RestController
@RequestMapping("/auth")
public class AuthController { 

    @Autowired private AuthenticationManager authManager;
    @Autowired private MyUserDetailsService userDetailsService;
    @Autowired private UserRepository userRepository;
    @Autowired private PasswordEncoder passwordEncoder;
    @Autowired private JwtUtil jwtUtil;
   
 
    @PostMapping("/signup")
    public String signup(@RequestBody SignupRequest request) {
        
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new RuntimeException("Username already exists");
        }

        AppUser user = AppUser.builder()
                .nom(request.getNom())
                .prenom(request.getPrenom())
                .password(passwordEncoder.encode(request.getPassword()))
                .email(request.getEmail())
                .role("USER")
                .build();

        userRepository.save(user);

        return jwtUtil.generateToken(user.getEmail(),user.getRole());
    }

    @PostMapping("/login")
    public ResponceLogin login(@RequestBody LoginRequest request) {
        authManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );

        CustomUserDetails userDetails = userDetailsService.loadUserByUsername(request.getEmail());
        String role = userRepository.findRoleByUsername(request.getEmail());
        

        
        String token = jwtUtil.generateToken(userDetails.getEmail(), role);

        
        return new ResponceLogin(userDetails.getUsername(),userDetails.getNom(),userDetails.getPrenom(), role, token);
        
    }
}
