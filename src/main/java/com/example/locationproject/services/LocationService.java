package com.example.locationproject.services;

import com.example.locationproject.dtos.RequestDto;
import com.example.locationproject.dtos.ResponseDto;
import com.example.locationproject.entities.Marker;
import com.example.locationproject.enums.MarkerType;
import com.example.locationproject.exception.ResourceNotFoundException;
import com.example.locationproject.repositories.MarkerRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@RequiredArgsConstructor
@Service
@Slf4j
public class LocationService {

    private final MarkerRepository markerRepo;
    private final ModelMapper mapper;

    public ResponseDto createMarker(RequestDto requestDto) {
        log.info("Request: {}", requestDto);
        MarkerType markerType = MarkerType.fromString(String.valueOf(requestDto.getMarkerType()));

        Marker marker = new Marker();
        marker.setTitle(requestDto.getTitle());
        marker.setDescription(requestDto.getDescription());
        marker.setMarkerType(markerType);
        marker.setLatitude(requestDto.getLatitude());
        marker.setLongitude(requestDto.getLongitude());

        marker = markerRepo.save(marker);
        return mapper.map(marker, ResponseDto.class);
    }

    public ResponseDto getMarker(Long id) {
        Marker marker = markerRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Location not found with id: " + id));
        return mapper.map(marker, ResponseDto.class);
    }

    public List<ResponseDto> getAllMarkers() {
        List<Marker> markers = markerRepo.findAll();
        return listMapping(markers, ResponseDto.class);
    }

    public ResponseDto updateMarker(Long id, RequestDto requestDto) {
        Marker existingMarker = markerRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Location not found with id: " + id));
        mapper.map(requestDto, existingMarker);
        markerRepo.save(existingMarker);
        return mapper.map(existingMarker, ResponseDto.class);
    }

    public ResponseDto deleteMarker(Long id) {
        Marker marker = markerRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Location not found with id: " + id));
        markerRepo.delete(marker);
        return mapper.map(marker, ResponseDto.class);
    }


    public <D, S> List<D> listMapping(List<S> source, Class<D> destination) {
        return source.stream().map(s -> mapper.map(s, destination)).toList();
    }
}
