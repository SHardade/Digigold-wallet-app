package com.example.demo.service;

import java.util.List;

import com.example.demo.Exception.UsersException;
import com.example.demo.dto.UserAddress;
import com.example.demo.entity.Payments;
import com.example.demo.entity.TransactionHistory;
import com.example.demo.entity.Users;

import jakarta.validation.Valid;

public interface UsersService {
	List<Users> getAllUsers() throws UsersException;
	Users getUserById(Integer userId) throws UsersException;
	Users getUserByName(String userName) throws UsersException;
	List<Users> getUserByCity(String city) throws UsersException;
	List<Users> getUserByState(String state) throws UsersException;
	double getUserBalanceByUserId(Integer userId) throws UsersException;
    double getTotalVirtualGoldHoldings(Integer userId) throws UsersException; 
    double getTotalPhysicalGoldTransaction(Integer userId)throws UsersException;
    List<TransactionHistory> getUserTransactionHistory(Integer userId)throws UsersException;
    List<Payments> getUserPayments(Integer userId) throws UsersException;
    void addUser(Users user); 
    void addUserAddress(UserAddress user); 
    void updateUser(Integer userId, Users user); 
    void updateBalance(Integer userId, double amount); 
    void updateAddress(Integer userId, Integer addressId);
	Users createUser(@Valid Users user);
}

