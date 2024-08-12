package com.example.demo.Controller;

import java.time.LocalDate;
import java.util.List;
 
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.demo.Exception.PaymentsException;
import com.example.demo.dto.ExceptionMessage;
import com.example.demo.dto.Payment_method;
import com.example.demo.entity.Payments;
import com.example.demo.service.PaymentsService;
 
@RestController
@RequestMapping("/api/v1/payments")
@CrossOrigin(origins = "http://localhost:3000")
public class PaymentsController {
	
	@Autowired
	PaymentsService service;
	
	@GetMapping("/")
	public List<Payments> getAllPayments() throws PaymentsException{
		return service.getAllPayments();
	}
	
	@GetMapping("/{payment_id}")
	public ResponseEntity<Payments> getPaymentsById(@PathVariable("payment_id") int payId) throws PaymentsException{
		return new ResponseEntity<Payments>(service.getPaymentById(payId), HttpStatus.OK);
	}
	
	@GetMapping("/by_user/{user_id}")
	public ResponseEntity<List<Payments>> getPaymentsByPaymnetsId(@PathVariable int user_id) throws PaymentsException{
		 List<Payments> payments = service.getAllPaymentsByUserId(user_id);
	        return new ResponseEntity<>(payments, HttpStatus.OK);
	}
	
	@GetMapping("/successful")
    public ResponseEntity<List<Payments>> getAllSuccessfulPayments() throws PaymentsException{
        List<Payments> payments = service.getAllSuccessfulPayments();
        return new ResponseEntity<>(payments, HttpStatus.OK);
    }
 
    @GetMapping("/failed")
    public ResponseEntity<List<Payments>> getAllFailedPayments() throws PaymentsException{
        List<Payments> payments = service.getAllFailedPayments();
        return new ResponseEntity<>(payments, HttpStatus.OK);
    }
 
    @GetMapping("/by_payment_method/{payment_method}")
    public ResponseEntity<List<Payments>> getAllPaymentsByPaymentMethod(@PathVariable("payment_method") Payment_method payment_method) throws PaymentsException{
        List<Payments> payments = service.getAllPaymentsByPaymentMethod(payment_method);
        return new ResponseEntity<>(payments, HttpStatus.OK);
    }
 
    @PostMapping("/add")
    public ResponseEntity<String> addPayment(@RequestBody Payments request) {
        service.addPayment(request);
        return new ResponseEntity<>("Payment added successfully.", HttpStatus.CREATED);
    }
    @ExceptionHandler({PaymentsException.class})
	public ResponseEntity<ExceptionMessage> handleBalanceLowException(PaymentsException ex){
		ExceptionMessage message = new ExceptionMessage(ex.getMessage(), LocalDate.now());
		return new ResponseEntity<ExceptionMessage>(message, HttpStatus.NOT_FOUND);
	} 
}