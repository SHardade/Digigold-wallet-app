package com.example.demo.Exception;

public class PaymentsException extends Exception{
	private String message;

	public String getMessage() {
		return message;
	}

	public PaymentsException(String message) {
		this.message = message;
	}
	

}
