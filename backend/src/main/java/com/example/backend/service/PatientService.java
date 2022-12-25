package com.example.backend.service;

import java.util.*;

import com.example.backend.entity.*;
import com.example.backend.repository.*;
import lombok.*;
import org.springframework.stereotype.*;
import org.springframework.transaction.annotation.*;

@Service
@RequiredArgsConstructor
public class PatientService {

    private final PatientRepository patientRepository;

    @Transactional
    public void addPatient(Patient patient) {
        patientRepository.save(patient);
    }

    @Transactional
    public List<Patient> getAllPatients() {
        return patientRepository.findAll();
    }

}
