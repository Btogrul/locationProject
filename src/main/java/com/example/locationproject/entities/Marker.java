package com.example.locationproject.entities;

import com.example.locationproject.enums.MarkerType;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "markers")
@Entity
public class Marker {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @NotNull
    private String title;
    private String description;
    private MarkerType markerType;
    @Column(nullable = false)
    private double latitude;
    @Column(nullable = false)
    private double longitude;
    private LocalDateTime createdDate;
    private LocalDateTime updatedDate;
}
