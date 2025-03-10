package com.example.locationproject.controllers;

import com.example.locationproject.dtos.ContributorResponseDTO;
import com.example.locationproject.dtos.ThankEntryDTO;
import com.example.locationproject.dtos.ThankSectionDTO;
import com.example.locationproject.services.ThankService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/thanks")
@RequiredArgsConstructor
public class ThankController {

    private final ThankService thankService;

    @GetMapping("/sections")
    public List<ThankSectionDTO> getAllSections() {
        return thankService.getAllSectionsWithContributors();
    }

    @PostMapping("/section")
    public ResponseEntity<String> createSection(@RequestParam String title) {
        thankService.createSection(title);
        return ResponseEntity.ok("Section created successfully");
    }

    @PostMapping("/contributor")
    public ResponseEntity<String> addContributor(@RequestBody ThankEntryDTO entryDTO) {
        if (entryDTO.getSectionId() == null) {
            return ResponseEntity.badRequest().body("Section ID is required.");
        }

        thankService.addContributor(entryDTO.getSectionId(), entryDTO.getContributor());
        return ResponseEntity.ok("Contributor added successfully");
    }

    @DeleteMapping("/section/{sectionId}")
    public ResponseEntity<String> deleteSection(@PathVariable Long sectionId) {
        thankService.deleteSection(sectionId);
        return ResponseEntity.ok("Section deleted successfully");
    }

    @DeleteMapping("/contributor")
    public ResponseEntity<String> deleteContributor(@RequestParam Long sectionId,
                                                    @RequestParam String contributor) {
        thankService.deleteEntry(sectionId, contributor);
        return ResponseEntity.ok("Contributor deleted successfully");
    }

    @GetMapping("/contributors")
    public List<ContributorResponseDTO> getAllContributors() {
        return thankService.getAllContributors();
    }

    @DeleteMapping("/contributor/{id}")
    public ResponseEntity<ContributorResponseDTO> deleteContributor(@PathVariable Long id) {
        ContributorResponseDTO deleted = thankService.deleteContributor(id);
        return ResponseEntity.ok(deleted);
    }

    @DeleteMapping("/contributors")
    public ResponseEntity<String> deleteAllContributors() {
        thankService.deleteAllContributors();
        return ResponseEntity.ok("Bütün iştirakçılar silindi");
    }
}
