package com.example.locationproject.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;


@Entity
@Getter
@Setter
@Table(name = "thank_entries")
public class ThankEntry {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String contributor;

    @ManyToOne
    @JoinColumn(name = "section_id")
    private ThankSection section;
}
