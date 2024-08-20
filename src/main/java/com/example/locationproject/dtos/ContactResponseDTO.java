package com.example.locationproject.dtos;

import lombok.Data;

@Data
public class ContactResponseDTO {
    private Long id;
    private String name;
    private String surname;
    private String email;
    private String contactNumber;
    private String description;
}
