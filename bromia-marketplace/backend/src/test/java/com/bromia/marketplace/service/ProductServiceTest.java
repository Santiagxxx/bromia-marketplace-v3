package com.bromia.marketplace.service;

import com.bromia.marketplace.domain.entity.Category;
import com.bromia.marketplace.domain.entity.Product;
import com.bromia.marketplace.domain.enums.ProductBadge;
import com.bromia.marketplace.dto.response.DashboardStatsDTO;
import com.bromia.marketplace.mapper.ProductMapper;
import com.bromia.marketplace.repository.CategoryRepository;
import com.bromia.marketplace.repository.ProductRepository;
import com.bromia.marketplace.service.impl.ProductServiceImpl;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class ProductServiceTest {

    @Mock
    private ProductRepository productRepository;

    @Mock
    private CategoryRepository categoryRepository;

    @Mock
    private ProductMapper productMapper;

    @InjectMocks
    private ProductServiceImpl productService;

    @Test
    void shouldCalculateDashboardStatsCorrectly() {
        Category cat = Category.builder().id(1L).name("Brookies").slug("brookies").build();
        List<Product> products = List.of(
                Product.builder().id(1L).name("Brookie").price(new BigDecimal("15000")).active(true).featured(true).stock(10).badge(ProductBadge.NEW).category(cat).build(),
                Product.builder().id(2L).name("Trufa").price(new BigDecimal("25000")).active(false).featured(false).stock(5).badge(ProductBadge.FAVORITO).category(cat).build()
        );

        when(productRepository.findAll()).thenReturn(products);
        when(categoryRepository.count()).thenReturn(1L);

        DashboardStatsDTO stats = productService.getDashboardStats();

        assertEquals(2, stats.getTotalProducts());
        assertEquals(1, stats.getActiveProducts());
        assertEquals(1, stats.getFeaturedProducts());
        assertEquals(15, stats.getTotalStockUnits());
        assertEquals(new BigDecimal("20000"), stats.getAveragePrice());
    }
}
