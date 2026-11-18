package com.bromia.marketplace.dto.response;

import lombok.*;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DashboardStatsDTO {
    private long totalProducts;
    private long activeProducts;
    private long featuredProducts;
    private long totalCategories;
    private BigDecimal averagePrice;
    private int totalStockUnits;
}
