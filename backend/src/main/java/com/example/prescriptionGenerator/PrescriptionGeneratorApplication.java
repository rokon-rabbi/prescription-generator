package com.example.prescriptionGenerator;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
public class PrescriptionGeneratorApplication {

    public static void main(String[] args) {
        SpringApplication.run(PrescriptionGeneratorApplication.class, args);
    }

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                        .allowedHeaders("*")
                        .allowedMethods("GET", "POST", "DELETE", "PUT")
                        .allowedOrigins("http://localhost:5173")  // Remove trailing slash
                        .allowCredentials(true);
            }
        };
    }

}
