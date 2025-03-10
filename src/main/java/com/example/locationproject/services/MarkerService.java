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
import org.springframework.web.multipart.MultipartFile;

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
        List<String> geoJsonFiles = List.of("data/babacan.geojson",
                "data/comerdliplaces.geojson", "data/agvanlixarabaliq.geojson",
                "data/agyoxush.geojson", "data/keypeshin.geojson", "data/comerdlienson.geojson", "data/qoshabulaq.geojson", "data/gerd.geojson",
                "data/giqi.geojson", "data/Gomaran.geojson", "data/Lehvaz.geojson", "data/Macxarabalığı.geojson", "data/Meğri.geojson",
                "data/Müsəlləm.geojson", "data/Nərimanlı.geojson", "data/Pəmbək.geojson", "data/Pəyhan.geojson","data/atqiz.geojson",
                "data/Pürülü.geojson", "data/Cıbıllı.geojson", "data/Qaraçimən.geojson", "data/caxirli.geojson",
                "data/cobanli.geojson", "data/Qaradığa.geojson", "data/QARAQOYUNLU.geojson", "data/Sədənağac.geojson",
                "data/canehmed.geojson", "data/Şəhərcik.geojson", "data/aldere.geojson", "data/ashagigiretag.geojson",
                "data/Subatan.geojson", "data/Yuxarı Girətağ.geojson", "data/Yuxarı Gödəkli.geojson", "data/Yuxarı Zağalı.geojson"

        );


        saveGeoJsonMarkers(geoJsonFiles);
        log.info("Markers saved successfully." + geoJsonFiles);
    }

    public void processGeoJsonFile(MultipartFile file) throws IOException {
        ObjectMapper objectMapper = new ObjectMapper();

        try (InputStream inputStream = file.getInputStream()) {
            JsonNode root = objectMapper.readTree(inputStream);

            for (JsonNode feature : root.get("features")) {
                JsonNode geometry = feature.get("geometry");
                JsonNode properties = feature.get("properties");

                double longitude = geometry.get("coordinates").get(0).asDouble();
                double latitude = geometry.get("coordinates").get(1).asDouble();
                String name = properties.has("name") ? properties.get("name").asText() : "Unknown";
                String type = geometry.has("type") ? geometry.get("type").asText() : "CUSTOM";

                MarkerType markerType = switch (type.toLowerCase()) {
                    case "region" -> MarkerType.REGION;
                    case "building" -> MarkerType.BUILDING;
                    default -> MarkerType.CUSTOM;
                };

                Marker marker = new Marker();
                marker.setTitle(name);
                marker.setLatitude(latitude);
                marker.setLongitude(longitude);
                marker.setCreatedDate(LocalDateTime.now());
                marker.setUpdatedDate(LocalDateTime.now());
                marker.setMarkerType(markerType);

                if (!properties.has("description") || properties.get("description").asText().isEmpty()) {
                    marker.setDescription(switch (markerType) {
                        case REGION -> "Rayon";
                        case BUILDING -> "Kənd";
                        default -> name;
                    });
                } else {
                    marker.setDescription(properties.get("description").asText());
                }

                markerRepository.save(marker);
                log.info("Marker saved: " + marker.getTitle());
            }
        } catch (IOException e) {
            log.error("Error processing GeoJSON file: " + file.getOriginalFilename(), e);
            throw e;
        }
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

