package com.example.prescriptionGenerator.controller;

import com.example.prescriptionGenerator.model.Prescription;
import com.example.prescriptionGenerator.repository.PrescriptionRepository;
import jakarta.validation.Valid;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/prescriptions")
public class PrescriptionController {

    private final PrescriptionRepository prescriptionRepository;

    public PrescriptionController(PrescriptionRepository prescriptionRepository) {
        this.prescriptionRepository = prescriptionRepository;
    }
    @GetMapping("/{id}")
    public ResponseEntity<Prescription> getPrescriptionById(@PathVariable Long id) {
        Prescription prescription = prescriptionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Prescription not found"));
        return ResponseEntity.ok(prescription);
    }
    @GetMapping
    public List<Prescription> getPrescriptions(
            @RequestParam(value = "startDate", required = false)
            @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate startDate,

            @RequestParam(value = "endDate", required = false)
            @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate endDate) {

        if (startDate == null || endDate == null) {
            startDate = LocalDate.now().withDayOfMonth(1); // First day of the current month
            endDate = LocalDate.now(); // Today
        }

        return prescriptionRepository.findAllByPrescriptionDateBetween(startDate, endDate);
    }


    @PostMapping
    public ResponseEntity<Map<String, String>> createPrescription(@Valid @RequestBody Prescription prescription) {
        Map<String, String> response = new HashMap<>();
        try {
            prescriptionRepository.save(prescription);
            response.put("status", "success");
            response.put("message", "Prescription created successfully");
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (Exception e) {
            response.put("status", "error");
            response.put("message", "An error occurred while creating the prescription: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    // Update an existing prescription
    @PutMapping("/{id}")
    public ResponseEntity<String> updatePrescription(
            @PathVariable Long id, @Valid @RequestBody Prescription updatedPrescription) {

        Prescription prescription = prescriptionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Prescription not found"));
        updatedPrescription.setId(id);
        prescriptionRepository.save(updatedPrescription);
        return ResponseEntity.ok("Prescription updated successfully");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deletePrescription(@PathVariable Long id) {
        // Check if prescription exists
        if (!prescriptionRepository.existsById(id)) {
            return ResponseEntity.status(404).body("Prescription not found");
        }

        // Proceed with deletion
        prescriptionRepository.deleteById(id);
        return ResponseEntity.ok("Prescription deleted successfully");
    }

    // Day-wise prescription count report
    @GetMapping("/day-wise-report")
    public List<Map<String, Object>> getDayWiseReport(
            @RequestParam(value = "startDate", required = false) LocalDate startDate,
            @RequestParam(value = "endDate", required = false) LocalDate endDate) {

        if (startDate == null || endDate == null) {
            startDate = LocalDate.now().withDayOfMonth(1); // First day of the current month
            endDate = LocalDate.now(); // Today
        }

        // Query prescription count per day
        List<Object[]> result = prescriptionRepository.countPrescriptionsPerDay(startDate, endDate);

        // Convert the result into the desired format
        List<Map<String, Object>> report = new ArrayList<>();
        for (Object[] row : result) {
            Map<String, Object> dayReport = new HashMap<>();
            dayReport.put("day", row[0]); // Date
            dayReport.put("count", row[1]); // Prescription count
            report.add(dayReport);
        }

        return report;
    }

}

