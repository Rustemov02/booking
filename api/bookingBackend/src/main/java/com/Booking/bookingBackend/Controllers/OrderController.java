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
import org.springframework.web.bind.annotation.RequestBody;
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

    @GetMapping("/availability")
    public ResponseEntity<?> getAvailableRooms(@RequestParam String checkIn, @RequestParam String checkOut, @RequestParam Integer children, @RequestParam Integer adults, @RequestParam Integer rooms) {
        try {
            LocalDate checkInDate = LocalDate.parse(checkIn);
            LocalDate checkOutDate = LocalDate.parse(checkOut);

            if (checkInDate.isAfter(checkOutDate)) throw new Exception("Check-out date must be after check-in date");

            Optional<List<Room>> roomListOptional = roomService.findAll();
            if (!roomListOptional.isPresent()) throw new Exception("There is no room yet");

            Optional<List<Reservations>> availableReservationsOptional = reservationService.checkReservationAvailability(checkInDate, checkOutDate, adults, children);
            List<Reservations> availableReservations = availableReservationsOptional.orElse(new ArrayList<>());

            List<RoomDTO> availableRooms = availableReservations.stream().map(reserv -> {
                RoomDTO dto = new RoomDTO();
                Room room = reserv.getRoom();
                BeanUtils.copyProperties(room, dto);
                dto.setCapacity(room.getCapacity());
                dto.setTotalPrice(reserv.getTotalPrice());
                return dto;
            }).collect(Collectors.toList());

            return ResponseEntity.ok(availableRooms);

        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/all")
    public ResponseEntity<List<RoomDTO>> getAllRooms() {
        return ResponseEntity.ok(
            roomService.findAll().get().stream().map(room -> {
                RoomDTO dto = new RoomDTO();
                BeanUtils.copyProperties(room, dto);
                dto.setCapacity(room.getCapacity());
                return dto;
            }).collect(Collectors.toList()));
    }

    @PostMapping("/create")
    public ResponseEntity<?> createRoom(@RequestBody RoomIU roomIu) {
        try {
            Room room = new Room();
            BeanUtils.copyProperties(roomIu, room);
            room.setAvailability(true);
            roomService.createRoom(room);
            RoomDTO dto = new RoomDTO();
            BeanUtils.copyProperties(room, dto);
            dto.setCapacity(room.getCapacity());
            return ResponseEntity.ok(dto);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<HttpStatus> deleteRoom(@PathVariable Integer id) {
        Optional<Room> room = roomService.findRoomById(id);
        if (room.isPresent()) {
            roomService.deleteRoom(room.get());
            return ResponseEntity.status(HttpStatus.OK).build();
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @PostMapping("/order")
    public ResponseEntity<?> createReservation(@RequestBody Reservations reservation) {
        try {
            return ResponseEntity.ok(reservationService.reserveReservation(reservation));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/order/delete")
    public ResponseEntity<HttpStatus> deleteReservation(@RequestBody Reservations reservation) {
        reservationService.deleteReservation(reservation);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    
}
