package com.example.demo.Controller;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.demo.Exception.VendorsException;
import com.example.demo.dto.ExceptionMessage;
import com.example.demo.entity.Vendors;
import com.example.demo.service.VendorsService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/v1/vendor")
@CrossOrigin(origins = "http://localhost:3000")
public class VendorsController {

	@Autowired
	VendorsService service;
	
	@GetMapping("/")
	public List<Vendors> getAllVendors() throws VendorsException {
		return service.getAllVendors();
	}

	@GetMapping("/{vendor_id}")
	public ResponseEntity<Vendors> getVendorById(@PathVariable("vendor_id") int vendorId) throws VendorsException {
		return new ResponseEntity<Vendors>(service.getVendorById(vendorId), HttpStatus.OK);
	}

	@GetMapping("/name/{vendor_name}")
	public ResponseEntity<Vendors> getVendorByName(@PathVariable("vendor_name") String vendorName)
			throws VendorsException {
		return new ResponseEntity<Vendors>(service.getVendorByName(vendorName), HttpStatus.OK);
	}

	@PostMapping("/add")
	public ResponseEntity<Void> addVendors(@RequestBody Vendors vendor) {
		service.addvendors(vendor);
		return new ResponseEntity<>(HttpStatus.CREATED);
	}

	@PutMapping("/update/{vendor_id}")
	public ResponseEntity<Void> updateVendorById(@PathVariable("vendor_id") int vendorId,
			@RequestBody Vendors updatedvendor) {
		Vendors existingVendor;
		try {
			existingVendor = service.getVendorById(vendorId);
			if (existingVendor == null) {
				return new ResponseEntity<>(HttpStatus.NOT_FOUND);
			}
			existingVendor.setVendorName(updatedvendor.getVendorName());
			existingVendor.setDescription(updatedvendor.getDescription());
			existingVendor.setContactPersonName(updatedvendor.getContactPersonName());
			existingVendor.setContactEmail(updatedvendor.getContactEmail());
			existingVendor.setContactPhone(updatedvendor.getContactPhone());
			existingVendor.setWebsiteUrl(updatedvendor.getWebsiteUrl());
			existingVendor.setTotalGoldQuantity(updatedvendor.getTotalGoldQuantity());
			existingVendor.setCurrentGoldPrice(updatedvendor.getCurrentGoldPrice());
			existingVendor.setCreatedAt(updatedvendor.getCreatedAt());
			service.updateVendor(existingVendor);
		} catch (VendorsException e) {
			e.printStackTrace();
		}
		return new ResponseEntity<>(HttpStatus.OK);
	}

	@PutMapping("/{vendorId}/total_gold_quantity/{quantity}")
	public ResponseEntity<Void> updateTotalGoldQuantityById(@PathVariable int vendorId, @PathVariable double quantity) {
		service.updateTotalGoldQuantityById(vendorId, quantity);
		return new ResponseEntity<>(HttpStatus.OK);
	}

	@PutMapping("/new_current_gold_price/{newPrice}")
	public ResponseEntity<Void> updateAllCurrentGoldPrice(@PathVariable double newPrice) {
		service.updateAllCurrentGoldPrice(newPrice);
		return new ResponseEntity<>(HttpStatus.OK);
	}

	@GetMapping("/price")
	public double getCurrentPrice() {
		return service.getNewPrice();
	}

	@ExceptionHandler({ VendorsException.class })
	public ResponseEntity<ExceptionMessage> handleBalanceLowException(VendorsException ex) {
		ExceptionMessage message = new ExceptionMessage(ex.getMessage(), LocalDate.now());
		return new ResponseEntity<ExceptionMessage>(message, HttpStatus.NOT_FOUND);
	}
	
	@PostMapping("/register")
    public ResponseEntity<Vendors> createVendor(@RequestBody @Valid Vendors vendor){
    	Vendors createVendor = this.service.createVendor(vendor);
    	return new ResponseEntity<>(createVendor, HttpStatus.CREATED);
    }
}
