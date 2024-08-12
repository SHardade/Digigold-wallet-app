package com.example.demo.Exception;

public class VirtualGoldHoldingException extends Exception{
	
	private String message;

	public String getMessage() {
		return message;
	}

	public VirtualGoldHoldingException(String message) {
		this.message = message;
	}
	

}
