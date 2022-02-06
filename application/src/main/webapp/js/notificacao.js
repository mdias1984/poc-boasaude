function toggleFAB(fab){
	if(document.querySelector(fab).classList.contains('show')){
		document.querySelector(fab).classList.remove('show');
		$('.fab div').css('display', 'none');
		
	}else{
		document.querySelector(fab).classList.add('show');
		$('.fab div').css('display', 'block');
	}
}

document.querySelector('.fab .main').addEventListener('click', function(){
	toggleFAB('.fab');
});

document.querySelectorAll('.fab ul li button').forEach((item)=>{
	item.addEventListener('click', function(){
		toggleFAB('.fab');
		
	});
});


function blink(selector) {
    $(selector).fadeOut('slow', function() {
        $(this).fadeIn('slow', function() {
            blink(this);
        });
    });
}

