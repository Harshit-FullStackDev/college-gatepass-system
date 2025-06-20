package com.example.college_gatepass.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class GatePassRequest {
    @NotBlank(message = "Reason is required")
    @Size(min = 5, max = 250, message = "Reason must be between 5 and 250 characters")
    private String reason;
}
