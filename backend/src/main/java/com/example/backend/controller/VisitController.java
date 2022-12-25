package com.example.backend.controller;

import java.time.*;
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
@RequestMapping("/visit")
@CrossOrigin("http://localhost:3000")
public class VisitController {

    private final VisitService visitService;

    private final DtoToEntityMapper dtoToEntityMapper;

    private final EntityToDtoMapper entityToDtoMapper;

    @PostMapping
    public ResponseEntity<?> addVisit(@RequestBody Visit visit) {
        try {
            visitService.addVisit(dtoToEntityMapper.mapDtoVisitToEntity(
                visit), visit.getPatientId(), visit.getDoctorId());
        } catch (Exception e) {
            log.error("Error occurred", e);
            return new ResponseEntity<>(HttpStatus.SERVICE_UNAVAILABLE);
        }
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<Visit>> getAllVisits(
        @RequestParam(value = "patientId", required = false) Long patientId,
        @RequestParam(value = "doctorId", required = false) Long doctorId,
        LocalDate dateOfReceipt
    ) {
        try {
            if (patientId != null) {
                return ResponseEntity.ok(entityToDtoMapper.mapEntityVisitListToDto(
                    visitService.getAllVisitsByPatientId(patientId)));
            }
            return ResponseEntity.ok(entityToDtoMapper.mapEntityVisitListToDto(
                visitService.getAllVisitsByDoctorId(doctorId)));
        } catch (Exception e) {
            log.error("Error occurred", e);
            return new ResponseEntity<>(HttpStatus.SERVICE_UNAVAILABLE);
        }
    }

    @PatchMapping("/{id}")
    public ResponseEntity<?> patchIsVisited(@PathVariable Long id) {
        try {
            visitService.setVisited(id);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            log.error("Error occurred", e);
            return new ResponseEntity<>(HttpStatus.SERVICE_UNAVAILABLE);
        }
    }

}
