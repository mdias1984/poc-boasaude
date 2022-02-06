$(function() {

	var AWS_S3_URL = "https://s3-sa-east-1.amazonaws.com/sistema-ninho/clientes";

	$("#tabsCliente").steps({
	    headerTag: "h2",
	    bodyTag: "section",
	    transitionEffect: "slideLeft",
	    enableFinishButton: false,
	    enablePagination: false,
	    enableAllSteps: true,
	    titleTemplate: "#title#",
	    cssClass: "tabcontrol"
	});
	
	$('#fileupload').fileupload({
        url: '/api/cliente/documento/upload',
		dataType: 'json',
		add: function (e, data){
			
			var tipoDocumento 	= $('select[name=tipoDocumento] option:selected').val();
		  	var dataEmissao		= $('#dataEmissao').val();
		  	
		  	if(tipoDocumento == null) {
		  		alert('Selecione o tipo de documento');
		  		return false;
		  	}
		  	
		  	if(dataEmissao == ""){
		  		alert('Informe a data de emissão');
		  		return false;
		  	}
		  	
			data.submit();

	    },
        done: function (e, data) {
        	$("#clienteDocumentos").bootstrapTable('insertRow', {
	  	        index: 1,
	  	        row: {
	  	          id: data.result.id == null ? 0 : data.result.id,	
	  	          nome: data.result.nome,
	  	          tipo: data.result.tipo,
	  	          status: data.result.status,
	  	          dataEmissao: data.result.dataEmissao
	  	        }
	  		});
        }
    }).on('fileuploadadd', function (e, data) {
    	

    }).prop('disabled', !$.support.fileInput)
    .parent().addClass($.support.fileInput ? undefined : 'disabled');

	$("#modalCliente").on('shown.bs.modal', function (e) {
		carregarMascarasCliente();
	});	
	
	carregarMascarasCliente = function(){
		$("#formCliente input[name=cpf]").mask("999.999.999-99");
		$("#formCliente input[name=cep]").mask("99999-999");
		$("#formCliente input[name=telComercial").mask("(99)9999-9999");
		$("#formCliente input[name=telResidencial").mask("(99)9999-9999");
		$("#formCliente input[name=telCelular").mask("(99)99999-9999");
		$("#formCliente input[name=dataNascimento").mask("99/99/9999");
		$("#formCliente input[name=dataEmissao]").mask("99/99/9999");
	}
	
	limparFileDocumentos = function(){
		$.ajax({
			url: "/api/cliente/documento/limpar", 
			success: function(result){
				$("#tbodyArquivos").empty();
			}
		});
	}
	
	buscaCliente = function (cpf){
		$.ajax({
			url: "/api/cliente/" + cpf, 
			success: function(result){
				var str = JSON.stringify(result);
		    	var obj = JSON.parse(str);
		    	
		    	if(obj.estadoCliente != null)
		    		COMMON.carregaCidades(obj.estadoCliente.id);
			    
			    $("input[name=id").val(obj.id);
		    	$("input[name=nome]").val(obj.nome);
		    	$("input[name=dataNascimento]").val(obj.dataNascimento);
		    	$("input[name=email1]").val(obj.email1);
		    	$("input[name=email2]").val(obj.email2);
		    	$("input[name=telComercial]").val(COMMON.formataTelefone(obj.telComercial));
		    	$("input[name=telResidencial]").val(COMMON.formataTelefone(obj.telResidencial));
		    	$("input[name=telCelular]").val(COMMON.formataTelefoneCelular(obj.telCelular));
		    	$("input[name=cep]").val(obj.cep);
		    	$("input[name=endereco]").val(obj.endereco);
		    	$("input[name=complemento]").val(obj.complemento);
		    	$("input[name=bairro]").val(obj.bairro);
		    	$("input[name=nomePai]").val(obj.nomePai);
		    	$("input[name=nomeMae]").val(obj.nomeMae);
		    	$("input[name=rg]").val(obj.rg);
		    	$("input[name=cpf]").val(obj.cpf == null ? obj.documento : obj.cpf);
		    	$("input[name=cnpj]").val(obj.cnpj);
		    	
		    	if(obj.estadoCliente != null)
		    		$("select[name=estado]").val(obj.estadoCliente.id).prop('selected', true);
		    	
		    	if(obj.cidadeCliente != null)
		    		$("select[name=cidade]").val(obj.cidadeCliente.id).prop('selected', true);
		    	
		    	if(obj.ocupacao != null)
		    		$("select[name=ocupacao]").val(obj.ocupacao.id).prop('selected', true);
		    	
		    	if(obj.produto != null)
		    		$("select[name=produto]").val(obj.produto.id).prop('selected', true);
		    	
		    	if(obj.assinatura != null)
		    		$("select[name=assinatura]").val(obj.assinatura).prop('selected', true);

		    	if(obj.isWhatApp)
		    		$("input[name=isWhatApp]").attr('checked', true);
		    	else 
		    		$("input[name=isWhatApp]").attr('checked', false);
		    	
		    	
		    	$('.thumbnail').attr('src', AWS_S3_URL + "/" + obj.cpf + "/" + obj.imagemPerfil);
		    	
		    	if($('.thumbnail').width() < 0)
		    		$('.thumbnail').attr('src','/img/icon-user-default.png');
		    	 
		    	$('.thumbnail').css('max-width', 150);
		    	$('.thumbnail').css('max-height', 150);
		    	
		    	var unidades = "";
		    	
		    	$.each(obj.unidades, function(i, item) {
		    		unidades = unidades.concat(obj.unidades[i].id + ",");
		    	});
		    	
		    	$.each(unidades.split(","), function(i,e){
		    	    $("select[name=unidades] option[value='" + e + "']").prop("selected", true);
		    	});
		    	
                $("#clienteDocumentos").bootstrapTable('refresh', {url: "/cliente/" + obj.id + "/documentos"});
				$('#modalCliente').modal('toggle');
				
				$("#alertBuscaCliente").hide();
			},
			error: function (request, status, error) {
				COMMON.alertError("#alertBuscaCliente", "Cliente não encontrado");
			} 
		});
	}
	
	removerDocumento = function(idDocumento, btn){
		$.ajax({
			url: '/api/cliente/rascunho/remover/' + idDocumento, 
			type: "GET",
		    contentType: "application/json",
			success: function(data){
			    $(btn).parents('tr').first().remove();
			}
		});
	}
	
	
	$('#confirmModalCliente').on('click','.btn-primary', function(){
		var id 	= $('input[name="idCliente"]').val();
			
		$.ajax({
			url: '/api/cliente/' + id + '/remover/', 
			type: "GET",
		    contentType: "application/json",
			success: function(data){
				$('.alert.alert-success').find('span').html(data.message)
				$('.alert.alert-success').show();
				
				$('#confirmModalCliente').modal('toggle');
			}
		});
	});  
	
	$('#btnAddNota').click(function(event){
		
		var id = $('#notaClienteForm').find('input[name=idCliente]').val();
		var url = '/cliente/{id}/nota/adicionar'.replace('{id}',id);
		
		$.ajax({
			url: url, 
			type: 'POST',
		    contentType: 'application/json',
			data : JSON.stringify($('#notaClienteForm').serializeObject()),
			success: function(nota){

				var $i = ""; 
                   
				if(nota.tipo == 'email') 	$i="<i class='far fa-envelope'></i>";
				if(nota.tipo == 'ligacao') 	$i="<i class='fas fa-phone'></i>";
				if(nota.tipo == 'whatsapp') $i="<i class='fab fa-whatsapp'></i>";
				if(nota.tipo == 'local') 	$i="<i class='far fa-handshake'></i>";
				
				var $time = $('<div/>')
			    .attr('datetime', '2017-11-03T13:22')
			    .addClass('cbp_tmtime')
			    .append('<span class="basic">' + COMMON.formataDataExtenso(nota.dataInclusao) + '</span>');
                   
				var $divLabel = $('<div/>')
			    .attr('datetime', '2017-11-03T13:22')
			    .addClass('cbp_tmlabel')
			    .append($i)
			    .append(' <b>' + nota.responsavel.nome + '</b>')
				.append(' <p>' + nota.descricao + '</p>');

				var $li = $('<li/>')
			    .append($time)
			    .append('<div class="cbp_tmsmallicon"></div>')
			    .append($divLabel);	
				
				$li.insertAfter($('.cbp_root_node'));
				
			}
		});
		
		event.preventDefault();

		return false;

	});
		
	$("#cancelarCliente").click(function(){
		$("#modalCliente").modal('hide');
	});

	
	$("#modalCliente").on('click', '#salvarCliente', function () {
		
		var form = $("#formCliente");
		form.attr('action', '/cliente/salvar');
		
		var validator = form.validate();
    	validator.form();
    	
    	var errors = validator.numberOfInvalids();
    	
        focusStepErrors('#tabsCliente', form);
        
    	$("form .field-unmask").each(function() {
		    $(this).unmask();
		    
		    var fieldVal = $(this).val().replace(/[^a-zA-Z0-9]/g, "");
		    $(this).val(fieldVal);
		});
    	
        if(errors == 0){
			$.ajax({
				url: form.attr('action'), 
				type: "POST",
			    contentType: "application/json",
				data : JSON.stringify(form.serializeObject()),
				success: function(data){
					$('.alert.alert-success').find('span').html(data.message)
					$('.alert.alert-success').show();
					$("#modalCliente").modal('hide');
					
					$('#dataCliente').bootstrapTable("refresh");
							
					if($("input[name=nomeCliente]").length > 0 ){
					  $("input[name=nomeCliente]").val($("#formCliente input[name=nome]").val());
					  $("input[name=cpfCliente]").val($("#formCliente input[name=cpf]").val());
					  $(".dados-cliente").removeClass("d-none");
					  $("#modalCliente").modal('hide');
					} 
				}
			});
		}
	});
	
	$("#btnNovoCliente").click(function(){
		$('#formCliente')[0].reset();
		
		$.ajax({
			url: "/api/cliente/documento/limpar", 
			success: function(result){
				$('#clienteDocumentos').bootstrapTable('removeAll');
			}
		});
	});
	
	window.documentoOperateEvents = {
	    'click .btn-remove': function (e, value, row, index) {
	    	
		    JSON.stringify(row);
		      
	    	$.ajax({
				url: '/api/cliente/documento/remover/' + row.id, 
				type: "GET",
			    contentType: "application/json",
				success: function(data){
				}
			 });

	    	$("#clienteDocumentos").bootstrapTable('remove', {
		    	field: 'nome',
		    	values: [row.nome]
		    });
	    }
	}
	
	window.clienteEvents = {
	    'click .btn-edit': function (e, value, row, index) {
	      JSON.stringify(row);
	      
	      limparFileDocumentos();
	      buscaCliente(row.documento);
	      
	    },
	    'click .btn-remove': function (e, value, row, index) {
	    $('#dataCliente').bootstrapTable('remove', {
	        field: 'id',
	        values: [row.id]
	      })
	      
	      $("#formCliente").find("input[name=id]").val(row.id);
	      $("#confirmRemocaoProdutoModal").modal("toggle");
	    	
       }
	}
	
	clienteDetalhesFormatter  = function(value, row, index){
		JSON.stringify(row);
		
		return "<a href='/cliente/detalhes/" + row.id + "'>" + value + "</a>";
		
	}
	
	documentoIdFormatter = function(value, row, index){
		JSON.stringify(row);
	    
		if(row.id == null)
			return 0;
			
		return row.id;
	} 
	
	documentoLinkFormatter = function(value, row, index){
		
		JSON.stringify(row);
		var cpf = $("#formCliente").find("input[name=cpf]").val();
	    
		if(row.status == "Rascunho")
			return value;
			
		return "<a href='" + AWS_S3_URL + "/" + cpf + "/" + value + "' target='_blank'>" + value + "</a>";
	} 
	
	operateDocumentFormatter = function(value, row, index) {
		JSON.stringify(row);
		var remove = $("#removeDocumento");

		if(row.id == 0 || remove.length)
			return ['<a title="Remover registro" class="btn btn-sm btn-danger btn-remove"><i class="fa fa-trash"></i></a>'].join('');

		return "";
	}
	
	$("#clienteDocumentos").bootstrapTable({
		  pagination: true,
		  search: true,
		  columns: [{
			field: 'id',
			title: 'ID',
			sortable: true
		  },{
		    field: 'nome',
		    title: 'NOME',
		    sortable: true,
		    formatter: documentoLinkFormatter
		  },
		  {
			field: 'tipo',
			title: 'TIPO',
			sortable: true
		  },
		  {
			field: 'dataEmissao',
			title: 'DATA EMISSÃO',
			formatter: COMMON.dateFormatter,
			align: 'center'	
		  },
		  {
			field: 'status',
			title: 'STATUS',
			sortable: true
		  },
		  {
	        field: 'operate',
	        title: 'AÇÕES',
	        align: 'center',
	        events: window.documentoOperateEvents,
	        formatter: operateDocumentFormatter
	     }]
	});
		
	$('#dataCliente').bootstrapTable({
	  url: '/cliente/listar',
	  pagination: true,
	  search: true,
	  sidePagination: 'server',
	  queryParams: function(params) {
           return {
        	   search: params.searchText,
               offset: (params.pageNumber-1),
               limit: params.pageSize
           };
       },
      queryParamsType: '',  
	  columns: [{
	    field: 'nome',
	    title: 'NOME',
        sortable: true,
        formatter: clienteDetalhesFormatter

	  }, {
	    field: 'documento',
	    title: 'DOCUMENTO',
		align: 'center'
	  },
	  {
		field: 'email',
		title: 'EMAIL',
		sortable: true
	  },
	  {
		field: 'telComercial',
		title: 'TELEFONE',
		align: 'center'
	  },
	  {
		field: 'telCelular',
		title: 'CELULAR',
		align: 'center'
	  },
	  {
		field: 'dataInclusao',
		title: 'DATA CRIAÇÃO',
		formatter: COMMON.dateFormatter,
		align: 'center',
		sortable: true
	  },
	  {
		field: 'operate',
        title: 'AÇÕES',
        align: 'center',
        events: window.clienteEvents,
        formatter: COMMON.operateEditFormatter
      }],
      onLoadSuccess : function(data){
		  $('#dataCliente').find('tbody').show();
		  $('.fixed-table-pagination').show();

		  /*
    	  if($("#perfilVendedor").length > 0){
    		  $('.fixed-table-pagination').hide(); 
    	  }
    	  */
      },
      onSearch: function (text) {
		  $('#dataCliente').find('tbody').show();
		  $('.fixed-table-pagination').show();

		  /*
		  if($("#perfilVendedor").length > 0){
    		  if(text != ''){
        		  $('#dataCliente').find('tbody').show();
        		  $('.fixed-table-pagination').show();
        	  }else{
        		  $('#dataCliente').find('tbody').hide();
        		  $('.fixed-table-pagination').hide(); 
        	  }
    	  }
    	  */
      }
	});
 });