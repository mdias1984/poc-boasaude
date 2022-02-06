
$(function() {	
	
	var clientes = [];
	
	$.getJSON( '/cliente/simples/unidade/listar', function( data ) {
		
		for(var i=0; i < data.length; i++){
			var cliente = {
				"id": data[i][0],
				"nome": data[i][1]
			}
			
			clientes.push(cliente);
		}
		
		/*
		$.each( data, function( key, val ) {
			var cliente = {
				"id": val.id,
				"nome": val.nome
			}
			
			clientes.push(cliente);
		});
		*/
	});
	
	$("#agendaCliente").autocomplete({
		minLength: 3,
	    source: function (request, response) {
	    	var filtros = ($.map(clientes, function (el) {
                return {
                    label: el.nome,
                    value: el.id
                };
	    	}));
	    	
            response($.ui.autocomplete.filter(filtros, request.term));
	    },
	    focus: function (event, ui) {
	        event.preventDefault();
	        this.value = ui.item.label;
	        $(this).next('input').val(ui.item.label);
	    },
	    select: function (event, ui) {
	        this.value = ui.item.label;
	        $(this).next('input').val(ui.item.label);
	        $('#idCliente').val(ui.item.value);
	        event.preventDefault();
	    }
	});
	
	getRandomColor = function() {
		var letters = '0123456789ABCDEF';
		var color = '#';
		
		for (var i = 0; i < 6; i++) {
		   color += letters[Math.floor(Math.random() * 16)];
		}
		
		return color;
	}
	
	$('#eventoInicio').datetimepicker({
		format:'d/m/Y H:i',
		formatTime:'H:i',
		formatDate:'d.m.Y',
		defaultDate:'+03.01.1970', 
		defaultTime:'10:00',
		step: 30,
		timepickerScrollbar:false
	});
	
	$('#eventoFim').datetimepicker({
		format:'d/m/Y H:i',
		formatTime:'H:i',
		formatDate:'d.m.Y',
		defaultDate:'+03.01.1970', 
		defaultTime:'10:00',
		step: 30,
		timepickerScrollbar:false
	});
	
	$("#modalEvento").on('show.bs.modal', function (e) {
    	$('#modalEvento').find('.btn-primary').html('ADICIONAR');
 	});	
	
	$("#modalEvento").on('hide.bs.modal', function (e) {
		$('#calendar').fullCalendar('refetchEvents');
	});	
	
	$("#formEvento select[name=convidados]").bsMultiSelect();
	
	$('#calendar').fullCalendar({
		  ignoreTimezone: false,
	      monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
	      monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
	      dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sabado'],
	      dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
	      header: {
	        left: 'prev,next today',
	        center: 'title',
	        right: 'month,agendaWeek,agendaDay,listWeek'
	      },
	      locale: 'pt-br',
	      defaultView: 'month',
	      navLinks: true, 
	      eventColor: '#00B846',
	      eventTextColor: '#FFFFFF',
	      editable: true,
	      eventLimit: true, 
	      selectable: true,
	      selectHelper: true,
	      buttonText: {
	          today: "Hoje",
	          month: "Mês",
	          listWeek: "Lista semanal",
	          week: "Semana",
	          day: "Dia"
	      },
	      eventClick: function(event, element) {
	    	  
	    	  buscaEvento(event);

	    	  $('#calendar').fullCalendar('updateEvent', event);
	      },
     	  select: function(start, end) {
	    	$('#agendaCliente').removeAttr('disabled');
          	$('#formEvento input,textarea').val("");
	    	$('#formEvento :input').removeAttr('readonly');
    		$('#modalEvento .btn').show();
    		$('#modalEvento .btn-danger').addClass('d-none');

    		$('#eventoInicio').val(start.format("DD/MM/YYYY HH:mm"));
          	$('#eventoFim').val(end.format("DD/MM/YYYY HH:mm"));
          	
    		$('#modalEvento').modal('toggle');
     	  
     	  },
     	 events: {
             url: '/evento/listar',
             error: function() {
            	 alert('Erro ao carregar eventos');
             }
     	 }
    });
	
	
	$('input[type=checkbox][name=convidado]').click(function(){
		$('#calendar').fullCalendar('removeEventSources', '/evento/listar/' + $(this).val());
		
		var eventColor = getRandomColor();
		var label = $('#label-' + $(this).val());
			
		label.css('color','#000000');
		
		if($(this).is(':checked')){
			label.css('color',eventColor);

			$('#calendar').fullCalendar( 'addEventSource', {
			    url: '/evento/listar/' + $(this).val(),
			    color: eventColor
			});
		}
	});
	
	$('#modalEvento').on('click','.btn-primary', function(){
		  $("#formEvento").submit();  
	});
	
	$("#formEvento").submit(function(){
		var titulo 	= $("#formEvento input[name='titulo']").val(); 
		var inicio 	= moment($('#eventoInicio').val());
		var fim 	= moment($('#eventoFim').val()); 
		var form	= $("#formEvento");
		
		if($(this).valid()){
			$.ajax({
				url: form.attr('action'), 
				type: "POST",
			    contentType: "application/json",
				data : JSON.stringify(form.serializeObject()),
				success: function(result){
					$('#calendar').fullCalendar('renderEvent', {
		         		title: titulo,
		         		start: inicio,
		         		end: fim
		       		 });
		       
		       		 $('#modalEvento').modal('hide');
				}
			});
		}
	});  
	
	
	$('#modalEvento').on('click','.btn-danger', function(){
		var idEvento 	= $("#formEvento input[name='id']").val(); 
		
		$.ajax({
			url: "/evento/remover/" + idEvento, 
			type: "GET",
		    contentType: "application/json",
			success: function(result){
				$('#modalEvento').modal('hide');
			}
		});
		
		$('#calendar').fullCalendar('removeEvents', idEvento);
	}); 
	
	
	buscaEvento = function(event){
		$.ajax({
			url: "/evento/buscar/" + event.id,
			success: function(result){
				var str = JSON.stringify(result);
		    	var obj = JSON.parse(str);
		    	
		    	$("#formEvento input[name=id").val(obj.id);
			    $("#formEvento input[name=titulo").val(obj.title);
			    $("#formEvento input[name=agendaCliente").val(obj.cliente.nome);
			    $("#formEvento input[name=idCliente").val(obj.cliente.id);
		    	$("#formEvento textarea[name=descricao]").val(obj.description);
		    	$("#formEvento input[name=inicio]").val(moment(obj.start).format("DD/MM/YYYY HH:mm"));
		    	$("#formEvento input[name=fim]").val(moment(obj.end).format("DD/MM/YYYY HH:mm"));
		    	
		    	$('#modalEvento').find('.btn-danger').removeClass('d-none');

		    	if(obj.responsavel.id != $("#user").val()){
		    		$("#formEvento input,textarea").attr("readonly","readonly");
		    		$("#modalEvento .btn").hide();
		    	}else{
		    		$("#formEvento input,textarea").removeAttr("readonly");
		    		$("#modalEvento .btn").show();
		    	}
		    	
		    	$('#agendaCliente').attr('disabled','disabled');
		    	$('#modalEvento').modal('toggle');
				
			},
			error: function (request, status, error) {
				alert("Erro ao carregar evento");
			} 
		});
	}
});	