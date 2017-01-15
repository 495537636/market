package com.loving.market.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class GoodsController {

	@RequestMapping("/goods")
	public String getGoodById(HttpServletRequest request, Model model) {
		String goodId = request.getParameter("goodId");
		model.addAttribute("goodId", goodId);
		model.addAttribute("goodName", "苹果电脑");
		return "goods";
	}
	
}
