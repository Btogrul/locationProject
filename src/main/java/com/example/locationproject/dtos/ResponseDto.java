package com.example.locationproject.dtos;

import com.example.locationproject.enums.MarkerType;
import lombok.Data;

import java.util.UUID;

@Data
public class ResponseDto {
    private Long id;
    private String title;
    private String description;
    private MarkerType markerType;
    private double latitude;
    private double longitude;
}