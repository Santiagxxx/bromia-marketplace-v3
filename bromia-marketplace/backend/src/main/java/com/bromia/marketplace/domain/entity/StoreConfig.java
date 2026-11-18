package com.bromia.marketplace.domain.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "store_config")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StoreConfig {

    @Id
    private Long id;

    @Column(nullable = false, length = 100)
    private String storeName;

    @Column(nullable = false, length = 25)
    private String whatsappNumber;

    @Column(nullable = false, length = 250)
    private String heroTitle;

    @Column(nullable = false, length = 400)
    private String heroSubtitle;

    @Column(nullable = false, length = 250)
    private String promoBannerText;

    @Column(nullable = false, length = 100)
    private String instagramHandle;

    @Column(nullable = false, length = 120)
    private String city;
}
