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
    
    //private ReservationComparator reservationComparator = new ReservationComparator();

    // private  PriorityQueue<Reservations> reservationQueue = new PriorityQueue<>((res1, res2) -> reservationComparator.compare(res1, res2));
    // public void startReservationQueue(List<Reservations> reservationsList){
    //     reservationsList.stream().map(reservation -> this.reservationQueue.add(reservation));
    // }

    public Reservations reserveReservation(Reservations reservation){
        return reservationRepository.save(reservation);
    }

    public Optional<Reservations> getReservationById(Integer id){
        return reservationRepository.findById(id);
    }

    public void removeReservation(Reservations reservation){
        reservationRepository.delete(reservation);
    }

    public List<Reservations> getAllReservations(){
        return reservationRepository.findAll();
    }

    public Long getNumberOfReservations(){
        return reservationRepository.count();
    }

    public void deleteReservation(Reservations reservation){
        reservationRepository.delete(reservation);
    }

    // public void clearReservations(){
    //     reservationRepository.clear();
    // }

    public List<Reservations> addAllReservations(List<Reservations> reservations){
        return reservationRepository.saveAll(reservations);
    }

    // public List<Reservations> saveReservationReservations(){
    //     return reservationRepository.saveAll(reservationQueue.stream().collect(Collectors.toList()));
    // }

    public Optional<List<Reservations>> checkReservationAvailability(LocalDate checkIn, LocalDate checkOut, Integer adults, Integer children){
        List<Reservations> availableReservations = this.getAllReservations()
                                                .stream()
                                                .filter(reservs -> !(reservs.getCheckInDate().isAfter(checkOut) 
                                                && reservs.getCheckOutDate().isBefore(checkIn))
                                                && reservs.getRoom().getAdultRoomCapacity() == adults
                                                && reservs.getRoom().getChildrenRoomCapacity() == children)
                                                .collect(Collectors.toList());
        availableReservations.forEach(available -> available.getRoom().setAvailability(true));
        return Optional.of(availableReservations);
            
    }
}
