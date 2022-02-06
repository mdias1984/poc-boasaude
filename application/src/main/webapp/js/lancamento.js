$(function () {
		
	buscaLancamento = function(id){
		$.preloader.start({
           modal: true,
           src : 'sprites2.png'
        });
		 
        $.ajax({
            url: "/lancamento/" + id, 
            success: function(result){
            	
            	$('#formLancamento select[name=unidade]').val(result.unidade.id).prop('selected', true);
                $('#formLancamento input[name=id]').val(result.id);
    			$('#formLancamento input[name=competencia]').val(COMMON.formataData(result.competencia));
    			$('#formLancamento input[name=vencimento]').val(COMMON.formataData(result.vencimento));
    			$('#formLancamento select[name=contaBancaria]').val(result.contaBancaria.id).prop('selected', true);
    			$('#formLancamento select[name=metodoPagamento]').val(result.metodoPagamento.id).prop('selected', true);
    			$('#formLancamento input[name=valor]').val(COMMON.numberToReal(result.valor, false));
    			$('#formLancamento textarea[name=observacoes]').val(result.observacoes);
    			
    			$('#formLancamento select[name=funcionario]').append($('<option>', {
    			    value: result.funcionario.id,
    			    text: result.funcionario.nome.toUpperCase()
    			}));
    			
    			$('#dataPropostaLancamento').bootstrapTable({ data: result.propostas});
    			$('#dataPropostaLancamento').bootstrapTable('load', result.propostas);
    			
    			$.each(result.propostas, function(key, val) {  
    				$('<input />').attr('type', 'hidden')
    								.attr('name', "proposta")
    								.attr('value', val.id)
    								.appendTo('#formLancamento');
			    }); 
    			 
                $('#modalLancamento').modal('toggle');
            }
        });
        
        
		$.preloader.stop();

	}
	
	removeLancamento = function(id){
        $.ajax({
            url: "/lancamento/remover/" + id, 
            success: function(result){
            	$("#dataLancamento").bootstrapTable('remove', {
    		    	field: 'id',
    		    	values: [row.id]
    		    });
            }
        });
	}
	

	$("#modalLancamento").on('shown.bs.modal', function (e) {
		$('#formLancamento input[name=competencia]').mask("99/99/9999");
		$('#formLancamento input[name=vencimento]').mask("99/99/9999");
		$('#formLancamento input[name=competencia]').datepicker( { dateFormat: 'dd/mm/yy' });
		$('#formLancamento input[name=vencimento]').datepicker( { dateFormat: 'dd/mm/yy' });
		$('#formLancamento input[name=valor]').autoNumeric("init");
	});
	
	
	$('#btnNovoLancamento').click(function(){
		$('#formLancamento')[0].reset();
	});
	
	
	$('#btBuscarProposta').click(function(){
		
		$.preloader.start({
			modal: true,
			src : 'sprites2.png'
		});
		
		$.ajax({
			url: '/proposta/busca/lancamento/' + $('#buscaProposta').val(), 
			success: function(data){
				
				if($('input[name=proposta][value=' + data.id + ']').length > 0){
			    	$.preloader.stop();
					return;
				}
				
				$("#dataPropostaLancamento").bootstrapTable('insertRow', {
		  	        index: 1,
		  	        row: {
		  	          'id': data.id,	
		  	          'ticket': data.ticket,	
		  	          'numero': data.numero,
		  	          'contrato': data.contrato,
		  	          'cliente.nome': data.cliente.nome,
		  	          'dataInclusao': data.dataInclusao
		  	        }
		  		});
				
				$('<input />').attr('type', 'hidden')
		          .attr('name', "proposta")
		          .attr('value', data.id)
		          .appendTo('#formLancamento');
				
				$("#dataPropostaLancamento").bootstrapTable("refresh");
				$('#callBackBuscaProposta').hide();
				
		    	$.preloader.stop();
		    	
			},
			error: function (request, status, error) {
				COMMON.alertError("#callBackBuscaProposta", 'Proposta não encontrada');
				
		    	$.preloader.stop();
			} 
		});
		
		$('#buscaProposta').val('');
	});
	
	$('#formLancamento select[name=unidade]').change(function(){
		$.preloader.start({
			modal: true,
			src : 'sprites2.png'
		});
		   
		$.ajax({
			url: '/usuario/lista/unidade/' + $(this).val(), 
			success: function(result){
				var items = [];  
			   
			  	$.each(result, function(i, item) {
				  items.push('<option value="' + item.id + '">' + item.nome.toUpperCase() + '</option>');  
			  	});

			  	$("#formLancamento select[name=funcionario]").empty();
		    	$("#formLancamento select[name=funcionario]").html(items);  
		    	
		    	$.preloader.stop();
			}
		});
	});
	
	$("#confirmRemocaoLancamentoModal").on('click', '.btn-primary', function () {
		 
	 	var id = $('#formLancamento input[name=id]').val();
	 
		$.ajax({
			url: '/lancamento/remover/' + id, 
			type: 'GET',
		    contentType: "application/json",
			success: function(result){
				$("#confirmRemocaoLancamentoModal").modal('hide');
				
				$("#dataLancamento").bootstrapTable('remove', {
			        field: 'id',
			        values: id
				});

				$("#dataLancamento").bootstrapTable("refresh");

				COMMON.alertSuccess("#callBackLancamento", result.message);
			},
			error: function (request, status, error) {
				COMMON.alertSuccess("#callBackLancamento", request.responseText);
			}
		});
	});
	
	$("#modalLancamento").on('click', '.btn-primary', function () {
		
	  	COMMON.limpaCampos();

		var form = $("#formLancamento");
		
		$.ajax({
			url: form.attr('action'), 
			type: "POST",
		    contentType: "application/json",
			data : JSON.stringify(form.serializeObject()),
			success: function(result){
				$("#modalLancamento").modal('hide');
				$("#dataLancamento").bootstrapTable("refresh");
				
				COMMON.alertSuccess("#callBackLancamento", result.message);
			},
			error: function (request, status, error) {
				COMMON.alertSuccess("#callBackLancamento", request.responseText);
			} 
		});
	 });
		
	operateFormatter = function(value, row, index) {
		return [
			'<a title="Visualizar registro" class="btn btn-sm btn-success btn-view"><i class="fas fa-binoculars"></i></a>',
			'<span class="separador"></span>',
			'<a title="Editar registro" class="btn btn-sm btn-warning btn-edit"><i class="fas fa-pencil-alt"></i></a>',
			'<span class="separador"></span>',
			'<a title="Remover registro" class="btn btn-sm btn-danger btn-remove"><i class="fa fa-trash"></i></a>',
		].join('')
	}

	window.operateEvents = {
		
		'click .btn-view': function (e, value, row, index) {
			$('#formLancamento input').attr('disabled', 'disabled');
			$('#formLancamento select').attr('disabled', 'disabled');
			$('#formLancamento textarea').attr('disabled', 'disabled');
			$('#btSalvarLancamento').attr('disabled', 'disabled');
			$('#btBuscarProposta').attr('disabled','disabled');
			
			JSON.stringify(row);

			buscaLancamento(row.id);
	    	
	    	$('#formLancamento input[name=view]').val(1);
	    },
	    'click .btn-edit': function (e, value, row, index) {
	    	$('#formLancamento input').removeAttr('disabled');
			$('#formLancamento select').removeAttr('disabled');
			$('#formLancamento textarea').removeAttr('disabled');
			$('#btSalvarLancamento').removeAttr('disabled');
			$('#btBuscarProposta').removeAttr('disabled');
			
	    	JSON.stringify(row);

	    	buscaLancamento(row.id);
	    	
	    	$('#formLancamento input[name=view]').val(0);
	    },		 
	    'click .btn-remove': function (e, value, row, index) {
	    	$('#formLancamento input[name=id]').val(row.id);
	    	$('#confirmRemocaoLancamentoModal').modal('toggle');
	    }
	 }
			
	 $('#dataLancamento').bootstrapTable({
		  url: '/lancamento/listar',
		  pagination: true,
		  search: true,
		  columns: [
		  {
			  field: 'id',
			  title: 'ID',
			  align: 'center'
		  },
		  {
			  field: 'competencia',
			  title: 'COMPETENCIA',
			  align: 'center',
			  formatter: COMMON.dateFormatter
		  },
		  {
			  field: 'vencimento',
			  title: 'VENCIMENTO',
			  align: 'center',
			  formatter: COMMON.dateFormatter
		  },
		  {
			  field: 'contaBancaria',
			  title: 'CONTA',
			  align: 'center',
			  formatter: function(value, row, index) {
				  	if(value == null)
				  		return '-';
				  		
					return value.agencia + '-' + value.conta;
				}
		  },
		  {
			  field: 'metodoPagamento.nome',
			  title: 'PAGAMENTO',
			  sortable: true,
			  align: 'center'
		  },
		  {
			  field: 'unidade.nome',
			  title: 'LOJA',
			  sortable: true,
			  align: 'center'
		  },
		  {
			  field: 'funcionario.nome',
			  title: 'FUNCIONÁRIO',
			  sortable: true,
			  align: 'center'
		  },
		  {
	        field: 'operate',
	        title: 'AÇÕES',
	        align: 'center',
	        events: window.operateEvents,
	        formatter: operateFormatter
	     }]
	});
	 
	 
	$('#dataPropostaLancamento').bootstrapTable({
		  pagination: true,
		  search: false,
		  columns: [
		  {
			  field: 'id',
			  title: 'ID',
			  align: 'center'
		  },
		  {
			  field: 'ticket',
			  title: 'TICKET'
		  },
		  {
			  field: 'numero',
			  title: 'NUMERO',
			  align: 'center'
		  },
		  {
			  field: 'contrato',
			  title: 'CONTRATO',
			  align: 'center'
		  },
		  {
			  field: 'cliente.nome',
			  title: 'CLIENTE',
			  sortable: true
		  },
		  {
			  field: 'dataInclusao',
			  title: 'DATA CRIAÇÃO',
			  align: 'center',
			  formatter: COMMON.dateFormatter,
			  sortable: true
		  },
		  {
	        field: 'operate',
	        title: 'AÇÕES',
	        align: 'center',
	        events: {
	        
	        	'click .btn-remove': function (e, value, row, index) {
	        		JSON.stringify(row);
		    	
			    	$("#dataPropostaLancamento").bootstrapTable('remove', {
				    	field: 'numero',
				    	values: [row.numero]
				    });
			    	
		    		$('input[name=proposta][value=' + row.id + ']').remove();
	        	}	
		    },
	        formatter: function(value, row, index) {
	        	if($('#formLancamento input[name=view]').val() == '1')
	        		return '';
	        		        	
	        	return '<a title="Remover registro" class="btn btn-sm btn-danger btn-remove"><i class="fa fa-trash"></i></a>'
	        }
	   }]  
	});
	
	
});