package com.example.demo.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.demo.entity.VirtualGoldHolding;

public interface VirtualGoldHoldingRepository extends JpaRepository<VirtualGoldHolding,Integer>{
	@Query("SELECT vgh FROM VirtualGoldHolding vgh WHERE vgh.users.userId = :userId")
    List<VirtualGoldHolding> findAllByUserId(@Param("userId")Integer userId);
	 @Query("SELECT vgh FROM VirtualGoldHolding vgh " +
	           "WHERE vgh.users.userId = :userId " +
	           "AND vgh.vendorBranches.vendor.vendorId = :vendorId")
	    List<VirtualGoldHolding> findByUserIdAndVendorId(@Param("userId") Integer userId,@Param("vendorId") Integer vendorId);
}
