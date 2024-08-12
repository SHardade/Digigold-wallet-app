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
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.demo.Exception.VirtualGoldHoldingException;
import com.example.demo.dto.ExceptionMessage;
import com.example.demo.entity.VirtualGoldHolding;
import com.example.demo.service.VirtualGoldHoldingService;

@RestController
@RequestMapping("/api/v1/virtual_gold_holding")
@CrossOrigin(origins = "http://localhost:3000")
public class VitualGoldHoldingController {

		@Autowired
	    private VirtualGoldHoldingService virtualGoldHoldingService;


	    @GetMapping
	    public ResponseEntity<List<VirtualGoldHolding>> getAllVirtualGoldHoldings()throws VirtualGoldHoldingException {
	        List<VirtualGoldHolding> holdings = virtualGoldHoldingService.getAllVirtualGoldHolding();
	        return ResponseEntity.ok().body(holdings);
	    }

	    @GetMapping("/users/{userId}")
	    public ResponseEntity<List<VirtualGoldHolding>> getAllVirtualGoldHoldingsByUserId(@PathVariable("userId") Integer userId)throws VirtualGoldHoldingException {
	        List<VirtualGoldHolding> holdings = virtualGoldHoldingService.getAllVirtualGoldHolding(userId);
	        return new ResponseEntity<>(holdings, HttpStatus.OK);
	    }

	    @GetMapping("/{holdingId}")
	    public ResponseEntity<VirtualGoldHolding> getVirtualGoldHoldingById(@PathVariable("holdingId") int holdingId)throws VirtualGoldHoldingException {
	        VirtualGoldHolding holding = virtualGoldHoldingService.getVirtualGoldHoldingByHoldingId(holdingId);
	        return new ResponseEntity<>(holding, HttpStatus.OK);
	    }
	    
	    @GetMapping("/byUserAndVendor/{userId}/{vendorId}")
	    public ResponseEntity<List<VirtualGoldHolding>> getVirtualGoldHoldingsByUserAndVendor(
	            @PathVariable("userId") int userId, @PathVariable("vendorId") int vendorId)throws VirtualGoldHoldingException  {
	        List<VirtualGoldHolding> holdings = virtualGoldHoldingService.getVirtualGoldHoldingsByUserAndVendor(userId, vendorId);
	        return new ResponseEntity<>(holdings, HttpStatus.OK);
	    }

	    @PostMapping("/add")
	    public ResponseEntity<Object> addVirtualGoldHolding(@RequestBody VirtualGoldHolding holding) {
	    	virtualGoldHoldingService.addVirtualGoldHolding(holding);
	        return ResponseEntity.status(HttpStatus.CREATED).body("virtualGold details added successfully");
	    }

	    @PostMapping("/convertToPhysical/{holdingId}")
	    public ResponseEntity<Object> convertToPhysical(@PathVariable("holdingId") int holdingId) {
	        virtualGoldHoldingService.convertToPhysical(holdingId);
	        return ResponseEntity.status(HttpStatus.CREATED).body("virtualGold converted successfully");
	    }

	    // Update virtual gold holding by ID
	    @PutMapping("/update/{holdingId}")
	    public ResponseEntity<Object> updateVirtualGoldHolding(@PathVariable("holdingId") int holdingId,
	                                                           @RequestBody VirtualGoldHolding updatedHolding) {
	    	virtualGoldHoldingService.updateVirtualGoldHolding(holdingId, updatedHolding);
	        return ResponseEntity.ok().body("User details updated successfully");
	    }
	    
	    @ExceptionHandler({VirtualGoldHoldingException.class})
		public ResponseEntity<ExceptionMessage> handleBalanceLowException(VirtualGoldHoldingException ex){
			ExceptionMessage message = new ExceptionMessage(ex.getMessage(), LocalDate.now());
			return new ResponseEntity<ExceptionMessage>(message, HttpStatus.NOT_FOUND);
		}
	}
