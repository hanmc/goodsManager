package com.hmc.goodsManager.domain;

import java.math.BigDecimal;
import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.OneToOne;

import com.hmc.domain.BaseDomain;
import com.hmc.goodsManager.event.enums.OperateType;

/**
 * 操作流水<p>
 * @author hanmc
 *
 */
@Entity
public class OperateFlow extends BaseDomain{
	
	//流水号
	private String serialNo;
	
	//数量
	private int operateCount;
	
	//操作时间
	private Date operateTime;
	
	//操作类型 
	private OperateType operateType;
	
	//货物来源
	private String origin;

	//货物目标
	private String dest;
	
	//经办人
	private String operator;
	
	//货物
	@OneToOne
	private Goods goods;
	
	//出货价格
	private BigDecimal outPrice;
		
	//备注
	private String remark;
	
	//金额
	private BigDecimal amout;
	
	//利润
	private BigDecimal profit;

	public String getSerialNo() {
		return serialNo;
	}

	public void setSerialNo(String serialNo) {
		this.serialNo = serialNo;
	}

	public int getOperateCount() {
		return operateCount;
	}

	public void setOperateCount(int operateCount) {
		this.operateCount = operateCount;
	}

	public Date getOperateTime() {
		return operateTime;
	}

	public void setOperateTime(Date operateTime) {
		this.operateTime = operateTime;
	}

	public OperateType getOperateType() {
		return operateType;
	}

	public void setOperateType(OperateType operateType) {
		this.operateType = operateType;
	}

	public String getOrigin() {
		return origin;
	}

	public void setOrigin(String origin) {
		this.origin = origin;
	}

	public String getDest() {
		return dest;
	}

	public void setDest(String dest) {
		this.dest = dest;
	}

	public String getOperator() {
		return operator;
	}

	public void setOperator(String operator) {
		this.operator = operator;
	}

	public Goods getGoods() {
		return goods;
	}

	public void setGoods(Goods goods) {
		this.goods = goods;
	}

	public BigDecimal getOutPrice() {
		return outPrice;
	}

	public void setOutPrice(BigDecimal outPrice) {
		this.outPrice = outPrice;
	}

	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

	public BigDecimal getAmout() {
		return amout;
	}

	public void setAmout(BigDecimal amout) {
		this.amout = amout;
	}

	public BigDecimal getProfit() {
		return profit;
	}

	public void setProfit(BigDecimal profit) {
		this.profit = profit;
	}

	@Override
	public String toString() {
		return "OperateFlow [serialNo=" + serialNo + ", operateCount="
				+ operateCount + ", operateTime=" + operateTime
				+ ", operateType=" + operateType + ", origin=" + origin
				+ ", dest=" + dest + ", operator=" + operator + ", goods="
				+ goods + ", outPrice=" + outPrice + ", remark=" + remark
				+ ", amout=" + amout + ", profit=" + profit + "]";
	}
	
}
