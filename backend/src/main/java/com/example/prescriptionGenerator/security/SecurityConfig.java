package com.example.prescriptionGenerator.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

//    @Bean
//    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
//        http.csrf().disable()
//                .authorizeHttpRequests()
//                .requestMatchers("/api/users/register", "/api/users/login", "/api/v1/prescriptions","/h2-console/**").permitAll()
//                .anyRequest().authenticated()
//                .and()
//                .formLogin().loginPage("/login").defaultSuccessUrl("/prescriptions", true)
//                .and()
//                .logout().logoutUrl("/logout").logoutSuccessUrl("/login")
//                .and()
//                .headers().frameOptions().disable();
//
//        return http.build();
//    }
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.csrf().disable()
                .authorizeRequests()
                .requestMatchers("/api/users/register", "/api/users/login","/swagger-ui/**",  // Allow Swagger UI resources
                        "/v3/api-docs/**", // Allow OpenAPI JSON endpoint
                        "/swagger-ui.html", "/api/v1/prescriptions/**", "/h2-console/**")
                .permitAll()
                .anyRequest().authenticated()
                .and()
                .formLogin().loginPage("/login").defaultSuccessUrl("/prescriptions", true)
                .and()
                .logout().logoutUrl("/logout").logoutSuccessUrl("/login")
                .and()
                .headers().frameOptions().disable();

        return http.build();
    }
}




