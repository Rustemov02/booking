package com.Booking.bookingBackend.Models.DTOs;

import lombok.Data;

@Data
public class AuthRequest {
    private String username;
    private String password;
}
