package com.loving.market.bean;

import java.util.Date;

public class Userinfo {

	// 用户ID
	private String userid;
	// 用户名
	private String username;
	// 真实名
	private String realname;
	// 性别
	private String sex;
	// 密码
	private String password;
	// 电话
	private String phone;
	// 邮箱
	private String email;
	// 地址
	private String address;
	// 创建时间
	private Date createTime;
	// 用户状态(0=无效，1=有效)
	private int userFlag;
	// 用户标识
	private String userType;
	// 用户其他信息
	private Object otherInfo;

	public String getUserid() {
		return userid;
	}

	public void setUserid(String userid) {
		this.userid = userid;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getRealname() {
		return realname;
	}

	public void setRealname(String realname) {
		this.realname = realname;
	}

	public String getSex() {
		return sex;
	}

	public void setSex(String sex) {
		this.sex = sex;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public Date getCreateTime() {
		return createTime;
	}

	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}

	public int getUserFlag() {
		return userFlag;
	}

	public void setUserFlag(int userFlag) {
		this.userFlag = userFlag;
	}

	public String getUserType() {
		return userType;
	}

	public void setUserType(String userType) {
		this.userType = userType;
	}

	public Object getOtherInfo() {
		return otherInfo;
	}

	public void setOtherInfo(Object otherInfo) {
		this.otherInfo = otherInfo;
	}
	
	public static void main(String[] args) {
		System.out.println(System.currentTimeMillis());
	}

}
