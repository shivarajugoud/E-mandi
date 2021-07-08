package com.example.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.Models.*;
import com.example.Repositories.*;
import com.example.Services.*;

import java.util.List;
import java.util.Optional;

@RestController
public class ProductController {
    @Autowired
    private ProductService productservice;
    @Autowired
    private ProductRepository prodRepo;
    @CrossOrigin("http://localhost:8081")
    @GetMapping("/home")
    public List<ProductModel> allProducts() {
        return productservice.findall();
    }

    /*@GetMapping("admin/productEdit/{id}")
    public Optional<ProductModel> getUserById(@PathVariable("id") String userId) {
        return productservice.getid(userId);
    } */
    @CrossOrigin("http://localhost:8081")
    @PostMapping("admin/addProduct")
    public ProductModel meth(@RequestBody ProductModel product) {
        return productservice.create(product);
    }
    @CrossOrigin("http://localhost:8081")
    @GetMapping("admin/productEdit/{id}")
    public ProductModel productDetails(@PathVariable String id)
    {
        return prodRepo.findByProductid(id);
    }

    @CrossOrigin("http://localhost:8081")
    @PostMapping("admin/productEdit")
    public void updateproduct(@RequestBody ProductModel product) {
        productservice.create(product);
    }

    @CrossOrigin("http://localhost:8081")
    @PostMapping("delete/{id}")
    public void delete(@PathVariable("id") String productId) {
        productservice.deleteUserById(productId);
    }
    @CrossOrigin("http://localhost:8081")
    @GetMapping("product/{id}")
    public ProductModel productmodelbyid(@PathVariable("id") String pid)
    {
    	return productservice.productmodelbyid(pid);
    }
}
