package com.example.demo.Exception;

public class AddressesException extends Exception{
	private String message;

	public AddressesException(String message) {
		this.message = message;
	}

	public String getMessage() {
		return message;
	}	

}
