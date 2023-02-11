$(document).ready(function(){         
	/*$("#headSlider").rcarousel({
		orientation: "vertical",
		width: 281, height: 165,
		visible: 1, step: 1,
		auto: {
			enabled: true,
			interval: 2000,
			direction: "next"
		}
	});*/
	$('.show_el').click(function(e) {
		e.preventDefault();
		var id = $(this).attr('href');
		$(id).appendTo($('#map_container')).css({visibility: 'visible'});
		$('#map_container').slideDown();
		scrollTo($(id));
	});
	$('.required').prev('.form-title').after('<span class="star">*</span>');

	var options = { 
        uploadProgress: function(event, position, total, percentComplete) { //on progress
        	//$('#progress_bar .ui-progress').animateProgress(percentComplete);
        	console.log("PercentComplete: "+percentComplete+" and position:"+position);
        },
       	success: function() { 
       		$('.submit-button').hide(); // disable upload button
            $('.progress-bar').show(); //show progressbar
            $('.progress-bar span').width(430);
            setTimeout(function() {
            	$('#form_contact').html('').append('<h2>Дякуємо! Ваше повідомлення успішно відпарвлено</h2>');
	            scrollTo($('#form_contact'));
            }, 1200);
		},
		error: function(errorResponse) 
		{
			var error = "Помилка, будь ласка переконайтесь що натиснули на прапорець у полі 'Я не робот'";
			try
			{
				var errorString = errorResponse ? JSON.parse(errorResponse.responseText) : null;
				var errorMessage = errorString && errorString.message ? errorString.message : null;

				if (errorMessage) 
				{
					error = errorMessage;
				}
			}
			catch  {}

			alert(error);
		}
	}; 

	$('form').validate({
		submitHandler: function(form) {
			$(form).ajaxSubmit(options);
		},
		rules: {
	    	// compound rule
		    email: {
		      required: true,
		      email: true
		    }
		}
	});

	$('#headSlider').carouFredSel({
		width: '281',
		height: '165',
		direction: 'up'
	}).removeClass('visuallyhidden');

	$('.fancybox').fancybox({
	  padding: 0,
	  helpers: {
	    overlay: {
	      locked: false
	    }
	  }
	});
	//add separator
	$('#topnav ul').children('li').each(function () {
            $('<li class="sep">|</li>').insertBefore($(this).next('li'));
    });
	$('footer ul').children('li').each(function () {
            $('<li class="sep">|</li>').insertBefore($(this).next('li'));
    });

	//set sidebar height
	var vH = $(".main").height();   
	$(".sidebar").height(vH);

}); 

function scrollTo(selector) {
	var targetOffset = selector.offset().top - 30;
	var speed = 1000;
   	$('html, body').animate({scrollTop: targetOffset}, speed, function() {});
}