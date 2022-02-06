package br.com.boasaude.mic.service;

import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.imageio.ImageIO;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;

import br.com.boasaude.mic.model.UsuarioPerfilModel;
import br.com.boasaude.mic.model.UsuarioSecurityModel;
import br.com.boasaude.mic.persistence.dao.PermissaoRepository;
import br.com.boasaude.mic.persistence.dao.UsuarioRepository;
import br.com.boasaude.mic.persistence.entity.Permissao;
import br.com.boasaude.mic.persistence.entity.Usuario;
import br.com.boasaude.mic.utils.ImageUtils;

@Component
public class UsuarioService implements UserDetailsService{

	@Autowired
	private UsuarioRepository usuarioRepository;
 
	@Autowired
	private PermissaoRepository permissaoRepository;
 
	/***
	 * CONSULTA UM USUÁRIO POR LOGIN
	 */
	@Override
	public UserDetails loadUserByUsername(String login) throws BadCredentialsException,DisabledException {
 
		Usuario usuario = usuarioRepository.findByLogin(login);
 
		if(usuario == null)
			throw new BadCredentialsException("Usuário não encontrado no sistema!");
 
		if(!usuario.getAtivo())
			throw new DisabledException("Usuário não está ativo no sistema!");
 
		
		return new UsuarioSecurityModel(
				usuario.getLogin(), 
				usuario.getSenha(), 
				usuario.getAtivo(), 
				this.buscarPermissoesUsuario(usuario));
	}
 
	/***
	 * BUSCA AS PERMISSÕES DO USUÁRIO
	 * @param usuarioEntity
	 * @return
	 */
	public List<GrantedAuthority> buscarPermissoesUsuario(Usuario usuario) {
 
		List<GrantedAuthority> permissoes = new ArrayList<GrantedAuthority>();
		permissoes.addAll(this.buscarPermissoeDoUsuario(usuario));
		
		return permissoes;
	}

	/***
	 * BUSCA AS PERMISSÕES DO USUARIO
	 * */
	public List<GrantedAuthority> buscarPermissoeDoUsuario(Usuario usuario) {
		List<GrantedAuthority> auths = new ArrayList<GrantedAuthority>();
 
		List<Permissao> lista = permissaoRepository.findByUsuariosIn(usuario);
 
		for (Permissao permissao: lista) {
			auths.add(new SimpleGrantedAuthority(permissao.getNome()));
		}
 
		return auths;
	}
	
	/***
	 * SALVA UM NOVO REGISTRO DE USUÁRIO
	 * @param usuarioModel
	 */
	public void salvar(Usuario usuario){
		this.usuarioRepository.save(usuario);
	}	

	/**
	 * DELETA UM USUÁRIO  PELO CÓDIGO
	 * */
	public void excluir(Long codigoUsuario){
 
		//this.usuarioRepository.delete(codigoUsuario);
	}
 
	public Usuario buscarPorLogin(String login) {
		return this.usuarioRepository.buscarPorLogin(login);
	}
	
	public Usuario buscar(String login) {
		return this.usuarioRepository.buscarPorLogin(login);
	}

	public Usuario buscarPorCPF(Long cpf) {
		return this.usuarioRepository.buscarPorCPF(cpf);
	}
	
	public Usuario buscarPorId(Long idUsuario) {
		return this.usuarioRepository.findById(idUsuario).get();
	}
	
	public List<Usuario> listar(){
		return this.usuarioRepository.findAll();
	}
	
	public void remover(Long id) {
		this.usuarioRepository.deleteById(id);
	}
	
	public List<Usuario> buscarPorPerfil(Long idPerfil){
		return this.usuarioRepository.buscarPorPerfil(idPerfil);
	}
	
	public void salvarFotoPerfil(UsuarioPerfilModel usuarioPerfilModel) throws IOException{
		
        File file = new File(usuarioPerfilModel.getLogin() + "." + ImageUtils.instance().getImageExtension(usuarioPerfilModel.getFotoTipo()));

        if(StringUtils.isNoneEmpty(usuarioPerfilModel.getFoto())) {
			BufferedImage image = ImageUtils.instance().decodeToImage(usuarioPerfilModel.getFoto());

        	ImageIO.write(image, "png", file);
		}
	}
	
}
