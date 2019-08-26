jQuery(document).ready(function($){
	//new workspace
	$('.linkaddworkspace').on("click",function() {
		//alert('btn click');
		$('.modal-container').load(const_url+"/home/CompanyDetails",function(result) {
			$('#company-details').modal({show : true});
			jQuery('#companydetails_form').validate({
				errorClass : "input-error",
				errorElement : 'div'
			});
			
			var dropdown = $('#txtCompanyType');
			dropdown.empty();
			var url = "../../resources/assets/js/industryfetchjson.js";
			$.getJSON(url, function (data) {
			  $.each(data, function (key, entry) {
				dropdown.append($('<option></option>').attr('value', entry.val).text(entry.name));
			  })
			});
			
			$('#txtDomainUrl').keyup(function(e) {
				var txtVal = $(this).val();
				if(txtVal != ""){
					$(this).parent().next().show();
					$(this).parent().next().find("span").text(txtVal);
				}else{
					$(this).parent().next().hide();
				}
			});
		});
	});
	var roleId=$(".roleId").val();
	var contactId=$(".contactId").val();
	
	var defaultMem=$("input[name=defaultSessionMem]").val();
	
	$(".selectinput").select2({
		width: 'auto',
		placeholder: "Select",
	});
	$( "#txtResourceFromDate , txtResourceToDate").datepicker({ 
		
		todayHighlight: true,
		autoclose: true
	});
	$( "#txtResourceFromDate").datepicker({
			
		}).on('changeDate', function(){
			
			$( "#txtResourceToDate").datepicker('setStartDate', new Date($(this).val())); 
		});
	$('#formResourceUtilization').validate(
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
	$('#btnSearchResourceUtilization').on("click",function() {
		
		var txtResource = $("#txtResource").val();
		var txtResourceFromDate = $("#txtResourceFromDate").val();
		var txtResourceToDate = $("#txtResourceToDate").val();
		var dataJSON = JSON.stringify(
		{
			"txtResource": txtResource,
			"txtResourceFromDate": txtResourceFromDate,
			"txtResourceToDate": txtResourceToDate
		});
		console.log("Resource--->"+dataJSON);
		$("#resource-table").removeClass("d-none");
		new Chart(document.getElementById("bar-chart-grouped"), {
			type: 'bar',
			data: {
			  labels: ["1900", "1950", "1999", "2050"],
			  datasets: [
				{
				  label: "Africa",
				  backgroundColor: "#3e95cd",
				  data: [133,221,783,2478],
				  borderWidth: 1
				}, {
				  label: "Europe",
				  backgroundColor: "#8e5ea2",
				  data: [408,547,675,734],
				  borderWidth: 1
				}
			  ]
			},
			options: {
			  title: {
				display: true,
				text: 'Population growth (millions)'
			  },
			   scales: {
				xAxes: [{
					barPercentage: 0.5
				}]
			}, 
			responsive: true
			
			}
		});
		/* $.ajax({
			url : add_url,
			type : 'POST',
			contentType : 'application/json',
			data : dataJSON,
			beforeSend: function(){
				$(".loading-fa").html("<i class='fa fa-spinner fa-spin'></i>");
			},
			success : function(data,textStatus,jQxhr) {
				alert('sucess');
				//oTable.ajax.reload();
			},
			error: function( jqXhr, textStatus, errorThrown ){
				alert( 'ERROR '+errorThrown );
			}
		}); */
	});
	
	if(roleId==1011 ||roleId==1012)
	{
		 timeDataUrl="/TimeService/timeadminlist/";
	}
	else{
		timeDataUrl="/TimeService/timelist/";
	}
	/* Formatting function for row details - modify as you need */
	function format ( d ) {
		return '<div class="row">'+
		'<div class="col-sm-12 mb-2"><span class="fw-b">Project  : </span>'+d.projectname+'</div>'+
		'<div class="col-sm-6 mb-2"><span class="fw-b">Start Time : </span>'+d.stime+'</div>'+
		'<div class="col-sm-6 mb-2"><span class="fw-b">End Time : </span>'+d.etime+'</div>'+
		'<div class="col-sm-12 mb-2"><p class="break-out"><span class="fw-b">Description: </span>'+d.description+'</p></div>'+
		'</div>';
	}
	var oTable = jQuery('#timetable').DataTable( {
		"processing": true,
		"language": 
		{          
		"processing": "<i class='fa fa-spinner fa-spin fa-2x'></i>",
		"loadingRecords": "<i class='fa fa-spinner fa-spin fa-2x'></i>",
		},
		"sAjaxSource": const_url+timeDataUrl,
		"iDisplayLength": 10,
		"bLengthMenu": [[5, 10, 25, 50, -1], [5, 10, 25, 50, "All"]],
		"bFilter": true, //to show search
		"deferRender": true,
		"columns": [
			{
				"className":      'details-control',
				"orderable":      false,
				"data":           null,
				"defaultContent": ''
			},
			{  data: null, 
				render: function ( data, type, row ) {
					return "<span class='wrapellipse' title='"+data.firstname+" "+data.lastname+"' data-toggle='tooltip'>"+data.firstname+" "+data.lastname+"</span>";
					 
				}
			},
			{ data: null, 
				render: function ( data, type, row ) {
					return "<span style='color: #007bff;' class='wrapellipse' title='"+data.ticketname+"' data-toggle='tooltip'>#"+data.ticket_idfk+"</span>";
				}
			},
			
			{ data: "startdate",
			  "defaultContent": ''
			},
			
			{ 
				data: null, 
				render: function ( data, type, row ) 
				{
					 if(data.enddate !="" && data.etime !="")
					{
						var minutes;
						stt = new Date("January 01, 1970 " + data.stime);
						sttm = stt.getMinutes();
						stth = stt.getHours();
						endt = new Date("January 01, 1970 " + data.etime);
						endtm = endt.getMinutes();
						endth = endt.getHours();
						var h=(endth-stth)*60;
						var m=endtm-sttm;
						if(m<0)
						{
							minutes=h+(m);
						}
						else
						{
							minutes=h+m;
						}
						var h = Math.floor(minutes / 60);
						  var m = minutes % 60;
						  var format_hr="hr";
						  if(h=="")
						  {
							  format_hr="min"
						  }
						  h = h < 10 ? '0' + h : h;
						  m = m < 10 ? '0' + m : m; 
						  
						  return h + ':' + m +" "+format_hr;
					}
					return '';
				}	
			},
			
			{
				data: "projectname", 
				"visible": false
			},
			{ 
				data: null, 
				render: function ( data, type, row ) 
				{
					
					if(data.contactid==contactId)
					{
						action='<div class="dropdown for-addnew btn-action" style="cursor: pointer;">'+
									'<span data-toggle="dropdown" aria-haspopup="true"  '+
										'aria-expanded="false" title="Ticket Action"> <i '+
										'class="fa fa-ellipsis-v" aria-hidden="true"></i>'+
									'</span> '+
									'<div class="add-menu dropdown-menu fz-14">'+
										'<a href="javascript:void(0);" class="nav-link edit" title="Edit" data-id="'+data.DT_RowId+'"><span class="ti-pencil mr-2"></span>Edit</a> <a href="javascript:void(0);" class="nav-link delete" title="Remove" data-id="'+data.DT_RowId+'"><span class="ti-trash mr-2"></span>Delete</a>'+
									'</div>'+
								'</div>';
					}
					else{
						action='';
					}
					 
					return action+'<input type="hidden" name="time_Project" id="time_Project" value="'+data.project_idfk+'">'+
							'<input type="hidden" name="time_ticket" id="time_ticket" value="'+data.ticket_idfk+'">'+
							'<input type="hidden" name="time_description" id="time_description" value="'+data.description+'">'+
							'<input type="hidden" name="time_date" id="time_date" value="'+data.startdate+'">'+
							'<input type="hidden" name="time_sTime" id="time_sTime" value="'+data.stime+'">'+
							'<input type="hidden" name="time_eTime" id="time_eTime" value="'+data.etime+'">'+
							'<input type="hidden" name="time_eTime" id="time_id" value="'+data.DT_RowId+'">';
				}	
			}
		],
		"drawCallback": function() {
			ellipse();
			$('[data-toggle="tooltip"]').tooltip();
		}	
	});	
	// Add event listener for opening and closing details
	$('#timetable tbody').on('click', 'td.details-control', function () {
		var tr = $(this).closest('tr');
		var row = oTable.row( tr );
		if ( row.child.isShown() ) {
			row.child.hide();
			tr.removeClass('shown');
		}
		else {
			row.child( format(row.data()), "bgcol" ).show();
			tr.addClass('shown');
		}
	} );
	// Edit operation
	var timeId;
	$('#timetable tbody').on( 'click', '.edit', function () {
		$row = $(this).closest('tr');
		timeId = oTable.row( $row ).id();
		var time_Project = $('td', $row).eq(5).find("#time_Project").val();
		var time_ticket= $('td', $row).eq(5).find("#time_ticket").val();
		var time_description = $('td', $row).eq(5).find("#time_description").val();
		var time_date= $('td', $row).eq(5).find("#time_date").val();
		var time_sTime = $('td', $row).eq(5).find("#time_sTime").val();
		var  time_eTime= $('td', $row).eq(5).find("#time_eTime").val();
		
		$('.modal-container').load(const_url+"/home/time/EditTime",function(result) {
			$('#edittime-details').modal({show : true});
			
			
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
						$("#editTime_project").append('<option  value="' + entry.DT_RowId + '">' + entry.projectname +'</option>');
					});
						$('#editTime_project').val(time_Project).trigger('change');
					
		
					
				},
				error: function( jqXhr, textStatus, errorThrown ){
					$(".loading-fa").html("");
					alert( 'ERROR '+errorThrown );
				}
			});	
			
			$("#editTime_ticket").empty();
			
			$.ajax({
				url : const_url+"/TimeService/Ticketlist/"+time_Project,
				type : 'GET',
				contentType : 'application/json',
				success : function(data,textStatus,jQxhr) {
					$.each(data,function(key,entry) {
						$("#editTime_ticket").append('<option  value="' + entry.DT_RowId + '">' + entry.tickettitle +'</option>');
					});
					$("#editTime_ticket").val(time_ticket).trigger('change');
				},
				error: function( jqXhr, textStatus, errorThrown ){
					$(".loading-fa").html("");
					alert( 'ERROR '+errorThrown );
				}
			});	
			$(".selectinput").select2({
				width: 'auto',
				placeholder: "Select",
			});
			
			
			$("#editTime_desc").val(time_description);
			var start_date=new Date(time_date);
			start_date.setDate(start_date.getDate()-3);
			$( "#editTime_Date" ).datepicker({ 
				startDate: start_date,	
				endDate: time_date,
				autoclose: true
			});
			$( "#editTime_Date" ).val(time_date);
			$("#editTime_From").val(time_sTime);
			$("#editTime_To").val(time_eTime);
			$.timepickercal("editTime_From", "editTime_To");
		});
	});
	
	$(document).on( 'change', '#editTime_project', function () {
		$("#editTime_ticket").empty();
		$.ajax({
			url : const_url+"/TimeService/Ticketlist/"+this.value,
			type : 'GET',
			contentType : 'application/json',
			success : function(data,textStatus,jQxhr) {
				$.each(data,function(key,entry) {
					$("#editTime_ticket").append('<option  value="' + entry.DT_RowId + '">' + entry.tickettitle +'</option>');
				});
			},
			error: function( jqXhr, textStatus, errorThrown ){
				$(".loading-fa").html("");
				alert( 'ERROR '+errorThrown );
			}
		});	
	});	
	//update new time entry
	$(document).on( 'click', '#editTime_submit', function () {
		var time_validation=true;
		var newTime_Date = $("#editTime_Date").val();
		
		var newTime_From = $("#editTime_From").val();
		var newTime_To = $("#editTime_To").val();
		var newTime_endDate;
			var d = new Date();
			var month = d.getMonth()+1;
			var day = d.getDate();
			newTime_endDate = 
				(month<10 ? '0' : '') + month + '/' +
				(day<10 ? '0' : '') + day  + '/' +
				d.getFullYear() ;
			if(newTime_Date =="")
			{
				time_validation=false;
				$("#timeDate_Error").text("Date field required");
				setTimeout(function() { $("#timeDate_Error").text(""); }, 5000);
			}
			if(newTime_From =="" && newTime_To =="")
			{
				time_validation=false;
				$("#Time_Error").text("Time field required");
				setTimeout(function() { $("#Time_Error").text(""); }, 5000);
			}
			else if(newTime_From =="" )
			{
				time_validation=false;
				$("#Time_Error").text("Start Time field required");
				setTimeout(function() { $("#Time_Error").text(""); }, 5000);
			}
			else if(newTime_To =="" )
			{
				time_validation=false;
				$("#Time_Error").text("End Time field required");
				setTimeout(function() { $("#Time_Error").text(""); }, 5000);
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
					setTimeout(function() { $("#toTime_Error").text(""); }, 5000);
					time_validation=false;
				}
				
			}
		if ($('#editTimeEntry_form').valid() && time_validation) {
			$('#editTime_submit').prop('disabled', true);
			var newTime_project = $("#editTime_project").val();
			var newTime_ticket = $("#editTime_ticket").val();
			var newTime_desc = $("#editTime_desc").val();
			var timeCounter= "";
			var dataJSON = JSON.stringify(
			{
				"DT_RowId":timeId,
				"ticket_idfk": newTime_ticket,
				"project_idfk": newTime_project,
				"description": newTime_desc,
				"startdate": newTime_Date,
				"enddate":newTime_endDate,
				"starttime": newTime_From,
				"endtime": newTime_To,
				"timecount": ""+timeCounter
			});
			console.log("Time data--->"+ dataJSON);
			$.ajax({
				url : const_url+"/TimeService/updatetime",
				type : 'PUT',
				contentType : 'application/json',
				data : dataJSON,
				beforeSend: function(){
					$(".time-loading-fa").html("<i class='fa fa-spinner fa-spin'></i>");
				},
				success : function(data,textStatus,jQxhr) {
					oTable.ajax.reload();	
					$('#editTime_submit').prop('disabled', false);
					$('#edittime-details').modal('hide');		
				$.snackbar({content: "Time entry updated successfully.", timeout: 5000});					
				},
				error: function( jqXhr, textStatus, errorThrown ){
					$('#editTime_submit').prop('disabled', false);
							alert( 'Error' );
				}
			}); 
		}
	});
	$('#timetable tbody').on( 'click', '.delete', function () {
		$row = $(this).closest('tr');
		var timeId = oTable.row( $row ).id();
		var tableRow = oTable.row($(this).parents('tr'));
		var delete_url = const_url+"/TimeService/delete/"+timeId;
		$('.modal-container').load(const_url+"/home/DeleteRecord",function(result) {
			$('#deleterecord-popup').modal({show : true});
			$('#btnDeleteDetails').on( 'click', function (e) {
				$('#btnDeleteDetails').prop('disabled', true);
				$.ajax({
					url : delete_url,
					type:"DELETE",
					beforeSend: function(){
						$(".loading-fa").html("<i class='fa fa-spinner fa-spin'></i>");
					},
					success : function(data,textStatus,jQxhr) {
						oTable.row( tableRow ).remove().draw(false);	
						$('#btnDeleteDetails').prop('disabled', false);
						 $('#deleterecord-popup').modal('hide');
						$.snackbar({content: "Time entry deleted successfully.", timeout: 5000});								 
					},
					error: function( jqXhr, textStatus, errorThrown ){
						$('#btnDeleteDetails').prop('disabled', false);
						alert( 'ERROR '+errorThrown );
					}
				});				
			});				
		});	
	} );
	
	
	
});