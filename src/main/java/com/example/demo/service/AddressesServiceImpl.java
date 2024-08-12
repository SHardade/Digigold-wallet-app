package com.example.demo.service;

 
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.Exception.AddressesException;
import com.example.demo.Repository.AddressesRepository;
import com.example.demo.entity.Addresses;
 
@Service
public class AddressesServiceImpl implements AddressesService {
 
	@Autowired
	AddressesRepository repo;
 
	@Override
	public List<Addresses> getAllAddresses() throws AddressesException{
	if(repo.findAll().isEmpty()) {
		throw new AddressesException("There is no address in the database");
	}
		return repo.findAll();
	}
 
	@Override
	public Addresses getAddressById(int addId) throws AddressesException{
		if(repo.findById(addId).isEmpty()) {
			throw new AddressesException("The account with id "+addId+" does not exist");
		}else {
		   return repo.findById(addId).get();
		}
	}
 
	@Override
	public void addAddress(Addresses address) {
		repo.save(address);
	}
	@Override
	public void updateAddress(Addresses address) {
        repo.save(address); 
    }

 
}
