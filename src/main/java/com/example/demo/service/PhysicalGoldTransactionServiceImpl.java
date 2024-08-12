package com.example.demo.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.Exception.PhysicalGoldTransactionException;
import com.example.demo.Repository.PhysicalGoldTransactionRepository;
import com.example.demo.entity.PhysicalGoldTransaction;
@Service
public class PhysicalGoldTransactionServiceImpl implements PhysicalGoldTransactionsService{
	@Autowired
	private PhysicalGoldTransactionRepository transactions;

	@Override
	public List<PhysicalGoldTransaction> getAllPhysicalGoldTransactions() throws PhysicalGoldTransactionException{
		if(transactions.findAll().isEmpty()) {
			throw new PhysicalGoldTransactionException("There is no transaction in database.");
		}
		  return transactions.findAll();
	}

	@Override
	public PhysicalGoldTransaction getPhysicalGoldTransactionById(Integer transactionId) throws PhysicalGoldTransactionException{
		return transactions.findById(transactionId).get();
	}

	@Override
	public List<PhysicalGoldTransaction> getPhysicalGoldTransactionsByUserId(int userId) throws PhysicalGoldTransactionException{
		if(transactions.getPhysicalGoldTransactionByUserId(userId).isEmpty()) {
			throw new PhysicalGoldTransactionException("There are no transactions with id "+userId+" in database.");
		}
		   return transactions.getPhysicalGoldTransactionByUserId(userId);
	}

	@Override
	public List<PhysicalGoldTransaction> getPhysicalGoldTransactionsByBranchId(int branchId) throws PhysicalGoldTransactionException{
		if(transactions.getPhysicalGoldTransactionsByBranchId(branchId).isEmpty()) {
			throw new PhysicalGoldTransactionException("There are no transactions with id "+branchId+" in database.");
		}
		    return transactions.getPhysicalGoldTransactionsByBranchId(branchId);
	}

	@Override
	public List<PhysicalGoldTransaction> getPhysicalGoldTransactionsByDeliveryCity(String city) throws PhysicalGoldTransactionException{
		if(transactions.findPhysicalGoldTransactionsByBranchId(city).isEmpty()) {
			throw new PhysicalGoldTransactionException("There are no transactions with city "+city+" in database.");
		}
		   return transactions.findPhysicalGoldTransactionsByBranchId(city);
	}

	@Override
	public List<PhysicalGoldTransaction> getPhysicalGoldTransactionsByDeliveryState(String state) throws PhysicalGoldTransactionException{
		if(transactions.findPhysicalGoldTransactionsByDeliveryState(state).isEmpty()) {
			throw new PhysicalGoldTransactionException("There are no transactions with state "+state+" in database.");
		}
		    return transactions.findPhysicalGoldTransactionsByDeliveryState(state);
	}

	@Override
	public void addPhysicalGoldTransaction(PhysicalGoldTransaction transaction) {
		transactions.save(transaction);
	}

	@Override
	public void updatePhysicalGoldTransaction(int transactionId, PhysicalGoldTransaction updatedTransaction) {
		Optional<PhysicalGoldTransaction> existingHoldingOptional = transactions.findById(transactionId);
		PhysicalGoldTransaction existingHolding = existingHoldingOptional.get();
        existingHolding.setQuantity(updatedTransaction.getQuantity());
        transactions.save(existingHolding);
}

}
