package com.example.locationproject.entities;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
public class TranslateDescription {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String languageCode;
    private String description;

    @ManyToOne
    @JoinColumn(name = "marker_id", nullable = true)
    private Marker marker;
}
