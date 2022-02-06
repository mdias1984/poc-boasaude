package br.com.boasaude.mic.persistence.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import br.com.boasaude.mic.persistence.entity.Permissao;
import br.com.boasaude.mic.persistence.entity.Usuario;

public interface PermissaoRepository extends JpaRepository<Permissao, Long> {

	List<Permissao> findByUsuariosIn(Usuario usuario);

	@Query("SELECT p FROM Permissao p WHERE p.tipo = :tipo")
	List<Permissao> buscarPorTipo(@Param("tipo") String tipo);
	
	@Query("SELECT p FROM Permissao p WHERE p.id IN :ids")
	List<Permissao> buscarPorLista(@Param("ids") List<Long> ids);

}
