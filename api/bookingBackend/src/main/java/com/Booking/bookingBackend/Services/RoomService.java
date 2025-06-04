package com.Booking.bookingBackend.Services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.Booking.bookingBackend.Models.Room;
import com.Booking.bookingBackend.Repositories.RoomRepository;

@Service
public class RoomService {
    @Autowired
    private RoomRepository roomRepository;
    
    public Optional<Room> createRoom(Room room) throws Exception{
            return Optional.of(roomRepository.save(room)); 
    }

    public Optional<Room> findRoomById(Integer id){
        return roomRepository.findById(id);
    }

    public Optional<List<Room>> findAll(){
        return Optional.of(roomRepository.findAll());
    }

    public void deleteRoom(Room room){
        roomRepository.delete(room);
    }

    // public Optional<List<Room>> findRoomsByBedType(String bedType){
    //     return roomRepository.findRoomByBedType(bedType);
    // }

    // public Optional<List<Room>> findRoomsByAvailability(String checkIn, String checkOut, int adults, int children, int rooms){
    //     LocalDate checkInDate = LocalDate.parse(checkIn);
    //     LocalDate checkOutDate = LocalDate.parse(checkOut);
    //     List<Room> allRooms = roomRepository.findAll();
    //     allRooms.stream().filter(
    //         room -> room.getch
    //     )
    // }
    
}
