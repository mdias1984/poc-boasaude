$(function() {
	$(document).ready(function(){
		$('#formMeta input[name=valorMeta]').autoNumeric("init");
	});
	
	buscaMeta = function (id){
		$.ajax({
			url: "/meta/" + id, 
			success: function(result){
				var str = JSON.stringify(result);
		    	var obj = JSON.parse(str);
		    	
		    	$("input[name=id]").val(obj.id);
		    	$("input[name=nome]").val(obj.nome);
		    	$("input[name=valorMeta]").val(obj.valorCalculo);
		    	
		    	if(obj.usuario != null)
		    		$("select[name=usuario]").val(obj.usuario.id).prop('selected', true);
		    	
		    	
		    	if(obj.unidade != null)
		    		$("select[name=unidade]").val(obj.unidade.id).prop('selected', true);
				
		    	$('#modalMeta').modal('toggle');
			}
		});
	}

	$('#btnNovaMeta').click(function(){
		$('#formMeta')[0].reset();
	});
	
	$('#confirmModalMeta').on('click','.btn-primary', function(){
		var id 	= $("#formMeta").find("input[name=id]").val();
			
		$.ajax({
			url: '/meta/remover/' + id, 
			type: "GET",
		    contentType: "application/json",
			success: function(result){
				$("#confirmModalMeta").modal('hide');
				
				$("#dataMeta").bootstrapTable('remove', {
			        field: 'id',
			        values: id
				});

				$("#dataMeta").bootstrapTable("refresh");
				
				COMMON.alertSuccess("#callBackMeta", result.message);
			},
			error: function (request, status, error) {
				COMMON.alertSuccess("#callBackMeta", request.responseText);
			}
		});
	});  

	
	$("#modalMeta").on('click', '#salvar', function () {
		var form = $("#formMeta");
		  
		$.ajax({
			url: form.attr('action'), 
			type: "POST",
		    contentType: "application/json",
			data : JSON.stringify(form.serializeObject()),
			success: function(result){

				$('#modalMeta').modal('toggle');
				$("#dataMeta").bootstrapTable("refresh");
				COMMON.alertSuccess("#callBackMeta", result.message);
			},
			error: function (request, status, error) {
				COMMON.alertSuccess("#callBackMeta", request.responseText);
			} 
		});
	});
	

	 window.operateEvents = {
	    'click .btn-edit': function (e, value, row, index) {
	      JSON.stringify(row);
	      buscaMeta(row.id);
	    },
	    'click .btn-remove': function (e, value, row, index) {
	    	$("#formMeta").find("input[name=id]").val(row.id);
	    	$("#confirmModalMeta").modal('toggle');
	    }
	 }
				
	 operateMetaFormatter = function(value, row, index) {
			JSON.stringify(row);
			var remove = $("#gerenciaMeta");

			if(remove.length > 0){
				return [
					'<a title="Editar registro" class="btn btn-sm btn-warning btn-edit"><i class="fas fa-pencil-alt"></i></a>',
					'<span class="separador"></span>',
					'<a title="Remover registro" class="btn btn-sm btn-danger btn-remove"><i class="fa fa-trash"></i></a>',
				].join('')
			}

			return "";
	 }
	 
	 unidadeFormatter = function(value, row, index) {
		JSON.stringify(row);

		/*
		if(row.responsavel.unidades.length > 1){
			var unidades = "";
				
			for(var i=0; i < row.responsavel.unidades.length; i++){
				unidades += row.responsavel.unidades[i].nome;
				unidades += "</br>";
			}
				
			return unidades;
		}else{
			return row.responsavel.unidades[0].nome;
		}
		*/
		
		if(row.unidade != null){
			return row.unidade.nome;
		}

		return "-";
	 }
	 	 
	 
	$("#dataMeta").bootstrapTable({
		  url: '/meta/listar',
		  pagination: true,
		  search: true,
		  columns: [{
		    field: 'nome',
		    title: 'NOME',
            sortable: true
		  },
		  {
		    field: 'usuario.nome',
		    title: 'USUÁRIO',
            sortable: true
		  },
		  {
		    field: 'responsavel.nome',
		    title: 'RESPONSÁVEL',
		    sortable: true
		  },
		  {
		    field: 'unidade.nome',
		    title: 'UNIDADE',
            sortable: true,
            formatter: unidadeFormatter
		  },
		  {
		    field: 'valorCalculo',
		    title: 'VALOR CALCULO',
		    formatter: COMMON.moneyFormatter
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
	        events: window.operateEvents,
	        formatter: operateMetaFormatter
	     }]
	});
	
 });
