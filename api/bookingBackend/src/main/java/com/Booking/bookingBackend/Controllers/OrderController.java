package com.Booking.bookingBackend.Controllers;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.Booking.bookingBackend.Models.Reservations;
import com.Booking.bookingBackend.Models.Room;
import com.Booking.bookingBackend.Models.DTOs.RoomDTO;
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
            List<Reservations> availableReservations = reservationService.getAllReservations()
                                                .stream()
                                                .filter(reservs -> !(reservs.getCheckInDate().isAfter(checkOutDate) 
                                                && reservs.getCheckOutDate().isBefore(checkInDate))
                                                && reservs.getRoom().getAdultRoomCapacity() == adults
                                                && reservs.getRoom().getChildrenRoomCapacity() == children)
                                                .collect(Collectors.toList());
            availableReservations.forEach(available -> available.getRoom().setAvailability(true));
            List<RoomDTO> roomDTOList = new ArrayList<>();
            for(Reservations available: availableReservations){
                RoomDTO roomDto = new RoomDTO();
                BeanUtils.copyProperties(available.getRoom(), roomDto);
                BeanUtils.copyProperties(available, roomDto);
                roomDTOList.add(roomDto);
            }
            return ResponseEntity.of(Optional.of(roomDTOList));

            
        }catch(Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }

        
    }
}
