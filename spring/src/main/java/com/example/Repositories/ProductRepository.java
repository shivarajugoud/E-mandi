package com.example.Repositories;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.Models.*;

@Repository
public interface ProductRepository extends JpaRepository<ProductModel,String>{
	@Query(value="select * from app_products where product_id=?1",nativeQuery=true)
	ProductModel findByProductid(String pid);
}
