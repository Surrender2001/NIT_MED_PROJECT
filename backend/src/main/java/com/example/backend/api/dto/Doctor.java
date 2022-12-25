package com.example.backend.api.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Doctor {

    private Long id;

    private String firstName;

    private String middleName;

    private String lastName;

    private Long professionId;

    private Profession profession;

}
