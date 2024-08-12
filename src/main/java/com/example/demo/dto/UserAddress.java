package com.example.demo.dto;

public class UserAddress {
	private String Name;
	private String email;
	private String password;
	private String country;
	private String state;
	private String city;
	private String street;
	private String postalCode;
	public String getName() {
		return Name;
	}
	public void setName(String name) {
		Name = name;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getCountry() {
		return country;
	}
	public void setCountry(String country) {
		this.country = country;
	}
	public String getState() {
		return state;
	}
	public void setState(String state) {
		this.state = state;
	}
	public String getCity() {
		return city;
	}
	public void setCity(String city) {
		this.city = city;
	}
	public String getStreet() {
		return street;
	}
	public void setStreet(String street) {
		this.street = street;
	}
	public String getPostalCode() {
		return postalCode;
	}
	public void setPostalCode(String postalCode) {
		this.postalCode = postalCode;
	}
	public UserAddress(String name, String email, String password, String country, String state, String city,
			String street, String postalCode) {
		super();
		Name = name;
		this.email = email;
		this.password = password;
		this.country = country;
		this.state = state;
		this.city = city;
		this.street = street;
		this.postalCode = postalCode;
	}
	public UserAddress() {}	
}
