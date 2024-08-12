package com.example.demo.entity;

import java.time.LocalDateTime;
import java.util.List;

import org.hibernate.annotations.CreationTimestamp;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "vendors")
public class Vendors {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "vendor_id")
	private int vendorId;

	@NotBlank(message = "Vendor name is required")
	@Size(min = 2, max = 20, message = "Vendor name must be between 2 and 100 characters")
	@Column(name = "vendor_name")
	private String vendorName;

	@NotBlank(message = "Description is required")
	@Column(name = "description")
	private String description;

	@NotBlank(message = "Password is required")
	@Size(min = 6, max = 20, message = "Password must be between 6 and 20 characters")
	@Column(name = "password")
	private String password;

	@NotBlank(message = "Contact person name is required")
	@Column(name = "contact_person_name")
	private String contactPersonName;

	@NotBlank(message = "Contact email is required")
	@Email(message = "Invalid email format")
	@Column(name = "contact_email")
	private String contactEmail;

	@NotBlank(message = "Contact phone is required")
	@Column(name = "contact_phone")
	private String contactPhone;

	@Column(name = "website_url")
	private String websiteUrl;

	@NotNull(message = "Total gold quantity is required")
	@Column(name = "total_gold_quantity")
	private double totalGoldQuantity;

	@NotNull(message = "Current gold price is required")
	@Column(name = "current_gold_price")
	private double currentGoldPrice;

	@CreationTimestamp
	@Column(name = "created_at")
	private LocalDateTime createdAt;

	@OneToMany(mappedBy = "vendor", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	@JsonIgnore
	private List<VendorBranch> vendorBranches;

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public List<VendorBranch> getVendorBranches() {
		return vendorBranches;
	}

	public void setVendorBranches(List<VendorBranch> vendorBranches) {
		this.vendorBranches = vendorBranches;
	}

	public int getVendorId() {
		return vendorId;
	}

	public void setVendorId(int vendorId) {
		this.vendorId = vendorId;
	}

	public String getVendorName() {
		return vendorName;
	}

	public void setVendorName(String vendorName) {
		this.vendorName = vendorName;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getContactPersonName() {
		return contactPersonName;
	}

	public void setContactPersonName(String contactPersonName) {
		this.contactPersonName = contactPersonName;
	}

	public String getContactEmail() {
		return contactEmail;
	}

	public void setContactEmail(String contactEmail) {
		this.contactEmail = contactEmail;
	}

	public String getContactPhone() {
		return contactPhone;
	}

	public void setContactPhone(String contactPhone) {
		this.contactPhone = contactPhone;
	}

	public String getWebsiteUrl() {
		return websiteUrl;
	}

	public void setWebsiteUrl(String websiteUrl) {
		this.websiteUrl = websiteUrl;
	}

	public double getTotalGoldQuantity() {
		return totalGoldQuantity;
	}

	public void setTotalGoldQuantity(double totalGoldQuantity) {
		this.totalGoldQuantity = totalGoldQuantity;
	}

	public double getCurrentGoldPrice() {
		return currentGoldPrice;
	}

	public void setCurrentGoldPrice(double currentGoldPrice) {
		this.currentGoldPrice = currentGoldPrice;
	}

	public LocalDateTime getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(LocalDateTime createdAt) {
		this.createdAt = createdAt;
	}

	public Vendors(int vendorId, String vendorName, String description, String password, String contactPersonName,
			String contactEmail, String contactPhone, String websiteUrl, double totalGoldQuantity,
			double currentGoldPrice, LocalDateTime createdAt, List<VendorBranch> vendorBranches) {
		super();
		this.vendorId = vendorId;
		this.vendorName = vendorName;
		this.description = description;
		this.password = password;
		this.contactPersonName = contactPersonName;
		this.contactEmail = contactEmail;
		this.contactPhone = contactPhone;
		this.websiteUrl = websiteUrl;
		this.totalGoldQuantity = totalGoldQuantity;
		this.currentGoldPrice = currentGoldPrice;
		this.createdAt = createdAt;
		this.vendorBranches = vendorBranches;
	}

	public Vendors() {
	}

	@Override
	public String toString() {
		return "Vendors [vendorId=" + vendorId + ", vendorName=" + vendorName + ", description=" + description
				+ ", password=" + password + ", contactPersonName=" + contactPersonName + ", contactEmail="
				+ contactEmail + ", contactPhone=" + contactPhone + ", websiteUrl=" + websiteUrl
				+ ", totalGoldQuantity=" + totalGoldQuantity + ", currentGoldPrice=" + currentGoldPrice + ", createdAt="
				+ createdAt + ", vendorBranches=" + vendorBranches + "]";
	}
	
	

}
