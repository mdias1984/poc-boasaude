$(function () {
	
	var fuseOptions = { keys: ["codigo", "nome"] };
	var options 	= { display: "nome", key: "id", fuseOptions: fuseOptions }
	
	$.ajax({
		url: '/banco/listar', 
		type: "GET",
	    contentType: "application/json",
		success: function(data){
			$("#bancoStatusProposta").fuzzyComplete(data, options);
			$(".fuzzyResults").css("width","499px");
			$(".__autoitem").css("width","499px");
		}
	});
	
	buscaStatusProposta = function(id){
        $.ajax({
            url: "/proposta/integracao/status/" + id, 
            success: function(obj){
                
                $("input[name=id]").val(obj.id);
                $("input[name=origem]").val(obj.origem);
                $("input[name=destino]").val(obj.destino);
                $("select[name=banco]").val(obj.banco.id).prop('selected', true);
                $("#bancoStatusProposta").val(obj.banco.nome);
                            
                $('#modalStatusProposta').modal('toggle');
                
            }
        });
	}

	 window.operateEvents = {
	    'click .btn-edit': function (e, value, row, index) {
	      JSON.stringify(row);
	      buscaStatusProposta(row.id);
	    },
	    'click .btn-remove': function (e, value, row, index) {
	    	JSON.stringify(value);
	    
	    	$("#idStatusProposta").val(row.id);
	    	$("#confirmRemocaoStatusModal").modal('toggle');
	    }
	 }
		
	 
	 $('#btnNovoStatus').click(function(){
		 $('#formStatusProposta')[0].reset();
	 });
	 
	 
	 $("#confirmRemocaoStatusModal").on('click', '.btn-primary', function () {
		 
	 	var id = $("#idStatusProposta").val();
	 
		$.ajax({
			url: '/proposta/integracao/status/remover/' + id, 
			type: "GET",
		    contentType: "application/json",
			success: function(result){
				$("#confirmRemocaoStatusModal").modal('hide');
				
				$("#dataStatusProposta").bootstrapTable('remove', {
			        field: 'id',
			        values: id
				});
				
				COMMON.alertSuccess("#callBackStatusProposta", result.message);
			},
			error: function (request, status, error) {
				COMMON.alertSuccess("#callBackStatusProposta", request.responseText);
			}
		});
	});
		
	 
	$('#dataStatusProposta').bootstrapTable({
		  url: '/proposta/integracao/status/listar',
		  pagination: true,
		  search: true,
		  columns: [{
		    field: 'id',
		    title: 'CÓDIGO',
		    align: 'center',
		  },
		  {
		    field: 'banco.nome',
		    title: 'NOME BANCO',
            sortable: true

		  }, {
		    field: 'origem',
		    title: 'STATUS ORIGEM',
		    align: 'center',
		  },
		  {
			field: 'destino',
			title: 'STATUS DESTINO',
			align: 'center'
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
	 
	
	$("#modalStatusProposta").on('click', '.btn-primary', function () {
		 
		var form = $("#formStatusProposta");
		 
		 $.ajax({
			url: form.attr('action'), 
			type: "POST",
		    contentType: "application/json",
			data : JSON.stringify(form.serializeObject()),
			success: function(result){
				$("#modalStatusProposta").modal('hide');
				$("#dataStatusProposta").bootstrapTable('refresh');
				
				COMMON.alertSuccess("#callBackStatusProposta", result.message);
			},
			error: function (request, status, error) {
				COMMON.alertSuccess("#callBackStatusProposta", request.responseText);
			} 
		});
	 });
});