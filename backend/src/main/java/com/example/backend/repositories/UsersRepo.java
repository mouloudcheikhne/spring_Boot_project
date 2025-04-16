package com.example.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.backend.jwtModule.models.AppUser;

public interface UsersRepo extends JpaRepository<AppUser, Long> {
    
}
