package com.example.backend.api.dto;

import java.time.*;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Visit {

    private Long id;

    private LocalDate dateOfReceipt;

    private int startHour;

    private Long patientId;

    private Long doctorId;

    private Doctor doctor;

    private Boolean isVisited;

}
