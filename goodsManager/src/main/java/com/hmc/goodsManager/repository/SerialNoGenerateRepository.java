package com.hmc.goodsManager.repository;

import org.springframework.data.jpa.repository.Query;

import com.hmc.goodsManager.domain.SerialNoGenerate;
import com.hmc.repository.IBaseJpaRepository;

public interface SerialNoGenerateRepository extends IBaseJpaRepository<SerialNoGenerate>{
	
	/**
	 * 获取当前最大主键id
	 * @return
	 */
	@Query(value="select max(t.hmc_id) from yc_SerialNoGenerate t",nativeQuery=true)
	Long getMaxId();
}
