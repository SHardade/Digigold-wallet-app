package com.example.demo.Controller;
import com.example.demo.Exception.TransactionHistoryException;
import com.example.demo.dto.ExceptionMessage;
import com.example.demo.dto.Transaction_typeH;
import com.example.demo.entity.TransactionHistory;
import com.example.demo.service.TransactionHistoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/v1/transaction_history")
@CrossOrigin(origins = "http://localhost:3000")
public class TransactionHistoryController {
	@Autowired
    private TransactionHistoryService tranService;

    @GetMapping
    public ResponseEntity<List<TransactionHistory>> getAllTransactionHistory() throws TransactionHistoryException{
        List<TransactionHistory> history = tranService.getAllTransactionHistory();
        return new ResponseEntity<>(history, HttpStatus.OK);
    }

    @GetMapping("/{transactionId}")
    public ResponseEntity<TransactionHistory> getTransactionHistoryById(@PathVariable("transactionId") int transactionId) throws TransactionHistoryException{
        TransactionHistory history = tranService.getTransactionHistoryById(transactionId);
        return new ResponseEntity<>(history, HttpStatus.OK);
    }

    @GetMapping("/by_user/{userId}")
    public ResponseEntity<List<TransactionHistory>> getTransactionHistoryByUserId(@PathVariable("userId") int userId)throws TransactionHistoryException{
        List<TransactionHistory> history = tranService.getTransactionHistoryByUserId(userId);
        return new ResponseEntity<>(history, HttpStatus.OK);
    }

    @GetMapping("/successful")
    public ResponseEntity<List<TransactionHistory>> getSuccessfulTransactionHistory()throws TransactionHistoryException{
        List<TransactionHistory> history = tranService.getSuccessfulTransactionHistory();
        return new ResponseEntity<>(history, HttpStatus.OK);
    }
    @GetMapping("/failed")
    public ResponseEntity<List<TransactionHistory>> getFailedTransactionHistory()throws TransactionHistoryException{
        List<TransactionHistory> history = tranService.getFailedTransactionHistory();
        return new ResponseEntity<>(history, HttpStatus.OK);
    }

    @GetMapping("/by_type/{transactionType}")
    public ResponseEntity<List<TransactionHistory>> getTransactionHistoryByType(@PathVariable("transactionType") Transaction_typeH transactionType)throws TransactionHistoryException{
        List<TransactionHistory> history = tranService.getTransactionHistoryByType(transactionType);
        return new ResponseEntity<>(history, HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<String> addTransactionHistory(@RequestBody TransactionHistory transaction) {
        tranService.addTransactionHistory(transaction);
        return ResponseEntity.status(HttpStatus.CREATED).body("transactionHistory added successfully");
    }
    @ExceptionHandler({TransactionHistoryException.class})
	public ResponseEntity<ExceptionMessage> handleBalanceLowException(TransactionHistoryException ex){
		ExceptionMessage message = new ExceptionMessage(ex.getMessage(), LocalDate.now());
		return new ResponseEntity<ExceptionMessage>(message, HttpStatus.NOT_FOUND);
	}
    
}

