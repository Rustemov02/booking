package com.Booking.bookingBackend.Services;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.Booking.bookingBackend.Models.Reservations;
import com.Booking.bookingBackend.Repositories.ReservationRepository;


@Service
public class ReservationService{
    @Autowired
    private ReservationRepository reservationRepository;
    
    public Reservations reserveReservation(Reservations reservation) {
        return reservationRepository.save(reservation);
    }

    public Optional<Reservations> getReservationById(Integer id) {
        return reservationRepository.findById(id);
    }

    public List<Reservations> getAllReservations() {
        return reservationRepository.findAll();
    }

    public void deleteReservation(Reservations reservation) {
        reservationRepository.delete(reservation);
    }

    public Optional<List<Reservations>> checkReservationAvailability(LocalDate checkIn, LocalDate checkOut, Integer adults, Integer children) {
        List<Reservations> availableReservations = this.getAllReservations()
            .stream()
            .filter(reserv -> !(reserv.getCheckInDate().isBefore(checkOut) && reserv.getCheckOutDate().isAfter(checkIn))
                    && reserv.getRoom().getAdultRoomCapacity().equals(adults)
                    && reserv.getRoom().getChildrenRoomCapacity().equals(children))
            .collect(Collectors.toList());

        availableReservations.forEach(res -> res.getRoom().setAvailability(true));
        return Optional.of(availableReservations);
    }
}
