package com.loving.market.service;

import com.loving.market.bean.Userinfo;

public interface UserService {

	Userinfo findUser(String username, String password);
	
}
