package com.example.demo.entity;

import java.time.LocalDateTime;
import org.hibernate.annotations.CreationTimestamp;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import com.example.demo.dto.Transaction_typeH;
import com.example.demo.dto.Transaction_status;
@Entity
@Table(name="transaction_history")
public class TransactionHistory {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="transaction_id")
	private int transactionId;
	@Column(name="quantity")
	private double quantity;
	@Column(name="amount")
	private double amount;
	@Column(name="created_at")
	@CreationTimestamp
	private LocalDateTime createdAt;
	@Column(name="transaction_type")
	private Transaction_typeH transactionType;
	@Column(name="transaction_status")
	private Transaction_status transactionStatus;
	@ManyToOne(fetch=FetchType.LAZY, cascade=CascadeType.ALL)
	@JsonIgnore
	private VendorBranch vendorBranches;
	@ManyToOne(fetch=FetchType.LAZY, cascade=CascadeType.ALL)
	@JsonIgnore
	private Users users;
	
	
	
	public Transaction_typeH getTransactionType() {
		return transactionType;
	}
	public void setTransactionType(Transaction_typeH transactionType) {
		this.transactionType = transactionType;
	}
	public Transaction_status getTransactionStatus() {
		return transactionStatus;
	}
	public void setTransactionStatus(Transaction_status transactionStatus) {
		this.transactionStatus = transactionStatus;
	}
	public int getTransactionId() {
		return transactionId;
	}
	public void setTransactionId(int transactionId) {
		this.transactionId = transactionId;
	}
	public double getQuantity() {
		return quantity;
	}
	public void setQuantity(double quantity) {
		this.quantity = quantity;
	}
	public double getAmount() {
		return amount;
	}
	public void setAmount(double amount) {
		this.amount = amount;
	}
	public LocalDateTime getCreatedAt() {
		return createdAt;
	}
	public void setCreatedAt(LocalDateTime createdAt) {
		this.createdAt = createdAt;
	}
	
	
	public VendorBranch getVendorBranches() {
		return vendorBranches;
	}
	public void setVendorBranches(VendorBranch vendorBranches) {
		this.vendorBranches = vendorBranches;
	}
	public Users getUsers() {
		return users;
	}
	public void setUsers(Users users) {
		this.users = users;
	}
	
	public TransactionHistory(int transactionId, double quantity, double amount, LocalDateTime createdAt,
			VendorBranch vendorBranches, Users users) {
		super();
		this.transactionId = transactionId;
		this.quantity = quantity;
		this.amount = amount;
		this.createdAt = createdAt;
		this.vendorBranches = vendorBranches;
		this.users = users;
	}
	public TransactionHistory() {}
	

}
