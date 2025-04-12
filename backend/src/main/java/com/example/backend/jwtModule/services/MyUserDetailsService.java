package com.example.backend.jwtModule.services;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.example.backend.jwtModule.models.AppUser;
import com.example.backend.jwtModule.models.CustomUserDetails;
import com.example.backend.jwtModule.repositories.UserRepository;


@Service
public class MyUserDetailsService implements UserDetailsService {

    @Autowired private UserRepository userRepository;

    @Override
    public CustomUserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        AppUser appUser = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        return new CustomUserDetails(
            appUser.getNom(),
            appUser.getPrenom(),
            appUser.getEmail(),
            appUser.getPassword(),
            appUser.getRole()
    );
    }
}



