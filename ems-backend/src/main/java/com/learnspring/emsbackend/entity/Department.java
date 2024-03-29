package com.learnspring.emsbackend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="departments")
public class Department {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name="department_name", nullable = false, unique = true)
    private String departmentName;
    @Column(name="department_code", nullable = false, unique = true)
    private String departmentCode;
    @Column(name="department_description")
    private String departmentDescription;
}
