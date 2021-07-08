package com.example.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.Models.*;
import com.example.Repositories.*;
import com.example.Services.*;

@RestController
public class OrderController{

	@Autowired
	OrderService orderservice;

	@Autowired
	CartService cartservice;


	@Autowired
	private orderrepository Orderrepository;
	@Autowired
	private ProductRepository productRepo;
	@CrossOrigin("http://localhost:8081")
	@PostMapping("/saveOrder/{id}/{quantity}")
	public void saveToOrders(@RequestBody ProductModel productModel ,@PathVariable String id,@PathVariable String quantity)
	{
		int q = Integer.parseInt(quantity);
		int value = Integer.parseInt(productModel.getQuantity())-q;
		OrderModel order = new OrderModel();
		order.setPrice(productModel.getPrice());
		order.setTotalprice(productModel.getPrice());
		order.setUserid(id);
		order.setProductname(productModel.getProductName());
		Orderrepository.save(order);
		if(value>0)
		{ProductModel prodmodel = new ProductModel();
		prodmodel.setDescription(productModel.getDescription());
		prodmodel.setImageUrl(productModel.getImageUrl());
		prodmodel.setPrice(productModel.getPrice());
		prodmodel.setProductId(productModel.getProductId());
		productModel.setProductName(productModel.getProductName());
		prodmodel.setQuantity(Integer.toString(value));
		}
		else
		{
			productRepo.deleteById(productModel.getProductId());
		}

	}
	//send userid to place order
	@CrossOrigin("http://localhost:8081")
	@PostMapping("/placeOrder/{id}")
	public void addallcarttoorders(@PathVariable("id") String userid)
	{
		System.out.println(userid);
	    List<CartModel> temp=cartservice.allcartbyuserid(userid);	
	orderservice.placeorder(temp,userid);	
	}

	//To get orders placed by user send userid
    @GetMapping("/orders/{id}")
    public List<OrderModel> orderbyuserid(@PathVariable("id") String userid)
    {
    	return orderservice.getallordersbyuserid(userid);
    }

	//all orders to admin
	@CrossOrigin("http://localhost:8081")
    @GetMapping("admin/orders")
    public List<OrderModel> getAllOrders()
    {
    	return Orderrepository.findAll();
    }
    
}
