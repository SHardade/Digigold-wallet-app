package com.example.demo.Exception;

public class UsersException extends Exception{
	
	private String message;

	public String getMessage() {
		return message;
	}

	public UsersException(String message) {
		this.message = message;
	}
	

}
