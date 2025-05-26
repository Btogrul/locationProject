package com.example.locationproject.dtos;

import com.example.locationproject.enums.MarkerType;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class ResponseDto {
    private Long id;
    private String title;
    private String description;
    private MarkerType markerType;
    private double latitude;
    private double longitude;

    private List<ResponseTranslate> translations;

}