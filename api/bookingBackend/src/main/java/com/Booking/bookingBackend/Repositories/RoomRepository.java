package com.Booking.bookingBackend.Repositories;
import com.Booking.bookingBackend.Models.Room;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;


public interface RoomRepository extends JpaRepository<Room, Integer> {
    Optional<List<Room>> findRoomByBedType(String bedType); 
}
