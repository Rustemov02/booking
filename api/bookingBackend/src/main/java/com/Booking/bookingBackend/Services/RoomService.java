package com.Booking.bookingBackend.Services;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.stereotype.Service;

import com.Booking.bookingBackend.Models.Room;
import com.Booking.bookingBackend.Repositories.RoomRepository;
import com.Booking.bookingBackend.Models.Reservations;

@Service
public class RoomService {
    @Autowired
    private RoomRepository roomRepository;
    
    public Optional<Room> createRoom(Room room) throws Exception{
       try{ 
        if(roomRepository.findOne(Example.of(room)).isPresent()){
            throw new Exception("Room already exists");
        }
        else{
            return Optional.of(roomRepository.save(room)); 
        }
       }catch(Exception e){
        e.getMessage();
        return null;
       }
    }

    public Optional<Room> findRoomById(Integer id){
        return roomRepository.findById(id);
    }

    public Optional<List<Room>> findAll(){
        return Optional.of(roomRepository.findAll());
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
