package br.com.boasaude.mic.persistence.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.boasaude.mic.persistence.entity.Perfil;

public interface PerfilRepository extends JpaRepository<Perfil, Long>{

    
}
