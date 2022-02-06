package br.com.boasaude.mic.controller;

import java.security.Principal;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Calendar;
import java.util.List;
import java.util.stream.Collectors;

import javax.servlet.http.HttpServletRequest;

import org.apache.log4j.Logger;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import br.com.boasaude.mic.enums.TipoPermissaoEnum;
import br.com.boasaude.mic.model.UsuarioModel;
import br.com.boasaude.mic.model.UsuarioPermissaoModel;
import br.com.boasaude.mic.persistence.entity.Especialidade;
import br.com.boasaude.mic.persistence.entity.Grupo;
import br.com.boasaude.mic.persistence.entity.Perfil;
import br.com.boasaude.mic.persistence.entity.Permissao;
import br.com.boasaude.mic.persistence.entity.Usuario;
import br.com.boasaude.mic.service.EspecialidadeService;
import br.com.boasaude.mic.service.PerfilService;
import br.com.boasaude.mic.service.PermissaoService;
import br.com.boasaude.mic.service.UsuarioService;
import br.com.boasaude.mic.utils.HTTPResponseUtil;
import br.com.boasaude.mic.utils.PasswordGenerator;

@Controller
public class UsuarioController {

	private final static Logger logger = Logger.getLogger(UsuarioController.class);
	
	@Autowired
	private UsuarioService usuarioService;
	
	@Autowired
	private PermissaoService permissaoService;
	
	@Autowired
	private EspecialidadeService especialidadeService;
	
	@Autowired
	private PerfilService perfilService;
	
	@Autowired
	private ModelMapper modelMapper;
	
	@RequestMapping(value="/usuarios", method= RequestMethod.GET)
	public String inicio(Model model, HttpServletRequest request){
		
		Principal principal = request.getUserPrincipal();
		
		if(principal == null)
			return "redirect: /";
			
		Usuario usuario = usuarioService.buscarPorLogin(principal.getName());

		if(usuario != null)
			model.addAttribute("usuario", usuario);
		

		model.addAttribute("perfils", perfilService.listarTodos());
		model.addAttribute("especialidades", especialidadeService.listarTodos());
		model.addAttribute("permissoes", permissaoService.buscarPorTipo(TipoPermissaoEnum.USUARIO));
		
		return "usuario/lista";
	}
	
	@RequestMapping(value="/conveniados", method= RequestMethod.GET)
	public String conveniados(Model model, HttpServletRequest request){
		
		Principal principal = request.getUserPrincipal();
		
		if(principal == null)
			return "redirect: /";
			
		Usuario usuario = usuarioService.buscarPorLogin(principal.getName());

		if(usuario != null)
			model.addAttribute("usuario", usuario);
		

		model.addAttribute("perfils", perfilService.listarTodos());
		model.addAttribute("especialidades", especialidadeService.listarTodos());
		model.addAttribute("permissoes", permissaoService.buscarPorTipo(TipoPermissaoEnum.USUARIO));
		
		return "conveniado/lista";
	}
	
	@RequestMapping(value="/associados", method= RequestMethod.GET)
	public String associados(Model model, HttpServletRequest request){
		
		Principal principal = request.getUserPrincipal();
		
		if(principal == null)
			return "redirect: /";
			
		Usuario usuario = usuarioService.buscarPorLogin(principal.getName());

		if(usuario != null)
			model.addAttribute("usuario", usuario);
		

		model.addAttribute("perfils", perfilService.listarTodos());
		model.addAttribute("especialidades", especialidadeService.listarTodos());
		model.addAttribute("permissoes", permissaoService.buscarPorTipo(TipoPermissaoEnum.USUARIO));
		
		return "associado/lista";
	}
	
	@RequestMapping(value="/prestadores", method= RequestMethod.GET)
	public String prestadores(Model model, HttpServletRequest request){
		
		Principal principal = request.getUserPrincipal();
		
		if(principal == null)
			return "redirect: /";
			
		Usuario usuario = usuarioService.buscarPorLogin(principal.getName());

		if(usuario != null)
			model.addAttribute("usuario", usuario);
		

		model.addAttribute("perfils", perfilService.listarTodos());
		model.addAttribute("especialidades", especialidadeService.listarTodos());
		model.addAttribute("permissoes", permissaoService.buscarPorTipo(TipoPermissaoEnum.USUARIO));
		
		return "prestador/lista";
	}
	
	
	
	
	@RequestMapping(value="/usuario/recuperar-senha", method= RequestMethod.GET)
	public String recuperarSenha(HttpServletRequest request){
		return "usuario/recuperar-senha";
	}
	
	@RequestMapping(value="/usuario/listar/{perfil}", method= RequestMethod.GET, produces={MediaType.APPLICATION_JSON_VALUE})
	public ResponseEntity<List<Usuario>> listar(HttpServletRequest request, @PathVariable("perfil") Long perfil){
		
		Principal principal 	= request.getUserPrincipal();
		List<Usuario> usuarios 	= new ArrayList<Usuario>();
		
		if(principal == null)
	        return new ResponseEntity<List<Usuario>>(usuarios, HttpStatus.INTERNAL_SERVER_ERROR);
		
		usuarios = this.usuarioService.buscarPorPerfil(perfil);
		
		logger.info("Lista de usuarios carregada com sucesso, total:  " + usuarios.size());
		
        return new ResponseEntity<List<Usuario>>(usuarios, HttpStatus.OK);
	}

	@RequestMapping(path="/usuario/{id}", method= RequestMethod.GET, produces={MediaType.APPLICATION_JSON_VALUE})
	public ResponseEntity<Usuario> buscarPorId(@PathVariable("id") Long id){
		Usuario usuario = usuarioService.buscarPorId(id);
		
		return new ResponseEntity<Usuario>(usuario, HttpStatus.OK);
	}
	

