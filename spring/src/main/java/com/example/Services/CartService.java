package com.example.Services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.Models.*;
import com.example.Repositories.*;
@Service
public class CartService {
	@Autowired
	cartrepository cartRepository;
	@Autowired
	ProductRepository productRepo;
	public void addtocart(CartModel cartmodel) {
	cartRepository.save(cartmodel);
	}
	public List<CartModel> allcartitems(){
		return cartRepository.findAll();
	}
	public void fromproductmodel(ProductModel productdata,String userid,String q)
	{
            CartModel cart=new CartModel();
            cart.setPrice(productdata.getPrice());
            cart.setProductname(productdata.getProductName());
           
			cart.setImageUrl(productdata.getImageUrl());
			cart.setDescription(productdata.getDescription());
            cart.setUserid(userid);
			cart.setProductId(productdata.getProductId());
			CartModel cartm = new CartModel();
			cartm  = cartRepository.findByProductNameandUserid(productdata.getProductName(),userid);
			if(cartm==null)
			{
				cart.setQuantity(q);
            this.addtocart(cart);
			}
			else
			{
				cart.setCartid(cartm.getCartid());
				int qq = Integer.parseInt(cartm.getQuantity())+Integer.parseInt(q);
				cart.setQuantity(Integer.toString(qq));
				this.addtocart(cart);

			}
	}
	public List<CartModel> allcartbyuserid(String userid)
	{
		return cartRepository.findByUserid(userid);
	}
	public List<CartModel> allcart(){
		return cartRepository.findAll();
	}
	public void delete(String userid,String pname)
	{
		String productname=pname;
		CartModel cmodel = new CartModel();
		//cmodel = cartRepository.getOne()
		System.out.println("now");
		cmodel = cartRepository.findByProductNameandUserid(pname, userid);
		System.out.println(cmodel.getProductId()+"here");
		Optional<ProductModel> x = productRepo.findById(cmodel.getProductId());
		System.out.println("here");
		int val=0;
		try{
		if(x!=null)
		val  = Integer.parseInt(x.get().getQuantity());
		}
		catch(Exception e)
		{}
		System.out.println("after");
		ProductModel productAdded = new ProductModel();
		productAdded.setQuantity(Integer.toString(Integer.parseInt(cmodel.getQuantity())+val));
		productAdded.setDescription(cmodel.getDescription());
		productAdded.setImageUrl(cmodel.getImageUrl());
		productAdded.setProductId(cmodel.getProductId());
		productAdded.setProductName(cmodel.getProductname());
		productAdded.setPrice(cmodel.getPrice());
		productRepo.save(productAdded);
		cartRepository.deleteByProductname(userid,productname);
	}
	public void deleteall(String userid)
	{
		cartRepository.deletebyuserid(userid);
	}

}
