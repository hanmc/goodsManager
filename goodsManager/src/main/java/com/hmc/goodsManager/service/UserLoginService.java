package com.hmc.goodsManager.service;

import org.apache.commons.codec.binary.Base64;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hmc.base.BaseException;
import com.hmc.base.BaseResultInfo;
import com.hmc.goodsManager.domain.User;
import com.hmc.goodsManager.event.UserLoginRequestEvent;
import com.hmc.goodsManager.repository.UserRepository;
import com.hmc.service.BaseBusinessService;

/**
 * 用户登录服务<p>
 * @author hanmc
 *
 */
@Service
//TDH 用户权限管理及页面拦截未实现
public class UserLoginService extends BaseBusinessService<UserLoginRequestEvent>{
	
	@SuppressWarnings("unused")
	private Logger ilog = LoggerFactory.getLogger(getClass().getSimpleName());
	
	@Autowired
	private UserRepository userJpaRepository;
	

	@Override
	protected BaseResultInfo executing(UserLoginRequestEvent request) throws BaseException {
		
		User user = userJpaRepository.findByUserName(request.getUserName());
		if(user==null){
			throw new BaseException("用户不存在");
		}
		
		if(!StringUtils.equals(new String(Base64.decodeBase64(user.getLoginPwd())), request.getLoginPwd())){
			throw new BaseException("用户名或密码错误");
		}
		
		
		return BaseResultInfo.getBaseResult(true);
	}
	
}
