package com.example.demo.Repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.demo.entity.TransactionHistory;
import com.example.demo.entity.VendorBranch;

public interface VendorBranchRepository extends JpaRepository<VendorBranch,Integer>{
	@Query("SELECT vb FROM VendorBranch vb JOIN vb.vendor v WHERE v.vendorId = :vendorId")
    List<VendorBranch> findVendorBranchesByVendorId(@Param("vendorId")int vendorId);
	@Query("SELECT t from VendorBranch t WHERE t.addresses.city= :city")
	List<VendorBranch> findVendorBranchCity(@Param("city")String city);
	@Query("SELECT t from VendorBranch t WHERE t.addresses.state= :state")
	List<VendorBranch> findVendorBranchState(@Param("state")String state);
	@Query("SELECT t from VendorBranch t WHERE t.addresses.country= :country")
	List<VendorBranch> findVendorBranchCountry(@Param("country")String country);
	 @Query("SELECT th FROM VendorBranch vb JOIN vb.transactionHistories th WHERE vb.branchId = :branchId")
	    List<TransactionHistory> findTransactionHistoriesByBranchId(@Param("branchId")Integer branchId);

}
