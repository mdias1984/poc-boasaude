package br.com.boasaude.mic.utils;

import java.security.SecureRandom;

import org.apache.commons.lang3.RandomStringUtils;

public class PasswordGenerator {


	public static String generate(int randomStrLength) {
		
		char[] possibleCharacters = (new String("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789")).toCharArray();
		String randomStr = RandomStringUtils.random( randomStrLength, 0, possibleCharacters.length-1, false, false, possibleCharacters, new SecureRandom() );
		
		return randomStr;
	}
}
