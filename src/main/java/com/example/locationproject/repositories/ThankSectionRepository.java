package com.example.locationproject.repositories;

import com.example.locationproject.entities.ThankSection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ThankSectionRepository extends JpaRepository<ThankSection, Long> {
}
