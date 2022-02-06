$(function () {
	
	buscaMetodoPagamento = function(id){
        $.ajax({
            url: "/metodo-pagamento/" + id, 
            success: function(obj){
                $("input[name=id]").val(obj.id);
                $("input[name=nome]").val(obj.nome);

                $('#modalMetodoPagamento').modal('toggle');
            }
        });
	}
	
	$('#btnNovoMetodoPagamento').click(function(){
		$('#formMetodoPagamento')[0].reset();
	});
	
	 
	$("#confirmRemocaoMetodoPagamento").on('click', '.btn-primary', function () {
		 
	 	var id = $("#formMetodoPagamento").find("input[name=id]").val();
	 
		$.ajax({
			url: '/metodo-pagamento/remover/' + id, 
			type: "GET",
		    contentType: "application/json",
			success: function(result){
				$("#confirmRemocaoMetodoPagamento").modal('hide');
				
				$("#dataMetodoPagamento").bootstrapTable('remove', {
			        field: 'id',
			        values: id
				});

				$("#dataMetodoPagamento").bootstrapTable("refresh");

				COMMON.alertSuccess("#callBackMetodoPagamento", result.message);
			},
			error: function (request, status, error) {
				COMMON.alertSuccess("#callBackMetodoPagamento", request.responseText);
			}
		});
	});
		

	 window.operateEvents = {
	    'click .btn-edit': function (e, value, row, index) {
	      JSON.stringify(row);
	      buscaMetodoPagamento(row.id);
	    },
	    'click .btn-remove': function (e, value, row, index) {
	    	JSON.stringify(value);
			    
	    	$("#formMetodoPagamento").find("input[name=id]").val(row.id);
	    	$("#confirmRemocaoMetodoPagamento").modal('toggle');
	    }
	 }
				
	 
	$('#dataMetodoPagamento').bootstrapTable({
		  url: '/metodo-pagamento/listar',
		  pagination: true,
		  search: true,
		  columns: [{
		    field: 'id',
		    title: 'ID',
		    align: 'center',
		  },
		  {
		    field: 'nome',
		    title: 'NOME',
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
	 
	
	$("#modalMetodoPagamento").on('click', '.btn-primary', function () {
		 
		var form = $("#formMetodoPagamento");
		 
		 $.ajax({
			url: form.attr('action'), 
			type: "POST",
		    contentType: "application/json",
			data : JSON.stringify(form.serializeObject()),
			success: function(result){
				$("#modalMetodoPagamento").modal('hide');
				$("#dataMetodoPagamento").bootstrapTable("refresh");
				
				COMMON.alertSuccess("#callBackMetodoPagamento", result.message);
			},
			error: function (request, status, error) {
				COMMON.alertSuccess("#callBackMetodoPagamento", request.responseText);
			} 
		});
	 });
});