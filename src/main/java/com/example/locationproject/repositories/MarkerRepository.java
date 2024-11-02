package com.example.locationproject.repositories;

import com.example.locationproject.entities.Marker;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MarkerRepository extends JpaRepository<Marker, Long> {
    List<Marker> findByTitleIgnoreCase(String title);
}