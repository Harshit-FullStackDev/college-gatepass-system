package com.example.college_gatepass.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.example.college_gatepass.entity.GatePass;

public interface GatePassRepository extends JpaRepository<GatePass, Long> {
    List<GatePass> findByStudentId(Long studentId);
    Page<GatePass> findByStatus(String status, Pageable pageable);
}