package com.bromia.marketplace.service.impl;

import com.bromia.marketplace.domain.entity.Category;
import com.bromia.marketplace.domain.entity.Product;
import com.bromia.marketplace.dto.request.ProductRequestDTO;
import com.bromia.marketplace.dto.response.DashboardStatsDTO;
import com.bromia.marketplace.dto.response.ProductResponseDTO;
import com.bromia.marketplace.exception.ResourceNotFoundException;
import com.bromia.marketplace.mapper.ProductMapper;
import com.bromia.marketplace.repository.CategoryRepository;
import com.bromia.marketplace.repository.ProductRepository;
import com.bromia.marketplace.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final ProductMapper productMapper;

    @Override
    @Transactional(readOnly = true)
    public List<ProductResponseDTO> getAllProducts(String categorySlug, String search, boolean includeInactive) {
        String normalizedSlug = (categorySlug == null || categorySlug.isBlank() || "todos".equalsIgnoreCase(categorySlug))
                ? null : categorySlug.trim();
        String normalizedSearch = (search == null || search.isBlank()) ? null : search.trim();

        return productRepository.searchProducts(normalizedSlug, normalizedSearch, !includeInactive)
                .stream()
                .map(productMapper::toResponseDTO)
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public ProductResponseDTO getProductById(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Producto no encontrado con ID: " + id));
        return productMapper.toResponseDTO(product);
    }

    @Override
    @Transactional
    public ProductResponseDTO createProduct(ProductRequestDTO request) {
        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new ResourceNotFoundException("Categoría no encontrada con ID: " + request.getCategoryId()));

        Product product = productMapper.toEntity(request, category);
        Product saved = productRepository.save(product);
        return productMapper.toResponseDTO(saved);
    }

    @Override
    @Transactional
    public ProductResponseDTO updateProduct(Long id, ProductRequestDTO request) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Producto no encontrado con ID: " + id));

        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new ResourceNotFoundException("Categoría no encontrada con ID: " + request.getCategoryId()));

        productMapper.updateEntityFromDTO(request, product, category);
        Product updated = productRepository.save(product);
        return productMapper.toResponseDTO(updated);
    }

    @Override
    @Transactional
    public ProductResponseDTO toggleProductStatus(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Producto no encontrado con ID: " + id));
        product.setActive(!product.getActive());
        return productMapper.toResponseDTO(productRepository.save(product));
    }

    @Override
    @Transactional
    public void deleteProduct(Long id) {
        if (!productRepository.existsById(id)) {
            throw new ResourceNotFoundException("Producto no encontrado con ID: " + id);
        }
        productRepository.deleteById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public DashboardStatsDTO getDashboardStats() {
        List<Product> allProducts = productRepository.findAll();
        long totalProducts = allProducts.size();
        long activeProducts = allProducts.stream().filter(Product::getActive).count();
        long featuredProducts = allProducts.stream().filter(Product::getFeatured).count();
        int totalStockUnits = allProducts.stream().mapToInt(p -> p.getStock() != null ? p.getStock() : 0).sum();

        BigDecimal averagePrice = totalProducts == 0
                ? BigDecimal.ZERO
                : allProducts.stream()
                        .map(Product::getPrice)
                        .reduce(BigDecimal.ZERO, BigDecimal::add)
                        .divide(BigDecimal.valueOf(totalProducts), 0, RoundingMode.HALF_UP);

        return DashboardStatsDTO.builder()
                .totalProducts(totalProducts)
                .activeProducts(activeProducts)
                .featuredProducts(featuredProducts)
                .totalCategories(categoryRepository.count())
                .averagePrice(averagePrice)
                .totalStockUnits(totalStockUnits)
                .build();
    }
}
