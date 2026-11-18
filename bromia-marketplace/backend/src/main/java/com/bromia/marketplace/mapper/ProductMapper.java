package com.bromia.marketplace.mapper;

import com.bromia.marketplace.domain.entity.Category;
import com.bromia.marketplace.domain.entity.Product;
import com.bromia.marketplace.domain.enums.ProductBadge;
import com.bromia.marketplace.dto.request.ProductRequestDTO;
import com.bromia.marketplace.dto.response.ProductResponseDTO;
import org.springframework.stereotype.Component;

@Component
public class ProductMapper {

    public ProductResponseDTO toResponseDTO(Product product) {
        return ProductResponseDTO.builder()
                .id(product.getId())
                .name(product.getName())
                .description(product.getDescription())
                .tagline(product.getTagline())
                .price(product.getPrice())
                .compareAtPrice(product.getCompareAtPrice())
                .imageUrl(product.getImageUrl())
                .badge(product.getBadge())
                .active(product.getActive())
                .featured(product.getFeatured())
                .stock(product.getStock())
                .flavorsAvailable(product.getFlavorsAvailable())
                .categoryId(product.getCategory() != null ? product.getCategory().getId() : null)
                .categoryName(product.getCategory() != null ? product.getCategory().getName() : null)
                .categorySlug(product.getCategory() != null ? product.getCategory().getSlug() : null)
                .createdAt(product.getCreatedAt())
                .build();
    }

    public Product toEntity(ProductRequestDTO dto, Category category) {
        return Product.builder()
                .name(dto.getName())
                .description(dto.getDescription())
                .tagline(dto.getTagline())
                .price(dto.getPrice())
                .compareAtPrice(dto.getCompareAtPrice())
                .imageUrl(dto.getImageUrl())
                .badge(dto.getBadge() != null ? dto.getBadge() : ProductBadge.NINGUNO)
                .active(dto.getActive() != null ? dto.getActive() : true)
                .featured(dto.getFeatured() != null ? dto.getFeatured() : false)
                .stock(dto.getStock() != null ? dto.getStock() : 20)
                .flavorsAvailable(dto.getFlavorsAvailable())
                .category(category)
                .build();
    }

    public void updateEntityFromDTO(ProductRequestDTO dto, Product product, Category category) {
        product.setName(dto.getName());
        product.setDescription(dto.getDescription());
        product.setTagline(dto.getTagline());
        product.setPrice(dto.getPrice());
        product.setCompareAtPrice(dto.getCompareAtPrice());
        product.setImageUrl(dto.getImageUrl());
        if (dto.getBadge() != null) {
            product.setBadge(dto.getBadge());
        }
        if (dto.getActive() != null) {
            product.setActive(dto.getActive());
        }
        if (dto.getFeatured() != null) {
            product.setFeatured(dto.getFeatured());
        }
        if (dto.getStock() != null) {
            product.setStock(dto.getStock());
        }
        product.setFlavorsAvailable(dto.getFlavorsAvailable());
        product.setCategory(category);
    }
}
