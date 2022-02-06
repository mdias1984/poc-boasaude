$(function() {
	
	$("#formUsuario input[name=matrizCorban]").mask("999");


	$("#usuarioPerfilTab").steps({
	    headerTag: "h4",
	    bodyTag: "section",
	    transitionEffect: "slideLeft",
	    enableFinishButton: false,
	    enablePagination: false,
	    enableAllSteps: true,
	    titleTemplate: "#title#",
	    cssClass: "tabcontrol"
	});

    $(".imageupload").imageupload({
		allowedFormats: ['jpg', 'jpeg', 'png', 'gif'],
		maxWidth: 150,
		maxHeight: 150,
		maxFileSizeKb: 512
	});
	
	$("#unidadesUsuario").bsMultiSelect();
	$('#unidadesPerfilUsuario').bsMultiSelect({
		containerClass: 'col-lg-6'
	});
	
	
	$('#btPingCorban').click(function(){
		var usuario = $('#formUsuario input[name=usuarioCorban]').val();
		var matriz 	= $('#formUsuario input[name=matrizCorban]').val();
		
		$.ajax({
			url: "/corban/valida-usuario/" + usuario + "/" + matriz, 
			success: function(result){
				if(result != null)
					COMMON.alertSuccess('#callBackUsuarioCorban','Usuário ativo no sistema Corban');	
			}, 
			error: function (request, status, error) {
				COMMON.alertError('#callBackUsuarioCorban','Usuário não encontrado ou desativado no sistema Corban');	
		    }
		});
		
	});
	
	
	buscaUsuario = function (id){
		$.ajax({
			url: "/usuario/" + id, 
			success: function(result){
				
				$("#unidadesUsuario option:selected").prop("selected", false);
				
				var str = JSON.stringify(result);
		    	var obj = JSON.parse(str);
		    	
		    	$('input[name="login"]').val(obj.login);
		    	$('input[name="nome"]').val(obj.nome);
		    	$('input[name="email"]').val(obj.email);
		    	$('input[name="cep"]').val(obj.cep);
		    	$('input[name="cnpj"]').val(obj.cnpj);
		    	$('input[name="dataNascimento"]').val(obj.dataNascimento);
		    	$('input[name="logradouro"]').val(obj.logradouro);
		    	$('input[name="contrato"]').val(obj.contrato);
		    	$('input[name="numero"]').val(obj.numero);
		    	$('input[name="bairro"]').val(obj.bairro);
		    	$('input[name="cidade"]').val(obj.cidade);
		    	$('input[name="uf"]').val(obj.uf);
		    	$('input[name="cpf"]').val(obj.cpf);
		    	$('input[name="rg"]').val(obj.rg);
		    	$('input[name="contrato"]').val(obj.contrato);
		    	$('input[name="registro"]').attr("readonly","");
		    
	    		
				$("#unidadesUsuario").bsMultiSelect("Dispose");
                $("#unidadesUsuario").bsMultiSelect();
                
				$("#alertCallBack").hide();
		    	$("#formUsuario").attr("action","/usuario/atualizar");
		    	
				$("#modalUsuario").modal("toggle");

			}
		});
	}
	

	carregaPermissoesUsuario = function (id){
		$("#idUsuarioPermissao").val(id);
		$("#modalUsuarioPermissao").modal("toggle");
		
		$.ajax({
			url: "/usuario/" + id, 
			success: function(obj){
		    	$.each(obj.permissoes, function(i, item) {
		    		$("#formUsuarioPermissao").append('<input type="hidden" name="' + obj.permissoes[i].nome + '">');
		    	});
			}
		});
		
		var id = $("#idUsuarioPermissao").val();
		
		$("input:checkbox[name='permissao']").each(function(){
		    $(this).removeAttr('checked');
		});
		
		  $(".m_switch_check:checkbox").mSwitch({
              onRender:function(elem){
                  var entity = elem.attr("entity");
                  var label = elem.parent().parent().prev(".m_settings_label");
                  
                  if (!elem[0].checked){
                      $.mSwitch.turnOff(elem);
                  }else{
                      $.mSwitch.turnOn(elem);
                  }
              },
              onRendered:function(elem){
                  //console.log(elem);
              },
              onTurnOn:function(elem){
                  var entity = elem.attr("entity");
                  var label = elem.parent().parent().prev(".m_settings_label");
                  
                  if (elem.val() == "0"){
                      elem.val("1");
                      label.html(entity + " <span class=\"m_green\">(Enable)</font>");
                  }else{
                      label.html(entity + " <span class=\"m_red\">(Error)</font>");
                  }
              },
              onTurnOff:function(elem){
                  var entity = elem.attr("entity");
                  var label = elem.parent().parent().prev(".m_settings_label");
                  if (elem.val() == 1){
                      elem.val("0");
                      label.html(entity + " <span class=\"m_red\">(Disable)</font>");
                  }else{
                      label.html(entity + " <span class=\"m_red\">(Error)</font>");
                  }
              }
          });
		
	}
	
	$("#modalUsuarioPermissao").on('click', '#salvarPermissao', function () {
		var form = $("#formUsuarioPermissao");
		  
		$.ajax({
			url: form.attr('action'), 
			type: "POST",
		    contentType: "application/json",
			data : JSON.stringify(form.serializeObject()),
			success: function(data){
				$('#modalUsuarioPermissao').modal('toggle');
				listarUsuarios();
			}, 
			error: function (request, status, error) {
				console.log(request.responseText);
		    }
		});
	});
	
	$("#btnNovoUsuario").click(function(){
		$('#alertCallBack').hide();
		$('#formUsuario')[0].reset();
		$('#formUsuario').attr('action', '/usuario/salvar');
		$('#formUsuario :input').removeAttr('readonly');
	}); 

	$('#confirmModalUsuario').on('click','.btn-primary', function(){
		var id 		= $('input[name="idUsuario"]').val();
		var status 	= $('input[name="statusUsuario"]').val();	
		
		$.ajax({
			url: '/usuario/' + id + '/status/' + status, 
			type: "GET",
		    contentType: "application/json",
			success: function(data){
				$('#alertAction').find('span').html(data.message)
				$('#alertAction').removeClass("alert-danger");
				$('#alertAction').addClass("alert-success");
				$('#alertAction').show();
				
				$('#confirmModalUsuario').modal('toggle');
				
				$('#dataUsuario').bootstrapTable("refresh");
			}
		});
	});  
	
	
	$("#modalUsuario").on('click', '#salvarUsuario', function () {
		var form = $("#formUsuario");
		  
		$.ajax({
			url: form.attr('action'), 
			type: "POST",
		    contentType: "application/json",
			data : JSON.stringify(form.serializeObject()),
			success: function(result){
				COMMON.alertSuccess("#callBackUsuario", result.message);

			}, 
			error: function (request, status, error) {
				COMMON.alertError("#callBackUsuario", request.responseText);
		    }
		});

		$('select[name="grupo"]').val(0).prop("selected", true);
		$('.badge').remove();	
		$('.custom-control-input').prop('checked', false);
		
		$('#formUsuario')[0].reset();

		$('#modalUsuario').modal('toggle');
	});
	
	$('#btnRecuperarSenha').click(function(){
		
		var form = $('form[name="formRecuperarSenha"]');
		
		$.ajax({
			url: form.attr('action'), 
			type: "POST",
		    contentType: "application/json",
			data : JSON.stringify(form.serializeObject()),
			success: function(data){
				$('#callBackRecuperarSenha').removeClass('alert-danger');
				$('#callBackRecuperarSenha').addClass('alert-success');
				$('#callBackRecuperarSenha').find('span').html(data.message);
				$('#callBackRecuperarSenha').show();
			}, 
			error: function (request, status, error) {
				$('#callBackRecuperarSenha').removeClass('alert-success');
				$('#callBackRecuperarSenha').addClass('alert-danger');
				$('#callBackRecuperarSenha').find('span').html(request.responseText)
				$('#callBackRecuperarSenha').show();
		    }
		});
	});
	

	$("#btnSalvarPerfil").click(function () {
		var form = $('form[name="formUsuarioPerfil"]');
		
		if(form.valid()){
			$.ajax({
				url: '/usuario/perfil/salvar', 
				type: "POST",
			    contentType: "application/json",
				data : JSON.stringify(form.serializeObject()),
				success: function(data){
					$('#alertCallBackPerfil').removeClass('alert-danger');
					$('#alertCallBackPerfil').addClass('alert-success');
					$('#alertCallBackPerfil').find('strong').html("Sucesso!");
					$('#alertCallBackPerfil').find('span').html(data.message);
					$('#alertCallBackPerfil').show();
	
				}, 
				error: function (request, status, error) {
					$('#alertCallBackPerfil').removeClass('alert-success');
					$('#alertCallBackPerfil').addClass('alert-danger');
					$('#alertCallBackPerfil').find('strong').html("Erro!");
					$('#alertCallBackPerfil').find('span').html(request.responseText);
					$('#alertCallBackPerfil').show();
			    }
			});
		}
	});
	
	$(".altera-perfil").click(function(){
		var bindField = $(this).attr("data-bind");
		
		var arr = bindField.split(',');
		
		$.each( arr, function( index, value ) {
			$("input[name='" + value + "']").removeAttr("readonly");
			$("input[name='" + value + "']").focus()
		});
	});
	
	
	operateFormatter = function(value, row, index) {
		return [
			'<a title="Editar registro" class="btn btn-sm btn-warning btn-edit"><i class="fas fa-pencil-alt"></i></a>'
		].join('')
	}
	
	
	statusFormatter = function(value, row, index) {
		
		if(value)
			return ['<span class="badge badge-success">', 'Ativo', '</span>'].join('')
			
		return ['<span class="badge badge-danger">', 'Inativo', '</span>'].join('')
	} 

	window.operateEvents = {
	    'click .btn-edit': function (e, value, row, index) {
	      JSON.stringify(row);
	      
	      buscaUsuario(row.id);
	    },
	    'click .btn-ativar': function (e, value, row, index) {
		      JSON.stringify(row);
	    	
	    	  $("input[name=idUsuario]").val(row.id)
			  $("input[name=statusUsuario]").val(true);
		      $("#confirmModalUsuario").modal("toggle");
		},
		'click .btn-desativar': function (e, value, row, index) {
			  JSON.stringify(row);
	    	
	    	  $("input[name=idUsuario]").val(row.id)
			  $("input[name=statusUsuario]").val(false);
		      $("#confirmModalUsuario").modal("toggle");
		}
	 }
				
	$('#dataUsuario').bootstrapTable({
		  url: '/usuario/listar/' + $("#id_perfil").val(),
		  pagination: true,
		  search: true,
		  columns: [{
		    field: 'id',
		    title: 'CÓDIGO',
		    align: 'center',
		  }, {
		    field: 'nome',
		    title: 'NOME',
            sortable: true

		  },
		  {
			field: 'email',
			title: 'EMAIL',
			sortable: true
		  },
		  {
			field: 'ativo',
			title: 'STATUS',
			align: 'center',
			sortable: true,
			formatter: statusFormatter
		  },
		  {
	        field: 'operate',
	        title: 'AÇÕES',
	        align: 'center',
	        events: window.operateEvents,
	        formatter: operateFormatter
	     }]
	});
	
});