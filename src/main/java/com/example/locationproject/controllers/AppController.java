package com.example.locationproject.controllers;

import org.springframework.core.env.Environment;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class AppController {
    private Environment environment;

    @GetMapping("")
    public String viewHomePage(){

        return "index";
    }


    @GetMapping("/login")
    public String viewLoginPage(){
        return "login";
    }

    @GetMapping("/dashboard")
    public String viewDashboard(){
        return "dashboard";
    }

    @GetMapping("/api/maps-key")
    public ResponseEntity<String> getMapsApiKey() {
        String apiKey = environment.getProperty("mapApiKey");
        return ResponseEntity.ok(apiKey);
    }


}
