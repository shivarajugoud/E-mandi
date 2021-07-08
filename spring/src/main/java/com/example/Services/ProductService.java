package com.example.Services;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.Models.*;
import com.example.Repositories.*;

import java.util.List;
import java.util.Optional;

@Service
public class ProductService  {
    @Autowired
    private ProductRepository productrepository;

    public List<ProductModel> findall() {
        return productrepository.findAll();
    }

    public Optional<ProductModel> getid(String id) {
        return productrepository.findById(id);
    }

    public ProductModel create(ProductModel product) {
        System.out.println(product.getProductName() + " | " + product.getPrice());
        return productrepository.save(product);
    }

    public void deleteUserById(String productId) {
        productrepository.deleteById(productId);
    }
    public ProductModel productmodelbyid(String pid)
    {
    	//return null;
    	return productrepository.findByProductid(pid);
    }

}