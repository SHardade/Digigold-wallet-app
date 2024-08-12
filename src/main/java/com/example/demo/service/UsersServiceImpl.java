package com.example.demo.service;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.demo.Repository.UsersRepository;
import com.example.demo.dto.UserAddress;
import com.example.demo.Exception.UsersException;
import com.example.demo.Repository.*;
import com.example.demo.entity.Addresses;
import com.example.demo.entity.Payments;
import com.example.demo.entity.TransactionHistory;
import com.example.demo.entity.Users;

import jakarta.validation.Valid;

@Service
public class UsersServiceImpl implements UsersService {
	@Autowired
	UsersRepository userRepository;
	@Autowired
	AddressesRepository addressesRepository;

	@Override
	public List<Users> getAllUsers() throws UsersException {
		if (userRepository.findAll().isEmpty()) {
			throw new UsersException("There is no User in the database.");
		}
		return userRepository.findAll();
	}

	@Override
	public Users getUserById(Integer userId) throws UsersException {
		if (userRepository.findById(userId).isEmpty()) {
			throw new UsersException("There is no User in the database for id " + userId);
		}
		return userRepository.findById(userId).get();
	}

	@Override
	public Users getUserByName(String userName) throws UsersException {
		Users user = userRepository.findByUserName(userName);
		if (user == null) {
			throw new UsersException("There are no User in the database for name " + userName);
		}
		return userRepository.findByUserName(userName);
	}

	@Override
	public List<Users> getUserByCity(String city) throws UsersException {
		if (userRepository.findUserByCity(city).isEmpty()) {
			throw new UsersException("There are no User in the database for city " + city);
		}
		return userRepository.findUserByCity(city);
	}

	@Override
	public List<Users> getUserByState(String state) throws UsersException {
		if (userRepository.findUserByState(state).isEmpty()) {
			throw new UsersException("There are no User in the database for state " + state);
		}
		return userRepository.findUserByState(state);
	}

	@Override
	public double getUserBalanceByUserId(Integer userId) throws UsersException {
		Double balance = userRepository.findBalanceByUserId(userId);
		if (balance == null) {
			throw new UsersException("There is no Balance for id " + userId);
		}
		return balance;
	}

	@Override
	public double getTotalVirtualGoldHoldings(Integer userId) throws UsersException {
		Double balance = userRepository.findTotalVirtualGoldHoldings(userId);
		if (balance == null) {
			throw new UsersException("There is no Balance for id " + userId);
		}
		return userRepository.findTotalVirtualGoldHoldings(userId);
	}

	@Override
	public double getTotalPhysicalGoldTransaction(Integer userId) throws UsersException {
		Double balance = userRepository.findTotalPhysicalGoldTransaction(userId);
		if (balance == null) {
			throw new UsersException("There is no balance for id " + userId);
		}
		return userRepository.findTotalPhysicalGoldTransaction(userId);
	}

	@Override
	public List<TransactionHistory> getUserTransactionHistory(Integer userId) throws UsersException {
		if (userRepository.findTransactionHistoriesByUserId(userId).isEmpty()) {
			throw new UsersException("There are no transaction histories in the database for id " + userId);
		}
		return userRepository.findTransactionHistoriesByUserId(userId);
	}

	@Override
	public List<Payments> getUserPayments(Integer userId) throws UsersException {
		if (userRepository.findPaymentsByUserId(userId).isEmpty()) {
			throw new UsersException("There are no Payments in the database for id " + userId);
		}
		return userRepository.findPaymentsByUserId(userId);
	}

	@Override
	public void addUser(Users user) {
		userRepository.save(user);
	}

	@Override
	public void updateUser(Integer userId, Users user) {
		Optional<Users> existingUser = userRepository.findById(userId);
		Users existingUserOptional = existingUser.get();
		existingUserOptional.setEmail(user.getEmail());
		existingUserOptional.setName(user.getName());
		userRepository.save(existingUserOptional);
	}

	@Override
	public void updateBalance(Integer userId, double amount) {
		Optional<Users> userOptional = userRepository.findById(userId);
		Users user = userOptional.get();
		user.setBalance(amount);
		userRepository.save(user);
	}

	@Override
	public void updateAddress(Integer userId, Integer addressId) {
		Optional<Users> userOptional = userRepository.findById(userId);
		Users user = userOptional.get();
		Optional<Addresses> addressOptional = addressesRepository.findById(addressId);
		Addresses address = addressOptional.get();
		user.setAddresses(address);
		userRepository.save(user);
	}

	@Override
	public void addUserAddress(UserAddress user) {
		Users use = new Users();
		use.setName(user.getName());
		use.setEmail(user.getEmail());
		use.setPassword(user.getPassword());
		Addresses add = new Addresses();
		add.setCity(user.getCity());
		add.setCountry(user.getCountry());
		add.setPostalCode(user.getPostalCode());
		add.setState(user.getState());
		add.setStreet(user.getStreet());
		userRepository.save(use);
		addressesRepository.save(add);

	}

	@Override
	public Users createUser(@Valid Users user) {
		return userRepository.save(user);
	}
}
