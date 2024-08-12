package com.example.demo.entity;

import java.time.LocalDateTime;
import org.hibernate.annotations.CreationTimestamp;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.example.demo.dto.Payment_method;
import com.example.demo.dto.Payment_status;
import com.example.demo.dto.Transaction_type;
import jakarta.persistence.*;
@Entity
@Table(name="payments")
public class Payments {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="payment_id")
	private int paymentId;
	@Column(name="amount")
	private double amount;
	@Column(name="transaction_type")
	private Transaction_type transaction_type;
	@Column(name="payment_method")
	private Payment_method payment_method;
	@Column(name="payment_status")
	private Payment_status payment_status;
	
	@Column(name="created_at")
	@CreationTimestamp
	private LocalDateTime createdAt;
	@ManyToOne(fetch=FetchType.LAZY, cascade=CascadeType.ALL)
	@JsonIgnore
	private Users users;
	public Payments() {
		super();
	}
	
	public Transaction_type getTransaction_type() {
		return transaction_type;
	}

	public void setTransaction_type(Transaction_type transaction_type) {
		this.transaction_type = transaction_type;
	}

	public Payment_method getPayment_method() {
		return payment_method;
	}

	public void setPayment_method(Payment_method payment_method) {
		this.payment_method = payment_method;
	}

	public Payment_status getPayment_status() {
		return payment_status;
	}

	public void setPayment_status(Payment_status payment_status) {
		this.payment_status = payment_status;
	}

	public int getPaymentId() {
		return paymentId;
	}
	public void setPaymentId(int paymentId) {
		this.paymentId = paymentId;
	}
	public Users getUsers() {
		return users;
	}
	public void setUsers(Users users) {
		this.users = users;
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

	public Payments(int paymentId, double amount, com.example.demo.dto.Transaction_type transaction_type,
			com.example.demo.dto.Payment_method payment_method, com.example.demo.dto.Payment_status payment_status,
			LocalDateTime createdAt, com.example.demo.entity.Users users) {
		super();
		this.paymentId = paymentId;
		this.amount = amount;
		this.transaction_type = transaction_type;
		this.payment_method = payment_method;
		this.payment_status = payment_status;
		this.createdAt = createdAt;
		this.users = users;
	}
	
	
	
}
