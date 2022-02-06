package br.com.boasaude.mic.enums;

public enum TipoPermissaoEnum {

	USUARIO("USUARIO"), PERFIL("PERFIL)");

	private String tipo;

	TipoPermissaoEnum(String tipo) {
		this.tipo = tipo;
	}

	/**
	 * @return the tipo
	 */
	public String getTipo() {
		return tipo;
	}

}
