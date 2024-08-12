package com.example.demo.service;

import java.util.List;

import com.example.demo.Exception.VirtualGoldHoldingException;
import com.example.demo.entity.VirtualGoldHolding;

public interface VirtualGoldHoldingService {
	List<VirtualGoldHolding> getAllVirtualGoldHolding() throws VirtualGoldHoldingException;
	List<VirtualGoldHolding> getAllVirtualGoldHolding(Integer userId) throws VirtualGoldHoldingException;
	VirtualGoldHolding getVirtualGoldHoldingByHoldingId(Integer holdingId)throws VirtualGoldHoldingException;
	List<VirtualGoldHolding> getVirtualGoldHoldingsByUserAndVendor(int userId, int vendorId) throws VirtualGoldHoldingException;
	void addVirtualGoldHolding(VirtualGoldHolding virtualgold);
	void convertToPhysical(int holdingId);
	void updateVirtualGoldHolding(int holdingId, VirtualGoldHolding updatedHolding);
}
