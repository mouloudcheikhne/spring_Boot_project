package com.example.backend.models;
import com.example.backend.jwtModule.models.AppUser;

import lombok.Data;

@Data
public class DtoTicket_comment {
    private Long ticket_id;
     
    private String message;
}
