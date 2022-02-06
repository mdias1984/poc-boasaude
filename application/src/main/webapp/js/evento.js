$(function() {

	$(document).ready(function() {
		setInterval(function() {
			listarProximosEventos();
		}, 10000);
	});

	listarProximosEventos = function() {
	
		$.ajax({
			url : '/evento/notificacao',
			success : function(data) {
				
				$('.content-notification').html('');
				
				if(data.id != null){
					
					$('.fab button').addClass('notification-icon');
					
					var evento = JSON.parse(JSON.stringify(data));
					var cookie = $.cookie("lastNotification");
					
					$.each(evento.eventos, function(index) {
						var divBody = '<div">' 
							+ '<ul style="list-style-type: none; padding-left:4px">'
							+ '<li><b>' + evento.eventos[index].titulo.toUpperCase() + '</b></li>' 
							+ '<li><i class="far fa-clock"></i> <b>Inicio</b> ' + evento.eventos[index].inicio + '</li>'
							+ '<li><i class="far fa-clock"></i> <b>Fim</b> ' + evento.eventos[index].fim + '</li>' 
							+ '<li><i class="fas fa-user"></i> <b>Cliente</b> ' + evento.eventos[index].nomeCliente + '</li>' 
							+ '<li><br/></li>'
							+ '<li><b>DESCRIÇÃO</b></li>'
							+ '<li>' + evento.eventos[index].descricao + '</li>' 
							+ '</ul>' 
							+ '</div>'
							+ '<br/>';

						$('.content-notification').prepend(divBody);
					});

				}else{
					$('.fab button').removeClass('notification-icon');
					$('.content-notification').prepend('Não existem eventos');
				}	
			}
		});
	}

	loadEvents = function() {
		this.source = null;
		this.start = function() {
			this.source = new EventSource("/evento/stream");
			this.source.addEventListener("message", function(event) {

				
				var evento = JSON.parse(event.data);
				
				var divBody = '<div>' + '<ul style="list-style-type: none;">'
						+ '<li><b>' + evento.titulo.toUpperCase() + '</b></li>' 
						+ '<li><i class="far fa-clock"></i> <b>Inicio</b> ' + evento.inicio + '</li>'
						+ '<li><i class="far fa-clock"></i> <b>Fim</b> ' + evento.fim + '</li>' 
						+ '<li>' + evento.descricao + '</li>' 
						+ '</ul>' + '</div>';

				$('.div-modal-event-body').prepend(divBody);
				$('#infoEventModal').modal('toggle');

			});

			this.source.onerror = function() {
				this.close();
			};
		};

		this.stop = function() {
			this.source.close();
		}
	}

	event = new loadEvents();

	$("#infoEventModal").on('hide.bs.modal', function() {
		$('.div-modal-event-body').empty();
	});
});

/*
 * Register callbacks for starting and stopping the SSE controller.
 */
window.onload = function() {
	//event.start();
};
window.onbeforeunload = function() {
	//event.stop();
}