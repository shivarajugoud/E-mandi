package com.example.Repositories;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.Models.*;

@Repository
@Transactional
public interface cartrepository extends JpaRepository<CartModel,String> {
	
	@Query(value="select * from cart_model where userid=?2 and productname=?1",nativeQuery = true)
	CartModel findByProductNameandUserid(String pid,String uid);
	List<CartModel> findByUserid(String userid);
	@Modifying
	@Query(value="delete from cart_model where userid=?1 and productname=?2",nativeQuery=true)
	void deleteByProductname(String userid,String productname);
	@Modifying
	@Query(value="delete from cart_model where userid=?1",nativeQuery=true)
	void deletebyuserid(String userid);
}
