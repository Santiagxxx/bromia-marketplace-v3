package com.bromia.marketplace.controller;

import com.bromia.marketplace.dto.request.ProductRequestDTO;
import com.bromia.marketplace.dto.response.ProductResponseDTO;
import com.bromia.marketplace.service.ProductService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Map;
import java.util.UUID;

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

    @PostMapping(value = "/upload-image", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @Operation(summary = "Subir foto de producto desde el dispositivo")
    public ResponseEntity<Map<String, String>> uploadProductImage(@RequestParam("file") MultipartFile file) {
        if (file == null || file.isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("error", "No se proporcionó ningún archivo de imagen"));
        }
        try {
            String originalFilename = file.getOriginalFilename() != null ? file.getOriginalFilename() : "producto.png";
            String extension = ".png";
            int dotIndex = originalFilename.lastIndexOf(".");
            if (dotIndex >= 0) {
                String ext = originalFilename.substring(dotIndex).toLowerCase();
                if (ext.equals(".jpg") || ext.equals(".jpeg") || ext.equals(".webp") || ext.equals(".gif") || ext.equals(".png")) {
                    extension = ext;
                }
            }
            String filename = "prod_" + System.currentTimeMillis() + "_" + UUID.randomUUID().toString().substring(0, 8) + extension;

            // Target frontend public/uploads
            Path currentDir = Paths.get("").toAbsolutePath();
            Path uploadsDir;
            if (currentDir.endsWith("backend")) {
                uploadsDir = currentDir.resolve("../frontend/public/uploads").normalize();
            } else if (currentDir.endsWith("bromia-marketplace")) {
                uploadsDir = currentDir.resolve("frontend/public/uploads").normalize();
            } else {
                uploadsDir = currentDir.resolve("bromia-marketplace/frontend/public/uploads").normalize();
            }

            if (!Files.exists(uploadsDir)) {
                Files.createDirectories(uploadsDir);
            }

            Path target = uploadsDir.resolve(filename);
            file.transferTo(target.toFile());

            String imageUrl = "/uploads/" + filename;
            return ResponseEntity.ok(Map.of("url", imageUrl));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Error al procesar y guardar la imagen: " + e.getMessage()));
        }
    }
}
