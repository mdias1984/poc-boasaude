package br.com.boasaude.mic.controller;

import java.security.Principal;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import br.com.boasaude.mic.persistence.entity.Usuario;
import br.com.boasaude.mic.service.UsuarioService;

@Controller
public class DashboardController {

	@Autowired
	private UsuarioService usuarioService;
	
	@RequestMapping(value="/dashboard", method= RequestMethod.GET)
	public String inicio(Model model, HttpServletRequest request){
		
		Principal principal = request.getUserPrincipal();
		
		if(principal == null)
			return "redirect: /";
			

		Usuario usuario = usuarioService.buscarPorLogin(principal.getName());

		model.addAttribute("usuario", usuario);

		if(request.isUserInRole("ROLE_ADMINISTRADOR")) 
			return "dashboard/administrador";
		
		if(request.isUserInRole("ROLE_VENDEDOR")) 
			return "dashboard/vendedor";
			
		else if(request.isUserInRole("ROLE_FRANQUEADO")) 
			return  "dashboard/franqueado";
			
		else if(request.isUserInRole("ROLE_CONSULTOR")) 
			return  "dashboard/consultor";
		
		else if(request.isUserInRole("ROLE_FINANCEIRO")) 
			return  "dashboard/financeiro";
		
		return "home";
	}
}
