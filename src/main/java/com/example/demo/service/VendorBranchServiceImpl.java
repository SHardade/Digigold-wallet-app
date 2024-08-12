package com.example.demo.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.Exception.VendorBranchException;
import com.example.demo.Repository.TransactionHistoryRepository;
import com.example.demo.Repository.VendorBranchRepository;
import com.example.demo.entity.TransactionHistory;
import com.example.demo.entity.VendorBranch;

import jakarta.transaction.Transactional;
 
@Service
public class VendorBranchServiceImpl implements VendorBranchService{
	
	@Autowired
	VendorBranchRepository repo;
	
	@Autowired
	TransactionHistoryRepository repo1;
 
	@Override
	public List<VendorBranch> getAllVendorBranch() throws VendorBranchException{
		if(repo.findAll().isEmpty()) {
			throw new VendorBranchException("There is no data in database.");
		}
		return repo.findAll();
	}
 
	@Override
	public VendorBranch getVendorBranchByBranchId(int branchId) throws VendorBranchException{
		if(repo.findById(branchId).isEmpty()) {
			throw new VendorBranchException("There is no data in database for id "+branchId);
		}
		  return repo.findById(branchId).get();
	}
 
	
	@Override
	public List<VendorBranch> getVendorBranchByVendorId(int vendorId) throws VendorBranchException{
		if(repo.findVendorBranchesByVendorId(vendorId).isEmpty()) {
			throw new VendorBranchException("There is no data in database for id "+vendorId);
		}
		return repo.findVendorBranchesByVendorId(vendorId);
	}
 
	@Override
	public List<VendorBranch> getVendorBranchByCity(String city) throws VendorBranchException{
		if(repo.findVendorBranchCity(city).isEmpty()) {
			throw new VendorBranchException("There is no data in database for city "+city);
		}
		    return repo.findVendorBranchCity(city);
	}
 
	@Override
	public List<VendorBranch> getVendorBranchByState(String state) throws VendorBranchException{
		if(repo.findVendorBranchState(state).isEmpty()) {
			throw new VendorBranchException("There is no data in database for state "+state);
		}
		    return repo.findVendorBranchState(state);
	}
 
	@Override
	public List<VendorBranch> getVendorBranchByCountry(String country) throws VendorBranchException{
		if(repo.findVendorBranchCountry(country).isEmpty()) {
			throw new VendorBranchException("There is no data in database for country "+country);
		}
		    return repo.findVendorBranchCountry(country);
	}
 
	@Override
    public List<TransactionHistory> getVendorBranchTransactionByBranchId(int branchId) throws VendorBranchException{
		if(repo.findTransactionHistoriesByBranchId(branchId).isEmpty()) {
			throw new VendorBranchException("There are no transaction histories in database for id "+branchId);
		}
    	   return repo.findTransactionHistoriesByBranchId(branchId);
    }
 
	@Override
	public void addVendorBranch(VendorBranch vendorbranch) {
		repo.save(vendorbranch);
		
	}
	@Transactional
    public void transferGold(int sourceBranchId, int destinationBranchId, double quantity) {
        VendorBranch sourceBranch = repo.findById(sourceBranchId).orElse(null);
        VendorBranch destinationBranch = repo.findById(destinationBranchId).orElse(null);
        if (sourceBranch != null && destinationBranch != null) {
            if (sourceBranch.getQuantity() >= quantity) {
                sourceBranch.setQuantity(sourceBranch.getQuantity() - quantity);
                destinationBranch.setQuantity(destinationBranch.getQuantity() + quantity);
                repo.save(sourceBranch);
                repo.save(destinationBranch);
            } else {
                throw new RuntimeException("Insufficient gold quantity in the source branch.");
            }
        } else {
            throw new RuntimeException("One or both branches not found.");
        }
    }
 
	@Override
	public void updateVendorBranch(VendorBranch vendorBranch) {
		repo.save(vendorBranch);
	}
}
