package br.com.boasaude.mic.utils;

public class StringUtils {

	private static final String PATTERN = "[^a-zZ-Z0-9]";
	
	public static String removeSpecialCharacters(String value) {
		if(org.apache.commons.lang3.StringUtils.isNotBlank(value))
			return value.replaceAll(PATTERN, ""); 
		
		return "";
	}
}
