package com.example.locationproject.controllers;

import com.example.locationproject.dtos.RequestDto;
import com.example.locationproject.dtos.ResponseDto;
import com.example.locationproject.services.LocationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("api/v1/markers")
@Slf4j
public class LocationController {
    private final LocationService locationService;

    @PostMapping("/new")
    public ResponseDto createLocation(@RequestBody RequestDto requestDto) {
        log.info("controller received");
        return locationService.createMarker(requestDto);
    }


    @GetMapping("/{id}")
    public ResponseDto getLocation(@PathVariable Long id) {
        return locationService.getMarker(id);
    }

    @GetMapping("/all")
    public List<ResponseDto> getAllLocations() {
        return locationService.getAllMarkers();
    }

    @PutMapping("/{id}")
    public ResponseDto updateLocation(@PathVariable Long id, @RequestBody RequestDto requestDto) {
        return locationService.updateMarker(id, requestDto);
    }

    @DeleteMapping("/{id}")
    public ResponseDto deleteLocation(@PathVariable Long id) {
        return locationService.deleteMarker(id);
    }
}
