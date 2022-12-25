package com.example.backend.controller;

import java.util.*;

import com.example.backend.api.dto.*;
import com.example.backend.api.mapper.*;
import com.example.backend.service.*;
import lombok.*;
import lombok.extern.slf4j.*;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/patient")
public class PatientController {

    private final PatientService patientService;

    private final DtoToEntityMapper dtoToEntityMapper;

    private final EntityToDtoMapper entityToDtoMapper;

    @PostMapping
    public ResponseEntity<?> addPatient(@RequestBody Patient patient) {
        try {
            patientService.addPatient(dtoToEntityMapper.mapDtoPatientToEntity(patient));
        } catch (Exception e) {
            log.error("Error occurred", e);
            return new ResponseEntity<>(HttpStatus.SERVICE_UNAVAILABLE);
        }
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<Patient>> getAllPatients() {
        try {
            return ResponseEntity.ok(entityToDtoMapper.mapEntityPatientListToDto(
                patientService.getAllPatients()));
        } catch (Exception e) {
            log.error("Error occurred", e);
            return new ResponseEntity<>(HttpStatus.SERVICE_UNAVAILABLE);
        }
    }

}
