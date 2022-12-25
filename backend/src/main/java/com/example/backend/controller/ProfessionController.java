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
@RequestMapping("/profession")
@CrossOrigin("http://localhost:3000")
public class ProfessionController {

    private final ProfessionService professionSevice;

    private final EntityToDtoMapper entityToDtoMapper;

    @GetMapping
    public ResponseEntity<List<Profession>> getAllVisits() {
        try {
            return ResponseEntity.ok(entityToDtoMapper.mapEntityProfessionListToDto(
                professionSevice.getAllProfessions()));
        } catch (Exception e) {
            log.error("Error occurred", e);
            return new ResponseEntity<>(HttpStatus.SERVICE_UNAVAILABLE);
        }
    }

}
