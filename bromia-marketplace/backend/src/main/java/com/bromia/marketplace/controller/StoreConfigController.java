package com.bromia.marketplace.controller;

import com.bromia.marketplace.domain.entity.StoreConfig;
import com.bromia.marketplace.dto.request.StoreConfigRequestDTO;
import com.bromia.marketplace.service.StoreConfigService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/config")
@RequiredArgsConstructor
@Tag(name = "Configuración Tienda", description = "Configuración de WhatsApp y textos de portada")
public class StoreConfigController {

    private final StoreConfigService storeConfigService;

    @GetMapping
    @Operation(summary = "Obtener configuración pública de la tienda y WhatsApp")
    public ResponseEntity<StoreConfig> getStoreConfig() {
        return ResponseEntity.ok(storeConfigService.getStoreConfig());
    }

    @PutMapping
    @Operation(summary = "Actualizar número de WhatsApp y textos de tienda")
    public ResponseEntity<StoreConfig> updateStoreConfig(@Valid @RequestBody StoreConfigRequestDTO request) {
        return ResponseEntity.ok(storeConfigService.updateStoreConfig(request));
    }
}
