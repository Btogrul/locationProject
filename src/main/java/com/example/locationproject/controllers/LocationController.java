package com.example.locationproject.controllers;

import com.example.locationproject.dtos.ContactDTO;
import com.example.locationproject.dtos.ContactResponseDTO;
import com.example.locationproject.dtos.RequestDto;
import com.example.locationproject.dtos.ResponseDto;
import com.example.locationproject.entities.Contact;
import com.example.locationproject.enums.MarkerType;
import com.example.locationproject.repositories.MarkerRepository;
import com.example.locationproject.services.LocationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("api/v1/markers")
@Slf4j
public class LocationController {
    private final LocationService locationService;
    private final MarkerRepository markerRepo;
    private final ModelMapper mapper;


//    @PostMapping("/new")
//    public ResponseDto createLocation(@RequestBody RequestDto requestDto) {
//        log.info("controller received");
//        return locationService.createMarker(requestDto);
//    }

    @PostMapping("/new")
    public ResponseDto createLocation(
            @RequestParam("title") String title,
            @RequestParam("description") String description,
            @RequestParam("markerType") MarkerType markerType,
            @RequestParam("latitude") double latitude,
            @RequestParam("longitude") double longitude) {

        RequestDto requestDto = new RequestDto();
        requestDto.setTitle(title);
        requestDto.setDescription(description);
        requestDto.setMarkerType(markerType);
        requestDto.setLatitude(latitude);
        requestDto.setLongitude(longitude);

        return locationService.createMarker(requestDto);
    }



    @GetMapping
    public ResponseDto getLocation(@RequestParam Long id) {
        log.info("Fetching location with id: {}", id);
        return locationService.getMarker(id);
    }

    @GetMapping("/all")
    public List<ResponseDto> getAllLocations() {
        return locationService.getAllMarkers();
    }


    @PutMapping("/update/{id}")
    public ResponseDto updateLocation(
            @PathVariable("id") Long id,
            @RequestParam("title") String title,
            @RequestParam("description") String description,
            @RequestParam("markerType") MarkerType markerType,
            @RequestParam("latitude") double latitude,
            @RequestParam("longitude") double longitude) {

        RequestDto requestDto = new RequestDto();
        requestDto.setTitle(title);
        requestDto.setDescription(description);
        requestDto.setMarkerType(markerType);
        requestDto.setLatitude(latitude);
        requestDto.setLongitude(longitude);

        return locationService.updateMarker(id, requestDto);
    }


    @DeleteMapping("/delete/{id}")
    public ResponseDto deleteLocation(@PathVariable Long id) {
        return locationService.deleteMarker(id);
    }


    @GetMapping("/contact")
    public String showContactForm(Model model) {
        model.addAttribute("contact", new ContactDTO());
        return "contact";
    }

    @PostMapping("/contact/new")
    public ResponseEntity saveNewContact(
            @RequestParam("name") String name,
            @RequestParam("surname") String surname,
            @RequestParam("email") String email,
            @RequestParam("contactNumber") String contactNumber,
            @RequestParam("description") String description) {

        ContactDTO contactDTO = new ContactDTO();
        contactDTO.setName(name);
        contactDTO.setSurname(surname);
        contactDTO.setEmail(email);
        contactDTO.setContactNumber(contactNumber);
        contactDTO.setDescription(description);
        locationService.saveContact(contactDTO);
        return ResponseEntity.ok("Contact saved successfully");
    }

    @GetMapping("/contact/all")
    public List<ContactResponseDTO> getAllContacts() {
        return locationService.getAllContacts();
    }

    @DeleteMapping("/contact/delete/{id}")
    public ContactResponseDTO deleteContact(@PathVariable Long id) {
        return locationService.deleteMessage(id);
    }

    @DeleteMapping("/contact/deleteAll")
    public ResponseEntity<String> deleteAllContacts() {
        locationService.deleteAllContacts();
        return ResponseEntity.ok("Hamısı uğurla silindi");
    }

}
