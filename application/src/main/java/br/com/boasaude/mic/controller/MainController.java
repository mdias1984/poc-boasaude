package br.com.boasaude.mic.controller;

import java.security.Principal;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import br.com.boasaude.mic.persistence.entity.Usuario;
import br.com.boasaude.mic.service.UsuarioService;

@Controller
public class MainController {

	@Autowired
	private UsuarioService usuarioService;

	@RequestMapping(value="/", method= RequestMethod.GET)	
	public String index(HttpServletRequest request){	
		Principal principal 	= request.getUserPrincipal();

		if(principal != null) {
			return "redirect:/home";
		}
		
	    return "index";
	}
	
	@RequestMapping(value="/home", method= RequestMethod.GET)
	public String home(Model model, HttpServletRequest request, HttpServletResponse response){
		
		Principal principal = request.getUserPrincipal();
		Usuario usuario 	= usuarioService.buscarPorLogin(principal.getName());

		model.addAttribute("usuario", usuario);	
		
		return "redirect:/dashboard";
	}
	

	@RequestMapping(value="/acessoNegado", method= RequestMethod.GET)
	public String acessoNegado(){
		return "acesso-negado";
	}
}
