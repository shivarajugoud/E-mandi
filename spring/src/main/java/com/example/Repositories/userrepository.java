package com.example.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.Models.*;
@Repository
public interface userrepository extends JpaRepository<UserModel, String>{
	 UserModel findByEmailAndPassword(String username, String password);
	    UserModel findByEmail(String temp);

}
