$(function () {
	
	buscaProduto = function(id){
        $.ajax({
            url: "/produto/" + id, 
            success: function(obj){
                $("input[name=id]").val(obj.id);
                $("input[name=nome]").val(obj.nome);

                $("#modalProduto").modal("toggle");
            }
        });
	}

	 window.operateEvents = {
	    'click .btn-edit': function (e, value, row, index) {
	      JSON.stringify(row);
	      buscaProduto(row.id);
	    },
	    'click .btn-remove': function (e, value, row, index) {
	    	$("#formProduto").find("input[name=id]").val(row.id);
	    	$("#confirmRemocaoProdutoModal").modal("toggle");
	    }
	 }
		
	 $('#btnNovoProduto').click(function(){
		 $('#formProduto')[0].reset();
	 });
	 
	 $("#confirmRemocaoProdutoModal").on("click", ".btn-primary", function () {
	 	var id = $("#formProduto").find("input[name=id]").val();
	 
		$.ajax({
			url: "/produto/remover/" + id, 
			type: "GET",
		    contentType: "application/json",
			success: function(result){
				$("#confirmRemocaoProdutoModal").modal('hide');
				
				$("#dataProduto").bootstrapTable("remove", {
			        field: "id",
			        values: id
				});

				$("#dataProduto").bootstrapTable("refresh");

				COMMON.alertSuccess("#callBackProduto", result.message);
			},
			error: function (request, status, error) {
				COMMON.alertSuccess("#callBackProduto", request.responseText);
			}
		});
	});
		
	 
	$("#dataProduto").bootstrapTable({
		  url: '/produto/listar',
		  pagination: true,
		  search: true,
		  columns: [{
		    field: 'id',
		    title: 'CÓDIGO',
		    align: 'center',
		  },
		  {
		    field: 'nome',
		    title: 'NOME PRODUTO',
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
	 
	
	$("#modalProduto").on('click', '.btn-primary', function () {
		 
		var form = $("#formProduto");
		 
		 $.ajax({
			url: form.attr('action'), 
			type: "POST",
		    contentType: "application/json",
			data : JSON.stringify(form.serializeObject()),
			success: function(result){
				$("#modalProduto").modal('hide');
				$("#dataProduto").bootstrapTable("refresh");
				
				COMMON.alertSuccess("#callBackProduto", result.message);
			},
			error: function (request, status, error) {
				COMMON.alertSuccess("#callBackProduto", request.responseText);
			} 
		});
	 });
});