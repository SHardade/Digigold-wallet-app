package com.example.demo.service;

import java.util.List;

import com.example.demo.Exception.PhysicalGoldTransactionException;
import com.example.demo.entity.PhysicalGoldTransaction;

public interface PhysicalGoldTransactionsService {
	List<PhysicalGoldTransaction> getAllPhysicalGoldTransactions()throws PhysicalGoldTransactionException;
    PhysicalGoldTransaction getPhysicalGoldTransactionById(Integer transactionId)throws PhysicalGoldTransactionException;
    List<PhysicalGoldTransaction> getPhysicalGoldTransactionsByUserId(int userId)throws PhysicalGoldTransactionException;
    List<PhysicalGoldTransaction> getPhysicalGoldTransactionsByBranchId(int branchId)throws PhysicalGoldTransactionException;
    List<PhysicalGoldTransaction> getPhysicalGoldTransactionsByDeliveryCity(String city)throws PhysicalGoldTransactionException;
    List<PhysicalGoldTransaction> getPhysicalGoldTransactionsByDeliveryState(String state)throws PhysicalGoldTransactionException;
    void addPhysicalGoldTransaction(PhysicalGoldTransaction transaction);
    void updatePhysicalGoldTransaction(int transactionId, PhysicalGoldTransaction updatedTransaction);
}

