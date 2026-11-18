package com.bromia.marketplace.repository;

import com.bromia.marketplace.domain.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    @Query("SELECT p FROM Product p JOIN FETCH p.category c WHERE " +
           "(:onlyActive = false OR p.active = true) AND " +
           "(:categorySlug IS NULL OR c.slug = :categorySlug) AND " +
           "(:search IS NULL OR LOWER(p.name) LIKE LOWER(CONCAT('%', :search, '%')) " +
           "OR LOWER(p.description) LIKE LOWER(CONCAT('%', :search, '%'))) " +
           "ORDER BY p.featured DESC, p.createdAt DESC")
    List<Product> searchProducts(
            @Param("categorySlug") String categorySlug,
            @Param("search") String search,
            @Param("onlyActive") boolean onlyActive
    );

    long countByActiveTrue();

    long countByFeaturedTrue();
}
