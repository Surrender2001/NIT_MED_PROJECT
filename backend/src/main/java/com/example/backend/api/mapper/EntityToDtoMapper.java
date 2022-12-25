package com.example.backend.api.mapper;

import java.util.*;

import com.example.backend.api.dto.*;
import org.mapstruct.*;

@MapperConfig(unmappedTargetPolicy = ReportingPolicy.IGNORE, unmappedSourcePolicy = ReportingPolicy.IGNORE)
@Mapper(componentModel = "spring")
public interface EntityToDtoMapper {

    List<Patient> mapEntityPatientListToDto(List<com.example.backend.entity.Patient> patientList);

    List<Doctor> mapEntityDoctorListToDto(List<com.example.backend.entity.Doctor> doctorList);

    List<Visit> mapEntityVisitListToDto(List<com.example.backend.entity.Visit> visitList);
    List<Profession> mapEntityProfessionListToDto(List<com.example.backend.entity.Profession> professionList);

}