	@RequestMapping(value="/usuario/salvar", method= RequestMethod.POST, produces={MediaType.APPLICATION_JSON_VALUE})
	public ResponseEntity<String> salvar(@RequestBody UsuarioModel usuarioModel)
	throws Exception{
		
		Usuario usuario = new Usuario();
		
		try {
			
			 Perfil perfil = perfilService.buscarPorId(usuarioModel.getPerfil());
			
			 String senha = "123456";// PasswordGenerator.generate(6);
			 
			 usuario = modelMapper.map(usuarioModel, Usuario.class);
			 usuario.setSenha(new BCryptPasswordEncoder().encode(senha));
			 usuario.setDataInclusao(Calendar.getInstance());
			 usuario.setAtivo(Boolean.TRUE);
			 usuario.setPerfil(perfil);
			 
			 List<Especialidade> especialidades = new ArrayList<Especialidade>();
			 
			 if(usuarioModel.getEspecialidades() != null) {
				 for(Long especialidade : usuarioModel.getEspecialidades()) {
					 especialidades.add(new Especialidade(especialidade, ""));
				 }
			 }
			 
			 usuario.setEspecialidades(especialidades);
			 
			 usuarioService.salvar(usuario);
			 

			 logger.info("Usuário gravado com sucesso");

		 }catch (Exception e) {
			 e.printStackTrace();
			return new ResponseEntity<String>("Erro ao criar usuário" + usuarioModel.getNome(), HttpStatus.INTERNAL_SERVER_ERROR);
		 }	
				
        return new ResponseEntity<String>(HTTPResponseUtil.successResponse(), HttpStatus.OK);
	}

	@RequestMapping(value="/usuario/atualizar", method= RequestMethod.POST, produces={MediaType.APPLICATION_JSON_VALUE})
	public ResponseEntity<String> atualizar(@RequestBody UsuarioModel usuarioModel)
	throws Exception{
		
		Usuario usuario = usuarioService.buscar(usuarioModel.getLogin());

		List<Grupo> grupos 	= new ArrayList<Grupo>();
		Usuario pUsuario	= null;
		 
		 try {
			 pUsuario = modelMapper.map(usuarioModel, Usuario.class);
			 
			 if(usuario != null)
				 pUsuario.setId(usuario.getId());
				 
			 
			 pUsuario.setSenha(usuario.getSenha());
			 pUsuario.setDataInclusao(Calendar.getInstance());
			 pUsuario.setAtivo(Boolean.TRUE);

				
			 usuarioService.salvar(pUsuario);
			
			 logger.info("Usuário atualizado com sucesso");
			 
		 }catch (Exception e) {
			 logger.error("Ocorreu um erro ao atualizar usuário " + e.getMessage());

			return new ResponseEntity<String>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
		 }	
				
        return new ResponseEntity<String>(HTTPResponseUtil.successResponse(), HttpStatus.OK);
		
	}

	@RequestMapping(value="/usuario/redefinir-senha/{login}", method= RequestMethod.GET, produces={MediaType.APPLICATION_JSON_VALUE})
	public ResponseEntity<String> redefinirSenha(@PathVariable("login") String login)
	throws Exception{

		Usuario usuario = usuarioService.buscar(login);

		try {
			if(usuario != null) {
				usuario.setSenha(new BCryptPasswordEncoder().encode(PasswordGenerator.generate(6)));
				usuarioService.salvar(usuario);

				logger.info("Senha atualizada com sucesso para o usuário " + login);

			}

		}catch (Exception e) {
			logger.error("Ocorreu um erro ao atualizar senha " + e.getMessage());
			return new ResponseEntity<String>(HTTPResponseUtil.errorResponse(), HttpStatus.INTERNAL_SERVER_ERROR);
		 }	
				
        return new ResponseEntity<String>(HTTPResponseUtil.successResponse(), HttpStatus.OK);
	}
	
	@RequestMapping(value="/usuario/{id}/status/{status}", produces={MediaType.APPLICATION_JSON_VALUE})
	public ResponseEntity<String> remover(@PathVariable("id") Long id, @PathVariable("status") String status){

		Usuario usuario = usuarioService.buscarPorId(id);

		if(usuario != null) {
			usuario.setAtivo(Boolean.valueOf(status));
			usuarioService.salvar(usuario);
			
			logger.info("Status atualizado com sucesso para o usuário " + usuario.getLogin());

		}	
			
		return new ResponseEntity<String>(HTTPResponseUtil.successResponse(), HttpStatus.OK);
	}

	@RequestMapping(value = "/usuario/permissao/salvar" , method = RequestMethod.POST)
	public ResponseEntity<String> salvarPermissao(@RequestBody UsuarioPermissaoModel usuarioPermissaoModel) {
		
	    List<Long> permissoes = Arrays.asList(usuarioPermissaoModel.getPermissao()).stream().map(s -> Long.parseLong(s.trim())).collect(Collectors.toList());
	    
		List<Permissao> permissoesUsuario = this.permissaoService.buscarPorLista(permissoes);
		Usuario usuario = this.usuarioService.buscarPorId(usuarioPermissaoModel.getIdUsuarioPermissao());
		
		if(usuario != null) {
			usuario.setPermissoes(permissoesUsuario);
			this.usuarioService.salvar(usuario);
		}
		
		return new ResponseEntity<String>(HTTPResponseUtil.successResponse(), HttpStatus.OK);
		 
	}
	
}
