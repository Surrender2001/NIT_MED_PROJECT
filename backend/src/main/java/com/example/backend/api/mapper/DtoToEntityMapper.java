package com.example.backend.api.mapper;

import com.example.backend.entity.*;
import org.mapstruct.*;

@MapperConfig(unmappedTargetPolicy = ReportingPolicy.IGNORE, unmappedSourcePolicy = ReportingPolicy.IGNORE)
@Mapper(componentModel = "spring")
public interface DtoToEntityMapper {

    Patient mapDtoPatientToEntity(com.example.backend.api.dto.Patient patient);

    Doctor mapDtoDoctorToEntity(com.example.backend.api.dto.Doctor doctor);

    @Mapping(target = "doctor", ignore = true)
    Visit mapDtoVisitToEntity(com.example.backend.api.dto.Visit visit);

}
