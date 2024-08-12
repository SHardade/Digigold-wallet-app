package com.example.demo.entity;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;

@Entity
@Table(name="addresses")
public class Addresses {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="address_id")
	private int addressId;
	@Column(name="street")
	private String street;
	@Column(name="city")
	private String city;
	@Column(name="state")
	private String state;
	@Column(name="postal_code")
	private String postalCode;
	@Column(name="country")
	private String country;
	@OneToMany(mappedBy = "addresses", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	@JsonIgnore
	private List<Users> users;
	@OneToMany(mappedBy = "addresses", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	@JsonIgnore
	private List<PhysicalGoldTransaction> physicalGoldTransactions;
	@OneToMany(mappedBy = "addresses", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	@JsonIgnore
	private List<VendorBranch> vendorBranches;
	public Addresses() {
		super();
	}
 
	
 
	public Addresses(int addressId, String street, String city, String state, String postalCode, String country,
			List<com.example.demo.entity.Users> users, List<PhysicalGoldTransaction> physicalGoldTransactions,
			List<VendorBranch> vendorBranches) {
		super();
		this.addressId = addressId;
		this.street = street;
		this.city = city;
		this.state = state;
		this.postalCode = postalCode;
		this.country = country;
		this.users = users;
		this.physicalGoldTransactions = physicalGoldTransactions;
		this.vendorBranches = vendorBranches;
	}



	public List<Users> getUsers() {
		return users;
	}



	public void setUsers(List<Users> users) {
		this.users = users;
	}



	public List<PhysicalGoldTransaction> getPhysicalGoldTransactions() {
		return physicalGoldTransactions;
	}



	public void setPhysicalGoldTransactions(List<PhysicalGoldTransaction> physicalGoldTransactions) {
		this.physicalGoldTransactions = physicalGoldTransactions;
	}



	public List<VendorBranch> getVendorBranches() {
		return vendorBranches;
	}



	public void setVendorBranches(List<VendorBranch> vendorBranches) {
		this.vendorBranches = vendorBranches;
	}



	public void setPostalCode(String postalCode) {
		this.postalCode = postalCode;
	}



	public int getAddressId() {
		return addressId;
	}
 
	public void setAddressId(int addressId) {
		this.addressId = addressId;
	}
 
	public String getStreet() {
		return street;
	}
 
	public void setStreet(String street) {
		this.street = street;
	}
 
	public String getCity() {
		return city;
	}
 
	public void setCity(String city) {
		this.city = city;
	}
 
	public String getState() {
		return state;
	}
 
	public void setState(String state) {
		this.state = state;
	}
 
	public String getPostalCode() {
		return postalCode;
	}
 
	public void setPostal_code(String postalCode) {
		this.postalCode = postalCode;
	}
 
	public String getCountry() {
		return country;
	}
 
	public void setCountry(String country) {
		this.country = country;
	}

}
