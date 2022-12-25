package com.example.backend.service;

import java.util.*;

import com.example.backend.entity.*;
import com.example.backend.repository.*;
import lombok.*;
import org.springframework.stereotype.*;
import org.springframework.transaction.annotation.*;

@Service
@RequiredArgsConstructor
public class DoctorService {

    private final DoctorRepository doctorRepository;

    private final ProfessionRepository professionRepository;

    @Transactional
    public void addDoctor(Doctor doctor, Long professionId) {
        var profession = professionRepository.findById(professionId).orElseThrow();
        doctor.setProfession(profession);
        doctorRepository.save(doctor);
    }

    @Transactional
    public List<Doctor> getAllDoctors() {
        return doctorRepository.findAll();
    }

    @Transactional
    public List<Doctor> getAllDoctorsByProfessionId(Long professionId) {
        return doctorRepository.findByProfession_Id(professionId);
    }

}
