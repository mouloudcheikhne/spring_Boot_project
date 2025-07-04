package com.example.backend.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.backend.models.Tickets;

public interface TicketsRepo extends JpaRepository<Tickets, Long> {
    @Query("SELECT t FROM Tickets t WHERE t.user_id.id = :userId ")
    List<Tickets> findByUserticktes(Long userId);
    @Query("SELECT t FROM Tickets t WHERE t.user_AGENT.id = :userId ")
    List<Tickets> findByAgentticktes(Long userId);
}
