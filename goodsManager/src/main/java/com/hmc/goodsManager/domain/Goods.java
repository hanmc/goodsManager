package com.hmc.goodsManager.domain;

import java.math.BigDecimal;

import javax.persistence.Entity;

import com.hmc.domain.BaseDomain;
import com.hmc.goodsManager.event.enums.GoodsType;

/**
 * 货物实体<p>
 * @author hanmc
 *
 */
@Entity
public class Goods extends BaseDomain{

	//商品序号
	private String serialNo;
	
	//商品名
	private String goodsName;
	
	//进货价格
	private BigDecimal inPrice;
	
	//类别 
	private GoodsType goodsType;
	
	//数量
	private int count;
	
	//备注
	private String remark;

	public String getSerialNo() {
		return serialNo;
	}

	public void setSerialNo(String serialNo) {
		this.serialNo = serialNo;
	}

	public String getGoodsName() {
		return goodsName;
	}

	public void setGoodsName(String goodsName) {
		this.goodsName = goodsName;
	}

	public BigDecimal getInPrice() {
		return inPrice;
	}

	public void setInPrice(BigDecimal inPrice) {
		this.inPrice = inPrice;
	}

	public GoodsType getGoodsType() {
		return goodsType;
	}

	public void setGoodsType(GoodsType goodsType) {
		this.goodsType = goodsType;
	}

	public int getCount() {
		return count;
	}

	public void setCount(int count) {
		this.count = count;
	}

	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

	@Override
	public String toString() {
		return "Goods [serialNo=" + serialNo + ", goodsName=" + goodsName
				+ ", inPrice=" + inPrice + ", goodsType=" + goodsType
				+ ", count=" + count + ", remark=" + remark + "]";
	}
	
}
