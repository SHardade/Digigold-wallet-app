package com.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.demo.Exception.VendorsException;
import com.example.demo.Repository.VendorsRepository;
import com.example.demo.entity.Vendors;
import jakarta.validation.Valid;

@Service
public class VendorServiceImpl implements VendorsService {

	@Autowired
	VendorsRepository repo;

	@Override
	public List<Vendors> getAllVendors() throws VendorsException {
		if (repo.findAll().isEmpty()) {
			throw new VendorsException("There is no data in the database.");
		}
		return repo.findAll();
	}

	@Override
	public Vendors getVendorById(int vendorId) throws VendorsException {
		if (repo.findById(vendorId).isEmpty()) {
			throw new VendorsException("There is no vendor for the id " + vendorId + " in the database.");
		}
		return repo.findById(vendorId).get();
	}

	@Override
	public Vendors getVendorByName(String vendorName) throws VendorsException {
		Vendors vendor = repo.findByUserName(vendorName);
		if (vendor == null) {
			throw new VendorsException("There is no vendor for the name " + vendorName + " in the database.");
		}
		return vendor;
	}

	@Override
	public void addvendors(Vendors vendor) {
		repo.save(vendor);

	}

	@Override
	public void updateVendor(Vendors vendor) {
		repo.save(vendor);

	}

	@Override
	public void updateTotalGoldQuantityById(int vendorId, double newTotalGoldQuantity) {
		Vendors vendor = repo.findById(vendorId).orElse(null);

		if (vendor != null) {
			vendor.setTotalGoldQuantity(newTotalGoldQuantity);

			repo.save(vendor);
		} else {
			System.out.println("Id not found");
		}
	}

	@Override
	public void updateAllCurrentGoldPrice(double newPrice) {
		List<Vendors> vendors = repo.findAll();
		for (Vendors vendor : vendors) {
			vendor.setCurrentGoldPrice(newPrice);
			repo.save(vendor);
		}

	}

	@Override
	public double getNewPrice() {
		List<Vendors> vendors = repo.findAll();
		double price = 0;
		for (Vendors vendor : vendors) {
			price = vendor.getCurrentGoldPrice();
		}
		return price;

	}

	@Override
	public Vendors createVendor(@Valid Vendors vendor) {
		return repo.save(vendor);
	}
}
