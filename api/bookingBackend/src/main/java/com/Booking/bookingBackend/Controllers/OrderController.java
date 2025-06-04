package com.Booking.bookingBackend.Controllers;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.Booking.bookingBackend.Models.Reservations;
import com.Booking.bookingBackend.Models.Room;
import com.Booking.bookingBackend.Models.DTOs.RoomDTO;
import com.Booking.bookingBackend.Models.DTOs.RoomIU;
import com.Booking.bookingBackend.Services.ReservationService;
import com.Booking.bookingBackend.Services.RoomService;

@RestController
@RequestMapping(path = "api/rooms")
public class OrderController {
    @Autowired
    private RoomService roomService;

    @Autowired 
    private ReservationService reservationService;

    @GetMapping(path = "/availability")
    public ResponseEntity<?> getAvailableRooms(@RequestParam String checkIn, @RequestParam String checkOut, @RequestParam Integer children, @RequestParam Integer adults, @RequestParam Integer rooms) throws Exception{
        try{
            if (checkIn == null || checkOut == null || adults == null || children == null || rooms == null) {
            throw new Exception("All parameters are required");
        }
            LocalDate checkInDate = LocalDate.parse(checkIn);
            LocalDate checkOutDate = LocalDate.parse(checkOut);
            if (checkInDate.isAfter(checkOutDate)) {
            throw new Exception("Check-out date must be after check-in date");
        }
            Optional<List<Room>> roomListOptional = roomService.findAll();
            if(!roomListOptional.isPresent()){
                throw new Exception("There is no room yet");
            }
            Optional<List<Reservations>> availableReservationsOptional = reservationService.checkReservationAvailability(checkInDate, checkOutDate, adults, children);
            List<Reservations> availableReservations = new ArrayList<>();
            if(availableReservationsOptional.isPresent()){
                availableReservations = availableReservationsOptional.get();
            }
            List<RoomDTO> availableRooms = availableReservations.stream().map(reserv -> {
                RoomDTO roomDto = new RoomDTO();
                Room room = reserv.getRoom();
                BeanUtils.copyProperties(room, roomDto);
                roomDto.setTotalPrice(reserv.getTotalPrice());
                return roomDto;
            }).collect(Collectors.toList());
            return ResponseEntity.ok(availableRooms);


            
        }catch(Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    
    }

    @GetMapping(path = "/all")
    public ResponseEntity<List<RoomDTO>> getAllRooms(){
        return ResponseEntity.ok(roomService.findAll().get().stream()
                                                                .map(room -> {  RoomDTO roomDto = new RoomDTO();
                                                                                BeanUtils.copyProperties(room, roomDto);
                                                                                return roomDto;})
                                                                .collect(Collectors.toList()));
    }

    @PostMapping(path = "/create")
    public ResponseEntity<?> creatRoom(RoomIU roomIu){
        Room room = new Room();
        BeanUtils.copyProperties(roomIu, room);
        try{
            roomService.createRoom(room);
        }catch(Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
        RoomDTO roomDto = new RoomDTO();
        BeanUtils.copyProperties(room, roomDto);
        return ResponseEntity.ok(roomDto);
    }

    @DeleteMapping(path = "/delete?{id}")
    public ResponseEntity<HttpStatus> deleteRoom(@PathVariable Integer id){
        Optional<Room> room = roomService.findRoomById(id);
        if(room.isPresent()){
            roomService.deleteRoom(room.get());
            return ResponseEntity.status(HttpStatus.OK).build();
        }
        else{
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @PostMapping(path = "/order")
    public ResponseEntity<Reservations> createReservation(@RequestParam Reservations reservation){
        return ResponseEntity.ok(reservationService.reserveReservation(reservation));
    } 

    @DeleteMapping(path = "/order/delete")
    public ResponseEntity<HttpStatus> deleteReservation(@RequestParam Reservations reservation){
        reservationService.deleteReservation(reservation);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    
}
