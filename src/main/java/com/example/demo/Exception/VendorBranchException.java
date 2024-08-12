package com.example.demo.Exception;

public class VendorBranchException extends Exception{
	
	private String message;

	public String getMessage() {
		return message;
	}

	public VendorBranchException(String message) {
		this.message = message;
	}
	

}
