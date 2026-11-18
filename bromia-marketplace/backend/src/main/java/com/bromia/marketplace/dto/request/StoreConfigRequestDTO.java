package com.bromia.marketplace.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StoreConfigRequestDTO {

    @NotBlank(message = "El nombre de la tienda es obligatorio")
    private String storeName;

    @NotBlank(message = "El número de WhatsApp es obligatorio")
    @Pattern(regexp = "^[0-9]{10,15}$", message = "Ingresa el número con código de país sin '+' (ej: 573001234567)")
    private String whatsappNumber;

    @NotBlank(message = "El título principal es obligatorio")
    private String heroTitle;

    @NotBlank(message = "El subtítulo es obligatorio")
    private String heroSubtitle;

    @NotBlank(message = "El texto promocional es obligatorio")
    private String promoBannerText;

    private String instagramHandle;

    private String city;
}
