package br.com.boasaude.mic.persistence.entity;

import java.io.Serializable;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

//@Entity
//@Table(name = "GRUPO")
//@JsonIgnoreProperties({ "usuarios", "permissoes"})
public class Grupo implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@Column(name = "ID_GRUPO")
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;

	@Column(name = "NOME")
	private String nome;

	@Column(name = "DESCRICAO")
	private String descricao;

	@ManyToMany
	@JoinTable(name = "USUARIO_GRUPO", joinColumns = @JoinColumn(name = "ID_GRUPO", referencedColumnName = "ID_GRUPO"), inverseJoinColumns = @JoinColumn(name = "ID_USUARIO", referencedColumnName = "ID_USUARIO"))
	private List<Usuario> usuarios;

	@ManyToMany
	@JoinTable(name = "PERMISSAO_GRUPO", joinColumns = @JoinColumn(name = "ID_GRUPO", referencedColumnName = "ID_GRUPO"), inverseJoinColumns = @JoinColumn(name = "ID_PERMISSAO", referencedColumnName = "ID_PERMISSAO"))
	private List<Permissao> permissoes;

	/**
	 * @return the id
	 */
	public Long getId() {
		return id;
	}

	/**
	 * @return the nome
	 */
	public String getNome() {
		return nome;
	}

	/**
	 * @return the descricao
	 */
	public String getDescricao() {
		return descricao;
	}

	/**
	 * @return the usuarios
	 */
	public List<Usuario> getUsuarios() {
		return usuarios;
	}

	/**
	 * @return the permissoes
	 */
	public List<Permissao> getPermissoes() {
		return permissoes;
	}

	/**
	 * @param id
	 *            the id to set
	 */
	public void setId(Long id) {
		this.id = id;
	}

	/**
	 * @param nome
	 *            the nome to set
	 */
	public void setNome(String nome) {
		this.nome = nome;
	}

	/**
	 * @param descricao
	 *            the descricao to set
	 */
	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}

	/**
	 * @param usuarios
	 *            the usuarios to set
	 */
	public void setUsuarios(List<Usuario> usuarios) {
		this.usuarios = usuarios;
	}

	/**
	 * @param permissoes
	 *            the permissoes to set
	 */
	public void setPermissoes(List<Permissao> permissoes) {
		this.permissoes = permissoes;
	}

}
