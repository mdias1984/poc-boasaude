package br.com.boasaude.mic.enums;

public enum PerfilEnum {

	ADMINISTRADOR(1), 
	FINANCEIRO(2),
	CONSULTOR(3),
	FRANQUEADO(4),
	VENDEDOR(5);

	private long idPerfil;

	PerfilEnum(long idPerfil) {
		this.idPerfil = idPerfil;
	}

	/**
	 * @return the idPerfil
	 */
	public long getIdPerfil() {
		return idPerfil;
	}

}
