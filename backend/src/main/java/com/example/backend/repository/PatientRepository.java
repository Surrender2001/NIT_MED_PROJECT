package com.example.backend.repository;

import com.example.backend.entity.*;
import org.springframework.data.jpa.repository.*;

public interface PatientRepository extends JpaRepository<Patient, Long> {

}