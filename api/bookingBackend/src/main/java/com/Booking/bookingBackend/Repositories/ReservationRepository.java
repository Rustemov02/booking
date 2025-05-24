package com.Booking.bookingBackend.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.Booking.bookingBackend.Models.Reservations;

public interface ReservationRepository extends JpaRepository<Reservations, Integer>{

}
