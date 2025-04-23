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
    @Query("SELECT r FROM Ticket_comments r "
            + "WHERE r.user_id.id = :userId "
            + "AND r.ticket_id.id = :ticketId "
            + "AND r.ticket_id.user_AGENT.id = :agentId")
    List<Ticket_comments> findFilteredComments(
            @Param("userId") Long userId,
            @Param("ticketId") Long ticketId,
            @Param("agentId") Long agentId
    );

    @Query("SELECT r FROM Ticket_comments r "
            + "WHERE r.user_id.id = :userId "
            + "AND r.ticket_id.id = :ticketId "
    )
    List<Ticket_comments> findFilteredCommentsuser(
            @Param("userId") Long userId,
            @Param("ticketId") Long ticketId
    );

    // @Query("SELECT r FROM Ticket_comments r WHERE r.user_id.id = :id ")
    // List<Ticket_comments> find(@Param("id") Long id);
}
