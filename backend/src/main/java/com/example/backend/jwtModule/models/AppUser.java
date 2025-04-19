package com.example.backend.jwtModule.models;

import java.util.List;

import com.example.backend.models.Ticket_comments;
import com.example.backend.models.Tickets;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
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
@Table(name = "app_users")
public class AppUser {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nom;
    private String prenom;
    private String password;
    private String email;
    private String role;
    @OneToMany(mappedBy = "user_id", cascade = CascadeType.REMOVE)
    @JsonIgnore
    private List<Tickets> createdTickets;
    @JsonIgnore
    @OneToMany(mappedBy = "user_AGENT", cascade = CascadeType.REMOVE)
    private List<Tickets> assignedTickets;
    @OneToMany(mappedBy = "user_id", cascade = CascadeType.REMOVE)
    @JsonIgnore
    private List<Ticket_comments> comments;
}
