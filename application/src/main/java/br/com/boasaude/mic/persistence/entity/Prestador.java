package br.com.boasaude.mic.persistence.entity;

import java.io.Serializable;
import java.util.Calendar;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;

@Entity
@Table(name = "PRESTADOR")
public class Prestador implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@Column(name = "ID_PRESTADOR", unique = true, nullable = false)
	@GeneratedValue(strategy = GenerationType.AUTO, generator = "native")
	@GenericGenerator(name = "native", strategy = "native")
	private Long id;

	@OneToOne
	private Usuario usuario;

	@ManyToOne
	private Conveniado conveniado;

	@Column(name = "DATA_CRIACAO")
	private Calendar dataCriacao;

	@Column(name = "DATA_ATUALIZACAO")
	private Calendar dataAtualizacao;

}
