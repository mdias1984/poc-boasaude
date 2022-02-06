$(function() {
	$('.btn-proposta-intervalo').click(function(){
		$("#relatorioProposta").bootstrapTable("refresh", {url: '/proposta/intervalo/' + $(this).val() });
		
		$('.btn-proposta-intervalo').removeClass('active');
		$(this).addClass('active');
	})

	$('.btn-proposta-excel').click(function(){
		var intervalo 	= $('.btn-proposta-intervalo.active').val();
	
		$('#formRelatorioProposta input[name=intervalo]').val(intervalo);
		$('#formRelatorioProposta').submit();
	});
	
	
	/**
	 * Trata as exportações de clientes
	 */
	$('.btn-cliente-intervalo').click(function(){
		$("#relatorioCliente").bootstrapTable("refresh", {url: '/cliente/intervalo/' + $(this).val() });
		
		$('.btn-cliente-intervalo').removeClass('active');
		$(this).addClass('active');
	})

	$('.btn-cliente-excel').click(function(){
		var intervalo 	= $('.btn-cliente-intervalo.active').val();
	
		$('#formRelatorioCliente input[name=intervalo]').val(intervalo);
		$('#formRelatorioCliente').submit();
	});
	
	
	$('#btnBuscarPropostas').click(function(){
		var datInicio	= $('#filtroDatInicial').val();
		var datFim		= $('#filtroDatFinal').val();
		  	
		
	  	if(datInicio != '' && datFim != ''){
	  		datInicio 	= datInicio.replace(/[^0-9]+/g,'-');
	  		datFim 		= datFim.replace(/[^0-9]+/g,'-');
	  		
	  		$("#relatorioProposta").bootstrapTable('refresh', {url: "/proposta/periodo/" + datInicio + "/" + datFim});
	  	}
	});

	$('#btnBuscarClientes').click(function(){
		var datInicio	= $('#filtroDatInicial').val();
		var datFim		= $('#filtroDatFinal').val();
		  	
		
	  	if(datInicio != '' && datFim != ''){
	  		datInicio 	= datInicio.replace(/[^0-9]+/g,'-');
	  		datFim 		= datFim.replace(/[^0-9]+/g,'-');
	  		
	  		$("#relatorioCliente").bootstrapTable('refresh', {url: "/cliente/periodo/" + datInicio + "/" + datFim});
	  	}
	});

	
	$("#relatorioProposta").bootstrapTable({
		  url: '/proposta/intervalo/' + $('.btn-proposta-intervalo.active').val(),
		  pagination: true,
		  sidePagination: 'server',
		  queryParams: function(params) {
	           return {
	               offset: (params.pageNumber-1),
	               limit: params.pageSize
	           };
	       },
	      queryParamsType: '', 
		  columns: [{
			field: 'id',
			title: 'TICKET',
			align: 'center'
		  },
		  {
		    field: 'numero',
		    title: 'NÚMERO',
            sortable: true,
            formatter: historicoFormatter
		  },
		  {
		    field: 'unidade.nome',
		    title: 'UNIDADE',
		    align: 'center',
            sortable: true
		  },
		  {
			field: 'responsavel.nome',
			title: 'RESPONSÁVEL',
			align: 'center',
	        sortable: true
		  },
		  {
			field: 'status',
			title: 'STATUS CORBAN',
			sortable: true,
			align: 'center',
			formatter: statusPendenteFormatter
		  },
		  {
			field: 'situacao',
			title: 'SITUAÇÃO CORBAN',
			sortable: true,
			align: 'center',
		    formatter: esteiraFormatter
		  },
		  {
			field: 'banco.nome',
			title: 'BANCO',
			sortable: true,
			align: 'center',
			formatter: selectedFormatter
		  }
	  ]
	});
	
	$('#relatorioCliente').bootstrapTable({
		  url: '/cliente/intervalo/' + $('.btn-cliente-intervalo.active').val(),
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
		  }]	    
	});
});