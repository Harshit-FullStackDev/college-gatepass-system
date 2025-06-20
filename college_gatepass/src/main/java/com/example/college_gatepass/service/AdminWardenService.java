package com.example.college_gatepass.service;

import java.time.LocalDate;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.example.college_gatepass.entity.GatePass;
import com.example.college_gatepass.entity.User;
import com.example.college_gatepass.repository.GatePassRepository;
import com.example.college_gatepass.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service @RequiredArgsConstructor
public class AdminWardenService {
    private final GatePassRepository passRepo;
    private final UserRepository userRepo;

    public Page<GatePass> getPassesByStatus(String status, Pageable pageable) {
        return passRepo.findByStatus(status, pageable);
    }

    public String approvePass(Long passId, String wardenEmail) {
        GatePass pass = passRepo.findById(passId).orElseThrow();
        User warden = userRepo.findByEmail(wardenEmail).orElseThrow();

        pass.setStatus("APPROVED");
        pass.setIssuedDate(LocalDate.now());
        pass.setWarden(warden);
        passRepo.save(pass);
        return "GatePass Approved";
    }

    public String rejectPass(Long passId, String wardenEmail) {
        GatePass pass = passRepo.findById(passId).orElseThrow();
        pass.setStatus("REJECTED");
        passRepo.save(pass);
        return "GatePass Rejected";
    }
}
