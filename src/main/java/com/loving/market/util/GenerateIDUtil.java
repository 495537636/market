package com.loving.market.util;

import java.util.UUID;

public class GenerateIDUtil {
	
	public String generateID() {
        UUID random = UUID.randomUUID();
        String str = random.toString();
        String uuid = str.replace("-", "");
        return uuid;
    }
	
	public static void main(String[] args) {
		GenerateIDUtil generateIDUtil = new GenerateIDUtil();
		System.out.println(generateIDUtil.generateID());
	}

}
