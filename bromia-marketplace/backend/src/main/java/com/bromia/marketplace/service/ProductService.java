package com.bromia.marketplace.service;

import com.bromia.marketplace.dto.request.ProductRequestDTO;
import com.bromia.marketplace.dto.response.DashboardStatsDTO;
import com.bromia.marketplace.dto.response.ProductResponseDTO;

import java.util.List;

public interface ProductService {
    List<ProductResponseDTO> getAllProducts(String categorySlug, String search, boolean includeInactive);
    ProductResponseDTO getProductById(Long id);
    ProductResponseDTO createProduct(ProductRequestDTO request);
    ProductResponseDTO updateProduct(Long id, ProductRequestDTO request);
    ProductResponseDTO toggleProductStatus(Long id);
    void deleteProduct(Long id);
    DashboardStatsDTO getDashboardStats();
}
