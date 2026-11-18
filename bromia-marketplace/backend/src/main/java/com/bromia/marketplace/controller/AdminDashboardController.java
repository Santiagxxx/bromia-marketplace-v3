package com.bromia.marketplace.controller;

import com.bromia.marketplace.dto.response.DashboardStatsDTO;
import com.bromia.marketplace.service.ProductService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/admin")
@RequiredArgsConstructor
@Tag(name = "Dashboard Admin", description = "Métricas y control rápido sin login")
public class AdminDashboardController {

    private final ProductService productService;

    @GetMapping("/stats")
    @Operation(summary = "Obtener resumen estadístico del catálogo")
    public ResponseEntity<DashboardStatsDTO> getDashboardStats() {
        return ResponseEntity.ok(productService.getDashboardStats());
    }
}
