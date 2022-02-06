$(function() {
	$('#btnExportarExtratoFinanceiro').click(function(){
		$('#formExtratoFinanceiroPDF').submit();
	});
	
	$('#btnExtratoFinanceiroVoltar').click(function(){
		window.location.href = 'extrato';
	});
	
});