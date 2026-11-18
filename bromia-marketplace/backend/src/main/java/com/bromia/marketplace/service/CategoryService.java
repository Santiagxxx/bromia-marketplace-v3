package com.bromia.marketplace.service;

import com.bromia.marketplace.dto.request.CategoryRequestDTO;
import com.bromia.marketplace.dto.response.CategoryResponseDTO;

import java.util.List;

public interface CategoryService {
    List<CategoryResponseDTO> getAllCategories();
    CategoryResponseDTO createCategory(CategoryRequestDTO request);
    void deleteCategory(Long id);
}
