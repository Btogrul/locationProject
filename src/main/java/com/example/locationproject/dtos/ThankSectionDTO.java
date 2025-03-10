package com.example.locationproject.dtos;

import lombok.Data;

import java.util.List;
@Data
public class ThankSectionDTO {
    private Long id;
    private String title;
    private List<String> contributors;
}

