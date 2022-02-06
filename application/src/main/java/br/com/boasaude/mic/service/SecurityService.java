package br.com.boasaude.mic.service;

import org.springframework.security.core.userdetails.UserDetails;

public interface SecurityService {

	String findLoggedInUsername();

	UserDetails findLoggedIn();
	
	void autologin(String username, String password);
}
