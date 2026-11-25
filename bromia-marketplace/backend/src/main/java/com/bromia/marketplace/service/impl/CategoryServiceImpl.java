package com.bromia.marketplace.service.impl;

import com.bromia.marketplace.domain.entity.Category;
import com.bromia.marketplace.dto.request.CategoryRequestDTO;
import com.bromia.marketplace.dto.response.CategoryResponseDTO;
import com.bromia.marketplace.exception.ResourceNotFoundException;
import com.bromia.marketplace.repository.CategoryRepository;
import com.bromia.marketplace.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.text.Normalizer;
import java.util.List;
import java.util.Locale;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepository;

    @Override
    @Transactional(readOnly = true)
    public List<CategoryResponseDTO> getAllCategories() {
        return categoryRepository.findAllByOrderByDisplayOrderAsc().stream()
                .map(this::toDTO)
                .toList();
    }

    @Override
    @Transactional
    public CategoryResponseDTO createCategory(CategoryRequestDTO request) {
        String slug = (request.getSlug() != null && !request.getSlug().isBlank())
                ? request.getSlug()
                : toSlug(request.getName());
        Category category = Category.builder()
                .name(request.getName())
                .slug(slug)
                .subtitle(request.getSubtitle())
                .coverImageUrl(request.getCoverImageUrl())
                .displayOrder(request.getDisplayOrder() != null ? request.getDisplayOrder() : (int) categoryRepository.count() + 1)
                .build();
        return toDTO(categoryRepository.save(category));
    }

    @Override
    @Transactional
    public void deleteCategory(Long id) {
        if (!categoryRepository.existsById(id)) {
            throw new ResourceNotFoundException("Categoría no encontrada con ID: " + id);
        }
        categoryRepository.deleteById(id);
    }

    private CategoryResponseDTO toDTO(Category category) {
        return CategoryResponseDTO.builder()
                .id(category.getId())
                .name(category.getName())
                .slug(category.getSlug())
                .subtitle(category.getSubtitle())
                .coverImageUrl(category.getCoverImageUrl())
                .displayOrder(category.getDisplayOrder())
                .productCount(category.getProducts() != null ? category.getProducts().size() : 0)
                .build();
    }

    private String toSlug(String input) {
        String normalized = Normalizer.normalize(input, Normalizer.Form.NFD)
                .replaceAll("\\p{InCombiningDiacriticalMarks}+", "");
        return normalized.toLowerCase(Locale.ROOT)
                .replaceAll("[^a-z0-9]+", "-")
                .replaceAll("(^-|-$)", "");
    }
}
