package com.Booking.bookingBackend.Utilities;

import java.util.Comparator;

import com.Booking.bookingBackend.Models.Reservations;

public class ReservationComparator implements Comparator<Reservations> {
    @Override
    public int compare(Reservations reservation1, Reservations reservation2){
        if(reservation1.getCheckOutDate().isBefore(reservation2.getCheckInDate())){
            return -1;
        }
        else if(reservation1.getCheckOutDate().isAfter(reservation2.getCheckInDate())){
            return 1;
        }
        return 0;
    }
}
