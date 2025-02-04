package com.example.locationproject.repositories;

import com.example.locationproject.entities.Marker;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MarkerRepository extends JpaRepository<Marker, Long> {
    List<Marker> findByTitleIgnoreCase(String title);


    @Query("SELECT m FROM Marker m WHERE (m.title, m.description, m.markerType, m.latitude, m.longitude) IN " +
            "(SELECT m2.title, m2.description, m2.markerType, m2.latitude, m2.longitude FROM Marker m2 " +
            "GROUP BY m2.title, m2.description, m2.markerType, m2.latitude, m2.longitude HAVING COUNT(m2) > 1)")
    List<Marker> findDuplicateMarkers();

}