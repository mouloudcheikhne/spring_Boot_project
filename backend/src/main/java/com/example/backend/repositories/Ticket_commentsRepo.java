package com.example.backend.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import com.example.backend.models.Ticket_comments;
import com.example.backend.models.Tickets;

public interface Ticket_commentsRepo extends JpaRepository<Ticket_comments, Long> {

    // @Modifying
    // @Transactional
    // @Query("UPDATE Reclamation r SET r.etat = 'termine' WHERE r.id = :id")
    // int changeEtat(@Param("id") Long id);
    // @Query("SELECT r FROM Reclamation r JOIN r.user u WHERE u.id = :id")
    // List<Tickets> rechercheReclamationsUser(@Param("id") Long id);
}
