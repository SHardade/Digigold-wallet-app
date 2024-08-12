package com.example.demo.Exception;

public class TransactionHistoryException extends Exception{
	
	private String message;

	public String getMessage() {
		return message;
	}

	public TransactionHistoryException(String message) {
		this.message = message;
	}
	

}
