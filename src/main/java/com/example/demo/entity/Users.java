package com.example.demo.entity;

import java.time.LocalDateTime;
import java.util.List;

import org.hibernate.annotations.CreationTimestamp;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;

@Entity
@Table(name = "users")
public class Users {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "user_id")
	private int userId;

	@NotNull
	@NotBlank
	@Email(message = "email must be properly formed")
	@Column(name = "email")
	private String email;

	@Pattern(regexp = "^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@_$#*]).{5,15}$", message = "Password must be 5-15 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one of the following special characters: @_$#*")
	@Column(name = "password")
	private String password;

	@Column(name = "name")
	private String Name;

	@Column(name = "balance")
	private double balance;

	@Column(name = "creates_at")
	@CreationTimestamp
	private LocalDateTime createdAt;

	@ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	@JsonIgnore
	private Addresses addresses;

	@OneToMany(mappedBy = "users", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	@JsonIgnore
	private List<TransactionHistory> transactionHistories;

	@OneToMany(mappedBy = "users", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	@JsonIgnore
	private List<VirtualGoldHolding> virtualGoldHoldings;

	@OneToMany(mappedBy = "users", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	@JsonIgnore
	private List<PhysicalGoldTransaction> physicalGoldTransactions;

	@OneToMany(mappedBy = "users", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	@JsonIgnore
	private List<Payments> payments;

	public int getUserId() {
		return userId;
	}

	public void setUserId(int userId) {
		this.userId = userId;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getName() {
		return Name;
	}

	public void setName(String name) {
		Name = name;
	}

	public double getBalance() {
		return balance;
	}

	public void setBalance(double balance) {
		this.balance = balance;
	}

	public LocalDateTime getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(LocalDateTime createdAt) {
		this.createdAt = createdAt;
	}

	public Addresses getAddresses() {
		return addresses;
	}

	public void setAddresses(Addresses addresses) {
		this.addresses = addresses;
	}

	public List<TransactionHistory> getTransactionHistories() {
		return transactionHistories;
	}

	public void setTransactionHistories(List<TransactionHistory> transactionHistories) {
		this.transactionHistories = transactionHistories;
	}

	public List<VirtualGoldHolding> getVirtualGoldHoldings() {
		return virtualGoldHoldings;
	}

	public void setVirtualGoldHoldings(List<VirtualGoldHolding> virtualGoldHoldings) {
		this.virtualGoldHoldings = virtualGoldHoldings;
	}

	public List<PhysicalGoldTransaction> getPhysicalGoldTransactions() {
		return physicalGoldTransactions;
	}

	public void setPhysicalGoldTransactions(List<PhysicalGoldTransaction> physicalGoldTransactions) {
		this.physicalGoldTransactions = physicalGoldTransactions;
	}

	public List<Payments> getPayments() {
		return payments;
	}

	public void setPayments(List<Payments> payments) {
		this.payments = payments;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public Users(int userId, String email, String password, String name, double balance, LocalDateTime createdAt,
			Addresses addresses, List<TransactionHistory> transactionHistories,
			List<VirtualGoldHolding> virtualGoldHoldings, List<PhysicalGoldTransaction> physicalGoldTransactions,
			List<Payments> payments) {
		super();
		this.userId = userId;
		this.email = email;
		this.password = password;
		Name = name;
		this.balance = balance;
		this.createdAt = createdAt;
		this.addresses = addresses;
		this.transactionHistories = transactionHistories;
		this.virtualGoldHoldings = virtualGoldHoldings;
		this.physicalGoldTransactions = physicalGoldTransactions;
		this.payments = payments;
	}

	public Users() {
	}

}
