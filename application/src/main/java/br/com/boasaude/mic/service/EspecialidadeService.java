package br.com.boasaude.mic.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import br.com.boasaude.mic.persistence.dao.EspecialidadeRepository;
import br.com.boasaude.mic.persistence.entity.Especialidade;

@Component
public class EspecialidadeService {
	
	@Autowired
	private EspecialidadeRepository especialidadeRepository;

	public List<Especialidade> listarTodos(){
		return especialidadeRepository.listarTodos();
	}

}
