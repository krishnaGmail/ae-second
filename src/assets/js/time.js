jQuery(document).ready(function($){
	
	$(".user-menu").niceScroll
	
	var timeEntry;
	var time_validation=true;
	var stt,endt;
	var project_Id;
	var roleId=$(".roleId").val();
	
	var defaultMem=$("input[name=defaultSessionMem]").val();
	var fetchedVal;
	var inviteSelector;
	$.timepickercal = function(txt1, txt2){
		var fromTimeid = $('#' + txt1);
		var toTimeid = $('#' + txt2);
		//Selecting Time
		fromTimeid.datetimepicker({
			format: 'LT',
			icons: {
				time: "fa fa-clock-o",
				date: "fa fa-calendar",
				up: "fa fa-chevron-up",
				down: "fa fa-chevron-down"
			}          
		});
		toTimeid.datetimepicker({
			format: 'LT',
			icons: {
				time: "fa fa-clock-o",
				date: "fa fa-calendar",
				up: "fa fa-chevron-up",
				down: "fa fa-chevron-down"
			}          
		}).on('dp.hide', function(e){
			var fromTime=fromTimeid.val();
			var toTime=$(this).val();
			if(fromTime != "")
			{
				//convert both time into timestamp
				stt = new Date("January 01, 1970 " + fromTime);
				stt = stt.getTime();
				endt = new Date("January 01, 1970 " + toTime);
				endt = endt.getTime();
				//by this you can see time stamp value in console via firebug
				
				if(stt >= endt) {
					$("#toTime_Error").text("End-time must be bigger then Start-time");
					setTimeout(function() { $("#toTime_Error").text(""); }, 5000);
				}
			}
			else{
				alert("Select From Time");
				toTimeid.val(null);
			}
		});
		//Make all datepicker input fields as readonly
		$('.datepickercal').click(function(event){
			event.preventDefault();
			$(this).prev().focus();
		});			
		//End of datepicker//
		$('[data-toggle="tooltip"]').tooltip();
	}
	$(document).on( 'click', '.linkAddTime', function () {
		$('.modal-container').load(const_url+"/home/time/AddNewTime",function(result) {
			$('#addtime-details').modal({show : true});
			var projectDataUrl;
			if(roleId==1011)
			{
				 projectDataUrl="/ProjectService/projectname/";
			}
			else{
				projectDataUrl="/ProjectService/projectnametoaddticketortime/";
			}
			if($('.linkAddTicket').length==0)
			{
				
				$('.addNew_ticket').addClass('d-none');
				
				
			}
			
			$(".selectinput").select2({
				width: 'auto',
				placeholder: "Select",
			});
			$.ajax({
				url : const_url+projectDataUrl,
				type : 'GET',
				contentType : 'application/json',
				success : function(data,textStatus,jQxhr) {
					$.each(data,function(key,entry) {
						$("#newTime_project").append('<option  value="' + entry.DT_RowId + '">' + entry.projectname +'</option>');
					});
					
				},
				error: function( jqXhr, textStatus, errorThrown ){
					$(".loading-fa").html("");
					alert( 'ERROR '+errorThrown );
				}
			});	
			var date = new Date();
			date.setDate(date.getDate()-3);
			
			$( "#newTime_Date" ).datepicker({ 
				startDate: date,	
				endDate: "today" ,
				todayHighlight: true,
				autoclose: true
			});
			$.timepickercal("newTime_From", "newTime_To");	
			timeEntry=$('input[name=timeEntry]:checked').val();
			$('input[name=timeEntry]').click(function(){
				timeEntry=$('input[name=timeEntry]:checked').val();
				if(timeEntry=="auto")
				{
					$("#newTime_manual").fadeOut("fast");
					$("#addTime_submit").html('Start Timer<span class="time-loading-fa ml-2"></span>');
					$("#newTime_Date").val('');
					$("#newTime_From").val('');
					$("#newTime_To").val('');
				}
				else{
					$("#newTime_manual").fadeIn("fast");
					$("#addTime_submit").html('Submit<span class="time-loading-fa ml-2"></span>');
				}
			});
			$('#addTimeEntry_form').validate(
			{
				ignore: "",
				errorClass : "input-error",
				errorElement : 'div',
				errorPlacement: function (error, element) {
					if(element.next('.select2-container').length) {
						error.insertAfter(element.next('.select2-container'));
						//$(".select2-selection").addClass("input-error");	
					}else{
						error.insertAfter(element);
					}
				}
			});
			
			
		});
	});
	// add ticket dynamically
	$(document).on( 'change', '#newTime_project', function () {
		$("#newTime_ticket").empty();
		project_Id=this.value;
		$.ajax({
			url : const_url+"/TimeService/Ticketlist/"+this.value,
			type : 'GET',
			contentType : 'application/json',
			success : function(data,textStatus,jQxhr) {
				$.each(data,function(key,entry) {
					if(typeof entry.tickettitle != 'undefined')
					{
						$("#newTime_ticket").append('<option  value="' + entry.DT_RowId + '">#' +  entry.DT_RowId +' - ' +  entry.tickettitle +'</option>');
					}
					
					
				});
			},
			error: function( jqXhr, textStatus, errorThrown ){
				$(".loading-fa").html("");
				alert( 'ERROR '+errorThrown );
			}
		});	
	});	
	//submit new time entry
	$(document).on( 'click', '#addTime_submit', function () {
		var time_validation=true
		var newTime_Date = $("#newTime_Date").val();
		console.log("Start Date---<"+newTime_Date);
		var newTime_From = $("#newTime_From").val();
		var newTime_To = $("#newTime_To").val();
		// auto end date
		var newTime_endDate;
			var d = new Date();
			var month = d.getMonth()+1;
			var day = d.getDate();
			newTime_endDate = 
				(month<10 ? '0' : '') + month + '/' +
				(day<10 ? '0' : '') + day  + '/' +
				d.getFullYear() ;
				
			// Manually  validation of date and time
			if(newTime_Date =="")
			{
				time_validation=false;
				$("#timeDate_Error").text("Date field required");
				setTimeout(function() { $("#timeDate_Error").text(""); }, 3000);
			}
			if(newTime_From =="" && newTime_To =="")
			{
				time_validation=false;
				$("#Time_Error").text("Time field required");
				setTimeout(function() { $("#Time_Error").text(""); }, 3000);
			}
			else if(newTime_From =="" )
			{
				time_validation=false;
				$("#Time_Error").text("Start Time field required");
				setTimeout(function() { $("#Time_Error").text(""); }, 3000);
			}
			else if(newTime_To =="" )
			{
				time_validation=false;
				$("#Time_Error").text("End Time field required");
				setTimeout(function() { $("#Time_Error").text(""); }, 3000);
			}
			else if(newTime_From !="" && newTime_To !="")
			{
				//convert both time into timestamp
				stt = new Date("January 01, 1970 " + newTime_From);
				stt = stt.getTime();
				endt = new Date("January 01, 1970 " + newTime_To);
				endt = endt.getTime();
				//by this you can see time stamp value in console via firebug
				console.log("Time1: "+ stt + " Time2: " + endt);
				if(stt >= endt) {
					$("#toTime_Error").text("End-time must be bigger then Start-time");
					setTimeout(function() { $("#toTime_Error").text(""); }, 3000);
					time_validation=false;
				}
				
			}
			console.log(time_validation);
		if ($('#addTimeEntry_form').valid() && time_validation) {
			$('#addTime_submit').prop('disabled', true);
			var newTime_project = $("#newTime_project").val();
			var newTime_ticket = $("#newTime_ticket").val();
			var newTime_desc = $("#newTime_desc").val();
			var timeCounter= "";
			var dataJSON = JSON.stringify(
			{
				"ticket_idfk": newTime_ticket,
				"project_idfk": newTime_project,
				"description": newTime_desc,
				"startdate": newTime_Date,
				"enddate":newTime_endDate,
				"starttime": newTime_From,
				"endtime": newTime_To,
				"timecount": ""+timeCounter
			});
			
			$.ajax({
				url : const_url+"/TimeService/addtime",
				type : 'POST',
				contentType : 'application/json',
				data : dataJSON,
				beforeSend: function(){
					$(".time-loading-fa").html("<i class='fa fa-spinner fa-spin'></i>");
				},
				success : function(data,textStatus,jQxhr) {
					if($("#timetable").length){
						$('#timetable').DataTable().ajax.reload();
					}
					$.snackbar({content: "New time entry  created successfully.", timeout: 5000});
					$('#addTime_submit').prop('disabled', false);
					$('#addtime-details').modal('hide');								
				},
				error: function( jqXhr, textStatus, errorThrown ){
					$('#addTime_submit').prop('disabled', false);
							alert( 'Error' );
				}
			}); 
		}
	});
	
	$(document).on('click','.addNew_ticket',function(){
		$('#addticket-popup').modal({show : true});
		
		$("#new_tckName").val('');
		$("#new_status").val(null).trigger("change");
		$("#new_priority").val(null).trigger("change");
		$("#new_prjName").val(null).trigger("change");
		$("#new_status").val(null).trigger("change");
		$("#txtCategory").val(null).trigger("change");
		
		$("#new_prjName-error").text('');
		$("#new_priority-error").text('');
		$("#new_tckName-error").text('');
		$("#new_status-error").text('');
		$("#txtCategory-error").text('');
		$("input").removeClass("input-error");
		$("#txtCategory").select2({
			placeholder: "Select",
			width: 'auto',
			templateResult: function (data) {
				// In category list adding cross(delete) icon 
				if (data.id == null) {
				  return data.text;
				}
				var $option = $("<span></span>");
				var $preview = $("<i class='pull-right'></i>");
				if(data.text!="Add New Category")
				{
					$option = $("<span></span>");
					$preview = $("<i class='pull-right fa fa-times'></i>");
				}
				$preview.prop("id", data.id);
				$preview.on('mouseup', function (evt) {
				  evt.stopPropagation();
				});
				$preview.on('click', function (evt) {
					var catId=$(this)[0].id;					
					$.ajax({
						url : const_url+"/TicketService/deletecat/"+catId, 
						type : 'DELETE',								
						success : function(data,textStatus,jQxhr) {
							console.log(data);
							if(data=="referred")
							{
								$('#forcedeleterecord-popup').modal({show : true});
								$('#btnForceDeleteDetails').on( 'click', function (e) {
									$.ajax({
										url : const_url+"/TicketService/deletereferredcat/"+catId, 
										type : 'DELETE',
										beforeSend: function(){
											$(".loading-fa").html("<i class='fa fa-spinner fa-spin'></i>");
										},
										success : function(data,textStatus,jQxhr) {
											console.log("ForceDElete"+data);													
											if ($('#txtCategory').find("option[value='" + catId + "']").length) {
												$('#txtCategory').find("option[value='" + catId + "']").remove();
												$('#txtCategory').select2("close");
												$('#txtCategory').select2("open");
											}													
											$(".loading-fa").html("");
											$('#forcedeleterecord-popup').modal('hide');	
										},
										error: function( jqXhr, textStatus, errorThrown ){
											alert( 'ERROR '+errorThrown );
										}
									});	
								});
								
										
							}
							else{
								if ($('#txtCategory').find("option[value='" + catId + "']").length) {
									$('#txtCategory').find("option[value='" + catId + "']").remove();
									$('#txtCategory').select2("close");
									$('#txtCategory').select2("open");
								}
							}
							
						},
						error: function( jqXhr, textStatus, errorThrown ){
							alert( 'ERROR '+errorThrown );
						}
					});		
				});
				$option.text(data.text);
				$option.append($preview);
				return $option;
			  }
		}).on('select2:close', function() {
		   var el = $(this);
			//Add New Category 
			if(el.val()==="NEW") {
				$('#txtCategory').val(null).trigger('change');
				$('#addticketcategory-popup').modal({show : true});
				$("#formAddCategory")[0].reset();						
				$('#formAddCategory').validate(
				{
					errorClass : "input-error",
					errorElement : 'div'
				});
				//$("#addTicketCat").click(function(e) {icons_select2
				$("#addTicketCat").unbind().click(function(event) {
					var addCatflag=true;
					var ticketCat=$("#txtAddTicketCategory").val();
					var dataJSON = JSON.stringify(
					{
						"description":ticketCat
					});
					// Checking Duplicate category list 
					$("#txtCategory option").each(function(i){
						if($(this).text()==ticketCat)
						{
							$.snackbar({content: "Category already exits.", timeout: 5000});
							addCatflag=false;
						}
					});
					if(addCatflag)
					{
						if ($('#formAddCategory').valid()) { 
							$.ajax({
								url : const_url+"/TicketService/addnewticketcat",
								type : 'POST',
								contentType : 'application/json',
								data : dataJSON,
								beforeSend: function(){
									$(".loading-fa").html("<i class='fa fa-spinner fa-spin'></i>");
								},
								success : function(data,textStatus,jQxhr) {
									$(".loading-fa").html("");
									$("#txtAddTicketCategory").val("");
									console.log(data);
									$.each(data,function(key,entry) {
										$("#txtCategory").append('<option  value="' + entry.DT_RowId + '">' + entry.description +'</option>');
									});
									$("#txtCategory").val(data[0].DT_RowId).trigger('change');
									$(".loading-fa").html("");
									$('#addticketcategory-popup').modal('hide');
								},
								error: function( jqXhr, textStatus, errorThrown ){
									$(".loading-fa").html("");
									alert( 'ERROR '+errorThrown );
								}
							});	
						}
					}	
				});
			}
		 });
		var projectDataUrl;
		if(roleId==1011)
		{
			 projectDataUrl="/ProjectService/projectname/";
		}
		else{
			projectDataUrl="/ProjectService/projectnametoaddticketortime/";
		}
		$.ajax({
				url : const_url+projectDataUrl,
				type : 'GET',
				contentType : 'application/json',
				success : function(data,textStatus,jQxhr) {
					$.each(data,function(key,entry) {
						$("#new_prjName").append('<option  value="' + entry.DT_RowId + '">' + entry.projectname +'</option>');
					});
					if(project_Id!="" && typeof project_Id !="undefined")
					{
						 
						$('#new_prjName').val(project_Id).trigger('change');
					}
		
					
					
				},
				error: function( jqXhr, textStatus, errorThrown ){
					$(".loading-fa").html("");
					alert( 'ERROR '+errorThrown );
				}
			});
		if($('.linkAddTicket').length==0)
		{
			
			$('.addNew_ticket').addClass('d-none');
			
			
		}
		
		
	});
	$(document).on( 'click', '#addtime_ticket', function () {
		$('#formAddTicket').validate(
		{
			errorClass : "input-error",
			errorElement : 'div',
			errorPlacement: function (error, element) {
				if(element.next('.select2-container').length) {
					error.insertAfter(element.next('.select2-container'));
					
				}else{
					error.insertAfter(element);
				}
			}
		});
		var new_tckName = $("#new_tckName").val();
		var new_prjName = $("#new_prjName").val();
		var new_priority = $("#new_priority").val();
		var new_status = $("#new_status").val();
		var new_category = $("#txtCategory").val();
		var dataJSON = JSON.stringify(
		{
			"tickettitle": new_tckName,
			"project_idfk": new_prjName,
			"priority": new_priority,
			"statuscode": new_status,
			"category_idfk": new_category
		});
		
		
		if ($('#formAddTicket').valid()) {
			console.log("Time Ticket--->"+dataJSON);
			$.ajax({
					url : const_url+"/TimeService/addticketintime",
					type : 'POST',
					contentType : 'application/json',
					data : dataJSON,
					beforeSend: function(){
						$(".ticket-loading-fa").html("<i class='fa fa-spinner fa-spin'></i>");
					},
					success : function(data,textStatus,jQxhr) {
						
						if(project_Id==data[0].project_idfk){
							$.each(data,function(key,entry) {
								$("#newTime_ticket").append('<option  selected value="' + entry.DT_RowId + '">#' +  entry.DT_RowId +' - ' +  entry.tickettitle +'</option>');
							});
							$('#newTime_ticket').val(data[0].DT_RowId).trigger('change');
						}
						
						
						$(".ticket-loading-fa").html('');
						$('#addticket-popup').modal('hide');								
					},
					error: function( jqXhr, textStatus, errorThrown ){
								alert( 'Error' );
					}
				});
		}		
		
	});	
});