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
@RequestMapping("/doctor")
@CrossOrigin("http://localhost:3000")
public class DoctorController {

    private final DoctorService doctorService;

    private final DtoToEntityMapper dtoToEntityMapper;

    private final EntityToDtoMapper entityToDtoMapper;

    @PostMapping
    public ResponseEntity<?> addDoctor(@RequestBody Doctor doctor) {
        try {
            doctorService.addDoctor(dtoToEntityMapper.mapDtoDoctorToEntity(doctor), doctor.getProfessionId());
        } catch (Exception e) {
            log.error("Error occurred", e);
            return new ResponseEntity<>(HttpStatus.SERVICE_UNAVAILABLE);
        }
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<Doctor>> getAllDoctors(
        @RequestParam(value = "professionId", required = false) Long professionId
    ) {
        try {
            if (professionId != null) {
                return ResponseEntity.ok(entityToDtoMapper.mapEntityDoctorListToDto(
                    doctorService.getAllDoctorsByProfessionId(professionId)));
            }
            return ResponseEntity.ok(entityToDtoMapper.mapEntityDoctorListToDto(
                doctorService.getAllDoctors()));
        } catch (Exception e) {
            log.error("Error occurred", e);
            return new ResponseEntity<>(HttpStatus.SERVICE_UNAVAILABLE);
        }
    }

}
