package br.com.boasaude.mic.persistence.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import br.com.boasaude.mic.persistence.entity.Usuario;

public interface UsuarioRepository extends JpaRepository<Usuario, Long>{

	//utilizado na integração com Spring Security
	Usuario findByLogin(String login);
	
	@Query("SELECT u FROM Usuario u WHERE TRIM(LOWER(u.login)) = TRIM(LOWER(:login))")
	Usuario buscarPorLogin(@Param("login") String login);
	
    @Query("SELECT u FROM Usuario u WHERE u.cpf = :cpf")
	Usuario buscarPorCPF(@Param("cpf") Long cpf);

    @Query("SELECT u FROM Usuario u WHERE u.perfil.id = :idPerfil")
	public List<Usuario> buscarPorPerfil(@Param("idPerfil") Long idPerfil);
}
