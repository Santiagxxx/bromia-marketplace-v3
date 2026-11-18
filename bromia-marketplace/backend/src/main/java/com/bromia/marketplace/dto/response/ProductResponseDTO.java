package com.bromia.marketplace.dto.response;

import com.bromia.marketplace.domain.enums.ProductBadge;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductResponseDTO {
    private Long id;
    private String name;
    private String description;
    private String tagline;
    private BigDecimal price;
    private BigDecimal compareAtPrice;
    private String imageUrl;
    private ProductBadge badge;
    private Boolean active;
    private Boolean featured;
    private Integer stock;
    private String flavorsAvailable;
    private Long categoryId;
    private String categoryName;
    private String categorySlug;
    private LocalDateTime createdAt;
}
