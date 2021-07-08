package com.example.Repositories;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.Models.*;


@Repository
@Transactional
public interface orderrepository extends JpaRepository<OrderModel,String>{

	List<OrderModel> findByUserid(String userid);
}
