package br.com.boasaude.mic.model;

import java.io.Serializable;

public class UsuarioPermissaoModel implements Serializable {

	private static final long serialVersionUID = 1L;

	private Long idUsuarioPermissao;

	private String[] permissao;

	/**
	 * @return the idUsuarioPermissao
	 */
	public Long getIdUsuarioPermissao() {
		return idUsuarioPermissao;
	}

	/**
	 * @return the permissao
	 */
	public String[] getPermissao() {
		return permissao;
	}

	/**
	 * @param idUsuarioPermissao
	 *            the idUsuarioPermissao to set
	 */
	public void setIdUsuarioPermissao(Long idUsuarioPermissao) {
		this.idUsuarioPermissao = idUsuarioPermissao;
	}

	/**
	 * @param permissao
	 *            the permissao to set
	 */
	public void setPermissao(String[] permissao) {
		this.permissao = permissao;
	}

}
