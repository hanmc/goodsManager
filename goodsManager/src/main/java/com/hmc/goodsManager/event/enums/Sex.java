package com.hmc.goodsManager.event.enums;

public enum Sex {

	man("0","男"),
	woman("1","女");
	
	private String code;
	
	private String desc;

	private Sex(String code, String desc) {
		this.code = code;
		this.desc = desc;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public String getDesc() {
		return desc;
	}

	public void setDesc(String desc) {
		this.desc = desc;
	}
}
