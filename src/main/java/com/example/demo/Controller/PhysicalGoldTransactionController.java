package com.example.demo.Controller;

import com.example.demo.Exception.PhysicalGoldTransactionException;
import com.example.demo.dto.ExceptionMessage;
import com.example.demo.entity.PhysicalGoldTransaction;
import com.example.demo.service.PhysicalGoldTransactionsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/v1/physical_gold_transactions")
@CrossOrigin(origins = "http://localhost:3000")
public class PhysicalGoldTransactionController {
	@Autowired
    private  PhysicalGoldTransactionsService Service;

    @GetMapping
    public ResponseEntity<List<PhysicalGoldTransaction>> getAllPhysicalGoldTransactions() throws PhysicalGoldTransactionException{
        List<PhysicalGoldTransaction> transactions = Service.getAllPhysicalGoldTransactions();
        return new ResponseEntity<>(transactions, HttpStatus.OK);
    }

    @GetMapping("/{transactionId}")
    public ResponseEntity<PhysicalGoldTransaction> getPhysicalGoldTransactionById(@PathVariable("transactionId") int transactionId) throws PhysicalGoldTransactionException{
        PhysicalGoldTransaction transaction = Service.getPhysicalGoldTransactionById(transactionId);
        return new ResponseEntity<>(transaction, HttpStatus.OK);
    }

    @GetMapping("/byUser/{userId}")
    public ResponseEntity<List<PhysicalGoldTransaction>> getPhysicalGoldTransactionsByUserId(@PathVariable("userId") int userId) throws PhysicalGoldTransactionException{
        List<PhysicalGoldTransaction> transactions = Service.getPhysicalGoldTransactionsByUserId(userId);
        return new ResponseEntity<>(transactions, HttpStatus.OK);
    }

    @GetMapping("/by_branch/{branchId}")
    public ResponseEntity<List<PhysicalGoldTransaction>> getPhysicalGoldTransactionsByBranchId(@PathVariable("branchId") int branchId) throws PhysicalGoldTransactionException {
        List<PhysicalGoldTransaction> transactions = Service.getPhysicalGoldTransactionsByBranchId(branchId);
        return new ResponseEntity<>(transactions, HttpStatus.OK);
    }

    @GetMapping("/by_delivery_city/{city}")
    public ResponseEntity<List<PhysicalGoldTransaction>> getPhysicalGoldTransactionsByDeliveryCity(@PathVariable("city") String city) throws PhysicalGoldTransactionException{
        List<PhysicalGoldTransaction> transactions =Service.getPhysicalGoldTransactionsByDeliveryCity(city);
        return new ResponseEntity<>(transactions, HttpStatus.OK);
    }

    @GetMapping("/by_delivery_state/{state}")
    public ResponseEntity<List<PhysicalGoldTransaction>> getPhysicalGoldTransactionsByDeliveryState(@PathVariable("state") String state) throws PhysicalGoldTransactionException{
        List<PhysicalGoldTransaction> transactions = Service.getPhysicalGoldTransactionsByDeliveryState(state);
        return new ResponseEntity<>(transactions, HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<String> addPhysicalGoldTransaction(@RequestBody PhysicalGoldTransaction transaction) {
        Service.addPhysicalGoldTransaction(transaction);
        return ResponseEntity.status(HttpStatus.CREATED).body("PhysicalGoldTransaction details added successfully");
    }

    @PutMapping("/update/{transactionId}")
    public ResponseEntity<String> updatePhysicalGoldTransaction(@PathVariable("transactionId") int transactionId,
                                                                @RequestBody PhysicalGoldTransaction updatedTransaction) {
    	Service.addPhysicalGoldTransaction(updatedTransaction);
        return  ResponseEntity.ok().body("User details updated successfully");
    }
    @ExceptionHandler({PhysicalGoldTransactionException.class})
	public ResponseEntity<ExceptionMessage> handleBalanceLowException(PhysicalGoldTransactionException ex){
		ExceptionMessage message = new ExceptionMessage(ex.getMessage(), LocalDate.now());
		return new ResponseEntity<ExceptionMessage>(message, HttpStatus.NOT_FOUND);
	} 
}
        