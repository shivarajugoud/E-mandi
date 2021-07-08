package com.example.Services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.Models.*;
import com.example.Repositories.*;
@Service
public class OrderService {
	@Autowired
	orderrepository orderrepo;
	@Autowired
	CartService cartservice;
	public void placeorder(List<CartModel> cart,String userid)
	{
		for(CartModel temp :cart)
		{
			OrderModel u=new OrderModel();
			u.setPrice(temp.getPrice());
			u.setUserid(temp.getUserid());
			u.setProductname(temp.getProductname());
			u.setTotalprice(Integer.toString((Integer.parseInt(temp.getPrice())*Integer.parseInt(temp.getQuantity()))));
			orderrepo.save(u);
		}
		cartservice.deleteall(userid);
	}
	public List<OrderModel> getallordersbyuserid(String userid)
	{
		return orderrepo.findByUserid(userid);
	}

}
