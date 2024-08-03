package com.example.locationproject.config;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;
import org.springframework.context.annotation.Configuration;

@Configuration
@OpenAPIDefinition(
        info = @Info(
                contact = @Contact(name = "Product Management"),
                description = "dashboard",
                title = "Location Project",
                version = "1.0",
                termsOfService = "Terms of service"
        )
)
public class SwaggerConfig {

}