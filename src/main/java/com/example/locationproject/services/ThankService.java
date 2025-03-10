package com.example.locationproject.services;

import com.example.locationproject.dtos.ContributorResponseDTO;
import com.example.locationproject.dtos.ThankSectionDTO;
import com.example.locationproject.entities.ThankEntry;
import com.example.locationproject.entities.ThankSection;
import com.example.locationproject.exception.ResourceNotFoundException;
import com.example.locationproject.repositories.ThankEntryRepository;
import com.example.locationproject.repositories.ThankSectionRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import jakarta.transaction.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ThankService {

    private final ThankSectionRepository sectionRepository;
    private final ThankEntryRepository entryRepository;
    private final ModelMapper mapper;


    public List<ThankSectionDTO> getAllSectionsWithContributors() {
        List<ThankSection> sections = sectionRepository.findAll();
        return sections.stream().map(this::mapToDTO).toList();
    }

    public ThankSection createSection(String title) {
        ThankSection section = new ThankSection();
        section.setTitle(title);
        return sectionRepository.save(section);
    }

    public ThankEntry addContributor(Long sectionId, String contributor) {
        ThankSection section = sectionRepository.findById(sectionId)
                .orElseThrow(() -> new RuntimeException("Section not found"));

        ThankEntry entry = new ThankEntry();
        entry.setContributor(contributor);
        entry.setSection(section);

        return entryRepository.save(entry);
    }

    public void deleteEntry(Long sectionId, String contributor) {
        ThankSection section = sectionRepository.findById(sectionId)
                .orElseThrow(() -> new RuntimeException("Section not found"));

        ThankEntry entry = entryRepository.findBySectionAndContributor(section, contributor)
                .orElseThrow(() -> new RuntimeException("Entry not found"));

        entryRepository.delete(entry);
    }

    public void deleteSection(Long sectionId) {
        sectionRepository.deleteById(sectionId);
    }

    private ThankSectionDTO mapToDTO(ThankSection section) {
        ThankSectionDTO dto = new ThankSectionDTO();
        dto.setId(section.getId());
        dto.setTitle(section.getTitle());
        dto.setContributors(section.getEntries().stream()
                .map(ThankEntry::getContributor)
                .toList());
        return dto;
    }

    public List<ContributorResponseDTO> getAllContributors() {
        List<ThankEntry> entries = entryRepository.findAll();
        return listMapping(entries, ContributorResponseDTO.class);
    }

    public ContributorResponseDTO deleteContributor(Long id) {
        ThankEntry entry = entryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("İştirakçı tapılmadı: " + id));

        entryRepository.delete(entry);

        ContributorResponseDTO dto = mapper.map(entry, ContributorResponseDTO.class);
        dto.setSectionTitle(entry.getSection().getTitle());  // Map section title manually if needed
        return dto;
    }

    @Transactional
    public void deleteAllContributors() {
        entryRepository.deleteAll();
    }

    // Generic list mapping method (like your existing code)
    private <T> List<T> listMapping(List<?> source, Class<T> targetClass) {
        return source.stream()
                .map(item -> mapper.map(item, targetClass))
                .toList();
    }

}

