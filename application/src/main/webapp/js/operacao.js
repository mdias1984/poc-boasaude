$(function () {
	
	buscaOperacao = function(id){
        $.ajax({
            url: "/operacao/" + id, 
            success: function(obj){
                $("input[name=id]").val(obj.id);
                $("input[name=nome]").val(obj.nome);

                $("#modalOperacao").modal("toggle");
            }
        });
	}

	 window.operateEvents = {
	    'click .btn-edit': function (e, value, row, index) {
	      JSON.stringify(row);
	      buscaOperacao(row.id);
	    },
	    'click .btn-remove': function (e, value, row, index) {
	    	JSON.stringify(value);
	    
	    	$("#formOperacao").find("input[name=id]").val(row.id);
	    	$("#confirmRemocaoOperacaoModal").modal("toggle");
	    }
	 }
	 
	 
	 $('#btnNovaOperacao').click(function(){
		 $('#formOperacao')[0].reset();
	 });
		
	 
	 $("#confirmRemocaoOperacaoModal").on("click", ".btn-primary", function () {
		 
	 	var id = $("#formOperacao").find("input[name=id]").val();
	 
		$.ajax({
			url: "/operacao/remover/" + id, 
			type: "GET",
		    contentType: "application/json",
			success: function(result){
				$("#confirmRemocaoOperacaoModal").modal('hide');
				
				$("#dataOperacao").bootstrapTable("remove", {
			        field: "id",
			        values: id
				});

				$("#dataOperacao").bootstrapTable("refresh");

				COMMON.alertSuccess("#callBackOperacao", result.message);
			},
			error: function (request, status, error) {
				COMMON.alertSuccess("#callBackOperacao", request.responseText);
			}
		});
	});
		
	 
	$("#dataOperacao").bootstrapTable({
		  url: '/operacao/listar',
		  pagination: true,
		  search: true,
		  columns: [{
		    field: 'id',
		    title: 'CÓDIGO',
		    align: 'center',
		  },
		  {
		    field: 'nome',
		    title: 'NOME OPERAÇÃO',
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
	        events: window.operateEvents,
	        formatter: COMMON.operateFormatter
	     }]
	});
	 
	
	$("#modalOperacao").on('click', '.btn-primary', function () {
		 
		var form = $("#formOperacao");
		 
		 $.ajax({
			url: form.attr('action'), 
			type: "POST",
		    contentType: "application/json",
			data : JSON.stringify(form.serializeObject()),
			success: function(result){
				$("#modalOperacao").modal('hide');
				$("#dataOperacao").bootstrapTable("refresh");
				
				COMMON.alertSuccess("#callBackOperacao", result.message);
			},
			error: function (request, status, error) {
				COMMON.alertSuccess("#callBackOperacao", request.responseText);
			} 
		});
	 });
});