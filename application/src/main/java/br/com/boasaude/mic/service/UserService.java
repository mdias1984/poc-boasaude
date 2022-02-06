package br.com.boasaude.mic.service;

import br.com.boasaude.mic.persistence.entity.Usuario;

public interface UserService {

	void save(Usuario user);

	Usuario findByUsername(String username);

}
