package com.example.controller;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.Models.*;
import com.example.Services.*;
import java.util.*;
@RestController
public class LoginController {
	@Autowired
	private UserService userService;
    @PostMapping("/login")
    @CrossOrigin("http:localhost:8081")
	/*public boolean allProducts(@RequestBody LoginModel loginModel) {
    	System.out.println(loginModel.getEmail()+" "+loginModel.getPassword());
		return userService.isloginsuccess(loginModel.getEmail(),loginModel.getPassword());
	}*/
   
    public Map<String,String> checkUser(@RequestBody LoginModel model)
    {
    System.out.println(model.getEmail()+" || "+model.getPassword());
    Map<String,String> response  = new HashMap<String,String>();
    if(userService.isloginsuccess(model.getEmail(),model.getPassword()))
    {
    response.put("status","200");
    response.put("userId",userService.getuseridbyemail(model.getEmail ()));
    if(model.getEmail().equals("admin@gmail.com")&&model.getPassword().equals("admin"))
    response.put("userType","ADMIN");
    else
    response.put("userType","CUSTOMER");
    return response;
    }
    response.put("status","500");
    return response;
    }
}
