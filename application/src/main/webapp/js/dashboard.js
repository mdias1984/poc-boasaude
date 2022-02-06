
var _dashboard = {};

$(function() {
	
	$('#dashboardDatInicial').mask("99/99/9999");
	$('#dashboardDatFinal').mask("99/99/9999");
	$('#dashboardDatInicial').datepicker( { dateFormat: 'dd/mm/yy' });
	$('#dashboardDatFinal').datepicker( { dateFormat: 'dd/mm/yy' });
	

	/**
	 * Carrega o widget indicador de metas da unidade
	 */
	_dashboard.valorMetaDiaria = function (unidade, inicio, fim){

		var labelPropostas 	= "";
		var dataPropostas 	= "";
		var total 		= 0;
		var endpoint	= "/meta/diaria/" + unidade
			
		$.ajax({
			url: endpoint + '?inicio=' + inicio + '&fim=' + fim, 
			success: function(result){
				
				if(result.length <=0){
					total = 0;
					$('#cardMetaDiaria').html('R$ ' + total);
					
					return;
				}
				
				$.each(result, function(i, item) {
		    		total += result[i];
		    	});
				
				total = parseFloat(total).toFixed(2);
				$("#cardMetaDiaria").html('R$ ' + COMMON.formatReal(COMMON.getMoney(total)));
			}
		});
	}
	
	/**
	 * Carrega o widget indicador de metas da unidade
	 */
	_dashboard.valorMetaUnidade = function (unidade, inicio, fim){

		var labelPropostas = "";
		var dataPropostas = "";
		var total = 0;
		var endpoint = "/meta/total/" + unidade
			
		$.ajax({
			url: endpoint + '?inicio=' + inicio + '&fim=' + fim, 
			success: function(result){
				
				if(result.length <=0){
					total = 0;
					$('#cardMetaUnidade').html('R$ ' + total);
					
					return;
				}
				
				$.each(result, function(i, item) {
		    		total += result[i];
		    	});
				
				console.log(total);

				$("#cardMetaUnidade").html('R$ ' + COMMON.formatReal(total));
			}
		});
	}

	/**
	 * Carrega o widget indicador de propostas pendentes
	 */
	_dashboard.propostasPendentes = function (unidade, inicio, fim){

		var labelPropostas 	= "";
		var dataPropostas 	= "";
		var total 		= 0;
		var endpoint 	= "/proposta/pendentes/" + unidade
			
		$.ajax({
			url: endpoint + '?inicio=' + inicio + '&fim=' + fim, 
			success: function(result){
				
				if(result.length <=0){
					total = 0;
					$('#valorPendente').html('R$ ' + total);
					
					return;
				}
				
				$.each(result, function(i, item) {
					
					var isLastElement = (i == result.length-1);
					
					labelPropostas += result[i][0] + ",";
		    		dataPropostas += result[i][1] + ",";
		    		total += result[i][1];
		    		
		    		if(isLastElement){
		    			labelPropostas 	= labelPropostas.substring(0, labelPropostas.length - 1);
	    				dataPropostas 	= dataPropostas.substring(0, dataPropostas.length - 1);
		    		}
		    		
		    	});
				
				$("#valorPendente").html('R$ ' + COMMON.formatReal(total));
			}
		});
	}
	
	
	/**
	 * Carrega o widget indicador de propostas canceladas
	 */
	_dashboard.propostasCanceladas = function (unidade, inicio, fim){
		var labelPropostas 	= "";
		var dataPropostas 	= "";
		var total 		= 0;
		var endpoint 	= "/proposta/canceladas/" + unidade;
				
		$.ajax({
			url: endpoint + '?inicio=' + inicio + '&fim=' + fim, 
			success: function(result){
				
				if(result.lenght <=0)
					total = 0;
				
				$.each(result, function(i, item) {
					var isLastElement = (i == result.length-1);
					
					labelPropostas 	+= result[i][0] + ",";
		    		dataPropostas 	+= result[i][1] + ",";
		    		total += result[i][1];
		    		
		    		if(isLastElement){
		    			labelPropostas 	= labelPropostas.substring(0, labelPropostas.length - 1);
	    				dataPropostas 	= dataPropostas.substring(0, dataPropostas.length - 1);
		    		}
		    		
		    	});
				
				$("#valorCancelado").html('R$ ' + COMMON.formatReal(total));
			}
		});
	}
	
	/**
	 * Carrega o widget indicador de propostas pagas
	 */
	_dashboard.propostasPagas = function (unidade, inicio, fim){

		var labelPropostas 	= '';
		var dataPropostas 	= '';
		var total	 = 0;
		var endpoint = '/proposta/pagas/' + unidade;
			
		$.ajax({
			url: endpoint + '?inicio=' + inicio + '&fim=' + fim, 
			success: function(result){
				
				if(result.length <=0){
					total = 0;
					$('#valorPago').html('R$ ' + total);
					
					return;
				}
				
				$.each(result, function(i, item) {
					var isLastElement = (i == result.length-1);
					
					labelPropostas 	+= result[i][0] + ',';
		    		dataPropostas 	+= result[i][1] + ',';
		    		total += result[i][1];
		    		
		    		if(isLastElement){
		    			labelPropostas 	= labelPropostas.substring(0, labelPropostas.length - 1);
	    				dataPropostas 	= dataPropostas.substring(0, dataPropostas.length - 1);
		    		}
		    		
		    	});
				
				$('#valorPago').html('R$ ' + COMMON.formatReal(total));
			}
		});
	}
	
	/**
	 * Exibe as propostas digitadas do vendedor
	 */
	_dashboard.propostasDigitadasUsuario = function (usuario, inicio, fim){
		var labelPropostas = "";
		var dataPropostas = "";
		var total = 0;
		var endpoint = '/proposta/digitadas/' + usuario;
			
		$.ajax({
			url: endpoint + '?inicio=' + inicio + '&fim=' + fim, 
			success: function(result){
				
				if(result.length <=0){
					total = 0;
					$('#totalPDigitadas').html('R$ ' + total);
					
					return;
				}
				
				$.each(result, function(i, item) {
					var isLastElement = (i == result.length-1);

					labelPropostas += result[i][0] + ",";
		    		dataPropostas += result[i][1] + ",";
		    		total += result[i][1];
		    		
		    		if(isLastElement){
		    			labelPropostas 	= labelPropostas.substring(0, labelPropostas.length - 1);
	    				dataPropostas 	= dataPropostas.substring(0, dataPropostas.length - 1);
		    		}
		    		
		    	});
				
				$("#totalPDigitadas").html('R$ ' + COMMON.formatReal(total));
			}
		});
	}
	
	/**
	 * Carrega o widget indicador de propostas digitadas
	 */
	_dashboard.propostasDigitadas = function (unidade, inicio, fim){
		var labelPropostas = "";
		var dataPropostas = "";
		var total = 0;
		var endpoint = '/proposta/digitadas/unidade/' + unidade;
			
		$.ajax({
			url: endpoint + '?inicio=' + inicio + '&fim=' + fim, 
			success: function(result){
				
				if(result.length <=0){
					total = 0;
					$('#totalPDigitadas').html('R$ ' + total);
					
					return;
				}
				
				$.each(result, function(i, item) {
					var isLastElement = (i == result.length-1);

					labelPropostas += result[i][0] + ",";
		    		dataPropostas += result[i][1] + ",";
		    		total += result[i][1];
		    		
		    		if(isLastElement){
		    			labelPropostas 	= labelPropostas.substring(0, labelPropostas.length - 1);
	    				dataPropostas 	= dataPropostas.substring(0, dataPropostas.length - 1);
		    		}
		    		
		    	});
				
				$("#totalPDigitadas").html('R$ ' + COMMON.formatReal(total));
			}
		});
	}
	

	/**
	 * Carrega o widget indicador de propostas que contem portabilidade
	 */
	_dashboard.propostasPortabilidadeUsuario = function (usuario, inicio, fim){

		var labelPropostas = "";
		var dataPropostas = "";
		var total = 0;
		
		var endpoint = "/proposta/portabilidade/" + usuario
		
		$.ajax({
			url: endpoint + '?inicio=' + inicio + '&fim=' + fim, 
			success: function(result){

				$.each(result, function(i, item) {
					var isLastElement = (i == result.length-1);
					
					labelPropostas += result[i][0] + ",";
		    		dataPropostas += result[i][1] + ",";
		    		total += result[i][1];
		    		
		    		if(isLastElement){
		    			labelPropostas 	= labelPropostas.substring(0, labelPropostas.length - 1);
	    				dataPropostas 	= dataPropostas.substring(0, dataPropostas.length - 1);
		    		}
		    	});
				
				$("#totalPPortabilidade").html('R$ ' + COMMON.formatReal(total));
			}
		});
	}
	
	
	/**
	 * Carrega o widget indicador de propostas que contem portabilidade
	 */
	_dashboard.propostasPortabilidade = function (unidade, inicio, fim){

		var labelPropostas = "";
		var dataPropostas = "";
		var total = 0;
		
		var endpoint = "/proposta/portabilidade/unidade/" + unidade
		
		$.ajax({
			url: endpoint + '?inicio=' + inicio + '&fim=' + fim, 
			success: function(result){

				$.each(result, function(i, item) {
					var isLastElement = (i == result.length-1);
					
					labelPropostas += result[i][0] + ",";
		    		dataPropostas += result[i][1] + ",";
		    		total += result[i][1];
		    		
		    		if(isLastElement){
		    			labelPropostas 	= labelPropostas.substring(0, labelPropostas.length - 1);
	    				dataPropostas 	= dataPropostas.substring(0, dataPropostas.length - 1);
		    		}
		    	});
				
				$("#totalPPortabilidade").html('R$ ' + COMMON.formatReal(total));
			}
		});
	}
	
	/**
	 * Carrega o widget indicador de propostas recusadas
	 */
	_dashboard.propostasRecusadasUsuario = function (usuario, inicio, fim){

		var labelPropostas = "";
		var dataPropostas = "";
		var total = 0;
		
		var endpoint = "/proposta/recusadas/" + usuario;
			
		$.ajax({
			url: endpoint + '?inicio=' + inicio + '&fim=' + fim, 
			success: function(result){

				$.each(result, function(i, item) {
					var isLastElement = (i == result.length-1);
					
					labelPropostas += result[i][0] + ",";
		    		dataPropostas += result[i][1] + ",";
		    		total += result[i][1];
		    		
		    		if(isLastElement){
		    			labelPropostas 	= labelPropostas.substring(0, labelPropostas.length - 1);
	    				dataPropostas 	= dataPropostas.substring(0, dataPropostas.length - 1);
		    		}
		    	});
				
				$("#totalPRecusadas").html('R$ ' + COMMON.formatReal(total));
			}
		});
	}
		
	/**
	 * Carrega o widget indicador de propostas recusadas
	 */
	_dashboard.propostasRecusadas = function (unidade, inicio, fim){

		var labelPropostas = "";
		var dataPropostas = "";
		var total = 0;
		
		var endpoint = "/proposta/recusadas/unidade/" + unidade;
			
		$.ajax({
			url: endpoint + '?inicio=' + inicio + '&fim=' + fim, 
			success: function(result){

				$.each(result, function(i, item) {
					var isLastElement = (i == result.length-1);
					
					labelPropostas += result[i][0] + ",";
		    		dataPropostas += result[i][1] + ",";
		    		total += result[i][1];
		    		
		    		if(isLastElement){
		    			labelPropostas 	= labelPropostas.substring(0, labelPropostas.length - 1);
	    				dataPropostas 	= dataPropostas.substring(0, dataPropostas.length - 1);
		    		}
		    	});
				
				$("#totalPRecusadas").html(COMMON.formatReal(total));
			}
		});
	}
		
	
	/**
	 * Carrega o grafico de metas planejadas x realizadas
	 */	
	_dashboard.metas = function (idUsuario, inicio, fim){
		
		var dataMetas;
		var idUsuario = $("#user").val();
		var endpoint = "/meta/status/" + idUsuario;

		$.ajax({
			url: endpoint + '?inicio=' + inicio + '&fim=' + fim, 
			success: function(result){
				
				var pieChart = new Chart($('#cardMetas'), {
					  type: 'pie',
					  data: {
					    labels: ['Pendente', 'Concluída'],
					    datasets: [{
					      data: [result[0], result[1]],
					      backgroundColor: ['#FF6384', '#36A2EB'],
					      hoverBackgroundColor: ['#FF6384', '#36A2EB']
					    }]
					  },
					  options: {
					    responsive: true
					  }
				});
				
				$("#cardHeaderMetas").html(nomeUnidade);
			}
		});
	}
	
	
	/**
	 * Exibe total de produtos vendidos nas propostas
	 */
	_dashboard.produtosVendidos = function (unidade, inicio, fim){
		var labelPropostas 	= "";
		var dataPropostas 	= "";
		var total = 0;
		
		$.ajax({
			url: '/proposta/produtos/' + unidade + '?inicio=' + inicio + '&fim=' + fim, 
			success: function(result){
		
				$.each(result, function(i, item) {
					var isLastElement = (i == result.length-1);
					
					labelPropostas += result[i][0] + ",";
		    		dataPropostas += result[i][1] + ",";
		    		total += result[i][1];
		    		
		    		if(isLastElement){
		    			labelPropostas 	= labelPropostas.substring(0, labelPropostas.length - 1);
	    				dataPropostas 	= dataPropostas.substring(0, dataPropostas.length - 1);
		    		}
				});
				
				var pVendedorChart = new Chart($('#produtosVendidos'), {
					type: 'horizontalBar',
					data: {
						labels: labelPropostas.split(','),
						datasets: [{
							label: '',
							backgroundColor: '#022ABA',
							borderColor: '#022ABA',
							data: dataPropostas.split(',')
						}]
					},
					options: {
						elements: {
							rectangle: {
								borderWidth: 2,
							}
						},
						responsive: true,
						legend: {
							position: 'right',
							display: false
						},
						title: {
							display: false,
							text: 'Chart.js Horizontal Bar Chart'
						}
					}
				});
			}	
		});
	}
	
	_dashboard.propostasVendedor = function (idUsuario, inicio, fim){
	
		var labelPropostas = "";
		var dataPropostas = "";
		var total = 0;
		
		$.ajax({
			url: '/proposta/total/unidade/' + idUsuario + '?inicio=' + inicio + '&fim=' + fim, 
			success: function(result){
		
				$.each(result, function(i, item) {
					var isLastElement = (i == result.length-1);
					
					labelPropostas += result[i][0] + ",";
		    		dataPropostas += result[i][1] + ",";
		    		total += result[i][1];
		    		
		    		if(isLastElement){
		    			labelPropostas 	= labelPropostas.substring(0, labelPropostas.length - 1);
	    				dataPropostas 	= dataPropostas.substring(0, dataPropostas.length - 1);
		    		}
				});
				
				var pVendedorChart = new Chart($('#propostasVendedor'), {
					type: 'horizontalBar',
					data: {
						labels: labelPropostas.split(','),
						datasets: [{
							label: 'Qtde de Propostas',
							backgroundColor: '#022ABA',
							borderColor: '#022ABA',
							data: dataPropostas.split(',')
						}]
					},
					options: {
						elements: {
							rectangle: {
								borderWidth: 2,
							}
						},
						responsive: true,
						legend: {
							position: 'right',
							display: false
						},
						title: {
							display: false,
							text: 'Chart.js Horizontal Bar Chart'
						}
					}
				});
			}	
		});
	}
	
	_dashboard.notificacoes = function (){
		var pieChart = new Chart($('#canvas-5'), {
			  type: 'pie',
			  data: {
			    labels: ['Solicitações', 'Avisos', 'Expirações'],
			    datasets: [{
			      data: [300, 50, 100],
			      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
			      hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
			    }]
			  },
			  options: {
			    responsive: true
			  }
		});
	}
	
	/**
	 * Exibe comparativo de metas planejadas x realizadas
	 */
	_dashboard.AcompanhamentoMetasUnidade = function(unidade, inicio, fim){
	
		$('#cardAcompMetaUnidade').empty();
		
    	$.ajax({
			url: endpoint = '/meta/unidade/' + unidade + '?inicio=' + inicio + '&fim=' + fim, 
			success: function(result){
				
				if(result.length <= 0){
					var retorno = jQuery('<div/>', {
					    class: '',
					    title: '',
					    html: 'Não existem dados a serem visualizados'
					}).appendTo('#cardAcompMetaUnidade');
				}
					
				
				$.each(result, function(i, item) {

					if(result[i][2] == null)
						result[i][2] = 0;
					
					if(result[i][3] == null)	
						result[i][3] = 0;
					
					//total = realizada + prevista
					var total = result[i][2] + result[i][3];
					var percent = (100 * result[i][2]) / total;
					var userName = result[i][1];
					var idElm = "user_" + result[i][0];
					
					var row = jQuery('<div/>', {
					    class: 'row row-selected',
					    title: ''
					}).appendTo('#cardAcompMetaUnidade');
					
					var col = jQuery('<div/>', {
					    class: 'col-md-6',
					    html: ' <div>' +                                 
						'	<div class="progress-list">' +       
						'	  <label>' + $('#dashboardUnidade option:selected').text().toUpperCase() + '</label>' + 
						'	  <br/>' +
						'     <div class="pull-left"><strong>' + percent.toFixed(1) + '%</strong></div>' + 
						'         <div class="progress progress-small progress-striped active">' + 
						'            <div class="progress-bar progress-bar-primary" role="progressbar" aria-valuenow="50" aria-valuemin="0" aria-valuemax="' + total + '" style="width: ' + percent + '%;"></div>' + 
						'         </div>' + 
						'     </div>' + 
						'   </div>', 
					    title: 'Percentual concluído'
					}).appendTo(row);
					
					var colChart = jQuery('<div/>', {
					    class: 'col-md-6',
					    html: '<div class="chart-holder" id="' + idElm + '" style="height:150px;"></div>' 
					}).appendTo(row);
					
					Morris.Donut({
		    	        element: idElm,
		    	        data: [
		    	            {label: "REALIZADA", value: result[i][2]},
		    	            {label: "PREVISTA", value: result[i][3]}
		    	        ],
		    	        formatter: function(x){
		    	        	return COMMON.moneyFormatter(x);
		    	        },
		    	        colors: ['#00B846', '#C6C9D1'],
		    	        resize: true
		    	    });
		    	});
			},
			error: function (request, status, error) {
				var objResponse = JSON.parse(request.responseText);
			} 
		});
    };	
    
    

	/**
	 * 
	 */
	_dashboard.metasUsuarios = function (unidade, inicio, fim){
		
		$('#dashMetasUsuario').empty();
		
    	$.ajax({
			url: endpoint = '/meta/usuario/unidade/' + unidade + '?inicio=' + inicio + '&fim=' + fim, 
			success: function(result){
				$('#cardHeaderMetas').html($('#dashboardUnidade option:selected').text().toUpperCase());
				
				$.each(result, function(i, item) {

					if(result[i][2] == null)
						result[i][2] = 0;
					
					if(result[i][3] == null)	
						result[i][3] = 0;
					
					//total = realizada + prevista
					var total = result[i][2] + result[i][3];
					var percent = (100 * result[i][2]) / total;
					var userName = result[i][1];
					var idElm = "user_" + result[i][0];
					
					var row = jQuery('<div/>', {
					    class: 'row row-selected',
					    title: ''
					}).appendTo('#dashMetasUsuario');
					
					var col = jQuery('<div/>', {
					    class: 'col-md-6',
					    html: ' <div>' +                                 
						'	<div class="progress-list">' +       
						'	  <label>' + userName.toUpperCase() + '</label>' + 
						'	  <br/>' +
						'     <div class="pull-left"><strong>' + percent.toFixed(1) + '%</strong></div>' + 
						'         <div class="progress progress-small progress-striped active">' + 
						'            <div class="progress-bar progress-bar-primary" role="progressbar" aria-valuenow="50" aria-valuemin="0" aria-valuemax="' + total + '" style="width: ' + percent + '%;"></div>' + 
						'         </div>' + 
						'     </div>' + 
						'   </div>', 
					    title: 'Percentual concluído'
					}).appendTo(row);
					
					var colChart = jQuery('<div/>', {
					    class: 'col-md-6',
					    html: '<div class="chart-holder" id="' + idElm + '" style="height:150px;"></div>' 
					}).appendTo(row);
					
					Morris.Donut({
		    	        element: idElm,
		    	        data: [
		    	            {label: "REALIZADA", value: result[i][2]},
		    	            {label: "PREVISTA", value: result[i][3]}
		    	        ],
		    	        formatter: function(x){
		    	        	return COMMON.moneyFormatter(x);
		    	        },
		    	        colors: ['#00B846', '#C6C9D1'],
		    	        resize: true
		    	    });
		    	});
			},
			error: function (request, status, error) {
				var objResponse = JSON.parse(request.responseText);
			} 
		});
    };	
    
    _dashboard.producaoMeta = function(unidade, inicio, fim){
    	var elem 	= document.getElementById('producaoMeta');
		var ctx 	= elem != null ? elem.getContext('2d') : null;
		var label 	= '';
		var meta 	= '';
		var producao = '';
	
		$.ajax({
			url: '/proposta/producao/meta/' + unidade + '/?inicio=' + inicio + '&fim=' + fim, 
			success: function(result){
				$.each(result, function(i, item) {
					var isLastElement = (i == result.length-1);

					label		+= result[i][0] + ","; 
					meta 		+= result[i][1] + ",";//COMMON.numberToReal(result[i][1], true)+ ",";
					producao 	+= result[i][2] + ",";//COMMON.numberToReal(result[i][2], true)+ ",";
										
					if(isLastElement){
						label 		= label.substring(0, label.length - 1);
		    			meta 		= meta.substring(0, meta.length - 1);
		    			producao 	= producao.substring(0, producao.length - 1);
		    		}
				});	
				
		    	var config = {
		    		type: 'line',
		    		data: {
		    			labels: label.split(','),
		    			datasets: [{
		    				label: 'Produção',
		    				backgroundColor: '#F64F77',
		    				borderColor: '#F64F77',
		    				fill: false,
		    				data: producao.split(','),
		    			},
		    			{
		    				label: 'Meta',
		    				backgroundColor: '#538CDB',
		    				borderColor: '#538CDB',
		    				fill: false,
		    				data: meta.split(','),
		    			}]
		    		},
		    		options: {
		    			responsive: true,
		    			title: {
		    				display: false,
		    				text: 'Chart.js Line Chart - Logarithmic'
		    			},
		    			scales: {
		    				xAxes: [{
		    					display: true,
		    				}],
		    				yAxes: [{
		    					display: true,
		    					type: 'logarithmic',
		    				}]
		    			}
		    		}
		    	};
		    	
		    	if(ctx != null)
		    		new Chart(ctx,config);
			}
		});
    }
    
    
    _dashboard.distribuicaoAtendimento = function(id){
    	
		var url = '/cliente/{id}/notas/consolidadas'.replace('{id}',id);
		var ctx = document.getElementById('distAtendimento');
		
		$.ajax({
			url: url,
			success: function(result){
				//result[0][0] = ligacao
				//result[0][1] = local
				//result[0][2] = whatsapp
				//result[0][3] = email
				var data = [result[0][0],result[0][1],result[0][2],result[0][3]];
				
				var config = {
						type: 'doughnut',
						data: {
							datasets: [{
								data,
								backgroundColor: [
									'#1ba2b8',
									'#f467b2',
									'#4fad5a',
									'#edb339'
								],
								label: 'Tipos de Atendimento'
							}],
							labels: [
								'Email',
								'Ligação',
								'Local',
								'Whatsapp'
							]
						},
						options: {
							responsive: true,
							legend: {
								position: 'top',
							},
							title: {
								display: true,
								text: 'Tipos de Atendimento'
							},
							animation: {
								animateScale: true,
								animateRotate: true
							}
						}
					};
				
				new Chart(ctx,config);
			}
		});
    };
    
  _dashboard.saldoPortabilidade = function(inicio, fim){
		$.ajax({
			url: '/proposta/portabilidade/saldo' + '?inicio=' + inicio + '&fim=' + fim, 
			success: function(result){

				var saldo = result[0];
				$("#saldoPortabilidade").html('R$ ' + COMMON.numeroParaMoeda(saldo));
			}
		});
  }
  
  _dashboard.ticketMedioConsolidado = function(inicio, fim){
	$.ajax({
		url: '/proposta/ticket-medio/consolidado'+ '?inicio=' + inicio + '&fim=' + fim,
		success: function(result){
			var ticketMedio = (parseInt(result[0][0]) / parseInt(result[0][1]));
		
			$("#totalTicketMedio").html('R$ ' + COMMON.numeroParaMoeda(ticketMedio));
		}
	});
  }
    
 _dashboard.distribuicaoPropostas = function(id){
    	
		var url = '/cliente/{id}/propostas/consolidadas'.replace('{id}',id);
		var ctx = document.getElementById('distPropostas');
		var labelStatus = '';
		var dataStatus 	= '';
		var colorStatus = '';
		
		$.ajax({
			url: url,
			success: function(result){
				
				$.each(result, function(i, item) {
					var isLastElement = (i == result.length-1);
					
					labelStatus += result[i][0] + ",";
					dataStatus 	+= result[i][1] + ",";
					colorStatus += COMMON.randomColor() + ",";
					
		    		if(isLastElement){
		    			labelStatus = labelStatus.substring(0, labelStatus.length - 1);
		    			dataStatus 	= dataStatus.substring(0, dataStatus.length - 1);
		    			colorStatus = colorStatus.substring(0, colorStatus.length - 1);
		    		}
				});
				
				var config = {
						type: 'doughnut',
						data: {
							datasets: [{
								data: dataStatus.split(','),
								backgroundColor: colorStatus.split(','),
								label: 'Situação de Propostas'
							}],
							labels:labelStatus.split(',')
						},
						options: {
							responsive: true,
							legend: {
								position: 'top',
							},
							title: {
								display: true,
								text: 'Situação de Propostas'
							},
							animation: {
								animateScale: true,
								animateRotate: true
							}
						}
					};
				
				new Chart(ctx,config);
			}
		});
    };
    
 _dashboard.vendasDias = function(inicio, fim){
    	
	 	var elem 	= document.getElementById('vendasDias'); 
		var ctx 	= elem != null ? elem.getContext('2d') : null;
		var label 	= '';
		var valor 	= '';
		
		$.ajax({
			url: '/proposta/vendas/dia' + '?inicio=' + inicio + '&fim=' + fim, 
			success: function(result){
				$.each(result, function(i, item) {
					var isLastElement = (i == result.length-1);
					
					valor += COMMON.numberToReal(result[i][0], true)+ ",";
					label += result[i][2] + ","; 
					
					if(isLastElement){
						valor 	= valor.substring(0, valor.length - 1);
		    			label 	= label.substring(0, label.length - 1);
		    		}
				});	
				
			 	var config = {
			    		type: 'line',
			    		data: {
			    			labels: label.split(','),
			    			datasets: [{
			    				label: 'Valor contratos por dia',
			    				legend: {
									position: 'right',
									display: false
								},
			    				backgroundColor: '#0F78F9',
			    				borderColor: '#0F78F9',
			    				fill: false,
			    				data: valor.split(','),
			    			}]
			    		},
			    		options: {
			    			responsive: true,
			    			title: {
			    				display: false,
			    				text: 'Chart.js Line Chart - Logarithmic'
			    			},
			    			scales: {
			    				xAxes: [{
			    					display: true,
			    				}],
			    				yAxes: [{
			    					display: true,
			    					type: 'logarithmic',
			    				}]
			    			}
			    		}
			    };
	    	
			 	if(ctx != null)
			 		new Chart(ctx,config);	
			}		
	    });
 	}
 
    _dashboard.ticketMedio = function(inicio, fim){
    	var elem 	= document.getElementById('ticketMedio');
		var ctx 	= elem != null ? elem.getContext('2d') : null;
		var label 	= '';
		var valor 	= '';
		
		$.ajax({
			url: '/proposta/ticket-medio' + '?inicio=' + inicio + '&fim=' + fim, 
			success: function(result){
				$.each(result, function(i, item) {
					var isLastElement = (i == result.length-1);
					
					valor += COMMON.numberToReal(result[i][0], true)+ ",";
					label += result[i][2] + ","; 
					
					if(isLastElement){
						valor 	= valor.substring(0, valor.length - 1);
		    			label 	= label.substring(0, label.length - 1);
		    		}
				});	

		    	var config = {
		    		type: 'line',
		    		data: {
		    			labels: label.split(','),
		    			datasets: [{
		    				label: 'Ticket médio por mês',
		    				backgroundColor: '#F86C6B',
		    				borderColor: '#F86C6B',
		    				fill: false,
		    				data: valor.split(','),
		    			}]
		    		},
		    		options: {
		    			responsive: true,
		    			title: {
		    				display: false,
		    				text: 'Chart.js Line Chart - Logarithmic'
		    			},
		    			scales: {
		    				xAxes: [{
		    					display: true,
		    				}],
		    				yAxes: [{
		    					display: true,
		    					type: 'logarithmic',
		    				}]
		    			}
		    		}
		    	};
		    	
		    	if(ctx != null)
		    		new Chart(ctx,config);
			}
		});
    }
    
    _dashboard.funil = function(inicio, fim){
    	
		var label 	= '';
		var valor 	= '';
		
		$.ajax({
			url: '/proposta/funil' + '?inicio=' + inicio + '&fim=' + fim, 
			success: function(result){
				$.each(result, function(i, item) {
					var isLastElement = (i == result.length-1);
					valor += result[i][0] + ",";
					label += result[i][1] + ","; 
					
					if(isLastElement){
						valor 	= valor.substring(0, valor.length - 1);
		    			label 	= label.substring(0, label.length - 1);
		    		}
				});	
				
				var yValor 	= valor.split(',');
				var lbl 	= label.split(',');
		    	
		    	var chart = new CanvasJS.Chart("chartContainer", {
		    		animationEnabled: true,
		    		theme: "light2", 
		    		data: [{
		    			type: "funnel",
		    			indexLabelPlacement: "inside",
		    			indexLabelFontColor: "white",
		    			toolTipContent: "<b>{label}</b>:{y}",
		    			indexLabel: "{label}",
		    			dataPoints: [
		    				{ y: parseInt(yValor[3]), label: lbl[3] },
		    				{ y: parseInt(yValor[2]), label: lbl[2]},
		    				{ y: parseInt(yValor[1]), label: lbl[1]}
		    			]
		    		}]
		    	});

		    	chart.render();
			}
		});
    }

    function calculatePercentage(chart) {
    	var dataPoint = chart.options.data[0].dataPoints;
    	var total = dataPoint[0].y;
    	for(var i = 0; i < dataPoint.length; i++) {
    		if(i == 0) {
    			chart.options.data[0].dataPoints[i].percentage = 100;
    		} else {
    			chart.options.data[0].dataPoints[i].percentage = ((dataPoint[i].y / total) * 100).toFixed(2);
    		}
    	}
    }

    
    _dashboard.ranking = function(type, inicio, fim){
		var ctx 	= document.getElementById('ranking');
		var label 	= '';
		var valor 	= '';
		
		$.ajax({
			url: '/proposta/ranking/unidade' + '?inicio=' + inicio + '&fim=' + fim, 
			success: function(result){
				$.each(result, function(i, item) {
					var isLastElement = (i == result.length-1);
					
					valor += COMMON.numberToReal(result[i][0], true)+ ",";
					label += result[i][1] + ","; 
					
					if(isLastElement){
						valor 	= valor.substring(0, valor.length - 1);
		    			label 	= label.substring(0, label.length - 1);
		    		}
				});	
				
				var horizontalBarChartData = {
						labels: label.split(','),
						datasets: [{
							label: 'Saldo',
							backgroundColor: '#49A746',
							borderColor: '#49A746',
							borderWidth: 1,
							data: valor.split(',')
						}]
					};
				
				var config = {
						type: 'horizontalBar',
						data: horizontalBarChartData,
						options: {
							elements: {
								rectangle: {
									borderWidth: 2,
								}
							},
							responsive: true,
							legend: {
								position: 'right',
								display: false
							},
							title: {
								display: false,
								text: 'Chart.js Horizontal Bar Chart'
							}
						}
				    };
			    	
				if(ctx != null)
					new Chart(ctx,config);
			}
		});
    }	
}); 
