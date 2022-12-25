package com.example.backend.repository;

import java.util.*;

import com.example.backend.entity.*;
import org.springframework.data.jpa.repository.*;
import org.springframework.transaction.annotation.*;

public interface VisitRepository extends JpaRepository<Visit, Long> {

    List<Visit> findByPatient_IdOrderByIdDesc(Long id);

    List<Visit> findByDoctor_Id(Long id);

    @Transactional
    @Modifying
    @Query("update Visit v set v.isVisited = true where v.id = ?1")
    void updateIsVisitedById(Long id);

}