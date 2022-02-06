$(function() {

	var AWS_S3_URL = "https://s3-sa-east-1.amazonaws.com/sistema-ninho/clientes";
	
	$(document).ready(function(){
		var fuseOptions = { keys: ["codigo", "nome"] };
		var options 	= { display: "nome", key: "id", fuseOptions: fuseOptions };
		
		$('.modal-child').on('show.bs.modal', function () {
		    var modalParent = $(this).attr('data-modal-parent');
		    $(modalParent).css('opacity', 0);
		});
		 
		$('.modal-child').on('hidden.bs.modal', function () {
		    var modalParent = $(this).attr('data-modal-parent');
		    $(modalParent).css('opacity', 1);
		});
		
		$('#numeroProposta').mask("999999999");
		$('#filtroDatInicial').mask("99/99/9999");
		$('#filtroDatFinal').mask("99/99/9999");
		$('#filtroDatInicial').datepicker( { dateFormat: 'dd/mm/yy' });
		$('#filtroDatFinal').datepicker( { dateFormat: 'dd/mm/yy' });
		
		
		$("#formProposta input[name=numero]").removeAttr('readonly');
		$("#formProposta input[name=contrato]").removeAttr('readonly');
		
		limpaFilaDocumentos();
	});
	
	$('.btn-esteira').click(function(){
		
		var proposta = $("#dataProposta").bootstrapTable('getSelections');
		var idProposta =  proposta[0].id;

		$('#btnSalvarEsteira').removeClass('d-none');
		$('#btnDefinirEsteira').addClass('d-none');
		
	 	$('#formEsteiraProposta input[name=idProposta]').val(idProposta);
		$('.area-esteiras').hide();
		$('#' + $(this).attr('data-esteira')).show();
		$('#modalEsteiraProposta').modal('toggle');
	});
	
	$('#btnDefinirEsteira').click(function(){
		var statusProposta = $('#formEsteiraProposta input[name=status]:checked').val(); 
		var mensagemStatusProposta = $('#formEsteiraProposta textarea[name=mensagem]').val();
		
		$('#formDetalhesProposta input[name=statusProposta]').val(statusProposta);
		$('#formDetalhesProposta input[name=statusMensagemProposta]').val(mensagemStatusProposta);

		$('#formEsteiraProposta')[0].reset();
		$('#modalEsteiraProposta').modal('toggle');
	});
	
	
	$('#fileUploadProposta').fileupload({
        url: '/api/cliente/documento/upload',
		dataType: 'json',
        done: function (e, data) {
        	$("#propostaDocumentos").bootstrapTable('insertRow', {
	  	        index: 1,
	  	        row: {
	  	          id: data.result.id == null ? 0 : data.result.id,	
	  	          nome: data.result.nome,
	  	          tipo: data.result.tipo,
	  	          dataEmissao: data.result.dataEmissao,
	  	          status: data.result.status
	  	        }
	  		});
        }
    }).prop('disabled', !$.support.fileInput)
    .parent().addClass($.support.fileInput ? undefined : 'disabled');


	$("#modalProposta").on('shown.bs.modal', function (e) {
		var numeroProposta = $("#formProposta input[name=numero]").val();
		var unidade 	= $("#formProposta select[name=unidade]");
		var vendedor 	= $("#formProposta select[name=vendedor]");
		
		if(numeroProposta == null || numeroProposta == ""){
			$("#formProposta select[name=codigo]").val(1).prop('selected', true);
			
			unidade.val(unidade.find('option').first().val());
			vendedor.val(vendedor.find('option').first().val());
		}
	});


	carregarMascaras = function(){
		$('#formProposta input[name=valorContrato]').autoNumeric("init");
		$('#formProposta input[name=valorLiberado]').autoNumeric("init");
		$('#formProposta input[name=valorParcela]').autoNumeric("init");
		$('#formProposta input[name=parcelaPortabilidade]').autoNumeric("init");
		$('#formProposta input[name=baseCalculo]').autoNumeric("init");

		$('#formProposta input[name=numero]').mask("999999999");
		$('#formProposta input[name=contrato]').mask("999999999");
		$('#formProposta input[name=prazoContrato]').mask("999");
		$('#formProposta input[name=dataDigitada]').mask("99/99/9999");
		$('#formProposta input[name=dataInclusao]').mask("99/99/9999");
		$('#formProposta input[name=dataStatus]').mask("99/99/9999");
		$('#formProposta input[name=dataPortabilidade]').mask("99/99/9999");
		$('#formProposta input[name=dataDigitada]').datepicker( { dateFormat: 'dd/mm/yy' });
		$('#formProposta input[name=dataInclusao]').datepicker( { dateFormat: 'dd/mm/yy' });
		$('#formProposta input[name=dataStatus]').datepicker( { dateFormat: 'dd/mm/yy' });
		$('#formProposta input[name=dataPortabilidade]').datepicker( { dateFormat: 'dd/mm/yy' });
		$('#formDocumentos input[name=dataEmissao]').mask('99/99/9999');
	}


	preencheProposta = function(result){
		if(result.banco != null)
			buscaConvenios(result.banco.codigo);

    	$("#formProposta input[name=idProposta]").val(result.id);
		$("#formProposta input[name=numero]").val(result.numero);
    	$("#formProposta input[name=contrato]").val(result.contrato);
		$("#formProposta input[name=dataDigitada]").val(COMMON.formataData(result.dataDigitada));
    	$("#formProposta input[name=dataInclusao]").val(COMMON.formataData(result.dataInclusao));
		$("#formProposta input[name=tabela]").val(result.tabela);
        $("#formProposta input[name=valorContrato]").val(COMMON.numberToReal(result.valorContrato, false));
        $("#formProposta input[name=valorLiberado]").val(COMMON.numberToReal(result.valorLiberado, false));
        $("#formProposta input[name=valorParcela]").val(COMMON.numberToReal(result.valorParcela, false));
		$("#formProposta input[name=baseCalculo]").val(COMMON.numberToReal(result.baseCalculo, false));
		$("#formProposta input[name=prazoContrato]").val(result.prazoContrato);
    	$("#formProposta select[name=unidade]").val(result.unidade.id).prop('selected', true);
    	$("#formProposta select[name=vendedor]").val(result.responsavel.id).prop('selected', true);
    	$("#formProposta select[name=venda]").val(result.venda.id).prop('selected', true);
    	$("#formProposta select[name=codigoOperacao]").val(result.codigoOperacao).prop('selected', true);
    	$("#formProposta input[name=nomeCliente]").val(result.cliente.nome);
		$("#formProposta input[name=buscaCliente]").val(result.cliente.documento);
		$("#formProposta input[name=cpfCliente]").val(result.cliente.cpf);

		if($("#formProposta select[name=venda]").find(":selected").text() == "OUTROS (INFORMAR)" 
			|| $("#formProposta select[name=venda]").find(":selected").val() == 5){
			
			$("#formProposta input[name=vendaOutro]").val(result.vendaOutro)
			$("#vendaOutroCampo").removeClass("d-none");
			$("#vendaOutroCampo").show();
		}else{ 
			$("#vendaOutroCampo").hide();
		}
		
		if(result.dataStatus != null){
			$("#formProposta input[name=dataStatus]").val(COMMON.formataData(result.dataStatus));
		}else{
			$("#formProposta input[name=dataStatus]").val("");
		}
		
		if(result.banco != null)
			$("#formProposta select[name=codigoBanco]").val(result.banco.id).prop('selected', true);
	}
	
	/**
	 * 
	 */
	$("#formProposta select[name=codigoBanco]").change(function(){
		$("#formProposta select[name=codigoOperacao]").empty();
		$("#formProposta select[name=codigoTabela]").empty();
		$("#formProposta select[name=codigoConvenio]").empty();
		$("#formProposta select[name=codigo]").empty();
		
		buscaConvenios($(this).val());
	
	});
	
	/**
	 * 
	 */
	$("#formProposta select[name=venda]").change(function(){
		if($(this).find(":selected").text() == "OUTROS (INFORMAR)" || $(this).find(":selected").val() == 5){
			$("#vendaOutroCampo").removeClass("d-none");
			$("#vendaOutroCampo").show();
		}else{ 
			$("#vendaOutroCampo").hide();
		}
	});

	/**
	 * 
	 */
	$("select[name=codigoConvenio]").change(function(){
		
		var codigoBanco 	= $("#formProposta select[name=codigoBanco]").val();
		var codigoConvenio 	=  $(this).val();

		buscaTabelasComissao(codigoBanco, codigoConvenio);
	});
	
	/**
	 * 
	 */
	verificaAprovacaoBanco = function (idProposta){
		$.ajax({
			url: '/proposta/' + idProposta + '/aprovacao/verifica-banco/', 
			success: function(result){
				$('#mensagemSolicitacao').html(result.mensagem);
			}
		});
		
		$('#modalObterSolicitacao').modal('toggle');	
	}
	
	buscaTabelasComissao = function(codigoBanco, codigoConvenio){
		
		$.preloader.start({
            modal: true,
            src : 'sprites2.png'
		});
		
		$.ajax({
			url: '/proposta/tabelas/comissionamento/' + codigoBanco + '/' + codigoConvenio,
			success: function(result){
				var operacoes 	= [];  
				var parcerias 	= [];  
				var tabelas 	= [];  
				
			  	$.each(result, function(i, item) {
			  		operacoes.push('<option value="' + item.tipoOperacao + '">' + item.tipoOperacao + '</option>');  
			  		parcerias.push('<option value="' + item.codigoParceria + '">' + item.nomeParceria + '</option>');  
			  		tabelas.push('<option value="' + item.codigoTabelaInstituicao + '">' + item.nomeTabelaInstituicao + '</option>'); 
			  	});

			  	$("select[name=codigoTabela]").empty();
		    	$("select[name=codigoTabela]").html(tabelas);  

			  	$("select[name=codigoOperacao]").empty();
		    	$("select[name=codigoOperacao]").html(operacoes); 

			  	$("#formProposta select[name=codigoParceria]").empty();
		    	$("#formProposta select[name=codigoParceria]").html(parcerias);  
		    	
		    	removeDuplicate($("#formProposta select[name=codigoTabela]"));
		    	removeDuplicate($("#formProposta select[name=codigoOperacao]"));
		    	removeDuplicate($("#formProposta select[name=codigoParceria]"));
		    	
				$.preloader.stop();
			}
		});
	}
	
	removeDuplicate = function(dropbox){
		
		var usedNames = {};
		
		$(dropbox).find('option').each(function () {
		    if(usedNames[this.text]) {
		        $(this).remove();
		    } else {
		        usedNames[this.text] = this.value;
		    }
		});
		
	}
	
	/**
	 * 
	 */
	buscaConvenios = function(idBanco){
		
		$("select[name=codigoTabela]").empty();
	  	$("select[name=codigoOperacao]").empty();
	  	$("#formProposta select[name=codigo]").empty();
    	
		$.preloader.start({
            modal: true,
            src : 'sprites2.png'
		});
		
		$.ajax({
			url:"/proposta/tabelas/comissionamento/" + idBanco,
			success: function(result){
				var items 	= []; 

				items.push('<option value="">Selecione o convenio</option>');  
				
			  	$.each(result, function(i, item) {
			  		if(item.nome_classificacao_convenio != "")
			  			items.push('<option value="' + item.codigo_convenio + '">' + item.nome_classificacao_convenio + '</option>');  
			  	});

			  	$('select[name=codigoConvenio]').empty();
		    	$('select[name=codigoConvenio]').html(items);  
		    	
		    	removeDuplicate($('select[name=codigoConvenio]'));

				$('#labelConvenio').hide();
				$.preloader.stop();

			},
			error: function (request, status, error) {
				$.preloader.stop();
				$('#labelConvenio').show();
		    }
		});
		
	}
		
	limpaFilaDocumentos = function(){
		$.ajax({
			url: '/api/cliente/documento/limpar', 
			success: function(result){
				
			}
		});
	}
	
	sincronizarProposta = function (id){
		$.ajax({
			url: "/proposta/sincronizar/" + id, 
			success: function(result){
				$("#dataProposta").bootstrapTable("refresh");
				COMMON.alertSuccess("#callBackProposta", result.message);
			},
			error: function (request, status, error) {
				var objResponse = JSON.parse(request.responseText);
				
				COMMON.alertError("#callBackProposta", "Proposta não encontrada no Corban");
			} 
		});
	}
	
	buscaProposta = function (id){
		
		$.ajax({
			url: "/proposta/" + id, 
			success: function(result){
				
			    $.preloader.start({
                    modal: true,
                    src : 'sprites2.png'
                });
                
				preencheProposta(result);
			
				setTimeout(function(){
					buscaTabelasComissao(result.banco.id, result.codigoConvenio);

					$("#formProposta select[name=codigoConvenio]").val(result.codigoConvenio).prop('selected', true);
					$("#formProposta select[name=codigoOperacao]").val(result.tabelaOperacao).prop('selected', true);
					$("#formProposta select[name=codigoParceria]").val(result.codigoParceria).prop('selected', true);
					$('#formProposta select[name=codigoTabela] option').each(function(){
						
						if ($.trim( $(this).text() ) == result.nomeTabela){ 
							$(this).prop('selected', true);
						}
					});
					
					$.preloader.stop();
		     		    
  		    	 }, 2000);

				$("#formProposta input[name=numero]").attr("readonly","readonly");
		    	$("#formProposta input[name=contrato]").attr("readonly","readonly");
				
				$("select[name=vendedor]").removeAttr("disabled");
				$("#buscaCliente").attr("readonly","readonly");
				$("#btConsultarCliente").attr("disabled","disabled");
				$("#btnNovoCliente").attr("disabled","disabled");

				$("select[name=unidade]").change();

				$(".dados-cliente").removeClass("d-none");
				$('#modalProposta').modal('toggle');
			}
		});
	}
	
	buscarPorNumero = function (numero){
		$.ajax({
			url: "/proposta/numero/" + numero, 
			success: function(result){
				
				preencheProposta(result);
				
				$("#formProposta input[name=codigoOperacao]").change();
				$("#formProposta input[name=numero]").attr("readonly","readonly");
				
				$("select[name=vendedor]").removeAttr("disabled");
				$("#buscaCliente").attr("disabled","disabled");
				$("#btConsultarCliente").attr("disabled","disabled");
				$("#btnNovoCliente").attr("disabled","disabled");

				$("select[name=unidade]").change();
				
				$(".dados-cliente").removeClass("d-none");
			}
		});
	}

	buscarPorContrato = function(contrato){
		$.ajax({
			url: "/proposta/contrato/" + contrato, 
			success: function(result){

				preencheProposta(result);
				
				$("#formProposta input[name=codigoOperacao]").change();
				$("#formProposta input[name=numero]").attr("readonly","readonly");
		    	$("#formProposta input[name=contrato]").attr("readonly","readonly");
		    	
				$("select[name=vendedor]").removeAttr("disabled");
				$("#buscaCliente").attr("disabled","disabled");
				$("#btConsultarCliente").attr("disabled","disabled");
				$("#btnNovoCliente").attr("disabled","disabled");

				$("select[name=unidade]").change();
				
				$(".dados-cliente").removeClass("d-none");
			}
		});
	}
	
	$("#salvarProposta").click(function(){
	  $("#formProposta").submit();  
	});
	  
	$("#formProposta").submit(function(){
		
    	$("#formProposta input[name=nomeParceria]").val($("#formProposta select[name=codigoParceria] option:selected" ).text());  
    	$("#formProposta input[name=nomeConvenio]").val($("#formProposta select[name=codigoConvenio] option:selected" ).text());  
    	$("#formProposta input[name=nomeTabela]").val($("#formProposta select[name=codigoTabela] option:selected" ).text());  
    	
		if($(this).valid()){
			$.ajax({
				url: $(this).attr('action'), 
				type: "POST",
			    contentType: "application/json",
				data : JSON.stringify($(this).serializeObject()),
				success: function(result){
					$("#modalProposta").modal('hide');
					$("#dataProposta").bootstrapTable("refresh");

					COMMON.alertSuccess("#callBackProposta", result.message);
				},
				error: function (request, status, error) {
					COMMON.alertError("#callBackProposta", request.responseText);
				} 
			});
		}
	});

	  
	$("select[name=estado]").change(function(){
		  var selected = $(this).val();
			
			$.getJSON('/api/estados/' + selected + '/cidades', function(data) {  
			    var items = [];  
			   
			    $.each(data, function(key, val) {  
			        	items.push('<option value="' + val[0] + '">' + val[1].toUpperCase() + '</option>');  
			        });  

			    $("select[name=cidade]").empty();
			    $("select[name=cidade]").html(items);  
			});	
	  });

	  
	  $($("select[name=unidade]")).change(function(){
			var selected = $(this).val();
			
			$.getJSON('/usuario/listar', function(data) {  
			    var items = [];  
			   
			    $.each(data, function(key, val) {  
			        	items.push('<option value="' + val.id + '">' + val.nome.toUpperCase() + '</option>');  
			    });  
			    
			    $("select[name=vendedor]").html(items);  
			});	
			
			$("select[name=vendedor]").removeAttr("disabled");
	  });
	  
	  $("#formProposta select[name=codigoOperacao]").change(function(){
		  if($(this).find(":selected").val() == 4 || $(this).find(":selected").text() == "REFIN DE PORTABILIDADE")
			  $(".container-portabilidade").show();
		  else
			  $(".container-portabilidade").hide();
	  });
	  
	  
	  $('#btnBuscarPropostas').click(function(){
		  	var numero	 	= $('#numeroProposta').val();
		  	var datInicio	= $('#filtroDatInicial').val();
		  	var datFim		= $('#filtroDatFinal').val();
		  	
		  	if(numero != ''){
		  		$("#dataProposta").bootstrapTable('refresh', {url: "/proposta/filtrar/numero/" + numero});

		  	}else if(datInicio != '' && datFim != ''){
		  		datInicio 	= datInicio.replace(/[^0-9]+/g,'-');
		  		datFim 		= datFim.replace(/[^0-9]+/g,'-');
		  		
		  		$("#dataProposta").bootstrapTable('refresh', {url: "/proposta/periodo/" + datInicio + "/" + datFim});
		  	}
	  });
	  
	  
	  $('#btnObterAprovacao').click(function(){
		  var proposta = $("#dataProposta").bootstrapTable('getSelections');
		  var idProposta =  proposta[0].id;

		  $('#formObterSolicitacao input[name=idProposta]').val(idProposta);
		  
		  verificaAprovacaoBanco(idProposta);
	  });
	  
	  
	  $("#btConsultarCliente").click(function(){
		  $("#incluirCliente").removeClass("d-none");
		  
		  var cpfCliente = $("#buscaCliente").val().replace(/[^\d]+/g,"");
		  
		  buscaCliente(cpfCliente);
			
	  });
	  
	  $("#incluirCliente").click(function(){
		  $("input[name=nomeCliente]").val($("input[name=nome]").val());
		  $("input[name=cpfCliente]").val($("input[name=cpf]").val());
		  $(".dados-cliente").removeClass("d-none");
		  $("#modalCliente").modal('hide');
	  });
	  
	  
	  $('#modalObterSolicitacao').on('click', '.btn-primary', function(){
		  
		  var idProposta = $('#formObterSolicitacao input[name=idProposta]').val();
		  
		  $.ajax({
				url: '/proposta/' + idProposta + '/aprovacao/enviar', 
				type: "GET",
			    contentType: "application/json",
				success: function(result){
					COMMON.alertSuccess("#callBackProposta", result.message);
				},
				error: function (request, status, error) {
					COMMON.alertError("#callBackProposta", request.responseText);
				} 
			 });
		  
		  $('#modalObterSolicitacao').modal('hide');
		  
		  $("#dataProposta").bootstrapTable("refresh");

	  });
	  
	  
	  $('#modalDocumentos').on('click','#salvarDocumento',function(){

		  $.ajax({
				url: '/cliente/documentos/salvar', 
				type: "POST",
				data : JSON.stringify($("#formDocumentos").serializeObject()),
			    contentType: "application/json",
				success: function(result){
					COMMON.alertSuccess("#callBackProposta", result.message);
				},
				error: function (request, status, error) {
					COMMON.alertError("#callBackProposta", request.responseText);
				} 
			 });
		  
		  $("#modalDocumentos").modal('hide');

	  });
	  
	  $('#modalEsteiraProposta').on('click','#btnSalvarEsteira',function(){

		  var detalhesIdProposta = $('#detalhesIdProposta');
		  
		  if(detalhesIdProposta.length > 0 )
			  $('#formEsteiraProposta input[name=idProposta]').val(detalhesIdProposta.val());
		  
		  $.ajax({
				url: '/proposta/esteira/salvar', 
				type: "POST",
				data : JSON.stringify($("#formEsteiraProposta").serializeObject()),
			    contentType: "application/json",
				success: function(result){
					COMMON.alertSuccess("#callBackProposta", result.message);
					
					$("#dataProposta").bootstrapTable("refresh");
					
				},
				error: function (request, status, error) {
					COMMON.alertError("#callBackProposta", request.responseText);
				} 
			 });
		  
		  $("#modalEsteiraProposta").modal('hide');
	  });
	  
	  
	 $('#btnNovaProposta').click(function(){
		$('#formProposta')[0].reset();
		$('#formProposta select[name=codigoOperacao]').empty();
		$('#formProposta select[name=codigoTabela]').empty();
		$('#formProposta select[name=codigoConvenio]').empty();
		$('#formProposta select[name=codigo]').empty();
		$('#formProposta input[name=numero]').removeAttr('readonly');
		$('#formProposta input[name=contrato]').removeAttr('readonly');
		$('#modalProposta').modal('toggle');
		
	 }); 
	 
	 $("#btnAlterarProposta").click(function(){
		  var proposta = $("#dataProposta").bootstrapTable('getSelections');
		  var idProposta =  proposta[0].id;
	      buscaProposta(idProposta);
	 }); 
	
	 $("#btnSincronizarProposta").click(function(){
		  var proposta = $("#dataProposta").bootstrapTable('getSelections');
		  var idProposta =  proposta[0].id;
		  sincronizarProposta(idProposta);
	 }); 
	  
	  
	 $("#btnVerDocumentos").click(function(){
		 limparFileDocumentos();
		 
		 var proposta = $("#dataProposta").bootstrapTable('getSelections');
	     var idCliente = proposta[0].cliente.id;
	      
	     $("#formDocumentos input[name=id]").val(idCliente);
	     $("#propostaDocumentos").bootstrapTable("removeAll");
         $("#propostaDocumentos").bootstrapTable('refresh', {url: "/cliente/" + idCliente + "/documentos"});
	      
         $('#modalDocumentos').modal('toggle');
			 
	 }); 
		  
	 $("#btnAlterarEsteira").click(function(){
		  var proposta = $("#dataProposta").bootstrapTable('getSelections');
		  var idProposta =  proposta[0].id;

	 	$('#formEsteiraProposta input[name=idProposta]').val(idProposta);
	 	$('#modalEsteiraProposta').modal('toggle');
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

	    	$("#propostaDocumentos").bootstrapTable('remove', {
		    	field: 'nome',
		    	values: [row.nome]
		    });
	    }
	}
	  
	
	statusPendenteFormatter = function(value, row, index) {
		JSON.stringify(row);
		
		var corApresentacao = "";
		
		if(row.situacao)
			corApresentacao = row.situacao.corApresentacao;
		
		return [
			'<span class="badge" style="font-size: 90%; background-color:' + corApresentacao + '; border-color:' + corApresentacao + '"">',
			value,
			'</span>'
		].join('')
	} 
	  
	operatePropostaFormatter = function(value, row, index) {
		return [
			'<a title="Editar Proposta" class="btn btn-sm btn-warning btn-edit"><i class="fas fa-pencil-alt"></i></a>',
			'<span class="separador"></span>',
			'<a title="Visualizar Documentos da Proposta" class="btn btn-sm btn-primary btn-folder"><i class="fa fa-folder"></i></a>',
			'<span class="separador"></span>',
			'<a title="Alterar Esteira da Proposta" class="btn btn-sm btn-success btn-esteira"><i class="fas fa-cogs"></i></a>',
		].join('')
	}
  
	documentoLinkFormatter = function(value, row, index){
		
		JSON.stringify(row);
			
		 var proposta = $("#dataProposta").bootstrapTable('getSelections');
	     var cpf = proposta[0].cliente.cpf;
	    
		if(row.status == "Rascunho")
			return value;
			
		return "<a href='" + AWS_S3_URL + "/" + cpf + "/" + value + "' target='_blank'>" + value + "</a>";
	} 
	
	esteiraFormatter = function(value, row, index){
		if(value != null){
			return [
				'<span class="badge" style="color: #ffffff; font-size: 90%; background-color:' + value.corApresentacao + '; border-color:' + value.corApresentacao + '">',
				value.nome,
				'</span>'
				].join('')
		}
		
		return [
			'<span class="badge badge-secondary" style="font-size: 90%;">',
			'Nova Proposta',	
			'</span>'
			].join('')
	} 

	historicoFormatter = function(value, row, index){
		JSON.stringify(row);
		return '<a title="Visualizar Historico" href="/proposta/detalhes/' + row.id + '">' + value + '</a>';
	}
	
	operateDocumentFormatter = function(value, row, index) {
		JSON.stringify(row);
		var remove = $("#removeDocumento");

		if(row.id == 0 || remove.length)
			return ['<a title="Remover registro" class="btn btn-sm btn-danger btn-remove"><i class="fa fa-trash"></i></a>'].join('');

		return "";
	}
	
	idPropostaFormatter = function(value, row, index) {
		JSON.stringify(row);

		return ['<input data-index=' + index + ' type=radio name="propostaSelecionada" value="' + row.id + '">'].join('');
	}
	
	selectedFormatter = function(value, row, index){
		JSON.stringify(row);
		
		if(row.nomeBanco != null)
			return row.nomeBanco;
		else 
			return value;
	}
	
	responsavelFormatter = function(value, row, index){
		JSON.stringify(row);
		
		if(row.nomeVendedor != null)
			return row.nomeVendedor;
		else 
			return value;
	}
	
	$("#propostaDocumentos").bootstrapTable({
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
	
	var $tableProposta = $("#dataProposta").bootstrapTable({
		  url: '/proposta/listar',
		  pagination: true,
		  sidePagination: 'server',
		  queryParams: function(params) {
	           return {
	               offset: (params.pageNumber-1),
	               limit: params.pageSize,
	               sortName:params.sortName
	           };
	       },
	      queryParamsType: '', 
		  columns: [{
			field: 'state',
			align: 'center',
			radio: 'true'
		  },
		  {
			field: 'id',
			title: '',
			align: 'center'
		  },
		  {
			field: 'cliente.id',
			title: '',
			align: 'center'
		  },
		  {
		    field: 'numero',
		    title: 'NÚMERO',
            formatter: historicoFormatter
		  },
		  {
		    field: 'unidade.nome',
		    title: 'UNIDADE',
		    align: 'center'
		  },
		  {
			field: 'responsavel.nome',
			title: 'RESPONSÁVEL',
			align: 'center',
			formatter: responsavelFormatter
		  },
		  {
			field: 'nomeVendedor',
			title: 'RESPONSÁVEL',
			align: 'center'
		  },
		  {
			field: 'situacao',
			title: 'STATUS NINHO',
			align: 'center',
			formatter: esteiraFormatter
		  },
		  {
			field: 'status',
			title: 'STATUS CORBAN',
			align: 'center',
			formatter: statusPendenteFormatter
		  },
		  {
			field: 'banco.nome',
			title: 'BANCO',
			sortable: true,
			align: 'center',
			formatter: selectedFormatter
		  },
		  {
			field: 'nomeBanco',
			title: 'BANCO',
			sortable: true,
			align: 'center'
		  },
		  {
			field: 'valorContrato',
			title: 'VL.CONTRATO',
			align: 'center',
			formatter: COMMON.moneyFormatter
		  },
		  {
			field: 'tabelaOperacao',
			title: 'OPERAÇÃO',
			align: 'center'
		  },
		  {
			field: 'baseCalculo',
			title: 'BASE DE CÁLCULO',
			align: 'center',
			formatter: COMMON.moneyFormatter
		  }
	  ]
	});
	
	$tableProposta.bootstrapTable('hideColumn', 'id');
	$tableProposta.bootstrapTable('hideColumn', 'cliente.id');
	$tableProposta.bootstrapTable('hideColumn', 'nomeVendedor');
	$tableProposta.bootstrapTable('hideColumn', 'nomeBanco');
	//init common functions 
	carregarMascaras();
});