package com.example.demo.service;

import java.util.List;

import com.example.demo.Exception.PaymentsException;
import com.example.demo.dto.Payment_method;
import com.example.demo.entity.Payments;

public interface PaymentsService {
	public List<Payments> getAllPayments()throws PaymentsException;
	 
	Payments getPaymentById(int paymentId)throws PaymentsException;
 
	public List<Payments> getAllPaymentsByUserId(int userId)throws PaymentsException;
 
	public List<Payments> getAllSuccessfulPayments()throws PaymentsException;
 
	public List<Payments> getAllFailedPayments()throws PaymentsException;
 
	public List<Payments> getAllPaymentsByPaymentMethod(Payment_method payment_method)throws PaymentsException;
 
	public void addPayment(Payments pay);

}
