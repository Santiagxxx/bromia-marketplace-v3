package com.bromia.marketplace.controller;

import com.bromia.marketplace.dto.request.ProductRequestDTO;
import com.bromia.marketplace.dto.response.ProductResponseDTO;
import com.bromia.marketplace.service.ProductService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/products")
@RequiredArgsConstructor
@Tag(name = "Productos", description = "Gestión del catálogo de repostería Bromia")
public class ProductController {

    private final ProductService productService;

    @GetMapping
    @Operation(summary = "Listar productos con filtro opcional por categoría o búsqueda")
    public ResponseEntity<List<ProductResponseDTO>> listProducts(
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String search,
            @RequestParam(defaultValue = "false") boolean includeInactive) {
        return ResponseEntity.ok(productService.getAllProducts(category, search, includeInactive));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Obtener detalle de un producto por ID")
    public ResponseEntity<ProductResponseDTO> getProduct(@PathVariable Long id) {
        return ResponseEntity.ok(productService.getProductById(id));
    }

    @PostMapping
    @Operation(summary = "Crear un nuevo producto desde el Dashboard Admin")
    public ResponseEntity<ProductResponseDTO> createProduct(@Valid @RequestBody ProductRequestDTO request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(productService.createProduct(request));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Actualizar un producto existente")
    public ResponseEntity<ProductResponseDTO> updateProduct(
            @PathVariable Long id,
            @Valid @RequestBody ProductRequestDTO request) {
        return ResponseEntity.ok(productService.updateProduct(id, request));
    }

    @PatchMapping("/{id}/toggle")
    @Operation(summary = "Activar o pausar visibilidad de un producto")
    public ResponseEntity<ProductResponseDTO> toggleProductStatus(@PathVariable Long id) {
        return ResponseEntity.ok(productService.toggleProductStatus(id));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Eliminar un producto del catálogo")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        productService.deleteProduct(id);
        return ResponseEntity.noContent().build();
    }
}
