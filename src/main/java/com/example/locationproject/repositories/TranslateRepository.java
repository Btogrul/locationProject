package com.example.locationproject.repositories;

import com.example.locationproject.entities.TranslateDescription;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TranslateRepository extends JpaRepository<TranslateDescription, Long> {
}
