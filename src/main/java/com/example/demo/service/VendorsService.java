package com.example.demo.service;

import java.util.List;

import com.example.demo.Exception.VendorsException;
import com.example.demo.entity.Vendors;

import jakarta.validation.Valid;

public interface VendorsService {
	List<Vendors> getAllVendors() throws VendorsException; 
	Vendors getVendorById(int vendorId) throws VendorsException;
	Vendors getVendorByName(String vendorName)throws VendorsException;
    void addvendors(Vendors vendor);
    void updateVendor(Vendors vendor);
    void updateTotalGoldQuantityById(int vendorId, double newTotalGoldQuantity);
    void updateAllCurrentGoldPrice(double newPrice);
    double getNewPrice();
    Vendors createVendor(@Valid Vendors vendor);
}
