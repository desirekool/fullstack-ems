package com.learnspring.emsbackend.mapper;

import com.learnspring.emsbackend.dto.EmployeeDto;
import com.learnspring.emsbackend.entity.Employee;

public class EmployeeMapper {
    public static EmployeeDto toDto(Employee employee) {
        return new EmployeeDto(
            employee.getId(),
            employee.getFirstName(),
            employee.getLastName(),
            employee.getEmail(),
            employee.getDepartment().getId()
        );
    }

    public static Employee toEntity(EmployeeDto employeeDto) {
        Employee employee = new Employee();
            employee.setId(employeeDto.getId());
            employee.setFirstName(employeeDto.getFirstName());
            employee.setLastName(employeeDto.getLastName());
            employee.setEmail(employeeDto.getEmail());
        return employee;

    }
}
