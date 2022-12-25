package com.example.backend.entity;

import jakarta.persistence.*;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Doctor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false)
    private Long id;

    private String lastName;

    private String firstName;

    private String middleName;

    @OneToOne
    @JoinColumn(nullable = false, name = "profession_id")
    private Profession profession;

}
