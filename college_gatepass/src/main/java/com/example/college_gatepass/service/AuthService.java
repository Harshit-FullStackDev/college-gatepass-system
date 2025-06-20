package com.example.college_gatepass.service;

import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.college_gatepass.dto.AuthRequest;
import com.example.college_gatepass.entity.User;
import com.example.college_gatepass.repository.UserRepository;
import com.example.college_gatepass.util.JwtUtil;

import lombok.RequiredArgsConstructor;

@Service @RequiredArgsConstructor
public class AuthService {
    private final UserRepository userRepo;
    private final PasswordEncoder encoder;
    private final JwtUtil jwtUtil;

    public String register(User user) {
        user.setPassword(encoder.encode(user.getPassword()));
        userRepo.save(user);
        return "User Registered Successfully";
    }

    public String login(AuthRequest request) {
        User user = userRepo.findByEmail(request.getEmail())
                .orElseThrow(() -> new UsernameNotFoundException("Invalid Email"));

        if (!encoder.matches(request.getPassword(), user.getPassword()))
            throw new BadCredentialsException("Invalid Password");

        return jwtUtil.generateToken(user.getEmail(), user.getRole().name());
    }
}
