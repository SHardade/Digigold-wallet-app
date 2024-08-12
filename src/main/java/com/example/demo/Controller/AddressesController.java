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

import com.example.demo.Exception.AddressesException;
import com.example.demo.dto.ExceptionMessage;
import com.example.demo.entity.Addresses;
import com.example.demo.service.AddressesService;
 
@RestController
@RequestMapping("/api/v1/address")
@CrossOrigin(origins = "http://localhost:3000")
public class AddressesController {
 
	@Autowired
	AddressesService service;
 
	@GetMapping("/")
	public List<Addresses> getAllAddresses() throws AddressesException{
		return service.getAllAddresses();
	}
 
	@GetMapping("/{address_id}")
	public ResponseEntity<Addresses> getAddressesById(@PathVariable("address_id") int addId) throws AddressesException{
		return new ResponseEntity<Addresses>(service.getAddressById(addId), HttpStatus.OK);
	}
 
	@PostMapping("/add")
	public ResponseEntity<Void> addAddresses(@RequestBody Addresses address) {
		service.addAddress(address);
		return new ResponseEntity<>(HttpStatus.CREATED);
	}
 
	@PutMapping("/update/{address_id}")
	public ResponseEntity<Void> updateAddressById(@PathVariable("address_id") int addressId,
			@RequestBody Addresses updatedAddress) {
		Addresses existingAddress;
		try {
			existingAddress = service.getAddressById(addressId);
		if (existingAddress == null) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		existingAddress.setStreet(updatedAddress.getStreet());
		existingAddress.setCity(updatedAddress.getCity());
		existingAddress.setState(updatedAddress.getState());
		existingAddress.setPostal_code(updatedAddress.getPostalCode());
		existingAddress.setCountry(updatedAddress.getCountry());
		service.updateAddress(existingAddress);
		} catch (AddressesException e) {
			e.printStackTrace();
		}
		return new ResponseEntity<>(HttpStatus.OK);
	}
	@ExceptionHandler({AddressesException.class})
	public ResponseEntity<ExceptionMessage> handleBalanceLowException(AddressesException ex){
		ExceptionMessage message = new ExceptionMessage(ex.getMessage(), LocalDate.now());
		return new ResponseEntity<ExceptionMessage>(message, HttpStatus.NOT_FOUND);
	}
	
 
}