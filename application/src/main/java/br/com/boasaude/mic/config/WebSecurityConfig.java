package br.com.boasaude.mic.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import br.com.boasaude.mic.service.UsuarioService;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class WebSecurityConfig extends WebSecurityConfigurerAdapter{

	@Autowired
	private UsuarioService usuarioRepositoryImpl;

	/**
	 * REALIZA AS CONFIGURAÇÕES DE ACESSO
	 * */
	@Override
	protected void configure(HttpSecurity http) throws Exception {
        http.csrf().disable();
		 
		http.authorizeRequests()
			//.antMatchers("/usuarios").access("hasRole('ADMINISTRADOR') or hasRole('CONVENIADO') or hasRole('PRESTADOR') or hasRole('ASSOCIADO')")
			.antMatchers("/api/usuario/redefinir-senha/").access("hasRole('ADMINISTRADOR') or hasRole('FRANQUEADO')")
			.antMatchers("/bancos").access("hasRole('ADMINISTRADOR') or hasRole('FINANCEIRO') or hasRole('FRANQUEADO')")
			.antMatchers("/operacoes").access("hasRole('ADMINISTRADOR')")
			.antMatchers("/unidades").access("hasRole('ADMINISTRADOR')")
			.antMatchers("/produtos").access("hasRole('ADMINISTRADOR')")
			.antMatchers("/contas-bancarias").access("hasRole('ADMINISTRADOR') or hasRole('FINANCEIRO')")
			.antMatchers("/agenda").authenticated()
			.antMatchers("/home").authenticated()
			.anyRequest().authenticated()			
			.and()			
				.formLogin()
				.loginPage("/").defaultSuccessUrl("/home",true)
				.permitAll() 
			.and()
				.logout()
				.logoutSuccessUrl("/")
				.logoutUrl("/logout") 
				.permitAll();
 
		http.exceptionHandling().accessDeniedPage("/acessoNegado");
		http.authorizeRequests().antMatchers("/resources/**").permitAll().anyRequest().permitAll();
 
	}
 
 
	@Autowired
    public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
		auth.userDetailsService(usuarioRepositoryImpl).passwordEncoder(new BCryptPasswordEncoder());
    }

	@Bean
	public AuthenticationManager customAuthenticationManager() throws Exception {
	  return super.authenticationManagerBean();
	}
	
}
