package com.example.backend.api.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Patient {

    private Long id;

    private String firstName;

    private String middleName;

    private String lastName;

}
