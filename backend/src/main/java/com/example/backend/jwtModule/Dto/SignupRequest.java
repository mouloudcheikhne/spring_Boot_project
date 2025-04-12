package com.example.backend.jwtModule.Dto;

import lombok.Data;

@Data
public class SignupRequest {
    private String nom;
    private String prenom;
    private String password;
    private String email;
    

}