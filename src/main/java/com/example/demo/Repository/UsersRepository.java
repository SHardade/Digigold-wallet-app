package com.example.demo.Repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import com.example.demo.entity.Payments;
import com.example.demo.entity.TransactionHistory;
import com.example.demo.entity.Users;

public interface UsersRepository extends JpaRepository<Users,Integer>{
	@Query("SELECT u FROM Users u WHERE u.Name = ?1")
    Users findByUserName(@Param("userName")String userName);
	@Query("SELECT t from Users t WHERE t.addresses.city= :city")
	List<Users> findUserByCity(@Param("city")String city);
	@Query("SELECT t from Users t WHERE t.addresses.state= :state")
	List<Users> findUserByState(@Param("state")String state);
	 @Query("SELECT u.balance FROM Users u WHERE u.userId = :userId")
	    Double findBalanceByUserId(@Param("userId")Integer userId);
	 @Query("SELECT SUM(v.quantity) FROM VirtualGoldHolding v WHERE v.users.userId = :userId")
	    Double findTotalVirtualGoldHoldings(@Param("userId")Integer userId);
	 @Query("SELECT SUM(t.quantity) FROM Users u JOIN u.physicalGoldTransactions t WHERE u.userId = :userId")
	    Double findTotalPhysicalGoldTransaction(@Param("userId")Integer userId);
	 @Query("SELECT th FROM Users u JOIN u.transactionHistories th WHERE u.userId = :userId")
	    List<TransactionHistory> findTransactionHistoriesByUserId(@Param("userId")Integer userId);
	 @Query("SELECT p FROM Users u JOIN u.payments p WHERE u.userId = :userId")
	    List<Payments> findPaymentsByUserId(@Param("userId")Integer userId);
	 @Query("SELECT t from Users t WHERE t.email= :email")
	 Users findByUseremail(@Param("email")String email);
}
	

