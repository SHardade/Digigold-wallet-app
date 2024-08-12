package com.example.demo.entity;

import java.time.LocalDateTime;
import org.hibernate.annotations.CreationTimestamp;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
@Entity
@Table(name="physical_gold_transactions")
public class PhysicalGoldTransaction {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="transaction_id")
	private int transactionId;
	@Column(name="quantity")
	private double quantity;
	@Column(name="created_at")
	@CreationTimestamp
	private LocalDateTime createdAt;
	@ManyToOne(fetch=FetchType.LAZY, cascade=CascadeType.ALL)
	@JsonIgnore
	private VendorBranch vendorBranches;
	@ManyToOne(fetch=FetchType.LAZY, cascade=CascadeType.ALL)
	@JsonIgnore
	private Addresses addresses;
	@ManyToOne(fetch=FetchType.LAZY, cascade=CascadeType.ALL)
	@JsonIgnore
	private Users users;
	
	public VendorBranch getVendorBranches() {
		return vendorBranches;
	}
	public void setVendorBranches(VendorBranch vendorBranches) {
		this.vendorBranches = vendorBranches;
	}
	public Addresses getAddresses() {
		return addresses;
	}
	public void setAddresses(Addresses addresses) {
		this.addresses = addresses;
	}
	public Users getUsers() {
		return users;
	}
	public void setUsers(Users users) {
		this.users = users;
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
	public LocalDateTime getCreatedAt() {
		return createdAt;
	}
	public void setCreatedAt(LocalDateTime createdAt) {
		this.createdAt = createdAt;
	}
	
	public PhysicalGoldTransaction(int transactionId, double quantity, LocalDateTime createdAt,
			VendorBranch vendorBranches, Addresses addresses, com.example.demo.entity.Users users) {
		super();
		this.transactionId = transactionId;
		this.quantity = quantity;
		this.createdAt = createdAt;
		this.vendorBranches = vendorBranches;
		this.addresses = addresses;
		this.users = users;
	}
	public PhysicalGoldTransaction() {
		super();
	}
	

}
