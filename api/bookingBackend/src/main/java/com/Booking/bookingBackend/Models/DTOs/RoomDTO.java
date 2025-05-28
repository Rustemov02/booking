package com.Booking.bookingBackend.Models.DTOs;

import java.net.URI;
import java.util.List;

public class RoomDTO {
    private Integer id;
    private String name;
    private String description;
    private Integer capacity;
    private Integer pricePerNight;
    private Integer totalPrice;
    private Boolean available;
    private List<URI> images;
    private List<String> amenities;
    private String cancellationPolicy;
    private Integer roomSize;
    private String bedType;
}
