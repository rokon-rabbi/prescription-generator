package com.example.prescriptionGenerator.controller;


import com.example.prescriptionGenerator.model.User;
import com.example.prescriptionGenerator.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<Map<String, String>> registerUser(@Valid @RequestBody User user) {
        Map<String, String> response = new HashMap<>();
        try {
            userService.registerUser(user);
            response.put("status", "success");
            response.put("message", "User registered successfully");
            return ResponseEntity.ok(response);
        } catch (org.springframework.dao.DataIntegrityViolationException ex) {
            response.put("status", "error");
            response.put("message", "Email already exists. Please use a different email.");
            return ResponseEntity.status(HttpStatus.CONFLICT).body(response); // HTTP 409 Conflict
        } catch (Exception e) {
            response.put("status", "error");
            response.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }


    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> loginUser(@RequestBody User user) {
        try {
            userService.authenticateUser(user.getEmail(), user.getPassword());
            Map<String, String> response = new HashMap<>();
            response.put("status", "success");
            response.put("message", "Login successful");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("status", "error");
            errorResponse.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorResponse);
        }
    }

}
