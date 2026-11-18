package com.bromia.marketplace.dto.request;

import com.bromia.marketplace.domain.enums.ProductBadge;
import jakarta.validation.constraints.*;
import lombok.*;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductRequestDTO {

    @NotBlank(message = "El nombre del producto es obligatorio")
    @Size(max = 120, message = "El nombre no puede superar los 120 caracteres")
    private String name;

    @NotBlank(message = "La descripción es obligatoria")
    @Size(max = 600, message = "La descripción no puede superar los 600 caracteres")
    private String description;

    @Size(max = 160)
    private String tagline;

    @NotNull(message = "El precio es obligatorio")
    @DecimalMin(value = "500.0", message = "El precio debe ser mayor a $500 COP")
    private BigDecimal price;

    private BigDecimal compareAtPrice;

    @NotBlank(message = "La URL de la imagen es obligatoria")
    private String imageUrl;

    private ProductBadge badge;

    private Boolean active;

    private Boolean featured;

    @Min(value = 0, message = "El stock no puede ser negativo")
    private Integer stock;

    private String flavorsAvailable;

    @NotNull(message = "La categoría es obligatoria")
    private Long categoryId;
}
