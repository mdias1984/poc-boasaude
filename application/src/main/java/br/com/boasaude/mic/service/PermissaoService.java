package br.com.boasaude.mic.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import br.com.boasaude.mic.enums.TipoPermissaoEnum;
import br.com.boasaude.mic.persistence.dao.PermissaoRepository;
import br.com.boasaude.mic.persistence.entity.Permissao;

@Component
public class PermissaoService {

	@Autowired
	private PermissaoRepository permissaoRepository;
	
	public List<Permissao> listar(){
		return permissaoRepository.findAll();
	}
	
	public Permissao salvar(Permissao permissao) {
		return permissaoRepository.saveAndFlush(permissao);
	}

	public void remover(Long id) {
		permissaoRepository.deleteById(id);
	}
	
	public Permissao buscarPorId(Long id) {
		return permissaoRepository.findById(id).get();
	}
	
	public List<Permissao> buscarPorTipo(TipoPermissaoEnum tipoPermissaoEnum){
		return permissaoRepository.buscarPorTipo(tipoPermissaoEnum.getTipo());
	}
	
	public List<Permissao> buscarPorLista(List<Long> ids){
		return this.permissaoRepository.buscarPorLista(ids);
	}
}
