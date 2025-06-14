package com.Booking.bookingBackend.ErrorHandlers;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ApiError<T> {
    private String id;

    private Date errorTime;

    private T errors;
}
