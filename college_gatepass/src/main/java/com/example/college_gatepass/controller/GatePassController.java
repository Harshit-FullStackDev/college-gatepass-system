package com.example.college_gatepass.controller;

import java.security.Principal;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.college_gatepass.dto.GatePassRequest;
import com.example.college_gatepass.service.GatePassService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/student/gatepass")
@RequiredArgsConstructor
public class GatePassController {
    private final GatePassService passService;

    @PostMapping("/request")
    public ResponseEntity<?> requestPass(@RequestBody GatePassRequest req, Principal principal) {
        return ResponseEntity.ok(passService.requestPass(req, principal));
    }

    @GetMapping("/my")
    public ResponseEntity<?> myPasses(Principal principal) {
        return ResponseEntity.ok(passService.myPasses(principal));
    }
    @GetMapping("/history")
    public ResponseEntity<?> myPassHistory(Principal principal) {
        return ResponseEntity.ok(passService.myPassHistory(principal));
    }
}
