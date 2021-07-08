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
public class CartController {

	@Autowired
	CartService cartservice;
	@Autowired
	ProductService productservice;
	@Autowired
	ProductRepository productRepo;
	//for adding cart item send productmodel with userid
	@CrossOrigin("http://localhost:8081")
	@PostMapping("/home/{id}/{q}")
	public void additemtocart(@RequestBody ProductModel productdata,@PathVariable("id") String userid,@PathVariable String q)
	{
		int newValue = Integer.parseInt(productdata.getQuantity())-Integer.parseInt(q);
		ProductModel productTaken = new ProductModel();
		productTaken.setDescription(productdata.getDescription());
		productTaken.setProductId(productdata.getProductId());
		productTaken.setPrice(productdata.getPrice());
		productTaken.setImageUrl(productdata.getImageUrl());
		productTaken.setProductName(productdata.getProductName());
		productTaken.setQuantity(Integer.toString(newValue));
		if(newValue<=0)
		{
			cartservice.fromproductmodel(productdata, userid,productdata.getQuantity());
			productservice.deleteUserById(productdata.getProductId());

		}
		else
		{
		productRepo.save(productTaken);
		cartservice.fromproductmodel(productdata, userid,q);
		}
		//System.out.println(productdata.getProductId());
		//cartservice.fromproductmodel(productdata, userid,q);
	}

	//get cart items by sending userid
	@CrossOrigin("http://localhost:8081")
	@GetMapping("cart/{id}")
	public List<CartModel> getallcartitems(@PathVariable("id") String userid)
	{
		System.out.println(cartservice.allcartbyuserid(userid));
		return cartservice.allcartbyuserid(userid);
	}
	@CrossOrigin("http://localhost:8081")
	@PostMapping("/addtocart")
	public void additembycartmodel(@RequestBody CartModel cart)
	{
		cartservice.addtocart(cart);
	}
	//to get all items in the cart irrespective of userid
	@CrossOrigin("http://localhost:8081")
	@GetMapping("/findallcartitems")
	public List<CartModel> allcart()
	{
		return cartservice.allcart();
	}
	//to delete a product from cart send userid and productname
	@CrossOrigin("http://localhost:8081")
	@PostMapping("/delete/{id}/{pname}")
	public void delete(@PathVariable("id") String userid,@PathVariable String pname)
	{
		System.out.println(pname);
		cartservice.delete(userid,pname);
	}
	
}
