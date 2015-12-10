package com.hmc.goodsManager.domain;

import javax.persistence.Entity;

import com.hmc.domain.BaseDomain;
import com.hmc.goodsManager.event.enums.Sex;

/**
 * 用户<p>
 * @author hanmc
 *
 */
@Entity
public class User extends BaseDomain{

	/**
	 * 用户ID
	 */
	private Long userId;
	
	/**
	 * 用户名
	 */
	private String userName;
	
	/**
	 * 登录密码
	 */
	private String loginPwd;
	
	/**
	 * 性别
	 */
	private Sex sex;

	public Long getUserId() {
		return userId;
	}
	public void setUserId(Long userId) {

		this.userId = userId;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getLoginPwd() {
		return loginPwd;
	}

	public void setLoginPwd(String loginPwd) {
		this.loginPwd = loginPwd;
	}

	public Sex getSex() {
		return sex;
	}

	public void setSex(Sex sex) {
		this.sex = sex;
	}

	@Override
	public String toString() {
		return "User [userId=" + userId + ", userName=" + userName
				+ ", loginPwd=" + loginPwd + ", sex=" + sex + "]";
	}
}
