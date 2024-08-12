package com.example.demo.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.demo.Exception.TransactionHistoryException;
import com.example.demo.Repository.TransactionHistoryRepository;
import com.example.demo.dto.Transaction_typeH;
import com.example.demo.entity.TransactionHistory;
@Service
public class TransactionHistoryServiceImpl implements TransactionHistoryService{
	@Autowired
	private TransactionHistoryRepository transactionRepo;
	@Override
	public List<TransactionHistory> getAllTransactionHistory() throws TransactionHistoryException{
		if(transactionRepo.findAll().isEmpty()) {
			throw new TransactionHistoryException("There is no transaction history data in the database.");
		}
		  return transactionRepo.findAll();
	}

	@Override
	public TransactionHistory getTransactionHistoryById(int transactionId) throws TransactionHistoryException{
		if(transactionRepo.findById(transactionId).isEmpty()) {
			throw new TransactionHistoryException("There is no transaction history data for "+transactionId+" in the database.");
		}
		   return transactionRepo.findById(transactionId).get();
	}

	@Override
	public List<TransactionHistory> getTransactionHistoryByUserId(int userId) throws TransactionHistoryException{
		if(transactionRepo.findTransactionHistoryByUserId(userId).isEmpty()) {
			throw new TransactionHistoryException("There are no transaction history data for id "+userId+" in the database.");
		}
		   return transactionRepo.findTransactionHistoryByUserId(userId);
	}

	@Override
	public List<TransactionHistory> getSuccessfulTransactionHistory() throws TransactionHistoryException{
		if(transactionRepo.findSuccessfulTransactionHistory().isEmpty()) {
			throw new TransactionHistoryException("There are no successful transaction history data in the database.");
		}
		   return transactionRepo.findSuccessfulTransactionHistory();
	}

	@Override
	public List<TransactionHistory> getFailedTransactionHistory() throws TransactionHistoryException{
		if(transactionRepo.findFailedTransactionHistory().isEmpty()) {
			throw new TransactionHistoryException("There are no failed transaction history data in the database.");
		}
		   return transactionRepo.findFailedTransactionHistory();
	}

	@Override
	public List<TransactionHistory> getTransactionHistoryByType(Transaction_typeH transactionType1) throws TransactionHistoryException{
		if(transactionRepo.findTransactionHistoryType(transactionType1).isEmpty()) {
			throw new TransactionHistoryException("There are no transaction history data for transactionType "+transactionType1+" in the database.");
		}
		  return transactionRepo.findTransactionHistoryType(transactionType1);
	}

	@Override
	public void addTransactionHistory(TransactionHistory transaction) {
		transactionRepo.save(transaction);
		
	}

}
