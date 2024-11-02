package com.example.locationproject.utils;

import com.example.locationproject.entities.geojson.Feature;
import com.example.locationproject.entities.geojson.GeoJsonData;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.File;
import java.io.IOException;

public class GeoJsonParser {
    public GeoJsonData parseGeoJson(String filePath) {
        ObjectMapper mapper = new ObjectMapper();
        try {
            return mapper.readValue(new File(filePath), GeoJsonData.class);
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }

    public static void main(String[] args) {
        GeoJsonParser parser = new GeoJsonParser();
        GeoJsonData geoJsonData = parser.parseGeoJson("src/main/resources/data/earthLocFiles.geojson");

        if (geoJsonData != null) {
            for (Feature feature : geoJsonData.getFeatures()) {
                System.out.println("Name: " + feature.getProperties().get("name"));
                System.out.println("Coordinates: " + feature.getGeometry().getCoordinates());
            }
        }
    }
}
