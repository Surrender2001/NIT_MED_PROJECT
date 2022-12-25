package com.example.backend.service;

import java.util.*;

import com.example.backend.entity.*;
import com.example.backend.repository.*;
import lombok.*;
import org.springframework.stereotype.*;
import org.springframework.transaction.annotation.*;

@Service
@RequiredArgsConstructor
public class ProfessionService {

    private final ProfessionRepository professionRepository;


    @Transactional
    public List<Profession> getAllProfessions() {
        return professionRepository.findAll();
    }


}
