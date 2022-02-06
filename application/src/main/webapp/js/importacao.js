$(function() {

	 $('#btnVoltarImportacao').on('click', function(e){
		 $('#callBackImportacao').hide();
		 $('#preImportacao').show();
	 });	
	
	 $('#uploadClientes').on('click', function (e) {
		 var formData = new FormData(document.forms["formImportacaoCliente"]);
		 
		 $.ajax({
			 url: '/cliente/importacao',
			 type: 'POST',
			 data: formData,
			 async: false,
			 cache: false,
			 contentType: false,
			 processData: false,
			 success: function (data) {
				 console.log(data);
				 $('#messageCallBackImportacao').css('color','#23282c');
				 $('#messageCallBackImportacao').html('O processo de importação ocorrerá em segundo plano, você receberá um email quando o mesmo for concluido.');
				 
			 },
			 error: function (data) {
				 console.log('Erro');
				 $('#messageCallBackImportacao').css('color','red');
				 $('#messageCallBackImportacao').html(data.responseText);	 
			 }
		 });
		 
		 $('#callBackImportacao').show();
		 $('#preImportacao').hide();
		 
		 return false;
	 });

});