package com.hmc.goodsManager.event.enums;

/**
 * 操作类型<p>
 * @author hanmc
 *
 */
public enum OperateType {

	IN("in","进货"),
	OUT("out","出货");
	
	private String code;
	
	private String desc;
	
	OperateType(String code, String desc){
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
