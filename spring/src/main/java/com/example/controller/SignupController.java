package com.example.controller;
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
public class SignupController {

    @Autowired
    private UserService userService;

    @Autowired
    private userrepository Userrepo;
    @CrossOrigin("http://localhost:8081")
    @PostMapping("/signup")
    public boolean signup(@RequestBody UserModel user) {
         if(userService.isUserExists(user.getEmail(),user.getPassword()))
         {
             if(!user.getUsername().equals("admin"))
             {
                user.setRole("USER");
             }
             else
             {
                 user.setRole("ADMIN");
             }
             user.setActive("YES");
        	 userService.adduser(user);
        	 return true;
         }
         return false;
    }
    @CrossOrigin("http://localhost:8081")
    @GetMapping("/userid/{id}")
    public String method(@PathVariable("id") String id )
    {
    	return userService.getuseridbyemail(id);
    }
    @CrossOrigin("http://localhost:8081")
    @GetMapping("/userprofile/{id}")
    public UserModel profile(@PathVariable String id){
        return Userrepo.findById(id).get();
    }
    @CrossOrigin("http://localhost:8081")
    @PostMapping("/userProfile/edit/{id}")
    public void editProfile(@RequestBody UserModel usermodel ,@PathVariable String id)
    {
        Userrepo.save(usermodel);
    }
}
