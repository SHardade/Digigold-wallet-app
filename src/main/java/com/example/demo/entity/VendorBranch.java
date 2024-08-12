package com.example.demo.entity;

import java.time.LocalDateTime;
import java.util.List;

import org.hibernate.annotations.CreationTimestamp;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;
@Entity
@Table(name="vendor_branches")
public class VendorBranch {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="branch_id")
	private int branchId;
	@Column(name="quantity")
	private double quantity;
	@Column(name="created_at")
	@CreationTimestamp
	private LocalDateTime createdAt;
	@ManyToOne(fetch=FetchType.LAZY, cascade=CascadeType.ALL)
	@JsonIgnore
	private Vendors vendor;
	@OneToMany(mappedBy = "vendorBranches", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	@JsonIgnore
	private List<PhysicalGoldTransaction> physicalGoldTransactions;
	@OneToMany(mappedBy = "vendorBranches", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	@JsonIgnore
	private List<VirtualGoldHolding> virtualGoldHoldings;
	@OneToMany(mappedBy = "vendorBranches", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	@JsonIgnore
	private List<TransactionHistory> transactionHistories;
	@ManyToOne(fetch=FetchType.LAZY, cascade=CascadeType.ALL)
	@JsonIgnore
	private Addresses addresses;
	
	public List<PhysicalGoldTransaction> getPhysicalGoldTransactions() {
		return physicalGoldTransactions;
	}
	public void setPhysicalGoldTransactions(List<PhysicalGoldTransaction> physicalGoldTransactions) {
		this.physicalGoldTransactions = physicalGoldTransactions;
	}
	public List<VirtualGoldHolding> getVirtualGoldHoldings() {
		return virtualGoldHoldings;
	}
	public void setVirtualGoldHoldings(List<VirtualGoldHolding> virtualGoldHoldings) {
		this.virtualGoldHoldings = virtualGoldHoldings;
	}
	public List<TransactionHistory> getTransactionHistories() {
		return transactionHistories;
	}
	public void setTransactionHistories(List<TransactionHistory> transactionHistories) {
		this.transactionHistories = transactionHistories;
	}
	public Addresses getAddresses() {
		return addresses;
	}
	public void setAddresses(Addresses addresses) {
		this.addresses = addresses;
	}
	public Vendors getVendor() {
		return vendor;
	}
	public void setVendor(Vendors vendor) {
		this.vendor = vendor;
	}
	public int getBranchId() {
		return branchId;
	}
	public void setBranchId(int branchId) {
		this.branchId = branchId;
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
	
	
	public VendorBranch(int branchId, double quantity, LocalDateTime createdAt, Vendors vendor,
			List<PhysicalGoldTransaction> physicalGoldTransactions, List<VirtualGoldHolding> virtualGoldHoldings,
			List<TransactionHistory> transactionHistories, Addresses addresses) {
		super();
		this.branchId = branchId;
		this.quantity = quantity;
		this.createdAt = createdAt;
		this.vendor = vendor;
		this.physicalGoldTransactions = physicalGoldTransactions;
		this.virtualGoldHoldings = virtualGoldHoldings;
		this.transactionHistories = transactionHistories;
		this.addresses = addresses;
	}
	public VendorBranch() {}
	

}
