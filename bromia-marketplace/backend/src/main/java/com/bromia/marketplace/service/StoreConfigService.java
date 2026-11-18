package com.bromia.marketplace.service;

import com.bromia.marketplace.domain.entity.StoreConfig;
import com.bromia.marketplace.dto.request.StoreConfigRequestDTO;

public interface StoreConfigService {
    StoreConfig getStoreConfig();
    StoreConfig updateStoreConfig(StoreConfigRequestDTO request);
}
