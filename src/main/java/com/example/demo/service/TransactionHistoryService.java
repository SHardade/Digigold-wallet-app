package com.example.demo.service;

import java.util.List;

import com.example.demo.Exception.TransactionHistoryException;
import com.example.demo.dto.Transaction_typeH;
import com.example.demo.entity.TransactionHistory;

public interface TransactionHistoryService {
	List<TransactionHistory> getAllTransactionHistory() throws TransactionHistoryException;
    TransactionHistory getTransactionHistoryById(int transactionId) throws TransactionHistoryException;
    List<TransactionHistory> getTransactionHistoryByUserId(int userId) throws TransactionHistoryException;
    List<TransactionHistory> getSuccessfulTransactionHistory() throws TransactionHistoryException;
    List<TransactionHistory> getFailedTransactionHistory() throws TransactionHistoryException;
    List<TransactionHistory> getTransactionHistoryByType(Transaction_typeH transactionType)throws TransactionHistoryException;
    void addTransactionHistory(TransactionHistory transaction);

}
