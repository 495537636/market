package com.loving.market.controller;

import java.io.IOException;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import com.alibaba.fastjson.JSONObject;
import com.loving.market.bean.Userinfo;
import com.loving.market.service.UserService;

@Controller
@RequestMapping("/user")
public class UserController {
	
	@Resource
	private UserService userService;

	@RequestMapping("/say")
	public void sayHello() {
		System.err.println("Hello World!");
	}
	
	@RequestMapping("/login")
	public void login(HttpServletRequest request, HttpServletResponse response) {
		String username = request.getParameter("username");
		String password = request.getParameter("password");
		System.err.println("username=" + username + ";password=" + password);
		Userinfo userinfo = userService.findUser(username, password);
		if(null!=userinfo){
			JSONObject json = new JSONObject();
	        json.put("userinfo", userinfo);
			response.setCharacterEncoding("UTF-8");
			response.setHeader("Cache-Control", "no-cache");
			response.setContentType("text/x-json;charset=UTF-8");
			try {
				response.getWriter().print(json.toString());
				response.getWriter().close();
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
	}
	
	@RequestMapping("/test")
	public String test(Model model) {
		model.addAttribute("name","我是一个中文");
		return "test";
	}
	
}
