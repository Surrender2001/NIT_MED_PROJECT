package com.example.backend.repository;

import java.util.*;

import com.example.backend.entity.*;
import org.springframework.data.jpa.repository.*;

public interface DoctorRepository extends JpaRepository<Doctor, Long> {

    List<Doctor> findAllByProfession(Profession profession);

    List<Doctor> findByProfession_Id(Long id);

}