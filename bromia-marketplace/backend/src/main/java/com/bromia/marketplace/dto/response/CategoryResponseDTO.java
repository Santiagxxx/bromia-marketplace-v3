package com.bromia.marketplace.dto.response;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CategoryResponseDTO {
    private Long id;
    private String name;
    private String slug;
    private String subtitle;
    private String coverImageUrl;
    private Integer displayOrder;
    private long productCount;
}
