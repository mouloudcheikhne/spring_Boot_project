package com.example.backend.jwtModule.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.backend.jwtModule.models.AppUser;

public interface UserRepository extends JpaRepository<AppUser, Long> {

    Optional<AppUser> findByEmail(String email);

    @Query("SELECT u.role FROM AppUser u WHERE u.email = :email")
    String findRoleByUsername(@Param("email") String username);
}
