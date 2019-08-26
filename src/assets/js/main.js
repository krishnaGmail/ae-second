
$.noConflict();

var const_url = '/vsurvedevkh3';

jQuery(document).ready(function ($) {
    
	"use strict";
    $('.form-control').each(function () {
        $(this).on('blur', function () {
            if ($(this).val().trim() != "") {
                $(this).addClass('has-val');
            }
            else {
                $(this).removeClass('has-val');
            }
        })
    });
	//Validation for accepting only letters in the first name and last nane field
	jQuery.validator.addMethod("lettersonly",function(value,element){
		return this.optional(element) || /^[a-z ]+$/i.test(value);
		
	},
	"Please enter letters only");	
	
	//Validation for password having atleast one uppercase, one lowercase, number and a special character//
	jQuery.validator.addMethod("passwordCheck",
			   function(value, element, param) {
				   if (this.optional(element)) {
					   return true;
				   } else if (!/[A-Z]/.test(value)) {
					   return false;
				   } else if (!/[a-z]/.test(value)) {
					   return false;
				   } else if (!/[0-9]/.test(value)) {
					   return false;
				   } else if (!/[$&+,:;=?@#|<>.^*()%!-]/.test(value)){
					   return false;
				   }
				   return true;
			   },
			   "Password must contain atleast one uppercase, one lowercase, one number and special character.");
	
	//Validation for not accepting any spaces in first name and last name
	function nospaces(t){
		if(t.value.match(/\s/g)){
			t.value = t.value.replace(/\s/g,'');
		}
	}
		
	//phone number validate
	jQuery.validator.addMethod("numCheck",function(value,element){
		return this.optional(element) || /^\d{10}$/i.test(value);		
	},
	"Please enter valid number.");	
			
	//Email Validation
	jQuery.validator.addMethod("emailCheck",function(value,element){
		return this.optional(element) || /^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,4}$/i.test(value);
		
	},
	"Please enter a valid email address.");	
	
	
	//checkbox check
	jQuery.validator.addMethod("checkboxchk", function(value) {
		return ($('input[type=checkbox]:checked').length >= 1);
	},
	"Atleast one permission must be assigned.");
				
	jQuery(document).ready(function($) {
		//$(".avatar span").each(function() {
		//  var str = $(this).text();
		//  var matches = str.match(/\b(\w)/g);			  
		//  var acronym = matches.join('');
		//  $(this).text(acronym).css("color", "#FFF");		  
		//});		
		$("[rel='tooltip']").tooltip({
		    trigger : 'hover'
		});	
		
		$('[data-toggle="tooltip"]').tooltip({
		    trigger : 'hover'
		});	
	});
	
	//Full Name Validation 
	jQuery.validator.addMethod("twowords",function(value,element) {
	return this.optional(element) ||  /^(?!.{,})(\w+\s+\w+ ?)$/i.test(value);
	},
	"Please enter full name.");

	//make first letter of first name and last name in name field capital
	$.fn.capitalize = function() {
		$.each(this, function() {
			this.value = this.value.replace(/\b[a-z]/gi, function($s) {
				return $s.toUpperCase();
			});
		 });
	}
			
	//ellipse
	function ellipse(){
		var divs = $(".wrapellipse");
		var showChar = 30;
		var ellipsestext = "...";
		$(divs).each(function() {
			var content = $(this).html();				
			if(content.length > showChar) {		
				var c = content.substr(0, showChar);
				var html = c + ' ' + ellipsestext+ '  ';
				$(this).html(html); 
			}
		});
	}
	ellipse();
	
	//checbox switch
	$.fn.checkboxChk = function () {
		var clickedCBoxVal=$(this).val(); // x
		var clickedCBoxID=$(this).attr("id"); // y
		var parentLvlCbox;
		var selectAllClicked = ($(this).attr("id") =='chkProjectAll' || $(this).attr("id") =='chkTicketAll' || $(this).attr("id") =='chkRoleAll' || $(this).attr("id") =='chkUsersAll') ? true : false;
		var selectAll = ($(this).attr("id") =='chkProjectAll' || $(this).attr("id") =='chkTicketAll' || $(this).attr("id") =='chkRoleAll' || $(this).attr("id") =='chkUsersAll') ? $(this).is(':checked') : false;
		var derivedSelectAll=true
		$(this).closest('li').find("input").each(function( index ) {
		  if($(this).attr("id") =='chkProjectAll' 
		  || $(this).attr("id") =='chkTicketAll' 
		  || $(this).attr("id") =='chkRoleAll'
		  || $(this).attr("id") =='chkUsersAll'
		  ){
			  parentLvlCbox = $(this);
		  }else{
			  if(selectAllClicked && selectAll){
				  $(this).prop('checked', true);
				  $(this).parent().parent().parent().parent().addClass("show");
				  $(this).parent().parent().parent().parent().siblings("a").removeClass("collapsed");
			  } else if(selectAllClicked && !selectAll){
				  $(this).prop('checked', false);
				  derivedSelectAll=false;
			  }
			  else {
				  if(!$(this).is(':checked')){
					  derivedSelectAll = false;
				  }
			  }
		  }
		});
		$(parentLvlCbox).prop('checked',derivedSelectAll);
	};
	
	[].slice.call( document.querySelectorAll( 'select.cs-select' ) ).forEach( function(el) {
		new SelectFx(el);
	});

	jQuery('.selectpicker').selectpicker;

	$('.search-trigger').on('click', function(event) {
		event.preventDefault();
		event.stopPropagation();
		$('.search-trigger').parent('.header-left').addClass('open');
	});

	$('.search-close').on('click', function(event) {
		event.preventDefault();
		event.stopPropagation();
		$('.search-trigger').parent('.header-left').removeClass('open');
	});

	$('.equal-height').matchHeight({
		property: 'max-height'
	});
	
	$(document).on('keypress', '.capital', function(e) {
		var arr = $(this).val().split(' ');
		if(arr.length>2)
		{
			e.preventDefault();
		}
	});
			
	 $(document).on('keyup', '.capital', function(e) {
		$(this).capitalize();
	 });

	// Counter Number
	$('.count').each(function () {
		$(this).prop('Counter',0).animate({
			Counter: $(this).text()
		}, {
			duration: 3000,
			easing: 'swing',
			step: function (now) {
				$(this).text(Math.ceil(now));
			}
		});
	});

	// Menu Trigger
	$('#menuToggle').on('click', function(event) {
		var windowWidth = $(window).width();   		 
		if (windowWidth<1010) { 
			$('body').removeClass('open'); 
			if (windowWidth<769){ 
				$('#left-panel').slideToggle(); 
			} else {
				$('#left-panel').toggleClass('open-menu');  
			} 
		} else {
			$('body').toggleClass('open');
			$('#left-panel').removeClass('open-menu');  
		} 
			 
	}); 
	 
	$(".menu-item-has-children.dropdown").each(function() {
		$(this).on('click', function() {
			var $temp_text = $(this).children('.dropdown-toggle').html();
			if($(this).children('.sub-menu').find(".subtitle").length<1)
			{
				$(this).children('.sub-menu').prepend('<li class="subtitle">' + $temp_text + '</li>'); 
			}	
		});
	});

	// Load Resize 
	$(window).on("load resize", function(event) { 
		var windowWidth = $(window).width();  		 
		if (windowWidth<1010) {
			$('body').addClass('small-device'); 
		} else {
			$('body').removeClass('small-device');  
		} 
	});
	var pathname = window.location.pathname;
	
	var activeMenu = pathname.split("/");
	$(".active-menu ul").children().removeClass("active");
	
	if(activeMenu[3]=="project"){
		$("#projectMenu").addClass("active");
		
		
	}
	else if(activeMenu[3]=="tickets"){
		$("#ticketsMenu").addClass("active");
		
	}
	else if(activeMenu[3]=="time"){
		$("#timeMenu").addClass("active");
		
	}
	else if(activeMenu[3]=="roles"){
		$("#rolesMenu").addClass("active");
		
		
	}
	else if(activeMenu[3]=="users"){
		$("#rolesMenu").addClass("active");
		
		
	}
	else 
	{
		$("#dashboardMenu").addClass("active");
	}
	
	var winWidth=$(window).width();
	/* if(winWidth<768)
	{
		if(winWidth<350)
		{
			$(".jdataTableResp").css("width","250px");
			
		}
		else if(winWidth>=350 && winWidth<400)
		{
			$(".jdataTableResp").css("width","300px");
			
		}
		else if(winWidth>=400 && winWidth<450)
		{
			$(".jdataTableResp").css("width","350px");
		}
		else if(winWidth>=450 && winWidth<500)
		{
			$(".jdataTableResp").css("width","400px");
		}
		else if(winWidth>=500 && winWidth<550)
		{
			$(".jdataTableResp").css("width","450px");
		}
		else if(winWidth>=550 && winWidth<600)
		{
			$(".jdataTableResp").css("width","500px");
		}
		else if(winWidth>=600 && winWidth<650)
		{
			$(".jdataTableResp").css("width","550px");
		}
		else if(winWidth>=650 && winWidth<700)
		{
			$(".jdataTableResp").css("width","600px");
		}
		else if(winWidth>=700 && winWidth<750)
		{
			$(".jdataTableResp").css("width","650px");
		}
		
	} */	
	if(winWidth<650 )
	{
		$("#menuToggle").addClass("cut-text");
	}
	if(winWidth>1200)
	{
		$('body').removeClass('open'); 
    }

   

});