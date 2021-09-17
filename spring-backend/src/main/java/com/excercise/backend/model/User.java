package com.excercise.backend.model;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@JsonSerialize
public class User {
    private String name;
    private String points;
}
