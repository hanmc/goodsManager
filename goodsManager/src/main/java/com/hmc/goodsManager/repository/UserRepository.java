package com.hmc.goodsManager.repository;

import org.springframework.stereotype.Repository;

import com.hmc.goodsManager.domain.User;
import com.hmc.repository.IBaseJpaRepository;


@Repository
public interface UserRepository extends IBaseJpaRepository<User> {

	User findByUserName(String userName);

}
