$(document).ready(function() {

	// DISPARO DO POP DE MENSAGENS

	$('ul.menu-principal li.correio a').click(function() {
		$('ul.menu-principal li.correio .pop-menu-principal').slideToggle('fast');
	});

	// JQTRANSFORM
	$(function() {
		// find all form with class jqtransform and apply the plugin
		$(".jqtransform").jqTransform();
	});

	// ABRIR E FECHAR O TOP MENU
	$('.top-menu-closed').click(function() {
		$('.top-menu').show('fast', function() {
		});
	});
	$('.top-menu-header').click(function() {
		$('.top-menu').hide('fast', function() {
		});
	});

	// COR DA BORDA DE ASSINANTES OURO E PLATINUM

	$('.assinatura.ouro').prev().css('border', '2px solid #ffa210');
	$('.assinatura.platinum').prev().css('border', '2px solid #3f3f3f');

	// ABRIR E FECHAR O REFINAR BUSCA

	$(".busca-refinar").toggle(function() {
		$('.form-refine-search').slideDown('fast');
		$('.busca-refinar').css('background-color', '#C9C9C9');
		$('ul.busca-nav-bar').css('background-color', '#C9C9C9');
		$('ul.busca-nav-bar li .link.busca-refinar .seta').css('background-position', '-75px -69px');
	}, function() {
		$('.form-refine-search').slideUp('fast');
		$('.busca-refinar').css('background-color', '#D9D7D7');
		$('ul.busca-nav-bar').css('background-color', '#D9D7D7');
		$('ul.busca-nav-bar li .link.busca-refinar .seta').css('background-position', '-63px -69px');
	});

	// CAROUSEL

	var numItems = $('.photo-carousel .photos li').length;
	var larguraSlider = numItems * 68;
	var larguraDaMascara = $('.photo-carousel .mask').width();

	if (larguraSlider < larguraDaMascara) {
		$('.profile-arrow-div-right').hide();
	}

	var marginLeftSlider = $('.photo-carousel .mask .slider').css('margin-left');

	$('.photo-carousel .profile-arrow-div-right span').click(function() {

		$('.profile-arrow-div-left').show('fast');
		$('.photo-carousel .mask .slider').animate({
			marginLeft : '-=136',
		}, 500, function() {
		});

	});

	$('.photo-carousel .profile-arrow-div-left span').click(function() {
		var marginLeftSlider = $('.photo-carousel .mask .slider').css('margin-left');

		if (marginLeftSlider != ('0px')) {
			$('.photo-carousel .mask .slider').animate({
				marginLeft : '+=136',
			}, 500, function() {
			});
		}
		if (marginLeftSlider == ('-136px')) {
			$('.profile-arrow-div-left').hide('slow');
		}
	});

	// SUGESTAO DE APELIDO

	$('.username-suggestions ul li').click(function() {
		var str = $(this).text();
		$(".reg-username-input").val(str);
		$('.username-suggestions').fadeOut("fast");
	});

	// WIPE DO CARROSSEL

	$(".slider").wipetouch({
	    wipeRight : function(result) {
		    var marginLeftSlider = $('.photo-carousel .mask .slider').css('margin-left');

		    if (marginLeftSlider != ('0px')) {
			    $('.photo-carousel .mask .slider').animate({
				    marginLeft : '+=136',
			    }, 500, function() {
			    });
		    }
		    if (marginLeftSlider == ('-136px')) {
			    $('.profile-arrow-div-left').hide('slow');
		    }
	    },
	    wipeLeft : function(result) {
		    $('.profile-arrow-div-left').show('fast');
		    $('.photo-carousel .mask .slider').animate({
			    marginLeft : '-=136',
		    }, 500, function() {
		    });
	    },
	});

	// PROFILE ABAS

	$('.about-me').click(function() {
		$('.box-about-me').show();
		$(this).addClass('active');
		$('.box-about-who-i-look-for').hide();
		$('.about-who-i-look-for').removeClass('active');
	});
	$('.about-who-i-look-for').click(function() {
		$('.box-about-who-i-look-for').show();
		$(this).addClass('active');
		$('.box-about-me').hide();
		$('.about-me').removeClass('active');
	});

	// PROFILE LIGHTBOX

	$('.photo-carousel .photos li img').click(function() {
		$('.profile-lightbox-bg').fadeIn('fast');
		$('.profile-lightbox').fadeIn('fast');
	});
	$('.photo-carousel .icon-display').click(function() {
		$('.profile-lightbox-bg').fadeIn('fast');
		$('.profile-lightbox').fadeIn('fast');
	});

	$('.profile-lightbox .close-button').click(function() {
		$('.profile-lightbox-bg').fadeOut('fast');
		$('.profile-lightbox').fadeOut('fast');
	});

	// ADD TO FAVORITE

	$('.profile-actions .action-favorite').click(function() {
		$('.profile-actions .action-favorite').fadeIn('fast');
	});

	$(".profile-actions .action-favorite").toggle(function() {
		$('.profile-actions .action-favorite .icon-actions').addClass('active');
	}, function() {
		$('.profile-actions .action-favorite .icon-actions').removeClass('active');
	});

});