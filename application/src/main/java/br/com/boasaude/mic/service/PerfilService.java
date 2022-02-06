package br.com.boasaude.mic.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import br.com.boasaude.mic.persistence.dao.PerfilRepository;
import br.com.boasaude.mic.persistence.entity.Perfil;

@Component
public class PerfilService {

	@Autowired
	private PerfilRepository tipoRepository;
	
	public List<Perfil> listarTodos(){
		return tipoRepository.findAll();
	}
	
	public Perfil salvar(Perfil tipo) {
		return tipoRepository.saveAndFlush(tipo);
	}

	public void remover(Long id) {
		tipoRepository.deleteById(id);
	}
	
	public Perfil buscarPorId(Long id) {
		return tipoRepository.findById(id).get();
	}
	
}
