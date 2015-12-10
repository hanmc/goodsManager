package com.hmc.goodsManager.utils;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.hmc.goodsManager.domain.SerialNoGenerate;
import com.hmc.goodsManager.repository.SerialNoGenerateRepository;
import com.hmc.utils.BaseDateUtils;

/**
 * 序列号生成器<p>
 * @author hanmc
 *
 */
@Component
public class SerialNoGenerator {

	@Autowired
	private BaseDateUtils baseDateUtil;
	
	@Autowired
	private SerialNoGenerateRepository generateRepository;
	
	/**
	 * 获取默认格式的序列号
	 * 2015120500001
	 * @return
	 */
	public String generate(){
		String prefix = getDatePrefix();
		SerialNoGenerate generate = generateRepository.save(new SerialNoGenerate());
		String suffix = StringUtils.leftPad(generate.getId().toString(), 4, "0");
		return prefix + suffix;
	}
	
	private String getDatePrefix(){
		return baseDateUtil.getDate("yyyyMMdd");
	}
	
}
