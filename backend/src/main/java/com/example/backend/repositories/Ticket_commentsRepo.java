package com.example.backend.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import com.example.backend.models.Ticket_comments;
import com.example.backend.models.Tickets;
import com.example.backend.jwtModule.models.AppUser;

public interface Ticket_commentsRepo extends JpaRepository<Ticket_comments, Long> {

    // List<Ticket_comments> find(AppUser user_id);
    @Query("SELECT r FROM Ticket_comments r WHERE r.user_id.id = :id")
    List<Ticket_comments> findcommintuser(@Param("id") Long id);

}
