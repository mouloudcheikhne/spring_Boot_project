package com.example.backend.models;

import lombok.Data;

@Data
public class Predict {

    private Long agent;
    private String date;

    public Predict(long agent, String date) {
        this.agent = agent;
        this.date = date;
    }

}
