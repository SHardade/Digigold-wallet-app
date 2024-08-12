package com.example.demo.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import com.example.demo.dto.Transaction_typeH;
import com.example.demo.entity.TransactionHistory;

public interface TransactionHistoryRepository extends JpaRepository<TransactionHistory,Integer>{
	@Query("SELECT p FROM Payments p WHERE p.users.userId = :userId")
	List<TransactionHistory> findTransactionHistoryByUserId(@Param("userId") int userId);
	@Query("SELECT p FROM TransactionHistory p WHERE p.transactionStatus = Transaction_status.Success")
	List<TransactionHistory> findSuccessfulTransactionHistory();
	@Query("SELECT p FROM TransactionHistory p WHERE p.transactionStatus = Transaction_status.Failed")
	List<TransactionHistory> findFailedTransactionHistory();
	@Query("SELECT p FROM TransactionHistory p WHERE p.transactionType = :transactionType1")
	List<TransactionHistory> findTransactionHistoryType(@Param("transactionType1")Transaction_typeH transactionType1);
}
