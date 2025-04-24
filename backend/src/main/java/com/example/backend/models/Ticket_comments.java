package com.example.backend.models;

import java.time.LocalDateTime;

import com.example.backend.jwtModule.models.AppUser;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "ticket_comments")
public class Ticket_comments {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "ticket_id")
    private Tickets ticket_id;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private AppUser user_id;
    private String message;
    private LocalDateTime createdAt;
    private boolean differenceuser;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();

    }

}
