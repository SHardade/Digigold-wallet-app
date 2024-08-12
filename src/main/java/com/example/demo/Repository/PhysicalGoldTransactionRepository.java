package com.example.demo.Repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import com.example.demo.entity.PhysicalGoldTransaction;

public interface PhysicalGoldTransactionRepository extends JpaRepository<PhysicalGoldTransaction,Integer>{
	@Query("SELECT p FROM PhysicalGoldTransaction p WHERE p.users.userId = :userId")
	List<PhysicalGoldTransaction> getPhysicalGoldTransactionByUserId(@Param("userId") int userId);
	@Query("SELECT t FROM PhysicalGoldTransaction t WHERE t.vendorBranches.branchId = :branchId")
	 List<PhysicalGoldTransaction> getPhysicalGoldTransactionsByBranchId(@Param("branchId") int branchId);
	@Query("SELECT t from PhysicalGoldTransaction t WHERE t.addresses.city= :city")
	 List<PhysicalGoldTransaction> findPhysicalGoldTransactionsByBranchId(@Param("city")String city);
	@Query("SELECT t from PhysicalGoldTransaction t WHERE t.addresses.state= :state")
	 List<PhysicalGoldTransaction> findPhysicalGoldTransactionsByDeliveryState(@Param("state")String state);


}
