package com.example.demo.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.demo.dto.Payment_method;
import com.example.demo.entity.Payments;

public interface PaymentsRepository extends JpaRepository<Payments,Integer>{
	 @Query("SELECT p FROM Payments p WHERE p.users.userId = :userId")
	    List<Payments> findAllByUserId(@Param("userId") int userId);
	 @Query("SELECT p FROM Payments p WHERE p.payment_status = Payment_status.Success")
	    List<Payments> findAllSuccessfulPayments();
	 @Query("SELECT p FROM Payments p WHERE p.payment_status = Payment_status.Failed")
	    List<Payments> findAllFailedPayments();
	 @Query("SELECT p FROM Payments p WHERE p.payment_method = :pay")
	    List<Payments> findAllPaymentsByyPaymentMethod(@Param("pay") Payment_method pay);   
}
