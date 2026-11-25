package com.bromia.marketplace.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CategoryRequestDTO {

    @NotBlank(message = "El nombre de la categoría es obligatorio")
    private String name;

    private String slug;

    private String subtitle;

    private String coverImageUrl;

    private Integer displayOrder;
}
