package com.example.locationproject.services;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.Map;

@Service
public class CaptchaService {
    @Value("${google.recaptcha.secret}")
    private String recaptchaSecret;

    private final RestTemplate restTemplate;

    public CaptchaService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }
    public boolean verifyCaptcha(String response) {
        String url = UriComponentsBuilder.fromUriString("https://www.google.com/recaptcha/api/siteverify")
                .queryParam("secret", recaptchaSecret)
                .queryParam("response", response)
                .toUriString();

        Map<String, Object> verificationResult = restTemplate.postForObject(url, null, Map.class);
        return (boolean) verificationResult.get("success");
    }

}
