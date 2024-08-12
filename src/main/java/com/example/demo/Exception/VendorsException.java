package com.example.demo.Exception;


public class VendorsException extends Exception{
	
	private String message;

	public String getMessage() {
		return message;
	}

	public VendorsException(String message) {
		this.message = message;
	}
	

}
