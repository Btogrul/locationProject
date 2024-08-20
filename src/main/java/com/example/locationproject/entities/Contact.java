package com.example.locationproject.entities;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name="contacts")
@Data
public class Contact {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String surname;
    @Column(nullable = false)
    private String email;
    private String contactNumber;
    private String description;
}
