package com.example.demo.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.demo.entity.Vendors;
public interface VendorsRepository extends JpaRepository<Vendors,Integer>{
	@Query("SELECT u FROM Vendors u WHERE u.vendorName = ?1")
    Vendors findByUserName(@Param("vendorName")String vendorName);  

}
