package com.example.demo.service;
 
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.demo.Exception.PaymentsException;
import com.example.demo.Repository.PaymentsRepository;
import com.example.demo.dto.Payment_method;
import com.example.demo.entity.Payments;
@Service
public class PaymentServiceImpl implements PaymentsService{
 
	@Autowired
	PaymentsRepository repo;
	
	public List<Payments> getAllPayments() throws PaymentsException{
		if(repo.findAll().isEmpty()) {
			throw new PaymentsException("There is no payment data in the database.");
		}else {
          return repo.findAll();
		}
    }
 
 
	@Override
	public Payments getPaymentById(int paymentId) throws PaymentsException{
		if(repo.findById(paymentId).isEmpty()) {
			throw new PaymentsException("The payment with id "+paymentId+" does not exist.");
		}else {
		  return repo.findById(paymentId).get();
		}
	}
 
	@Override
	public List<Payments> getAllPaymentsByUserId(int userId) throws PaymentsException{
		if(repo.findAllByUserId(userId).isEmpty()) {
			throw new PaymentsException("There are no payments with id "+userId+" exist in the database.");
		}
            return repo.findAllByUserId(userId);
	}
 
	@Override
	public List<Payments> getAllSuccessfulPayments() throws PaymentsException{
		if(repo.findAllSuccessfulPayments().isEmpty()) {
			throw new PaymentsException("The account does not exist.");
		}
		    return repo.findAllSuccessfulPayments();
	}
 
	@Override
	public List<Payments> getAllFailedPayments() throws PaymentsException{
		if(repo.findAllFailedPayments().isEmpty()) {
			throw new PaymentsException("The account does not exist.");
		}
		   return repo.findAllFailedPayments();
	}
 
	@Override
	public List<Payments> getAllPaymentsByPaymentMethod(Payment_method pay) throws PaymentsException{
		if(repo.findAllPaymentsByyPaymentMethod(pay).isEmpty()) {
			throw new PaymentsException("The account does not exist.");
		}
		   return repo.findAllPaymentsByyPaymentMethod(pay);
	}
 
	@Override
	public void addPayment(Payments pay) {
		repo.save(pay);
 
	}
}
 