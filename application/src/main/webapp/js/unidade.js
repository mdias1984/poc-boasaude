$(function () {
	'use strict';
	
	$("#tabsUnidade").steps({
	    headerTag: "h2",
	    bodyTag: "section",
	    transitionEffect: "slideLeft",
	    enableFinishButton: false,
	    enablePagination: false,
	    enableAllSteps: true,
	    titleTemplate: "#title#",
	    cssClass: "tabcontrol"
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
	
	
	$("#modalUnidade").on('shown.bs.modal', function (e) {
		var form = $("#formUnidade");
		var idUnidade = form.find("input[name=id]").val();
	
		if(idUnidade == ""){
			$("#unidadeFranqueados").bootstrapTable("removeAll");
			$("#unidadeColaboradores").bootstrapTable("removeAll");
		}
		
		form.find('input[name="cep"]').mask("99999-999");
		form.find('input[name="telefone"]').mask("(99)9999-9999");
		form.find('input[name="telefoneSuporte"]').mask("(99)9999-9999");
		form.find('input[name="metaDigitados"]').mask("R$9.999.999,99");
		form.find('input[name="metaPagos"]').mask("R$9.999.999,99");
		form.find('input[name="dataInauguracao"]').mask('99/99/9999');
		form.find('input[name="dataInauguracao"]').datepicker( { dateFormat: 'dd/mm/yy' });
		
		$("#tabsUnidade").steps("setStep", 0);

		
	});
		
	$("#modalUnidade").on("click","#adicionarFranqueado",function(){
		var selectedItem = $("select[name=listaFranqueados] option:selected").val();
		var selectedText = $("select[name=listaFranqueados] option:selected").text();
		
		$("#unidadeFranqueados").bootstrapTable('insertRow', {
	        index: 1,
	        row: {
	          id: selectedItem,
	          nome:selectedText
	        }
		});
	});

	$("#modalUnidade").on("click","#adicionarColaborador",function(){
		var selectedItem = $("select[name=listaColaboradores] option:selected").val();
		var selectedText = $("select[name=listaColaboradores] option:selected").text();
		
		$("#unidadeColaboradores").bootstrapTable('insertRow', {
	        index: 1,
	        row: {
	          id: selectedItem,
	          nome:selectedText
	        }
		});
	});

	
	$.fn.steps.setStep = function (step)
	{
	  var currentIndex = $(this).steps('getCurrentIndex');
	  for(var i = 0; i < Math.abs(step - currentIndex); i++){
	    if(step > currentIndex) {
	      $(this).steps('next');
	    }
	    else{
	      $(this).steps('previous');
	    }
	  } 
	};
	
	function FocusTabWithErrors(tabPanelName) {
	    var tabpanel = $(tabPanelName);
	    var tabs = tabpanel.find('section').toArray();
	    var tabNames = Array();
	    for (var i = 0; i < tabs.length; i++) {
	        tabNames[i] = "#" + tabs[i].id;
	    }
	    
	    $("#formUnidade").find(":input").each(function () {
	       
	    	if ($(this).hasClass('error')) { 
	        
	    		for (var z = 0; z < tabNames.length; z++) {
	            
	    			if ($(tabNames[z]).find($(this)).length)
	    				$("#tabsUnidade").steps("setStep", z);
	                	
	            }
	            return false; // ends each
	        }
	        return true;
	    });
	}
	
	function buscaUnidade(id){
        $.ajax({
            url: "/unidade/" + id, 
            success: function(obj){
                $("input[name=id]").val(obj.id);
                $("input[name=nome]").val(obj.nome);
		    	$("input[name=dataInauguracao]").val(COMMON.formataData(obj.dataInauguracao));
                $("input[name=telefone]").val(COMMON.formataTelefone(obj.telefone));
                $("input[name=cep]").val(obj.cep);
                $("input[name=endereco]").val(obj.endereco);
                $("input[name=bairro]").val(obj.bairro);
                $("input[name=complemento]").val(obj.complemento);
                $("input[name=metaDigitados]").val(COMMON.numberToReal(obj.metaDigitados));
                $("input[name=metaPagos]").val(COMMON.numberToReal(obj.metaPagos));
                $("input[name=nomeSuporte]").val(obj.nomeSuporte);
                $("input[name=emailSuporte]").val(obj.emailSuporte);
                $("input[name=cpfSuporte]").val(obj.cpfSuporte);
                $("input[name=telefoneSuporte]").val(COMMON.formataTelefone(obj.telefoneSuporte));
                
                if(obj.estado != null){
                	$("select[name=estado]").val(obj.estado.id).prop('selected', true);
                	$("select[name=estado]").change();
                }
                
                if(obj.cidade != null)
                	$("select[name=cidade]").val(obj.cidade.id).prop('selected', true);

                $("#unidadeFranqueados").bootstrapTable('refresh', {url: "/unidade/franqueados/" + obj.id});
                $("#unidadeColaboradores").bootstrapTable('refresh', {url: "/unidade/usuarios/" + obj.id});
                $('#modalUnidade').modal('toggle');
            }
        });
	}
	
	function setColaboradores(){
		var data = $("#unidadeColaboradores").bootstrapTable('getData');
		
		$("#formUnidade").find("input[name=usuarios]").remove();
		
		$.each(data, function(i, item) {
		    $('<input>').attr({
		        type: 'hidden',
		        name: 'usuarios',
		        value: item.id
		    }).appendTo("#formUnidade");
		 });
	}
	
	function setFranqueados(){
		var data = $("#unidadeFranqueados").bootstrapTable('getData');
		
		$("#formUnidade").find("input[name=franqueados]").remove();

		$.each(data, function(i, item) {
		    $('<input>').attr({
		        type: 'hidden',
		        name: 'franqueados',
		        value: item.id
		    }).appendTo("#formUnidade");
		 });
	}
	
	
	$("#modalUnidade").on("click", "#salvarUnidade", function () {
		var form = $("#formUnidade");
		var validator = form.validate();
		validator.form();

    	var errors = validator.numberOfInvalids();
    	
        focusStepErrors('#tabsUnidade', form);
        
        if(errors == 0){
        	
    		$("form  .field-mask").each(function() {
    		    $(this).unmask();
    		    
    		    var fieldVal = $(this).val().replace(/[^\d]+/g,"");
    		    $(this).val(fieldVal);
    		});
    		
        	setColaboradores();
        	setFranqueados();
        	
			 $.ajax({
				url: form.attr('action'), 
				type: "POST",
			    contentType: "application/json",
				data : JSON.stringify(form.serializeObject()),
				success: function(result){
					$("#modalUnidade").modal('hide');
					$("#dataUnidade").bootstrapTable("refresh");
					
					COMMON.alertSuccess("#callBackUnidade", JSON.parse(result).message);
				},
				error: function (request, status, error) {
					COMMON.alertError("#callBackUnidade", request.responseText);
				} 
			});
        }
	 });
	
	
	$('#confirmRemocaoUnidadeModal').on('click','.btn-primary', function(){
		var id 	= $("#formUnidade").find("input[name=id]").val();
			
		$.ajax({
			url: '/unidade/remover/' + id, 
			type: "GET",
		    contentType: "application/json",
			success: function(result){
				COMMON.alertSuccess("#callBackUnidade", result.message);

				$("#dataUnidade").bootstrapTable("refresh");
			},
			error: function (request, status, error) {
				COMMON.alertSuccess("#callBackUnidade", request.responseText);
			} 
		});
		
		$('#confirmRemocaoUnidadeModal').modal('hide');
	});  
	
	    
	window.unidadeEvents = {
	    'click .btn-edit-unidade': function (e, value, row, index) {
		      JSON.stringify(row);
		      buscaUnidade(row.id);
		    },
	    'click .btn-remove-unidade': function (e, value, row, index) {
	    	$("#formUnidade").find("input[name=id]").val(row.id);
			$("#confirmRemocaoUnidadeModal").modal("toggle");
	     }
	 }
	
	
	window.franqueadoOperateEvents = {
	    'click .btn-remove': function (e, value, row, index) {
		    $("#unidadeFranqueados").bootstrapTable('remove', {
		    	field: 'id',
		    	values: [row.id]
		    });
		}
	}
	
	window.colaboradorOperateEvents = {
	    'click .btn-remove': function (e, value, row, index) {
		    $("#unidadeColaboradores").bootstrapTable('remove', {
		    	field: 'id',
		    	values: [row.id]
		    });
		}
	}
		
	
	operateFormatter = function(value, row, index) {
		return [
			'<a title="Editar registro" class="btn btn-sm btn-warning btn-edit-unidade"><i class="fas fa-pencil-alt"></i></a>',
			'<span class="separador"></span>',
			'<a title="Remover registro" class="btn btn-sm btn-danger btn-remove btn-remove-unidade"><i class="fa fa-trash"></i></a>',
		].join('')
	}
	
	$('#btnNovaUnidade').click(function(){
		$('#formUnidade')[0].reset();
	});
	
	$('#unidadeColaboradores').bootstrapTable({
		  pagination: true,
		  search: true,
		  columns: [{
		    field: 'id',
		    title: 'CODIGO',
          sortable: true
		  }, {
		    field: 'nome',
		    title: 'NOME',
		    sortable: true
		  },
		  {
	        field: 'operate',
	        title: 'AÇÕES',
	        align: 'center',
	        events: window.colaboradorOperateEvents,
	        formatter: COMMON.operateRemoveFormatter
	     }]
	});
	
	$("#unidadeFranqueados").bootstrapTable({
		  pagination: true,
		  search: true,
		  columns: [{
		    field: 'id',
		    title: 'CODIGO',
            sortable: true
		  }, {
		    field: 'nome',
		    title: 'NOME',
		    sortable: true
		  },
		  {
	        field: 'operate',
	        title: 'AÇÕES',
	        align: 'center',
	        events: window.franqueadoOperateEvents,
	        formatter: COMMON.operateRemoveFormatter
	     }]
	});
		
	$('#dataUnidade').bootstrapTable({
		  url: '/unidade/listar',
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
			field: 'telefone',
			title: 'TELEFONE',
			align: 'center',
			formatter: COMMON.phoneFormatter
		  },
		  {
			field: 'dataInauguracao',
			title: 'DATA INAUGURAÇÃO',
			align: 'center',
			formatter: COMMON.dateFormatter,
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
	        events: window.unidadeEvents,
	        formatter: operateFormatter
	     }]
	});
			
});