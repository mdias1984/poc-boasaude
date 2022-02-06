package br.com.boasaude.mic.utils;

public class HTTPResponseUtil {

	public static String successResponse() {
		StringBuffer result = new StringBuffer();
		result.append("{");
		result.append("\"status\":");
		result.append("\"success\",");
		result.append("\"message\":");
		result.append("\"Operação realiza com sucesso!\"");
		result.append("}");
		
		return result.toString();
	}
	
	public static String operationNotExecute() {
		StringBuffer result = new StringBuffer();
		result.append("{");
		result.append("\"status\":");
		result.append("\"error\",");
		result.append("\"message\":");
		result.append("\"A operação não pode ser executada!\"");
		result.append("}");
		
		return result.toString();
	}
	
	
	public static String errorResponse() {
		StringBuffer result = new StringBuffer();
		result.append("{");
		result.append("\"status\":");
		result.append("\"error\",");
		result.append("\"message\":");
		result.append("\"Ocorreu um erro ao realizar operação!\"");
		result.append("}");
		
		return result.toString();
	}
	
	
	public static String passwordSuccess() {
		StringBuffer result = new StringBuffer();
		result.append("{");
		result.append("\"status\":");
		result.append("\"success\",");
		result.append("\"message\":");
		result.append("\"Uma nova senha foi enviada para o seu email!\"");
		result.append("}");
		
		return result.toString();
	}

	public static String passwordError() {
		StringBuffer result = new StringBuffer("Email ou login não localizado!");
		return result.toString();
	}
	
}
