package com.Booking.bookingBackend.Repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.Booking.bookingBackend.Models.User;

public interface UserRepository extends JpaRepository<User, Integer>{
    Optional<User> findByEmail(String email);
}
