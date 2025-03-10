package com.example.locationproject.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.OneToMany;
import lombok.Getter;
import lombok.Setter;
import jakarta.persistence.*;


import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@Table(name = "thank_sections")
public class ThankSection {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    @OneToMany(mappedBy = "section", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ThankEntry> entries = new ArrayList<>();
}
