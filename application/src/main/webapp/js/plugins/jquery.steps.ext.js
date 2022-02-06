$.fn.steps.setStep = function(step) {
	var currentIndex = $(this).steps('getCurrentIndex');
	for (var i = 0; i < Math.abs(step - currentIndex); i++) {
		if (step > currentIndex) {
			$(this).steps('next');
		} else {
			$(this).steps('previous');
		}
	}
};

function focusStepErrors(tabPanelName, form) {
    var tabpanel = $(tabPanelName);
    var tabs = tabpanel.find('section').toArray();
    var tabNames = Array();
    for (var i = 0; i < tabs.length; i++) {
        tabNames[i] = "#" + tabs[i].id;
    }
    
    $(form).find(":input").each(function () {
    	if ($(this).hasClass('error')) { 
    		for (var z = 0; z < tabNames.length; z++) {
    			if ($(tabNames[z]).find($(this)).length)
    				$(tabPanelName).steps("setStep", z);
                	
            }
            return false; // ends each
        }
        return true;
    });
}