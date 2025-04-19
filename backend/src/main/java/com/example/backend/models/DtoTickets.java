package com.example.backend.models;

import lombok.Data;

@Data
public class DtoTickets {

    private String description;
    private String title;
    private Long user_agent;
}
