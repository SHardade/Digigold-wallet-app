package com.example.demo.Controller;
import java.time.LocalDate;
import java.util.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.demo.Exception.UsersException;
import com.example.demo.Repository.UsersRepository;
import com.example.demo.dto.ExceptionMessage;
import com.example.demo.dto.UserAddress;
import com.example.demo.entity.Payments;
import com.example.demo.entity.TransactionHistory;
import com.example.demo.entity.Users;
import com.example.demo.service.UsersService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/v1/users")
@CrossOrigin(origins = "http://localhost:3000")
public class UsersController {

    @Autowired
    UsersService userService;
    @Autowired
    UsersRepository userRepository;
    
    @PostMapping("/")
    public ResponseEntity<Users> createUser(@RequestBody @Valid Users user){
    	Users createUser = this.userService.createUser(user);
    	return new ResponseEntity<>(createUser, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<Users>> getAllUsers() throws UsersException{
    	List<Users> users = userService.getAllUsers();
        return ResponseEntity.ok().body(users);
    }

    @GetMapping("/{userId}")
    public ResponseEntity<Users> getUserById(@PathVariable("userId") Integer userId) throws UsersException{
    	return new ResponseEntity<Users>(userService.getUserById(userId),HttpStatus.OK);
    }

    @GetMapping("/name/{userName}")
    public ResponseEntity<Users> getUserByName(@PathVariable("userName") String userName) throws UsersException{
        Users user = userService.getUserByName(userName);
        return ResponseEntity.ok().body(user);
    }
    @GetMapping("/by_city/{city}")
    public ResponseEntity<List<Users>> getUsersByCity(@PathVariable("city") String city) throws UsersException{
        List<Users> users = userService.getUserByCity(city);
        return ResponseEntity.ok().body(users);
    }

    @GetMapping("/by_state/{state}")
    public ResponseEntity<List<Users>> getUsersByState(@PathVariable("state") String state) throws UsersException{
        List<Users> users = userService.getUserByState(state);
        return ResponseEntity.ok().body(users);
    }
    @GetMapping("/check_balance/{userId}")
    public ResponseEntity<Double> getUserBalanceByUserId(@PathVariable("userId") Integer userId) throws UsersException{
        double balance = userService.getUserBalanceByUserId(userId);
        return ResponseEntity.ok().body(balance);
    }

    @GetMapping("/{userId}/virtual_gold_holdings")
    public ResponseEntity<Object> getTotalVirtualGoldHoldings(@PathVariable("userId") Integer userId) throws UsersException{
        double totalVirtualGoldHoldings = userService.getTotalVirtualGoldHoldings(userId);
        return ResponseEntity.ok().body(totalVirtualGoldHoldings);
    }

    @GetMapping("/{userId}/physical_gold_transaction")
    public ResponseEntity<Object> getTotalPhysicalGoldHolding(@PathVariable("userId") Integer userId) throws UsersException{
        double totalPhysicalGoldHolding = userService.getTotalPhysicalGoldTransaction(userId);
        return ResponseEntity.ok().body(totalPhysicalGoldHolding);
    }

    @GetMapping("/{userId}/transaction_history")
    public ResponseEntity<Object> getUserTransactionHistory(@PathVariable("userId") Integer userId) throws UsersException{
        List<TransactionHistory> transactionHistory = userService.getUserTransactionHistory(userId);
        return ResponseEntity.ok().body(transactionHistory);
    }

    @GetMapping("/{userId}/payments")
    public ResponseEntity<Object> getUserPayments(@PathVariable("userId") Integer userId) throws UsersException{
        List<Payments> payments = userService.getUserPayments(userId);
        return ResponseEntity.ok().body(payments);
    }

    @PostMapping("/add")
    public ResponseEntity<Object> addUser(@RequestBody Users user) {
        // Perform validation if needed
        userService.addUser(user);
        return ResponseEntity.status(HttpStatus.CREATED).body("User details added successfully");
    }
    @PostMapping("/addUserAddress")
    public void addUserAddress(@RequestBody UserAddress user) {
        userService.addUserAddress(user);
    }

    @PutMapping("/update/{userId}")
    public ResponseEntity<Object> updateUser(@PathVariable("userId") Integer userId, @RequestBody Users user) {
        userService.updateUser(userId, user);
        return ResponseEntity.ok().body("User details updated successfully");
    }

    @PutMapping("/{userId}/update_balance/{amount}")
    public ResponseEntity<Object> updateBalance(@PathVariable("userId") Integer userId, @PathVariable("amount") double amount) {
        userService.updateBalance(userId, amount);
        return ResponseEntity.ok().body("User balance updated successfully");
    }

    @PutMapping("/{userId}/update_address/{addressId}")
    public ResponseEntity<Object> updateAddress(@PathVariable("userId") Integer userId, @PathVariable("addressId") Integer addressId) {
        userService.updateAddress(userId, addressId);
        return ResponseEntity.ok().body("User address updated successfully");
    }
    @PostMapping("/login")
    public ResponseEntity<Object> loginUser(@RequestBody Users user) {
        Users existingUser = userRepository.findByUseremail(user.getEmail());
        if (existingUser == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not found");
        }
        if (!existingUser.getPassword().equals(user.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Incorrect password");
        }
        return ResponseEntity.ok().body(existingUser);
    }
    
    @ExceptionHandler({UsersException.class})
	public ResponseEntity<ExceptionMessage> handleBalanceLowException(UsersException ex){
		ExceptionMessage message = new ExceptionMessage(ex.getMessage(), LocalDate.now());
		return new ResponseEntity<ExceptionMessage>(message, HttpStatus.NOT_FOUND);
	}
}

