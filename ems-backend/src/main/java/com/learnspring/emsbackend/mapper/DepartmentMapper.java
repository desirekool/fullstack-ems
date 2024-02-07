package com.learnspring.emsbackend.mapper;

import com.learnspring.emsbackend.dto.DepartmentDto;
import com.learnspring.emsbackend.entity.Department;

public class DepartmentMapper {
    public static DepartmentDto toDto(Department department) {
        return new DepartmentDto(
            department.getId(),
            department.getDepartmentName(),
            department.getDepartmentCode(),
            department.getDepartmentDescription()
        );
    }

    public static Department toEntity(DepartmentDto departmentDto) {
        return new Department(
            departmentDto.getId(),
            departmentDto.getDepartmentName(),
            departmentDto.getDepartmentCode(),
            departmentDto.getDepartmentDescription()
        );
    }
}
