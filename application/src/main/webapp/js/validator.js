// Wait for the DOM to be ready
$(function() {
  // Initialize form validation on the registration form.
  // It has the name attribute "registration"
	
	jQuery.validator.addMethod("cpf", function(value, element) {
		   value = jQuery.trim(value);

		    value = value.replace('.','');
		    value = value.replace('.','');
		    cpf = value.replace('-','');
		    while(cpf.length < 11) cpf = "0"+ cpf;
		    var expReg = /^0+$|^1+$|^2+$|^3+$|^4+$|^5+$|^6+$|^7+$|^8+$|^9+$/;
		    var a = [];
		    var b = new Number;
		    var c = 11;
		    for (i=0; i<11; i++){
		        a[i] = cpf.charAt(i);
		        if (i < 9) b += (a[i] * --c);
		    }
		    if ((x = b % 11) < 2) { a[9] = 0 } else { a[9] = 11-x }
		    b = 0;
		    c = 11;
		    for (y=0; y<10; y++) b += (a[y] * c--);
		    if ((x = b % 11) < 2) { a[10] = 0; } else { a[10] = 11-x; }

		    var retorno = true;
		    if ((cpf.charAt(9) != a[9]) || (cpf.charAt(10) != a[10]) || cpf.match(expReg)) retorno = false;

		    return this.optional(element) || retorno;

		}, "Informe um numero de CPF válido");
	
	$.validator.setDefaults({
	    ignore: ""
	});	
	
  //formulario de Login
  $("#formLogin").validate({
	    rules: {
	      username: "required",
	      password: {
	        required: true,
	        minlength: 6
	      }
	    },
	    messages: {
	      username: "Informe o login do usuario",
	      password: {
	        required: "Informe a senha do usuario",
	        minlength: "A senha deve ter mais de 6 caracteres"
	      }
	    },
	    submitHandler: function(form) {
	      form.submit();
	    }
  });
	  
	
  $("#formUnidade").validate({
	    rules: {
	      nome: "required",
	      endereco: "required",
	      metaDigitados: "required",
	      metaPagos: "required",
	      dataInauguracao: "required",
	      estado: "required",
	      cidade: "required",
	      chave: "required",
	      nomeSuporte: "required",
	      emailSuporte: {
	        required: true,
	        email: true
	      },
	      cpfSuporte: {
	        required: true,
	        cpf: true,
	      },
	      telefone: {
	          required: true,
	          minlength: 10
	        },
	      telefoneSuporte: {
	          required: true,
	          minlength: 10
	      },
	      cep: {
		     required: true,
		     minlength: 8
		  }
	    },
	    // Specify validation error messages
	    messages: {
	      nome: "Informe o nome da unidade",
	      endereco: "Informe o endereço da unidade",
	      metaDigitados: "Informe a meta digitada",
	      metaPagos: "Informe a meta paga",
	      nomeSuporte: "Informe o nome do suporte",
	      dataInauguracao: "Selecione uma data",
	      cep: "Informe o numero do CEP",
	      emailSuporte: {
	    	  required: "Informe um endereco de email",
	    	  email: "Informe um endereco email valido"
	      },
	      cpfSuporte: {
	    	  required: "Informe o numero do CPF do suporte",
	    	  cpf: "Informe um numero de CPF válido"
	      },
	      telefoneSuporte: {
	    	  required: "Informe o numero de telefone do suporte",
	    	  minlength: "O numero precisa conter o formato (XX)XXXX-XXXX"
	      },
	      telefone: {
	    	  required: "Informe o numero de telefone da unidade",
	    	  minlength: "O numero precisa conter o formato (XX)XXXX-XXXX"
	      },
	      endereco: "Informe o endereço da unidade",
	      estado: "Selecione o estado",
	      cidade: "Selecione a cidade",
	      chave: "Informe a chave"
	    },
	    submitHandler: function(form) {
	      form.submit();
	    }
	  });
  
  
  
  $("#formCliente").validate({
    rules: {
      nome: "required",
      dataNascimento: "required",
      assinatura: "required",
      rg: {
          required: true,
          minlength: 8
      },
      email: {
        required: true,
        email: true
      },
      cpf: {
        required: true,
        cpf: true,
      },
      cep: {
        required: true,
        minlength: 8
      },
      telComercial: {
        required: true,
        minlength: 10
      },
      telResidencial: {
        required: true,
        minlength: 10
      },
      telCelular: {
        required: true,
        minlength: 11
      },      
      endereco: "required",
      estado: "required",
      cidade: "required",
      ocupacao: "required",
      produto: "required",
      unidades: "required"
      
    },
    // Specify validation error messages
    messages: {
      nome: "Informe o nome",
      dataNascimento: "Informe a data de nascimento",
      assinatura: "Selecione o tipo de assinatura",
      rg: {
    	  required: "Informe o numero do RG",
    	  minlength: "O numero do RG deve conter 8 digitos"
      },
      email: {
    	  required: "Informe um endereco de email",
    	  email: "Informe um endereco email valido"
      },
      cpf: {
    	  required: "Informe o numero do CPF",
    	  cpf: "Informe um numero de CPF válido"
      },
      cep: {
    	  required: "Informe o numero do CEP",
    	  minlength: "O numero do CEP precisa conter 8 digitos"
      },
      telComercial: {
    	  required: "Informe o numero de telefone comercial",
    	  minlength: "O numero precisa conter o formato (XX)XXXX-XXXX"
      },
      telResidencial: {
    	  required: "Informe o numero de telefone residencial",
    	  minlength: "O numero precisa conter o formato (XX)XXXX-XXXX"
      },
      telCelular: {
    	  required: "Informe o numero de telefone celular",
    	  minlength: "O numero precisa conter o formato (XX)XXXXX-XXXX"
      },
      endereco: "Informe o endereço",
      estado: "Selecione o estado",
      cidade: "Selecione a cidade",
      ocupacao: "Selecione a ocupação",
      produto: "Selecione o produto",
      unidades: "Selecione uma unidade de trabalho"
      
    },
    submitHandler: function(form) {
    },
    submitHandler: function(form) {
      form.submit();
    }
  });

  
  //Formulario de metas
  $("#formMeta").validate({
	  rules:{
		  nome: "required",
		  valorCalculo: "required"
	  },
	  messages:{
		  nome: "Informe o nome da meta",
		  valorCalculo: "Informe o valor do calculo"
	  },
	  submitHandler: function(form) {
	  
	  },
	  success: function(form) {
	  
	  }
  });
  
  
  //Formulario de ações do cliente
  $("#notaClienteForm").validate({
	    rules: {
	    	mensagem: "required",
	    	tipo: "required"
	    },
	    messages: {
	    	mensagem: "Informe uma mensagem descritiva da ação",
	    	tipo: "Selecione o tipo de ação"
	    },
	    submitHandler: function(form) {
	    	form.submit();
	    },
	    success: function(form) {
	    }
  });
  
  
  //Formulario de proposta
  $("#formProposta").validate({
	    rules: {
	    	dataDigitada: "required",
	    	dataInclusao: "required",
	    	tabelaConvenio: "required",
	    	codigoTabela: "required",
	    	valorContrato: "required",
	    	valorLiberado: "required",
	    	prazoContrato: "required",
	    	valorParcela: "required",
	    	unidade: "required",
	    	vendedor: "required",
	    	codigoBanco: "required",
	    	codigo: "required",
	    	venda: "required",
	    	codigoOperacao: "required",
	    	numero: "required",
	    	termoAceite: "required"
	    },

	    messages: {
	    	dataDigitada: "Informe uma data da digitada",
	    	dataInclusao: "Informe uma data de inclusão",
	    	tabelaConvenio: "Informe a tabela convenio",
	    	codigoTabela: "Informe a tabela",
	    	valorContrato: "Informe o valor do contrato",
	    	valorLiberado: "Informe o valor liberado",
	    	prazoContrato: "Informe o prazo do	 contrato",
	    	valorParcela: "Informe o valor da parcela",
	    	unidade: "Informe uma unidade de trabalho",
	    	vendedor: "Informe o vendedor responsavel",
	    	codigoBanco: "Selecione o banco",
	    	codigo: "Informe a parceria",
	    	venda: "Informe o tipo de venda",
	    	codigoOperacao: "Informe a operação",
	    	numero: "Informe o numero da proposta",
	    	termoAceite: "Confirme a leitura do termo de aceite"
	      
	    },
	    submitHandler: function(form) {
	    },
	    success: function(form) {
    		$("#salvarCliente").removeClass("d-none");
	    }
  	});
  
  //Formulario de extrato financeiro
  $("#formFiltroExtrato").validate({
	  rules:{
		  filtroDatInicial: "required",
		  filtroDatFinal: "required"
	  },
	  messages:{
		  filtroDatInicial: "Informe a data inicial da consulta",
		  filtroDatFinal: "Informe a data final da consulta"
	  },
	  submitHandler: function(form) {
	  
	  },
	  success: function(form) {
		  form.submit();
	  }
  });
  
  $("#formUsuarioPerfil").validate({
	    rules: {
	    	nome: "required",
	    	email: {
	    		required: true,
	    	    email: true
	    	},
	    	senhaAtual: {
	    		required: { 
	    			depends: function(element) {
	    				if(!$(element).attr("readonly") && $(element).val() == "")
	    					return true;
					
	    				return false;
	    			}
	    		}
	    	},
	    	novaSenha: { 
	    		minlength: 6,
    			required: { 
	    			depends: function(element) {
	    				if(!$(element).attr("readonly") && $(element).val() == "")
	    					return true;
					
	    				return false;
	    			}
				}
            },
	       	confirmaSenha: {
	    		required: {
	    			depends: function(element) {
	    				if(!$(element).attr("readonly") && $(element).val() == "")
	    					return true;
					
	    				return false;
	    			}
	    		},
	            equalTo: "#novaSenha"
	        },
	    },
	    messages: {
	    	nome: "Informe o nome do usuário",
	    	email: {
	          required: "Informe um endereco de email",
	          email: "Informe um endereco email valido"
	        },
	        senhaAtual: "Informe a senha atual",
	        novaSenha: {
	        	minlength: "A nova senha deve conter no minimo 6 caracteres",
	        	requiredSenha: "Informe a senha atual",
	        	required: "Informe uma nova senha"
	        },
	        confirmaSenha: {
	        	required: "Informe a confirmação da senha",
	            equalTo: "As senhas devem ser iguais"
	        }
	    },
	    submitHandler: function(form) {
	      //form.submit();
	    }
	});
  

  $("#formEvento").validate({
	    rules: {
	    	titulo: "required",
	    	agendaCliente: "required", 
	    	descricao: "required",
	    	inicio: "required",
	    	fim: "required"
	    },
	    messages: {
	    	titulo: "Informe o titulo do evento",
	    	agendaCliente: "Informe o nome do cliente", 
	    	descricao: "Informe a descrição do evento",
	    	inicio: "Informe a data e hora de inicio",
	    	fim: "Informe a data e hora do termino"
	    },
	    submitHandler: function(form) {
	      //form.submit();
	    }
	});

  
  
});
