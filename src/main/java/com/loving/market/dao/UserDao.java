package com.loving.market.dao;

import org.springframework.stereotype.Repository;
import com.loving.market.bean.Userinfo;

@Repository
public interface UserDao {
	
	Userinfo findUser(String username, String password);

}
