package com.example.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.backend.models.Reclamation;

public interface ReclamationRepo extends JpaRepository<Reclamation,Long> {
    
}
