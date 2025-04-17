package com.example.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import com.example.backend.models.Reclamation;

public interface ReclamationRepo extends JpaRepository<Reclamation,Long> {
    
    @Modifying
    @Transactional
    @Query("UPDATE Reclamation r SET r.etat = 'termine' WHERE r.id = :id")
    int changeEtat(@Param("id") Long id);
    
}
