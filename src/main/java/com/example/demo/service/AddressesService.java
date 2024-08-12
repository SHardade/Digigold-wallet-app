package com.example.demo.service;

import java.util.List;

import com.example.demo.Exception.AddressesException;
import com.example.demo.entity.Addresses;

public interface AddressesService {
	List<Addresses> getAllAddresses() throws AddressesException; 
	Addresses getAddressById(int addId) throws AddressesException;
    void addAddress(Addresses address);
    void updateAddress(Addresses address);
}
