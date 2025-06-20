package com.example.college_gatepass.controller;

import com.example.college_gatepass.dto.ApiResponse;
import com.example.college_gatepass.entity.GatePass;
import com.example.college_gatepass.service.AdminWardenService;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.security.Principal;

@RestController
@RequestMapping("/api/warden/gatepass")
@RequiredArgsConstructor
@PreAuthorize("hasAuthority('WARDEN')")
public class WardenGatePassController {
    private final AdminWardenService wardenService;

    @GetMapping("/pending")
    public Page<GatePass> getPendingPasses(
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "10") int size) {
    Pageable pageable = PageRequest.of(page, size);
    return wardenService.getPassesByStatus("PENDING", pageable);
}


    @PostMapping("/{id}/approve")
    public ResponseEntity<?> approvePass(@PathVariable Long id, Principal principal) {
        String result = wardenService.approvePass(id, principal.getName());
        return ResponseEntity.ok(ApiResponse.success(result));
    }

    @PostMapping("/{id}/reject")
    public ResponseEntity<?> rejectPass(@PathVariable Long id, Principal principal) {
        String result = wardenService.rejectPass(id, principal.getName());
        return ResponseEntity.ok(ApiResponse.success(result));
    }
    @GetMapping("/approved")
    public Page<GatePass> getApprovedPasses(@RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "10") int size) {
    Pageable pageable = PageRequest.of(page, size);
    return wardenService.getPassesByStatus("APPROVED", pageable);
}

}
