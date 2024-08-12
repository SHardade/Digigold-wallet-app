package com.example.demo.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entity.Addresses;

public interface AddressesRepository extends JpaRepository<Addresses,Integer>{

}
