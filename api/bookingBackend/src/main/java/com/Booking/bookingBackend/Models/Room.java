package com.Booking.bookingBackend.Models;

import java.net.URI;
import java.util.ArrayList;
import java.util.List;




import jakarta.persistence.CascadeType;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
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

    @OneToMany(mappedBy = "room", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Reservations> reservations = new ArrayList<>();

    private String name;
    private String description;

    private Integer adultRoomCapacity;
    private Integer childrenRoomCapacity;

    public Integer getCapacity() {
        return (adultRoomCapacity != null ? adultRoomCapacity : 0) + 
               (childrenRoomCapacity != null ? childrenRoomCapacity : 0);
    }

    private Integer pricePerNight;
    private Boolean availability = false;
    
    @ElementCollection
    private List<URI> images;

    @ElementCollection
    private List<String> amenities;

    private String cancellationPolicy;
    private Integer roomSize;
    private String bedType;
}
