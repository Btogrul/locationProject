package com.example.locationproject.entities.geojson;

import lombok.Data;
import java.util.List;

@Data
public class GeoJsonData {
    private String type;
    private List<Feature> features;
}
