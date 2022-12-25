package com.example.backend.service;

import java.util.*;

import com.example.backend.entity.*;
import com.example.backend.repository.*;
import lombok.*;
import org.springframework.stereotype.*;
import org.springframework.transaction.annotation.*;

@Service
@RequiredArgsConstructor
public class VisitService {

    private final VisitRepository visitRepository;

    private final PatientRepository patientRepository;

    private final DoctorRepository doctorRepository;

    @Transactional
    public List<Visit> getAllVisitsByPatientId(Long patientId) {
        return visitRepository.findByPatient_IdOrderByIdDesc(patientId);
    }

    @Transactional
    public List<Visit> getAllVisitsByDoctorId(Long doctorId) {
        return visitRepository.findByDoctor_Id(doctorId);
    }

    @Transactional
    public void addVisit(Visit visit, Long patientId, Long doctorId) {
        var patient = patientRepository.findById(patientId).orElseThrow();
        visit.setPatient(patient);
        var doctor = doctorRepository.findById(doctorId).orElseThrow();
        visit.setDoctor(doctor);
        visitRepository.save(visit);
    }

    @Transactional
    public void setVisited(Long id) {
        visitRepository.updateIsVisitedById(id);
    }

}
