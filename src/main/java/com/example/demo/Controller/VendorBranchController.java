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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.example.demo.Exception.VendorBranchException;
import com.example.demo.dto.ExceptionMessage;
import com.example.demo.entity.TransactionHistory;
import com.example.demo.entity.VendorBranch;
import com.example.demo.service.VendorBranchService;
 
@RestController
@RequestMapping("/api/v1/vendor_branches")
@CrossOrigin(origins = "http://localhost:3000")
public class VendorBranchController {
 
	@Autowired
	VendorBranchService service;
 
	@GetMapping("/")
	public List<VendorBranch> getAllVendorBranches() throws VendorBranchException{
		return service.getAllVendorBranch();
	}
 
	@GetMapping("/{branch_id}")
	public ResponseEntity<VendorBranch> getAllVendorBranchByBrcnchId(@PathVariable("branch_id") int branchId) throws VendorBranchException{
		return new ResponseEntity<VendorBranch>(service.getVendorBranchByBranchId(branchId), HttpStatus.OK);
	}
 
	@GetMapping("/by_vendor/{vendorId}")
	public ResponseEntity<List<VendorBranch>> getVendorBranchesByVendorId(@PathVariable int vendorId) throws VendorBranchException{
		List<VendorBranch> vendorBranches = service.getVendorBranchByVendorId(vendorId);
		return new ResponseEntity<>(vendorBranches, HttpStatus.OK);
	}
 
	@GetMapping("/by_city/{city}")
	public ResponseEntity<List<VendorBranch>> getVendorBranchesByCity(@PathVariable String city) throws VendorBranchException{
		List<VendorBranch> vendorBranches = service.getVendorBranchByCity(city);
		return new ResponseEntity<>(vendorBranches, HttpStatus.OK);
	}
 
	@GetMapping("/by_state/{state}")
	public ResponseEntity<List<VendorBranch>> getVendorBranchesByState(@PathVariable String state) throws VendorBranchException{
		List<VendorBranch> vendorBranches = service.getVendorBranchByState(state);
		return new ResponseEntity<>(vendorBranches, HttpStatus.OK);
	}
 
	@GetMapping("/by_country/{country}")
	public ResponseEntity<List<VendorBranch>> getVendorBranchesByCountry(@PathVariable String country) throws VendorBranchException{
		List<VendorBranch> vendorBranches = service.getVendorBranchByCountry(country);
		return new ResponseEntity<>(vendorBranches, HttpStatus.OK);
	}
 
	@GetMapping("/transactions/{branchId}")
	public ResponseEntity<List<TransactionHistory>> getTransactionsByBranchId(@PathVariable int branchId) throws VendorBranchException{
		List<TransactionHistory> transactions = service.getVendorBranchTransactionByBranchId(branchId);
 
		if (!transactions.isEmpty()) {
			return new ResponseEntity<>(transactions, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
 
	@PostMapping("/add")
	public ResponseEntity<Void> addVendorBranch(@RequestBody VendorBranch vendorBranch) {
		service.addVendorBranch(vendorBranch);
		return new ResponseEntity<>(HttpStatus.CREATED);
	}
 
	@PostMapping("/transfer/{source_branch_id}/{destination_branch_id}")
	public ResponseEntity<String> transferGold(@PathVariable("source_branch_id") int sourceBranchId,
			@PathVariable("destination_branch_id") int destinationBranchId, @RequestParam("quantity") double quantity) {
		try {
			service.transferGold(sourceBranchId, destinationBranchId, quantity);
			return ResponseEntity.ok("Gold transfer successful.");
		} catch (RuntimeException e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
		}
	}
 
	@PutMapping("/update/{branch_id}")
	public ResponseEntity<Void> updateVendorBranch(@PathVariable("branch_id") int branchId,
			@RequestBody VendorBranch updatedBranch) {
		VendorBranch existingbranch;
		try {
			existingbranch = service.getVendorBranchByBranchId(branchId);
			if (existingbranch == null) {
				return new ResponseEntity<>(HttpStatus.NOT_FOUND);
			}
			existingbranch.setBranchId(updatedBranch.getBranchId());
			existingbranch.setQuantity(updatedBranch.getQuantity());
			service.updateVendorBranch(existingbranch);
		} catch (VendorBranchException e) {
			e.printStackTrace();
		}
		return new ResponseEntity<>(HttpStatus.OK);
	}
	@ExceptionHandler({VendorBranchException.class})
	public ResponseEntity<ExceptionMessage> handleBalanceLowException(VendorBranchException ex){
		ExceptionMessage message = new ExceptionMessage(ex.getMessage(), LocalDate.now());
		return new ResponseEntity<ExceptionMessage>(message, HttpStatus.NOT_FOUND);
	}
}