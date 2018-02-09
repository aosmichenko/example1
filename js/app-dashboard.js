jQuery(document).ready(function($) {
	$('.menu-gumb-wrap').click(function () {
		$(this).toggleClass('open');
		$('body').toggleClass('no-scroll');
		$('#sidebar').toggleClass('menu-open');
	});

	$('.payment-method-wrap .block-invested-value').on('click', function () {
		$('.payment-method-wrap .block-invested-value.selected').removeClass('selected');
		var target = $(this).data('show-block');
		$(this).addClass('selected');
		$('.buy-panel').fadeOut();
		$(target).fadeIn();
		$('html,body').animate({scrollTop: $(target).offset().top - 100});
	});

	$('.buy-panel .btn-close').on('click', function(){
		var target = $(this).parent().parent();
		var id = $(target).attr('id');
		$(target).fadeOut();
		$('.payment-method-wrap .block-invested-value[data-show-block="#'+id+'"]').removeClass('selected');

	});

	$('.pay-panel .btn-close').on('click', function(){
		var target = $(this).parent().parent();
		var id = $(target).attr('id');
		$(target).hide();
		$('.payment-method-wrap .block-invested-value.selected').removeClass('selected');
		$('.payment-method-wrap').fadeIn();

	});

	$('.buy-panel .btn-contribute').on('click', function(){
		var target = $(this).data('pay-target');
		$('.payment-method-wrap').hide();
		$('.buy-panel').hide();
		$(target).fadeIn();
		$('html,body').animate({scrollTop: $(target).offset().top - 100});
		return false;
	});

	$('.btn-user-nav').click(function () {
		$('.fa-angle-down').toggleClass('rotate-up');
		$('.user-dropdown').toggleClass('dropdown-open');
	});

});