package com.example.demo.Exception;

public class PhysicalGoldTransactionException extends Exception{
	private String message;

	public String getMessage() {
		return message;
	}

	public PhysicalGoldTransactionException(String message) {
		this.message = message;
	}
	
	


	
	

}
