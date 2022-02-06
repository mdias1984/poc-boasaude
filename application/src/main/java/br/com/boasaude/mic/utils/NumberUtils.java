package br.com.boasaude.mic.utils;

import java.text.NumberFormat;

public class NumberUtils {

	public static String toReal(Double numero) {
		
		String valor = numero.toString();
		String dc = valor.substring(valor.length()-2, valor.length());
		String th = valor.substring(0, valor.length()-2);

		Double numeroGerado = Double.parseDouble(th + "." + dc);
				
		return NumberFormat.getCurrencyInstance().format(numeroGerado);
		
	}
	
}
