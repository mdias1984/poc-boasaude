$(function () {
	
	buscaBanco = function(id){
        $.ajax({
            url: "/banco/" + id, 
            success: function(obj){
                $("input[name=id]").val(obj.id);
                $("input[name=codigo]").val(obj.codigo);
                $("input[name=nome]").val(obj.nome);

                $('#modalBanco').modal('toggle');
            }
        });
	}

	
	$('#btnNovoBanco').click(function(){
		$('#formBanco')[0].reset();
	});
	 
	 $("#confirmRemocaoBancoModal").on('click', '.btn-primary', function () {
	 	var id = $("#formBanco").find("input[name=id]").val();
	 
		$.ajax({
			url: '/banco/remover/' + id, 
			type: "GET",
		    contentType: "application/json",
			success: function(result){
				$("#confirmRemocaoBancoModal").modal('hide');
				
				$("#dataBanco").bootstrapTable('remove', {
			        field: 'id',
			        values: id
				});

				$("#dataBanco").bootstrapTable("refresh");

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
	      buscaBanco(row.id);
	    },
	    'click .btn-remove': function (e, value, row, index) {
	    	JSON.stringify(value);
			    
	    	$("#formBanco").find("input[name=id]").val(row.id);
	    	$("#confirmRemocaoBancoModal").modal('toggle');
	    }
	 }
				
	 
	$('#dataBanco').bootstrapTable({
		  url: '/banco/listar',
		  pagination: true,
		  search: true,
		  columns: [{
		    field: 'codigo',
		    title: 'CÓDIGO',
		    align: 'center',
		  },
		  {
		    field: 'nome',
		    title: 'NOME BANCO',
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
	 
	
	$("#modalBanco").on('click', '.btn-primary', function () {
		 
		var form = $("#formBanco");
		 
		 $.ajax({
			url: form.attr('action'), 
			type: "POST",
		    contentType: "application/json",
			data : JSON.stringify(form.serializeObject()),
			success: function(result){
				$("#modalBanco").modal('hide');
				$("#dataBanco").bootstrapTable("refresh");
				
				COMMON.alertSuccess("#callBackBanco", result.message);
			},
			error: function (request, status, error) {
				COMMON.alertSuccess("#callBackBanco", request.responseText);
			} 
		});
	 });
});