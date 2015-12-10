package com.hmc.test;

import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import com.hmc.goodsManager.service.UserLoginService;

public class TempTest extends DemoApplicationTests{
	
	@Autowired
	private UserLoginService sampleService;
	
	@Test
	public void test() {
		System.out.println(Integer.parseInt("7"));
	};
}
