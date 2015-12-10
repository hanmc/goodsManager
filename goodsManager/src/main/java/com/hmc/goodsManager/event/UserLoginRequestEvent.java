package com.hmc.goodsManager.event;

import com.hmc.event.BaseRequestEvent;

public class UserLoginRequestEvent extends BaseRequestEvent {
	
	private String userName;
	
	private String loginPwd;

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

	@Override
	public String toString() {
		return "UserLoginRequestEvent [userName=" + userName + ", loginPwd="
				+ loginPwd + "]";
	}
}
