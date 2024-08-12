package com.example.demo.entity;

import java.time.LocalDateTime;
import org.hibernate.annotations.CreationTimestamp;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.CascadeType;
import jakarta.persistence.*;
import jakarta.persistence.FetchType;
import jakarta.persistence.ManyToOne;
@Entity
@Table(name="virtual_gold_holdings")
public class VirtualGoldHolding {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="holding_id")
	private int holdingId;
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
	private Users users;
	
	public int getHoldingId() {
		return holdingId;
	}
	public void setHoldingId(int holdingId) {
		this.holdingId = holdingId;
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
	
	public VirtualGoldHolding(int holdingId, double quantity, LocalDateTime createdAt, VendorBranch vendorBranches,
			Users users) {
		super();
		this.holdingId = holdingId;
		this.quantity = quantity;
		this.createdAt = createdAt;
		this.vendorBranches = vendorBranches;
		this.users = users;
	}
	public VirtualGoldHolding() {}

}
