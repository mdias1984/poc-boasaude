$(function () {
	
	buscaConta = function(id){
        $.ajax({
            url: "/contas-bancarias/" + id, 
            success: function(obj){
                $('#formContaBancaria input[name=id]').val(obj.id);
                $('#formContaBancaria input[name=agencia]').val(obj.agencia);
                $('#formContaBancaria input[name=conta]').val(obj.conta);
                $('#formContaBancaria input[name=tipo]').val(obj.tipo);
                $('#formContaBancaria input[name=favorecido]').val(obj.favorecido);
                $('#formContaBancaria input[name=cpfcnpj]').val(obj.cpfcnpj);
    			$("#formContaBancaria select[name=idBanco]").val(obj.banco.id).prop('selected', true);

                $('#modalContaBancaria').modal('toggle');
            }
        });
	}

	 
	 $("#confirmRemocaoContaBancariaModal").on('click', '.btn-primary', function () {
		 
	 	var id = $("#formContaBancaria").find("input[name=id]").val();
	 
		$.ajax({
			url: '/contas-bancarias/remover/' + id, 
			type: "GET",
		    contentType: "application/json",
			success: function(result){
				$("#confirmRemocaoContaBancariaModal").modal('hide');
				
				$("#dataContaBancaria").bootstrapTable('remove', {
			        field: 'id',
			        values: id
				});

				$("#dataContaBancaria").bootstrapTable("refresh");

				COMMON.alertSuccess("#callBackBanco", result.message);
			},
			error: function (request, status, error) {
				COMMON.alertSuccess("#callBackBanco", request.responseText);
			}
		});
	});
		

	 window.operateEvents = {
	    'click .btn-edit': function (e, value, row, index) {
	      JSON.stringify(row);
	      buscaConta(row.id);
	    },
	    'click .btn-remove': function (e, value, row, index) {
	    	JSON.stringify(value);
			    
	    	$("#formContaBancaria").find("input[name=id]").val(row.id);
	    	$("#confirmRemocaoContaBancariaModal").modal('toggle');
	    }
	 }
				
	 
	$('#dataContaBancaria').bootstrapTable({
		  url: '/contas-bancarias/listar',
		  pagination: true,
		  search: true,
		  columns: [{
		    field: 'id',
		    title: 'ID',
		    align: 'center',
		  },
		  {
		    field: 'banco.nome',
		    title: 'BANCO',
            sortable: true
		  },
		  {
			field: 'agencia',
			title: 'AGENCIA'
		  },
		  {
			field: 'conta',
			title: 'CONTA'
		  },
		  {
			field: 'tipo',
			title: 'TIPO',
	        sortable: true
		  },
		  {
			 field: 'favorecido',
			 title: 'FAVORECIDO',
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
	 
	
	$("#modalContaBancaria").on('click', '.btn-primary', function () {
		 
		var form = $("#formContaBancaria");
		 
		 $.ajax({
			url: form.attr('action'), 
			type: "POST",
		    contentType: "application/json",
			data : JSON.stringify(form.serializeObject()),
			success: function(result){
				$("#modalContaBancaria").modal('hide');
				$("#dataContaBancaria").bootstrapTable("refresh");
				
				COMMON.alertSuccess("#callBackContaBancaria", result.message);
			},
			error: function (request, status, error) {
				COMMON.alertSuccess("#callBackContaBancaria", request.responseText);
			} 
		});
	 });
});