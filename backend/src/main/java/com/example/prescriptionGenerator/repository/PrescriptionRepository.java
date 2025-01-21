package com.example.prescriptionGenerator.repository;


import com.example.prescriptionGenerator.model.Prescription;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

// PrescriptionRepository.java
import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDate;
import java.util.List;

public interface PrescriptionRepository extends JpaRepository<Prescription, Long> {

    List<Prescription> findAllByPrescriptionDateBetween(LocalDate startDate, LocalDate endDate);
    @Query("SELECT p.prescriptionDate, COUNT(p) FROM Prescription p WHERE p.prescriptionDate BETWEEN :startDate AND :endDate GROUP BY p.prescriptionDate ORDER BY p.prescriptionDate")
    List<Object[]> countPrescriptionsPerDay(@Param("startDate") LocalDate startDate, @Param("endDate") LocalDate endDate);

}

