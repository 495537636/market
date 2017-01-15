package com.loving.market.service.impl;

import javax.annotation.Resource;
import org.springframework.stereotype.Service;
import com.loving.market.bean.Userinfo;
import com.loving.market.dao.UserDao;
import com.loving.market.service.UserService;

@Service
public class UserServiceImpl implements UserService {

	@Resource
	private UserDao userDao;

	@Override
	public Userinfo findUser(String username, String password) {
		return userDao.findUser(username, password);
	}

}
