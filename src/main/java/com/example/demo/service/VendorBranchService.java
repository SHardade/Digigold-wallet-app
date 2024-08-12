package com.example.demo.service;

import java.util.List;

import com.example.demo.Exception.VendorBranchException;
import com.example.demo.entity.TransactionHistory;
import com.example.demo.entity.VendorBranch;

public interface VendorBranchService {
	List<VendorBranch> getAllVendorBranch()throws VendorBranchException;
	VendorBranch getVendorBranchByBranchId(int branchId) throws VendorBranchException;
	List<VendorBranch> getVendorBranchByVendorId(int vendorId)throws VendorBranchException;
	List<VendorBranch> getVendorBranchByCity(String city)throws VendorBranchException;
	List<VendorBranch> getVendorBranchByState(String state)throws VendorBranchException;
	List<VendorBranch> getVendorBranchByCountry(String country)throws VendorBranchException;
	List<TransactionHistory> getVendorBranchTransactionByBranchId(int branchId)throws VendorBranchException;
    void addVendorBranch(VendorBranch vendorbranch);
    public void transferGold(int sourceBranchId, int destinationBranchId, double quantity);
    void updateVendorBranch(VendorBranch vendorBranch);

}
