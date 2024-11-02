package com.example.locationproject.entities.geojson;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

import java.util.Properties;
@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class Feature {
    private String type;
    private Properties properties;
    private Geometry geometry;
}
