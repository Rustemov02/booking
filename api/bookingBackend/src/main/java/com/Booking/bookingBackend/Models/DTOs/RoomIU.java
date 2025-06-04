package com.Booking.bookingBackend.Models.DTOs;

import java.net.URI;
import java.util.List;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RoomIU {
    @NotNull(message = "Room name cannot be empty")
    private String name;
    private String description;
    private Integer adultRoomCapacity;
    private Integer childrenRoomCapacity;
    private Integer pricePerNight;
    private List<URI> images;
    private List<String> amenities;
    private String cancellationPolicy;
    private Integer roomSize;
    private String bedType;
}
