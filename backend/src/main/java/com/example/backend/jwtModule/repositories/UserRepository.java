package com.example.backend.jwtModule.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.backend.jwtModule.models.AppUser;
import com.example.backend.jwtModule.models.CustomUserDetails;

public interface UserRepository extends JpaRepository<AppUser, Long> {

    Optional<AppUser> findByEmail(String email);

    @Query("SELECT u.role FROM AppUser u WHERE u.email = :email")
    String findRoleByUsername(@Param("email") String username);

    @Query("SELECT u FROM AppUser u WHERE u.role = 'AGENT'")
    List<AppUser> toutAgent();

}
