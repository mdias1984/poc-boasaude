package br.com.boasaude.mic.persistence.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import br.com.boasaude.mic.persistence.entity.Especialidade;

public interface EspecialidadeRepository extends JpaRepository<Especialidade, Long>{

    @Query("SELECT e FROM Especialidade e ORDER BY e.nome ASC")
    public List<Especialidade> listarTodos();
    
}
