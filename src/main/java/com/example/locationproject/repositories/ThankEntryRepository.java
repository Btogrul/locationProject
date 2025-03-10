package com.example.locationproject.repositories;

import com.example.locationproject.entities.ThankEntry;
import com.example.locationproject.entities.ThankSection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ThankEntryRepository  extends JpaRepository<ThankEntry, Long> {
    Optional<ThankEntry> findBySectionAndContributor(ThankSection section, String contributor);
}
