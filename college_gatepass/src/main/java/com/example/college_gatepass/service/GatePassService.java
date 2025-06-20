package com.example.college_gatepass.service;

import java.security.Principal;
import java.time.LocalDate;
import java.util.List;

import org.springframework.stereotype.Service;

import com.example.college_gatepass.dto.GatePassRequest;
import com.example.college_gatepass.entity.GatePass;
import com.example.college_gatepass.entity.User;
import com.example.college_gatepass.repository.GatePassRepository;
import com.example.college_gatepass.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service @RequiredArgsConstructor
public class GatePassService {
    private final GatePassRepository passRepo;
    private final UserRepository userRepo;

    public String requestPass(GatePassRequest req, Principal principal) {
        User student = userRepo.findByEmail(principal.getName()).orElseThrow();
        GatePass pass = GatePass.builder()
                .student(student)
                .reason(req.getReason())
                .requestDate(LocalDate.now())
                .status("PENDING")
                .build();
        passRepo.save(pass);
        return "GatePass Requested";
    }

    public List<GatePass> myPasses(Principal principal) {
        User student = userRepo.findByEmail(principal.getName()).orElseThrow();
        return passRepo.findByStudentId(student.getId());
    }
    public List<GatePass> myPassHistory(Principal principal) {
    User student = userRepo.findByEmail(principal.getName()).orElseThrow();
    return passRepo.findByStudentId(student.getId());
}
}
