package com.bromia.marketplace.repository;

import com.bromia.marketplace.domain.entity.StoreConfig;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StoreConfigRepository extends JpaRepository<StoreConfig, Long> {
}
