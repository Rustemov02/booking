package com.Booking.bookingBackend.Models;

import java.net.URI;
import java.util.ArrayList;
import java.util.List;

import org.springframework.data.annotation.Id;

import com.Booking.bookingBackend.Services.ReservationService;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table
public class Room {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Reservations> reservations = new ArrayList<>();
    
    private String name;

    private String description;

    private Integer adultRoomCapacity;

    private Integer childrenRoomCapacity;
   
    private Integer capacity = childrenRoomCapacity + adultRoomCapacity;
    
    //private Integer pricePerNight;
    
    private Boolean availability = false;
    
    private List<URI> url;
    
    private List<String> amenities;
    
    private String cancellationPolicy;
    
    private Integer roomSize;
    
    private String bedType;
}
