package com.example.demo.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.Exception.VirtualGoldHoldingException;
import com.example.demo.Repository.VirtualGoldHoldingRepository;
import com.example.demo.entity.PhysicalGoldTransaction;
import com.example.demo.entity.VirtualGoldHolding;
@Service
public class VirtualGoldHoldingServiceImpl implements VirtualGoldHoldingService{
	@Autowired
	private VirtualGoldHoldingRepository virtualGoldHoldingRepository;
	
	
	
	@Override
	public List<VirtualGoldHolding> getAllVirtualGoldHolding()throws VirtualGoldHoldingException {
		if(virtualGoldHoldingRepository.findAll().isEmpty()) {
			throw new VirtualGoldHoldingException("There is no data in the database.");
		}
		return virtualGoldHoldingRepository.findAll();
	}
	@Override
	public List<VirtualGoldHolding> getAllVirtualGoldHolding(Integer userId)throws VirtualGoldHoldingException {
		if(virtualGoldHoldingRepository.findAllByUserId(userId).isEmpty()) {
			throw new VirtualGoldHoldingException("There is no virtual gold holding for the id " +userId+ " in the database.");
		}
		 return virtualGoldHoldingRepository.findAllByUserId(userId);
	}
	@Override
	public VirtualGoldHolding getVirtualGoldHoldingByHoldingId(Integer holdingId)throws VirtualGoldHoldingException {
		if(virtualGoldHoldingRepository.findById(holdingId).isEmpty()) {
			throw new VirtualGoldHoldingException("There is no virtual gold holding for the holding id " +holdingId+ " in the database.");
		}
		return virtualGoldHoldingRepository.findById(holdingId).get();
	}
	@Override
	public List<VirtualGoldHolding> getVirtualGoldHoldingsByUserAndVendor(int userId, int vendorId)throws VirtualGoldHoldingException{
		if(virtualGoldHoldingRepository.findByUserIdAndVendorId(userId, vendorId).isEmpty()) {
			throw new VirtualGoldHoldingException("There is no virtual gold holding for the user id " +userId+ " and vendor id " +vendorId+ " in the database.");
		}
		return virtualGoldHoldingRepository.findByUserIdAndVendorId(userId, vendorId);
	}
	@Override
	public void addVirtualGoldHolding(VirtualGoldHolding virtualgold) {
		virtualGoldHoldingRepository.save(virtualgold);
	}
	@Override
	public void convertToPhysical(int holdingId) {
		VirtualGoldHolding virtualGoldHolding = virtualGoldHoldingRepository.findById(holdingId).orElse(null);
            PhysicalGoldTransaction physicalTransaction = new PhysicalGoldTransaction();
            physicalTransaction.setQuantity(virtualGoldHolding.getQuantity());
            physicalTransaction.setCreatedAt(LocalDateTime.now());
            physicalTransaction.setVendorBranches(virtualGoldHolding.getVendorBranches());
            physicalTransaction.setAddresses(virtualGoldHolding.getUsers().getAddresses());
            physicalTransaction.setUsers(virtualGoldHolding.getUsers());
            virtualGoldHoldingRepository.save(virtualGoldHolding);
	}
	@Override
	public void updateVirtualGoldHolding(int holdingId, VirtualGoldHolding updatedHolding) {
		Optional<VirtualGoldHolding> existingHoldingOptional = virtualGoldHoldingRepository.findById(holdingId);
            VirtualGoldHolding existingHolding = existingHoldingOptional.get();
            existingHolding.setQuantity(updatedHolding.getQuantity());
            virtualGoldHoldingRepository.save(existingHolding);
	}

}
