package com.example.Models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class OrderModel {

	@Id
	@Column 
	@GeneratedValue
	int orderid;
	@Column
	String productname;
	@Column
	String userid;
	@Column
	String totalprice;
	@Column
	String price;
	public OrderModel() {}
	public OrderModel(int orderid, String productname, String userid, String totalprice, String price) {
		this.orderid = orderid;
		this.productname = productname;
		this.userid = userid;
		this.totalprice = totalprice;
		this.price = price;
	}
	public int getOrderid() {
		return orderid;
	}
	public void setOrderid(int orderid) {
		this.orderid = orderid;
	}
	public String getProductname() {
		return productname;
	}
	public void setProductname(String productname) {
		this.productname = productname;
	}
	public String getUserid() {
		return userid;
	}
	public void setUserid(String userid) {
		this.userid = userid;
	}
	public String getTotalprice() {
		return totalprice;
	}
	public void setTotalprice(String totalprice) {
		this.totalprice = totalprice;
	}
	public String getPrice() {
		return price;
	}
	public void setPrice(String price) {
		this.price = price;
	}
	
	
}
