package com.example.locationproject.repositories;

import com.example.locationproject.entities.Marker;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MarkerRepository extends JpaRepository<Marker, Long> {

}