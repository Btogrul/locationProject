package com.example.locationproject.services;

import com.example.locationproject.entities.Marker;
import com.example.locationproject.enums.MarkerType;
import com.example.locationproject.repositories.MarkerRepository;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.time.LocalDateTime;
import java.util.List;

@Service
@Slf4j
public class MarkerService {
    @Autowired
    private MarkerRepository markerRepository;
    @Autowired
    private ResourceLoader resourceLoader;

    @EventListener(ApplicationReadyEvent.class)
    public void saveGeoJsonMarkersOnStartup() throws IOException {
        if (!markerRepository.findAll().isEmpty()) {
            System.out.println("Markers already exist in the database. Skipping import.");
            return;
        }
        List<String> geoJsonFiles = List.of("data/qushculudavud.geojson", "data/babacan.geojson",
                "data/xalac.geojson", "data/davudbey.geojson", "data/qovshud.geojson", "data/shabadin.geojson", "data/maralzemi.geojson", "data/heceti.geojson",
                "data/dovrus.geojson", "data/dere.geojson","data/earthLocFiles.geojson", "data/shaki.geojson", "data/urud.geojson", "data/whitebulaq.geojson",
                "data/shahverdiler.geojson", "data/shurnuxu.geojson", "data/aliqulukend.geojson", "data/mezre.geojson", "data/qizilciq.geojson",
                "data/qafan.geojson", "data/shixlar.geojson", "data/sofulu.geojson", "data/vagudi.geojson", "data/murxuz.geojson", "data/desteyird.geojson",
                "data/agdu.geojson", "data/agduhouses.geojson", "data/derekend.geojson",
                "data/shamsiz.geojson","data/gorus.geojson","data/tezekend.geojson", "data/elili.geojson",
                "data/pirnaut.geojson", "data/sisyan.geojson", "data/engelevit.geojson","data/belek.geojson", "data/shukarxarabaliqi.geojson",
                "data/pullkendxarabaliqi.geojson", "data/eriklixarabaliqi.geojson", "data/zabazadirxarabaliqi.geojson",
                "data/hortoyuzxarabaliqi.geojson", "data/comerdlievler.geojson", "data/oxtar.geojson", "data/qurdqalaq.geojson",
                "data/aqvanlıxarabalıgı.geojson", "data/macxarabalıgı.geojson", "data/agduplaces.geojson","data/comerdliplaces.geojson" );
        saveGeoJsonMarkers(geoJsonFiles);
        log.info("Markers saved successfully." + geoJsonFiles);
    }



    public void saveGeoJsonMarkers(List<String> geoJsonFilePaths) throws IOException {
        ObjectMapper objectMapper = new ObjectMapper();


        for (String filePath : geoJsonFilePaths) {
            Resource resource = resourceLoader.getResource("classpath:" + filePath);
            try (InputStream inputStream = resource.getInputStream()) {
                JsonNode root = objectMapper.readTree(inputStream);

                for (JsonNode feature : root.get("features")) {
                    JsonNode geometry = feature.get("geometry");
                    JsonNode properties = feature.get("properties");

                    double longitude = geometry.get("coordinates").get(0).asDouble();
                    double latitude = geometry.get("coordinates").get(1).asDouble();
                    String name = properties.has("name") ? properties.get("name").asText() : "Bilinmir";
                    String type = geometry.has("type") ? geometry.get("type").asText() : "Custom Type";

                    MarkerType markerType;
                    if ("region".equalsIgnoreCase(type)) {
                        markerType = MarkerType.REGION;
                    } else if ("building".equalsIgnoreCase(type)) {
                        markerType = MarkerType.BUILDING;
                    } else {
                        markerType = MarkerType.CUSTOM;
                    }



                    Marker marker = new Marker();
                    marker.setTitle(name);
                    marker.setLatitude(latitude);
                    marker.setLongitude(longitude);
                    marker.setCreatedDate(LocalDateTime.now());
                    marker.setUpdatedDate(LocalDateTime.now());
                    marker.setMarkerType(markerType);
                    if (!properties.has("description") || properties.get("description").asText().isEmpty()) {
                        if (markerType == MarkerType.REGION) {
                                marker.setDescription("Rayon");
                        } else if (markerType == MarkerType.BUILDING) {
                            marker.setDescription("Kənd");
                        } else {
                            marker.setDescription(name);
                        }
                    } else {

                        marker.setDescription(properties.get("description").asText());
                    }

                    markerRepository.save(marker);
                    log.info("Markers saved successfully." + marker.getTitle());
                }
            }catch (IOException error){
                System.out.println("Error while saving geojson file" + filePath + error);
            }
        }
    }
}

