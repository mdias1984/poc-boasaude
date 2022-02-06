var COMMON = {};

$(function() {
	
	$(".alert").hide();
	
	COMMON.randomColor = function() {
		
		var letters = '0123456789ABCDEF';
		var color = '#';
		
		for (var i = 0; i < 6; i++) {
		   color += letters[Math.floor(Math.random() * 16)];
		}
		
		return color;
	}
	
	COMMON.numeroParaMoeda = function(n, c, d, t){
	    c = isNaN(c = Math.abs(c)) ? 2 : c, d = d == undefined ? "," : d, t = t == undefined ? "." : t, s = n < 0 ? "-" : "", i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "", j = (j = i.length) > 3 ? j % 3 : 0;
	    return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
	}
	
	COMMON.limpaCampos = function(){
		$("form  .field-mask").each(function() {
			$(this).unmask();
		    
		    var fieldVal = $(this).val().replace(/[^\d]+/g,"");
		    $(this).val(fieldVal);
		});
	}
	
	COMMON.alertSuccess = function(id, message){
		$(id).removeClass('alert-danger');
		$(id).addClass('alert-success');
		$(id).find('span').html(message);
		$(id).show();
	}
	
	COMMON.alertError = function (id, message){
		$(id).removeClass('alert-success');
		$(id).addClass('alert-danger');
		$(id).find('span').html(message);
		$(id).show();
	}

	COMMON.formataCPF = function(valor) {
	    valor = valor + "";
	    valor = valor.replace( /\D/g , ""); 
	    valor = valor.replace( /(\d{3})(\d)/ , "$1.$2"); 
	    valor = valor.replace( /(\d{3})(\d)/ , "$1.$2"); 
	    valor = valor.replace( /(\d{3})(\d{1,2})$/ , "$1-$2"); 
	    
	    return valor;
	}

	COMMON.mascaraCNPJ = function(valor) {

		valor = valor + "";
		valor = valor.replace( /\D/g , ""); 
		valor = valor.replace( /^(\d{2})(\d)/ , "$1.$2"); 
	    valor = valor.replace( /^(\d{2})\.(\d{3})(\d)/ , "$1.$2.$3"); 
	    valor = valor.replace( /\.(\d{3})(\d)/ , ".$1/$2"); 
	    valor = valor.replace( /(\d{4})(\d)/ , "$1-$2"); 
	    
		return valor;
	}

	COMMON.formataTelefone = function(valor){
		valor = valor + "";
		valor = valor.replace(/(\d{2})(\d{4})(\d{4})/, '($1)$2-$3');
		
		return valor;
	}
	
	COMMON.formataTelefoneCelular = function(valor){
		valor = valor + "";
		valor = valor.replace(/(\d{2})(\d{5})(\d{4})/, '($1)$2-$3');
		
		return valor;
	}
		

	COMMON.numberToReal = function( int, replaced ){
		
	        var tmp = int+'';
	        tmp = tmp.replace(',','');
	        tmp = tmp.replace('.','');
	        
	        
	        if(replaced)
	        	tmp = tmp.substring('0', tmp.length - 2);
	       
	        tmp = tmp.replace(/([0-9]{2})$/g, ",$1");
	        if( tmp.length > 6 )
	                tmp = tmp.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");

	        return tmp;
	}
	
	COMMON.carregaCidades = function(idEstado){
		var selected = $("select[name=estado]").val();
		
		$.getJSON('/api/estados/' + idEstado + '/cidades', function(data) {  
		    var items = [];  
		   
		    $.each(data, function(key, val) {  
		        	items.push('<option value="' + val[0] + '">' + val[1].toUpperCase() + '</option>');  
		        });  

		    $("select[name=cidade]").empty();
		    $("select[name=cidade]").html(items);  
		});	
	
	}
		
	COMMON.carregaUnidades = function(){	
		$($("select[name=loja]")).change(function(){
			var selected = $(this).val();
			
			$.getJSON('/api/unidade/' + selected + '/usuarios', function(data) {  
			    var items = [];  
			   
			    $.each(data, function(key, val) {  
			        	items.push('<option value="' + val.codigo + '">' + val.nome.toUpperCase() + '</option>');  
			        });  
	
			    $("select[name=vendedor]").empty();
			    $("select[name=vendedor]").html(items);  
			});	
		});
 	}

    COMMON.formataDataExtenso = function(date){
        var months = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"];

        var d = new Date(date),
        month = '' + (d.getMonth()),
       	day = '' + d.getDate(),
       	year = d.getFullYear();

        if (day.length < 2) day = '0' + day;

        return day + ' ' + months[month] + ', ' + year + ' ' + (d.getHours()+1) + ':' + d.getMinutes();
    }

	COMMON.formataData = function(date){
		return (new Date(date)).toISOString().match(/^[0-9]{4}\-[0-9]{2}\-[0-9]{2}/)[0].split('-').reverse().join('/') ;
	}
	
	COMMON.operateFormatter = function(value, row, index) {
		return [
			'<a title="Editar registro" class="btn btn-sm btn-warning btn-edit"><i class="fas fa-pencil-alt"></i></a>',
			'<span class="separador"></span>',
			'<a title="Remover registro" class="btn btn-sm btn-danger btn-remove"><i class="fa fa-trash"></i></a>',
		].join('')
	}

	COMMON.operateEditFormatter = function(value, row, index) {
		return [
			'<a title="Editar registro" class="btn btn-sm btn-warning btn-edit"><i class="fas fa-pencil-alt"></i></a>'
		].join('')
	} 

	COMMON.operateRemoveFormatter = function(value, row, index) {
		return [
			'<a title="Remover registro" class="btn btn-sm btn-danger btn-remove"><i class="fa fa-trash"></i></a>'
		].join('')
	} 
	
	COMMON.moneyFormatter = function(value, row, index){
		return COMMON.numberToReal(value); 
	}
	
	COMMON.dateFormatter = function(value, row, index){
		return COMMON.formataData(value);
	}
	 
	COMMON.phoneFormatter = function(value, row, index){
		return COMMON.formataTelefone(value);
	}
	
	COMMON.cellPhoneFormatter = function(value, row, index){
		JSON.stringify(row);
		
		if(row.isWhatApp){
			return [
				'<div>',
				'<a href="https://api.whatsapp.com/send?phone=55' + value + '&text=Olá ' + row.nome +  '" target="_blank">',
				COMMON.formataTelefone(value),
				'<i class="fa fa-whatsapp"></i>',
				'</a>',
				'</div>'
			].join('');
		}		

		return COMMON.formataTelefone(value);
	}
	

	COMMON.getMoney = function( str )
	{
	        return parseInt( str.replace(/[\D]+/g,'') );
	}
	
	COMMON.formatReal = function( int )
	{
	        var tmp = int+'';
	        tmp = tmp.replace(/([0-9]{2})$/g, ",$1");
	        if( tmp.length > 6 )
	                tmp = tmp.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");

	        return tmp;
	}
	
	 
	COMMON.cpfFormatter = function(value, row, index){
		return COMMON.formataCPF(value);
	} 
	
	COMMON.buscaCEP = function(campo){
		
		var cep = $(campo).val().replace(/\D/g, '');
		
        if (cep != "") {

            var validacep = /^[0-9]{8}$/;

            if(validacep.test(cep)) {

                $.preloader.start({
                    modal: true,
                    src : 'sprites2.png'
                });
                
                $.getJSON("https://viacep.com.br/ws/"+ cep +"/json/?callback=?", function(dados) {

               	 if (!("erro" in dados)) {
                   	 $("input[name=endereco]").val(dados.logradouro.toUpperCase());
                        $("input[name=bairro]").val(dados.bairro.toUpperCase());

         		    	 $("select[name=estado] option").filter(function() { 
        		    	    return ($(this).text() == dados.uf.toUpperCase()); 
        		    	 }).prop('selected', true).change();
         		    	 
         		    	
         		    	 setTimeout(function(){
         		    		$("select[name=cidade] option").filter(function() { 
            		    	    return ($(this).text() == dados.localidade.toUpperCase()); 
            		    	 }).prop('selected', true);
         		    		
            		    	 $.preloader.stop();

         		    	 }, 1000);

         		    	 
               	 }else {
               		 $.preloader.stop();
               	 }
                });
            } 
            else {
           	 alert("Formato de CEP inválido.");
           	 $.preloader.stop();
            }
        } 
        else {
       	 $.preloader.stop();
        }
	}
	
	
});