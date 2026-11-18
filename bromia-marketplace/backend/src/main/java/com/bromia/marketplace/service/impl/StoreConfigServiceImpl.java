package com.bromia.marketplace.service.impl;

import com.bromia.marketplace.domain.entity.StoreConfig;
import com.bromia.marketplace.dto.request.StoreConfigRequestDTO;
import com.bromia.marketplace.repository.StoreConfigRepository;
import com.bromia.marketplace.service.StoreConfigService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class StoreConfigServiceImpl implements StoreConfigService {

    private final StoreConfigRepository storeConfigRepository;

    @Override
    @Transactional(readOnly = true)
    public StoreConfig getStoreConfig() {
        return storeConfigRepository.findById(1L)
                .orElseGet(() -> StoreConfig.builder()
                        .id(1L)
                        .storeName("Bromia")
                        .whatsappNumber("573001234567")
                        .heroTitle("No somos nosotros diciendo que está rico...")
                        .heroSubtitle("Brookies recién horneados, cheesecakes a tu manera, chocobombas y trufitas artesanales hechas con amor.")
                        .promoBannerText("✨ Envíos en el día • Personaliza tu caja para regalar ✨")
                        .instagramHandle("@bromiaoficial")
                        .city("Bogotá, Colombia")
                        .build());
    }

    @Override
    @Transactional
    public StoreConfig updateStoreConfig(StoreConfigRequestDTO request) {
        StoreConfig config = getStoreConfig();
        config.setId(1L);
        config.setStoreName(request.getStoreName());
        config.setWhatsappNumber(request.getWhatsappNumber());
        config.setHeroTitle(request.getHeroTitle());
        config.setHeroSubtitle(request.getHeroSubtitle());
        config.setPromoBannerText(request.getPromoBannerText());
        if (request.getInstagramHandle() != null) {
            config.setInstagramHandle(request.getInstagramHandle());
        }
        if (request.getCity() != null) {
            config.setCity(request.getCity());
        }
        return storeConfigRepository.save(config);
    }
}
