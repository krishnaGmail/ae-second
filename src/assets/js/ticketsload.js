jQuery(document).ready(function($){
	var roleId=$(".roleId").val();
	var contactId=$(".contactId").val();
	var myDropzone;
	 var wrapperThis;
	var ticketDataUrl , projectDataUrl, ticketListUrl;
	
	
	if(roleId==1011)
	{
		 ticketDataUrl="/TicketService/ticketlist/";
		  projectDataUrl="/ProjectService/projectname/";
		  ticketListUrl="/TicketService/ticketlistforfilter/";
	}
	else{
		ticketDataUrl="/TicketService/ticketuserlist/";
		projectDataUrl="/ProjectService/projectnametoaddticketortime/";
		ticketListUrl="/TicketService/ticketuserlistforfilter/";
	}
	var ticketAccess=[];
	
	var tktEdit,tktDelete,tktWrite;
	function permission(){
		$.ajax({
			url : const_url+"/ActiveRoleService/editdata/"+roleId+"/"+contactId+"/",
			type : 'GET',
			contentType : 'application/json',
			success : function(data,textStatus,jQxhr) {
				
				$.each(data,function(key,entry) {
					if(entry.eledescription=="Ticket")
					{
						ticketAccess.push(entry.actdescription);
					}
					
				});
			
				tktEdit=$.inArray( "Edit", ticketAccess );
				tktDelete=$.inArray( "Delete", ticketAccess );
				tktWrite=$.inArray( "Write", ticketAccess );
				if(tktWrite==-1)
				{
					$('#btnAddProjectPopup').hide();
					$('#btnAddProjectPopup').parent().find("a").hide();
					$('#btnAddProjectPopup').parent().css("border-bottom","0px");
				}
			},
			error: function( jqXhr, textStatus, errorThrown ){
				alert( 'ERROR '+errorThrown );
			}
		});
	}	
	permission();
	
	var ticketid;
	var projectid;
	var contactid;
	function ellipse(){
		var divs = $(".wrapellipse");
		var showChar = 20;
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
	/* Formatting function for row details - modify as you need */
	function format ( d ) {
		var decs;

        if(typeof d.ticketdesc === "undefined")
        {
            desc=" ";
        }
        else
        {
            desc=d.ticketdesc;
        }

		return '<div class="row">'+
		'<div class="col-sm-6 mb-2"><span class="fw-b">Project name: </span>'+d.projectname+'</div>'+		
		'<div class="col-sm-6 mb-2"><span class="fw-b">Owner : </span>'+d.owner+'</div>'+		
		'<div class="col-sm-6 mb-2"><span class="fw-b">Planned Start Date: </span>'+d.planstartdate+'</div>'+
		'<div class="col-sm-6 mb-2"><span class="fw-b">Planned End Date: </span>'+d.planenddate+'</div>'+
		'<div class="col-sm-6 mb-2"><span class="fw-b">Actual Start Date: </span>'+d.actstartdate+'</div>'+
		'<div class="col-sm-6 mb-2"><span class="fw-b">Actual End Date: </span>'+d.actenddate+'</div>'+

		'<div class="col-sm-12 mb-2"><p class="break-out"><span class="fw-b">Description: </span>'+desc+'</p></div>'+

		'</div>';
	}
	var oTable;
	var filter_data;
	function ticket_dataTable(ticketDataUrl,filter_data){
		 oTable=jQuery('#tickettable').DataTable( {
			"processing": true,
			
			"language": 
			{          
				"sInfo": "<span style='color: #99abb4;font-style: italic;'>Showing _START_ to _END_ of recent _TOTAL_ entries  </span>",
				"processing": "<i class='fa fa-spinner fa-spin fa-2x'></i>",
				"loadingRecords": "<i class='fa fa-spinner fa-spin fa-2x'></i>",
			},
			"ajax": {
				"url":  const_url+ticketDataUrl,
				"type": "post",
				"contentType":"application/json",
				data: function ( d ) {
					return filter_data;
				  }
			},
		
			"iDisplayLength": 10,
			"bLengthMenu": [[5, 10, 25, 50, -1], [5, 10, 25, 50, "All"]],
			"bFilter": false, //to show search
			"deferRender": true,		
			"columns": [
				{
					"className":      'details-control',
					"orderable":      false,
					"data":           null,
					"defaultContent": ''
				},
				{ data: null, 
					render: function ( data, type, row ) {
						return "<span style='color: #007bff;'>#"+data.DT_RowId+"</span> - <span class='wrapellipse' title='"+data.tickettitle+"'data-toggle='tooltip'>"+data.tickettitle+"</span>";
						
					}
				},			
				{ data: "priority",
				  "defaultContent": ''
				},
				{ 
					data: null, 
					render: function ( data, type, row ) {
						if(data.status == "Active"){
							return '<span class="badge badge-success font-1xl">'+data.status+'</span>';
						}else if(data.status == "On hold"){
							return '<span class="badge badge-danger font-1xl">'+data.status+'</span>';
						}else if(data.status == "In Progress"){
							return '<span class="badge badge-info font-1xl">'+data.status+'</span>';
						}else if(data.status == "Archived"){
							return '<span class="badge badge-secondary font-1xl">'+data.status+'</span>';
						}else if(data.status == "Open"){
							return '<span class="badge badge-warning font-1xl">'+data.status+'</span>';
						}else if(data.status == "Close"){
							return '<span class="badge badge-dark font-1xl">'+data.status+'</span>';
						}else {
							return '';
						}
					}
				},
				{ data: null, 
					render: function ( data, type, row ) {
						var datePercentage;
					if(data.planenddate!="")
					{
						// get and format the today date	
						var today = new Date();
						var dd = today.getDate();
						var mm = today.getMonth() + 1; //January is 0!

						var yyyy = today.getFullYear();
						if (dd < 10) {
						  dd = '0' + dd;
						} 
						if (mm < 10) {
						  mm = '0' + mm;
						} 
						var todayDate = mm + '/' + dd + '/' + yyyy;	
						var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
						//var firstDate = new Date(data.planstartdate);
						var secondDate = new Date(data.planenddate);
						var today = new Date(todayDate);
						if(secondDate>=today)
						{
							//var diffDays1 = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime())/(oneDay)));
							var diffDays2 = Math.round(Math.abs((secondDate.getTime() - today.getTime())/(oneDay)));
							console.log(Math.round(Math.abs((secondDate.getTime() - today.getTime())/(oneDay))));
							datePercentage= (Math.round(100  / (diffDays2+1)));
						}
						else
						{
							datePercentage="Over Due";
						}	
					}
					else{					
						datePercentage="Not set";
					}
						//return datePercentage;
						if(datePercentage>=0 && datePercentage<25)  
						{
							return '<div class="ticket-progress">'+
									'<div class="progress mb-2 ">'+
										'<div class="progress-bar bg-warning progress-bar-striped progress-bar-animated" role="progressbar" style="width:'+datePercentage+'%;text-align: right;    padding-left: 15px;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">'+
											datePercentage+'%'+										
										'</div>'+
										
									'</div>'+
									'<a  href="javascript:void(0);"  title="PSD - '+data.planstartdate+'" data-toggle="tooltip" class="dot-left"></a>'+
									'<a  href="javascript:void(0);"  title="PED  - '+data.planenddate+'" data-toggle="tooltip"class="dot-right"></a>'+
								'</div>';
						}
						else if(datePercentage>=25 && datePercentage<50) 						
						{
							return '<div class="ticket-progress">'+
									'<div class="progress mb-2 ">'+
										'<div class="progress-bar bg-success progress-bar-striped progress-bar-animated" role="progressbar" style="width:'+datePercentage+'%;text-align: right;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">'+
											datePercentage+'%'+										
										'</div>'+									
									'</div>'+
									'<a  href="javascript:void(0);"  title="PSD - '+data.planstartdate+'" data-toggle="tooltip" class="dot-left"></a>'+
									'<a  href="javascript:void(0);"  title="PED  - '+data.planenddate+'" data-toggle="tooltip"class="dot-right"></a>'+
								'</div>';
						}
						else if(datePercentage>=50 && datePercentage<75)  
						{
							return '<div class="ticket-progress">'+
									'<div class="progress mb-2 ">'+
										'<div class="progress-bar .bg-info progress-bar-striped progress-bar-animated" role="progressbar" style="width:'+datePercentage+'%"; aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">'+
											datePercentage+'%'+										
										'</div>'+									
									'</div>'+
									'<a  href="javascript:void(0);"  title="PSD - '+data.planstartdate+'" data-toggle="tooltip" class="dot-left"></a>'+
									'<a  href="javascript:void(0);"  title="PED  - '+data.planenddate+'" data-toggle="tooltip"class="dot-right"></a>'+
								'</div>';
						}
						else if(datePercentage>=75 && datePercentage<100)  
						{
							return '<div class="ticket-progress">'+
									'<div class="progress mb-2 ">'+
										'<div class="progress-bar bg-danger progress-bar-striped progress-bar-animated" role="progressbar" style="width:'+datePercentage+'%"; aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">'+
											datePercentage+'%'+									
										'</div>'+									
									'</div>'+
									'<a  href="javascript:void(0);"  title="PSD - '+data.planstartdate+'" data-toggle="tooltip" class="dot-left"></a>'+
									'<a  href="javascript:void(0);"  title="PED  - '+data.planenddate+'" data-toggle="tooltip"class="dot-right"></a>'+
								'</div>';
						}
						else if(datePercentage==100)  
						{
							return '<div class="ticket-progress">'+
									'<div class="progress mb-2 ">'+
										'<div class="progress-bar  bg-danger progress-bar-striped progress-bar-animated" role="progressbar" style="width:'+datePercentage+'%;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">'+
											datePercentage+'%'+										
										'</div>'+									
									'</div>'+
									'<a  href="javascript:void(0);"  title="PSD - '+data.planstartdate+'" data-toggle="tooltip" class="dot-left"></a>'+
									'<a  href="javascript:void(0);"  title="PED  - '+data.planenddate+'" data-toggle="tooltip"class="dot-right"></a>'+
								'</div>';
						}
						else if(datePercentage=="Over Due")  
						{
							return '<div class="ticket-progress">'+
									'<div class="progress mb-2 ">'+
										'<div class="progress-bar  bg-danger progress-bar-striped progress-bar-animated" role="progressbar" style="width:100%;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">'+
											datePercentage+										
										'</div>'+									
									'</div>'+
									'<a  href="javascript:void(0);"  title="PSD - '+data.planstartdate+'" data-toggle="tooltip" class="dot-left"></a>'+
									'<a  href="javascript:void(0);"  title="PED  - '+data.planenddate+'" data-toggle="tooltip"class="dot-right"></a>'+
								'</div>';
						}
						else if(datePercentage==0)  
						{
							return '<div class="ticket-progress">'+
									'<div class="progress mb-2 ">'+
										'<div class="progress-bar   progress-bar-striped progress-bar-animated" role="progressbar" style="width:'+datePercentage+'%;margin-left: 10px;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">'+
											datePercentage+'%'+										
										'</div>'+									
									'</div>'+
									'<a  href="javascript:void(0);"  title="PSD - '+data.planstartdate+'" data-toggle="tooltip" class="dot-left"></a>'+
									'<a  href="javascript:void(0);"  title="PED  - '+data.planenddate+'" data-toggle="tooltip"class="dot-right"></a>'+
								'</div>';
						}
						else {						
							return '<span style="color: #d3d3d3;font-style: italic;">Not Set</span>';
						}
					}	
				},	
				{
					data: "owner", 
					"visible": false
				},		
				{
					data: "projectname", 
					"visible": false
				},			
				{
					data: null, 
					render: function ( data, type, row ) {
						var environment,ticketdesc;
						if(typeof data.environment !== 'undefined')
						{
							environment=data.environment;
						}
						else{
							environment="";
						}
						if(typeof data.ticketdesc !== 'undefined')
						{
							ticketdesc=data.ticketdesc;
						}
						else{
							ticketdesc="";
						}
						
						var action;
												
					if(tktEdit==-1 && tktDelete==-1)
						{
							action=' ';						
						}
						else if(tktEdit!=-1 && tktDelete!=-1)
						{
							action='<div class="dropdown for-addnew btn-action " style="cursor: pointer;">'+
										'<span data-toggle="dropdown" aria-haspopup="true"  '+
											'aria-expanded="false" title="Ticket Action"> <i '+
											'class="fa fa-ellipsis-v" aria-hidden="true"></i>'+
										'</span> '+
										'<div class="add-menu dropdown-menu fz-14">'+
											'<a href="javascript:void(0);" class="nav-link edit" title="Edit" data-id="'+data.DT_RowId+'"><span class="ti-pencil mr-2"></span>Edit</a><a href="javascript:void(0);" class=" nav-link delete" title="Remove" data-id="'+data.DT_RowId+'"><span class="ti-trash mr-2"></span>Delete</a>'+
										'</div>'+
									'</div>';
						}
						else if(tktDelete!=-1)
						{
							action='<div class="dropdown for-addnew btn-action text-center" style="cursor: pointer;">'+
										'<span data-toggle="dropdown" aria-haspopup="true"  '+
											'aria-expanded="false" title="Ticket Action"> <i '+
											'class="fa fa-ellipsis-v" aria-hidden="true"></i>'+
										'</span> '+
										'<div class="add-menu dropdown-menu fz-14">'+
											'<a href="javascript:void(0);" class="nav-link delete" title="Remove" data-id="'+data.DT_RowId+'"><span class="ti-trash mr-2"></span>Delete</a>'+
										'</div>'+
									'</div>';
						}
						else if(tktEdit!=-1)
						{
							action='<div class="dropdown for-addnew btn-action text-center" style="cursor: pointer;">'+
										'<span data-toggle="dropdown" aria-haspopup="true"  '+
											'aria-expanded="false" title="Ticket Action"> <i '+
											'class="fa fa-ellipsis-v" aria-hidden="true"></i>'+
										'</span> '+
										'<div class="add-menu dropdown-menu fz-14">'+
											'<a href="javascript:void(0);" class="nav-link edit" title="Edit" data-id="'+data.DT_RowId+'"><span class="ti-pencil mr-2"></span>Edit</a>'+
										'</div>'+
									'</div>';
						} 					
						return action+'<input type="hidden" name="showtxtTicketTitle" id="showtxtTicketTitle" value="'+data.tickettitle+'">'+
								'<input type="hidden" name="txtProjectSelect" id="showtxtTicketProjectSelect" value="'+data.project_idfk+'">'+
								'<input type="hidden" name="contactid" id="contactId" value="'+data.contact_idfk+'">'+
								'<input type="hidden" name="txtPriority" id="showtxtTicketPriority" value="'+data.priority+'">'+
								'<input type="hidden" name="txtCategory" id="showtxtTicketCategory" value="'+data.category_idfk+'">'+
								'<input type="hidden" name="txtStatus" id="showtxtTicketStatus" value="'+data.statuscode+'">'+
								'<input type="hidden" name="txtTicketDescription" id="showtxtTicketDescription" value="'+ticketdesc+'">'+
								'<input type="hidden" name="txtEnvironment" id="showtxtTicketEnvironment" value="'+environment+'">'+
								'<input type="hidden" name="txtPlannedStartDate" id="showtxtTicketPlannedStartDate" value="'+data.planstartdate+'">'+
								'<input type="hidden" name="txtPlannedDueDate" id="showtxtTicketPlannedDueDate" value="'+data.planenddate+'">'+
								'<input type="hidden" name="txtActualStartDate" id="showtxtTicketActualStartDate" value="'+data.actstartdate+'">'+
								'<input type="hidden" name="txtActualEndDate" id="showtxtTicketActualEndDate" value="'+data.actenddate+'">';
					}
				}
			],
			"drawCallback": function() {  
				ellipse();
				$('[data-toggle="tooltip"]').tooltip();
			  }  
		});
	}
	ticket_dataTable(ticketDataUrl,filter_data);
	// Add event listener for opening and closing details
	$('#tickettable tbody').on('click', 'td.details-control', function () {
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
	$('#tickettable tbody').on( 'click', '.edit', function () {
		$row = $(this).closest('tr');
		ticketid = oTable.row( $row ).id();
		var title = $('td', $row).eq(5).find("#showtxtTicketTitle").val();
		projectid= $('td', $row).eq(5).find("#showtxtTicketProjectSelect").val();
		contactid = $('td', $row).eq(5).find("#contactId").val();
		var priority = $('td', $row).eq(5).find("#showtxtTicketPriority").val();
		var category = $('td', $row).eq(5).find("#showtxtTicketCategory").val();
		var  ticket_status= $('td', $row).eq(5).find("#showtxtTicketStatus").val();
		var description = $('td', $row).eq(5).find("#showtxtTicketDescription").val();
		var environment = $('td', $row).eq(5).find("#showtxtTicketEnvironment").val();
		var psdate = $('td', $row).eq(5).find("#showtxtTicketPlannedStartDate").val();
		var pedate = $('td', $row).eq(5).find("#showtxtTicketPlannedDueDate").val();
		var asdate = $('td', $row).eq(5).find("#showtxtTicketActualStartDate").val();
		var aedate = $('td', $row).eq(5).find("#showtxtTicketActualEndDate").val();
		
		$('.modal-container').load(const_url+"/home/tickets/EditTicket",function(result) {
			$('#editticket-details').modal({show : true});
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
						$("#txtEditProjectSelect").append('<option  value="' + entry.DT_RowId + '">' + entry.projectname +'</option>');
					});
					$("#txtEditProjectSelect").val(projectid).trigger('change');
					
				},
				error: function( jqXhr, textStatus, errorThrown ){
					$(".loading-fa").html("");
					alert( 'ERROR '+errorThrown );
				}
			});	
			$("#editAssigneeError").text("");
			
			$("#txtEditTicketTitle").val(title);
			
			$("#txtEditPriority").val(priority);
			$("#txtEditCategory").val(category);
			$("#txtEditStatus").val(ticket_status);
			$("#txtEditTicketDescription").val(description);
			$("#txtEditEnvironment").val(environment);
			var filepath =$("#filepath").val();
			
			$(".selectinput").select2({
				width: 'auto',
				placeholder: "Select",
			});
			$(".rasci").select2({
						
				closeOnSelect: false,
				placeholder: "Select"	
			});
			$(".rasci").on("select2:open", function (e) { 
				$(".select2-results").addClass("rasci-block ");
			});
			function iformat(icon) {		
				var originalOption = icon.element;
				return $('<span><i class="fa ' + $(originalOption).data('icon') + '"></i> ' + icon.text + '</span>');
			}
			$('.icons_select2').select2({
				placeholder: "Select",
				width: "100%",
				templateSelection: iformat,
				templateResult: iformat,				
				allowHtml: true,
				dropdownParent: $("#editticket-details")
			});
			$('[data-toggle="tooltip"]').tooltip();		
			$("#txtEditProjectSelect").select2({
				placeholder: "Select a project"
			});
			
				$("#txtEditCategory").select2({
					placeholder: "Select ",
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
														
														if ($('#txtEditCategory').find("option[value='" + catId + "']").length) {
															$('#txtEditCategory').find("option[value='" + catId + "']").remove();
															$('#txtEditCategory').select2("close");
															$('#txtEditCategory').select2("open");
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
										else
										{
											if ($('#txtEditCategory').find("option[value='" + catId + "']").length) {
												$('#txtEditCategory').find("option[value='" + catId + "']").remove();
												$('#txtEditCategory').select2("close");
												$('#txtEditCategory').select2("open");
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
						$('#txtEditCategory').val(null).trigger('change');
						$('#addticketcategory-popup').modal({show : true});	
						//$("#addTicketCat").click(function(e){
							$("#addTicketCat").unbind().click(function(event) {
							var addCatflag=true;
							var ticketCat=$("#txtAddTicketCategory").val();
							var dataJSON = JSON.stringify(
							{
								"description":ticketCat
							});
							// Checking Duplicate category list 
							$("#txtEditCategory option").each(function(i){
								if($(this).text()==ticketCat)
								{
									alert("Category already exits");
									addCatflag=false;
								}
							});
							if(addCatflag)
							{
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
											$("#txtEditCategory").append('<option  value="' + entry.DT_RowId + '">' + entry.description +'</option>');
										});
										$("#txtEditCategory").val(data[0].DT_RowId).trigger('change');
										$(".loading-fa").html("");
										$('#addticketcategory-popup').modal('hide');
									},
									error: function( jqXhr, textStatus, errorThrown ){
										$(".loading-fa").html("");
										alert( 'ERROR '+errorThrown );
									}
								});
							}	
						});
					}
				 });
				// user click  cancel button of addNew category
				$("#cancelTicketCat").click(function(){
					$('#txtEditCategory').val(null).trigger('change');
				});
				
			$.datepickercal("txtEditPlannedStartDate", "txtEditPlannedDueDate", "txtEditActualStartDate", "txtEditActualEndDate");
			//Open datepicker on icon click
			$('.open-datepicker1').click(function(event){
				event.preventDefault();
				$('#txtEditPlannedStartDate').focus();
			});
			$("#txtEditPlannedStartDate").datepicker("setDate", psdate );
			$("#txtEditPlannedDueDate").datepicker("setDate", pedate);
			$("#txtEditActualStartDate").datepicker("setDate", asdate);
			$("#txtEditActualEndDate").datepicker("setDate", aedate);
			
			$("#txtEditPlannedDueDate").datepicker('setStartDate', new Date(psdate));
			$("#txtEditActualEndDate").datepicker('setStartDate', new Date(asdate));
			
			$.selectdata("txtEditPrimaryAssignee","");
			$.selectdata("txtEditSecondaryAssignee","");
			$.selectdata("txtEditTertiaryAssignee","");
			//$.selectdata("txtEditAuxiliaryAssignee","");

			$.selectAssigneeMemRASCI("txtEditPrimaryRASCI","");
			$.selectAssigneeMemRASCI("txtEditSecondaryRASCI","");
			$.selectAssigneeMemRASCI("txtEditTertiaryRASCI","");
			$.selectAssigneeMemRASCI("txtEditAuxiliaryRASCI","");
			
			var fetchmem_url = const_url+"/TicketService/editdata/"+ticketid;
			//Selecting assignee and  RASCI
			var auxillaryMem = [];
			$.ajax({
				url : fetchmem_url,
				type : "GET",
				dataType: "json",
				success : function(data,textStatus,jQxhr) {
					
					$.each(data,function(key,entry) {
						if(entry.assigneepriority=="primary")
						{
							arrRASCI=entry.assigneerasci.split(',');
							$.selectdata("txtEditPrimaryAssignee",entry.email);
							$.selectAssigneeMemRASCI("txtEditPrimaryRASCI",arrRASCI);
						}
						else if(entry.assigneepriority=="secondary")
						{
							arrRASCI=entry.assigneerasci.split(',');
							$.selectdata("txtEditSecondaryAssignee",entry.email);
							$.selectAssigneeMemRASCI("txtEditSecondaryRASCI",arrRASCI);
						}
						else if(entry.assigneepriority=="tertiary")
						{
							arrRASCI=entry.assigneerasci.split(',');
							$.selectdata("txtEditTertiaryAssignee",entry.email);
							$.selectAssigneeMemRASCI("txtEditTertiaryRASCI",arrRASCI);
						}
						else if(entry.assigneepriority=="auxillary")
						{
							console.log("Auxillary Mem-->"+entry.email);
							arrRASCI=entry.assigneerasci.split(',');
							auxillaryMem.push(entry.email);							
							$.selectAssigneeMemRASCI("txtEditAuxiliaryRASCI",arrRASCI);
						}
						
					});
					console.log("auxillaryMem--->"+auxillaryMem);
					$.selectdata("txtEditAuxiliaryAssignee",auxillaryMem);
				},
				error: function( jqXhr, textStatus, errorThrown ){
					alert( 'ERROR '+errorThrown );
				}
			});
			 
			var fDT_RowId;
			var fproject_idfk;
			var fcontact_idfk;
			$.fn.capitalize = function() {
				$.each(this, function() {
				this.value = this.value.replace(/\b[a-z]/gi, function($s) {
				return $s.toUpperCase();
						});
				 });
			}
			$('#txtInviteNewMemberName').on('keypress', function(e) {
				var arr = $(this).val().split(' ');
				if(arr.length>2)
				{
					e.preventDefault();
				}
			});
	             //usage
			 $('#txtInviteNewMemberName').on('keyup', function(e) {
				$(this).capitalize();
			 });
			// shows the existing files
			$.ajax({
				url : const_url+"/DocumentService/editdoclist/"+ticketid,
				type : 'GET',
				contentType : 'application/json',
				
				success : function(data,textStatus,jQxhr) {
					$("#table-file").empty();
					
						if(data.length>0)
						{
							$.each(data,function(key,entry) {
								
								$("#table-file").append('<tr>'+
									
									  
								  '<td>'+entry.documentname+'</td>'+
								  '<td style="width:150px;text-align:center"><button id="'+entry.document_idfk+'" type="button" class="btn btn-default btn-outline-secondary fileDelete" title="Remove file"><i class="fa fa-trash" aria-hidden="true"></i></button><a  download type="button" class=" btn btn-default btn-outline-secondary download-file-href"  href="'+entry.documenturl+'" title="Download file"><i class="fa fa-download" aria-hidden="true"></i></button></td>'+
								  
									'</tr>'
								);
							});
						}
				},
				error: function( jqXhr, textStatus, errorThrown )
					{
					alert( 'ERROR '+errorThrown );
				}
			});		
			
			Dropzone.autoDiscover = false;
        
			myDropzone = new Dropzone("#my-dropzone",{
				url: const_url+'/uploadMultipleFile',
				autoProcessQueue: false,
				parallelUploads:5,
				 maxFiles: 5,
				maxFilesize: 1,
				uploadMultiple: true,
           
				init: function () {

					 wrapperThis = this;

					this.on("addedfile", function (file) {

						// Create the remove button
						var removeButton = Dropzone.createElement("<a class='file-delete'> <span><i class='fa fa-trash' ></i></span>Remove File</a>");

						// Listen to the click event
						removeButton.addEventListener("click", function (e) {
							// Make sure the button click doesn't submit the form:
							e.preventDefault();
							e.stopPropagation();

							// Remove the file preview.
							wrapperThis.removeFile(file);
							// If you want to the delete the file on the server as well,
							// you can do the AJAX request here.
						});

						// Add the button to the file preview element.
						file.previewElement.appendChild(removeButton);
					});

					
				}
			});
			
		});
	});
	//Delete file 
	$(document).on('click','.fileDelete',function()
	{
		$('#deletefile-popup').modal({show : true});
		var fileId=$(this).attr('id');
		console.log(fileId);
		$(document).on('click','#btnDeleteFile',function()
		{
			$.ajax({
				url : const_url+"/DocumentService/delete/"+fileId,
				type : 'DELETE',
				beforeSend: function(){
					$(".loading-fa").html("<i class='fa fa-spinner fa-spin'></i>");
				},
				success : function(data,textStatus,jQxhr) {
					console.log("delete file");
					
					$("#"+fileId).parent().parent().fadeOut();	
					$(".loading-fa").html("");
					$('#deletefile-popup').modal('hide');	
					
								
									
				},
										
				error: function( jqXhr, textStatus, errorThrown )
					{
					alert( 'ERROR '+errorThrown );
				}
			});
		});
	});
	$(document).on('click','#updateTicketSubmit',function(e){
		e.preventDefault();
		$('form').each(function() {   
			$(this).validate({
			ignore: "",
			errorClass : "input-error",
			errorElement : 'div',
			errorPlacement: function (error, element) {
				
				if (element.attr("type") == "checkbox") {
					error.insertBefore("ul.list-group");
				}else if(element.next('.select2-container').length) {
					error.insertAfter(element.next('.select2-container'));
					//$(".select2-selection").addClass("input-error");							
				}else{
					error.insertAfter(element);
				}
			},
			
			invalidHandler: function(e, validator){
				if(validator.errorList.length){
					var errorArea=$(validator.errorList[0].element)[0].name;
					
					var tadId=$("[name="+errorArea+"]").closest(".tab-pane").attr('id');
					$('#tabs a[href="#'+tadId+'"]').tab('show');
				}
			}
			});
		});
		if ($('#editticket_form').valid()) 
		{
			var editTicketSubmit=true;
			var tickettitle = $("#txtEditTicketTitle").val();
			var project_idfk = $("#txtEditProjectSelect").val();
			var priority = $("#txtEditPriority").val();
			var category_idfk = $("#txtEditCategory").val();
			var statuscode = $("#txtEditStatus").val();
			var ticketdesc = $("#txtEditTicketDescription").val();
			var environment = $('#txtEditEnvironment').val();
			var planstartdate = $('#txtEditPlannedStartDate').val();
			var planenddate = $('#txtEditPlannedDueDate').val();
			var actstartdate = $('#txtEditActualStartDate').val();
			var actenddate = $('#txtEditActualEndDate').val();
			var passignee = $('#txtEditPrimaryAssignee').val();
			var primaryrasci = $('#txtEditPrimaryRASCI').val();
			var sassignee = $('#txtEditSecondaryAssignee').val();
			var secondaryrasci = $('#txtEditSecondaryRASCI').val();
			var tassignee = $('#txtEditTertiaryAssignee').val();
			var tertiaryrasci = $('#txtEditTertiaryRASCI').val();
			var aassignee = $('#txtEditAuxiliaryAssignee').val();
			var auxillaryrasci = $('#txtEditAuxiliaryRASCI').val();
			if(category_idfk === null || category_idfk == "" )
			{
				category_idfk=0;
			}
			if(aassignee === null )
			{
				aassignee="";
			}
			else if(aassignee)
			{
				aassignee=aassignee.toString();
			}
			if(primaryrasci === null )
			{
				primaryrasci="";
			}
			else if(primaryrasci)
			{
				primaryrasci=primaryrasci.toString();
			}
			if(secondaryrasci === null )
			{
				secondaryrasci="";
			}
			else if(secondaryrasci)
			{
				secondaryrasci=secondaryrasci.toString();
			}
			if(tertiaryrasci === null )
			{
				tertiaryrasci="";
			}
			else if(tertiaryrasci)
			{
				tertiaryrasci=tertiaryrasci.toString();
			}
			if(auxillaryrasci === null )
			{
				auxillaryrasci="";
			}
			else if(auxillaryrasci)
			{
				auxillaryrasci=auxillaryrasci.toString();
			}
			if( (passignee==sassignee || passignee==tassignee || aassignee.search(passignee)>-1) && (passignee!=""))
			{
				
				$('#tabs a[href="#assignees"]').tab('show');
				$("#editAssigneeError").text("Assignee duplicate occur");
				editTicketSubmit=false;
			}
			else if((sassignee==passignee || sassignee==tassignee || aassignee.search(sassignee)>-1) && (sassignee!=""))
			{
				
				$('#tabs a[href="#assignees"]').tab('show');
				$("#editAssigneeError").text("Assignee duplicate occur");
				editTicketSubmit=false;
			}
			else if((tassignee==passignee || tassignee==sassignee || aassignee.search(tassignee)>-1) && (tassignee!=""))
			{
				
				$('#tabs a[href="#assignees"]').tab('show');
				$("#editAssigneeError").text("Assignee duplicate occur");
				editTicketSubmit=false;
			}
			else if(aassignee!="")
			{ 
				if(aassignee.search(passignee)>-1 && (passignee!=""))
				{ 
				
					$('#tabslist a[href="#assignees"]').tab('show');
					$("#addAssigneeError").text("Assignee duplicate occur");
					addTicketSubmit=false;
					
				}
				else if(aassignee.search(sassignee)>-1 && (sassignee!=""))
				{ 
				
					$('#tabslist a[href="#assignees"]').tab('show');
					$("#addAssigneeError").text("Assignee duplicate occur");
					addTicketSubmit=false;
					
				}
				else if(aassignee.search(tassignee)>-1 && (tassignee!=""))
				{ 
				
					$('#tabslist a[href="#assignees"]').tab('show');
					$("#addAssigneeError").text("Assignee duplicate occur");
					addTicketSubmit=false;
					
				}
				
			}
			if( passignee=="" && primaryrasci!="")
			{
				
				$('#tabs a[href="#assignees"]').tab('show');
				$("#editAssigneeError").text("Primary Assignee is required");
				editTicketSubmit=false;
			}
			else if( sassignee=="" && secondaryrasci!="")
			{
				
				$('#tabs a[href="#assignees"]').tab('show');
				$("#editAssigneeError").text("Secondary Assignee is required");
				editTicketSubmit=false;
			}
			else if(tassignee=="" && tertiaryrasci!="")
			{
				
				$('#tabs a[href="#assignees"]').tab('show');
				$("#editAssigneeError").text("Tertiary Assignee is required");
				editTicketSubmit=false;
			}
			else if(aassignee=="" && auxillaryrasci!="")
			{
				
				$('#tabs a[href="#assignees"]').tab('show');
				$("#editAssigneeError").text("Auxiliary Assignee is required");
				editTicketSubmit=false;
			}
			var filesCount = myDropzone.getQueuedFiles().length;
			var dataJSON = JSON.stringify(
			{
				"DT_RowId":ticketid,
				"tickettitle" : tickettitle,
				"ticketdesc":ticketdesc,
				"actstartdate":actstartdate,
				"actenddate":actenddate,
				"planstartdate":planstartdate,
				"planenddate":planenddate,
				"priority":priority,
				"project_idfk":project_idfk,
				"category_idfk":category_idfk,
				"statuscode":statuscode,
				"environment": environment,
				"members":passignee+','+sassignee+','+tassignee+','+aassignee,
				"primaryrasci":primaryrasci,
				"secondaryrasci":secondaryrasci,
				"tertiaryrasci":tertiaryrasci,
				"auxillaryrasci":auxillaryrasci,
				"fileFlag":filesCount
			});
			
			if(editTicketSubmit)
			{
				$('#updateTicketSubmit').prop('disabled', true);
				 $.ajax({
					url : const_url+"/TicketService/updateticket",
					type : 'PUT',
					contentType : 'application/json',
					data : dataJSON,
					beforeSend: function(){
						$(".ticket-loading-fa").html("<i class='fa fa-spinner fa-spin'></i>");
					},
					success : function(data,textStatus,jQxhr) {
						
						
						
						if(filesCount>0)
						{
							
							
							wrapperThis.on('sending', function(file, xhr, formData){
								formData.append('DT_RowId',ticketid);
								formData.append('project_idfk',projectid);
								formData.append('contact_idfk',contactid);
								formData.append('editFile_flag',1);
								
							});
								
							wrapperThis.processQueue();
						}
						// Ticket Count
						$.ajax({
							url : const_url+"/TicketService/countdata/",
							type : 'GET',
							contentType : 'application/json',
							success : function(data,textStatus,jQxhr) {
								$.each(data,function(key,entry) {
									console.log(data);
									$(".count_tktopen").text(entry.users);
									$(".count_tktprog").text(entry.acitiveusers);
									$(".count_tkthold").text(entry.pendingusers);	
									$(".count_tktclose").text(entry.inactiviteusers);
								});
							},
							error: function( jqXhr, textStatus, errorThrown ){
								alert( 'ERROR '+errorThrown );
							}
						});
						$('#updateTicketSubmit').prop('disabled', false);
						$('#editticket-details').modal('hide');
						oTable.ajax.reload();
						$.snackbar({content: "Ticket updated successfully.", timeout: 5000});
						
					},
					error: function( jqXhr, textStatus, errorThrown ){
						$('#updateTicketSubmit').prop('disabled', false);
						alert( 'ERROR '+errorThrown );
					}
				}); 
			}
		}
	});
	$('#tickettable tbody').on( 'click', '.delete', function () {
		$row = $(this).closest('tr');
		var ticketid = oTable.row( $row ).id();
		var tableRow = oTable.row($(this).parents('tr'));
		var delete_url = const_url+"/TicketService/deleteticket/"+ticketid;
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
						if(jQxhr.status==202)
						{	$('#deleterecord-popup').modal('hide');	
							$('#ticket_forcedeleterecord-popup').modal({show : true});
						}
						else
						{
							oTable.row( tableRow ).remove().draw(false);	
							 $.ajax({
								url : const_url+"/TicketService/countdata/",
								type : 'GET',
								contentType : 'application/json',
								success : function(data,textStatus,jQxhr) {
									$.each(data,function(key,entry) {
										//console.log(data);
										$(".count_tktopen").text(entry.users);
										$(".count_tktprog").text(entry.acitiveusers);
										$(".count_tkthold").text(entry.pendingusers);	
										$(".count_tktclose").text(entry.inactiviteusers);
									});
								},
								error: function( jqXhr, textStatus, errorThrown ){
									alert( 'ERROR '+errorThrown );
								}
							});
							
								$('#deleterecord-popup').modal('hide');	
							$.snackbar({content: "Ticket deleted successfully.", timeout: 5000});
							
						}
						$(".loading-fa").html("");
						$('#btnDeleteDetails').prop('disabled', false);									
						
					},
					error: function( jqXhr, textStatus, errorThrown ){
						$('#btnDeleteDetails').prop('disabled', false);
						alert( 'ERROR '+errorThrown );
					}
				});				
			});				
		});	
	} );
	//new workspace
	$('.linkaddworkspace').on("click",function() {
		//alert('btn click');
		$('.modal-container').load(const_url+"/home/CompanyDetails",function(result) {
			$('#company-details').modal({show : true});
			$('[data-toggle="tooltip"]').tooltip({
				trigger : 'hover'
			});
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
	//custom filter 
	//project List
	$.ajax({
		url : const_url+projectDataUrl,
		type : 'GET',
		contentType : 'application/json',
		success : function(data,textStatus,jQxhr) {
			$.each(data,function(key,entry) {
				$("#searchTckt_ProjectSelect").append('<option  value="' + entry.DT_RowId + '">' + entry.projectname +'</option>');
			});
			
		},
		error: function( jqXhr, textStatus, errorThrown ){
			$(".loading-fa").html("");
			alert( 'ERROR '+errorThrown );
		}
	});
	
	//Ticket list
	$.ajax({
		url : const_url+ticketListUrl,
		type : 'GET',
		contentType : 'application/json',
		success : function(data,textStatus,jQxhr) {
			$.each(data,function(key,entry) {
				$("#searchby_tcktName").append('<option  value="' + entry.DT_RowId + '">#'+ entry.DT_RowId+ " - " + entry.tickettitle +'</option>');
			});
			
		},
		error: function( jqXhr, textStatus, errorThrown ){
			
			alert( 'ERROR '+errorThrown );
		}
	});
	
	
	$(document).on('click', '#custom-tktSearch', function () {
		$(".custom-tktSearch").toggle();
		$(".selectinput").select2({
		width: 'auto',
		placeholder: "Select" 
		});
		$("#searchby_tcktName").select2({
			width: 'auto',
			placeholder: "Select",
		});
		var fromdate = $("#searchTckt_pStartD");
		var todate = $("#searchTckt_pEndD");
		fromdate.datepicker({
						todayHighlight: true,
						autoclose: true
		}).on('changeDate', function(){
						
			todate.datepicker('setStartDate', new Date($(this).val())); //set fromdate as start date for PlannedDueDate and ActualStartDate
		});
		//Planned Due Date
		todate.datepicker({
			todayHighlight: true,
			autoclose: true
		}).on('changeDate', function(){
			fromdate.datepicker('setEndDate', new Date($(this).val())); //set PlannedDueDate as end date for fromdate
		}); 
		
	});
	$('#searchTckt_id').on("click",function() {
		$("#form_searchTcktBy_id").validate({
			ignore: "",
			errorClass : "input-error",
			errorElement : 'div',
			errorPlacement: function (error, element) {					
				if (element.attr("type") == "checkbox") {
					error.insertBefore("ul.list-group");
				}else if(element.next('.select2-container').length) {
					error.insertAfter(element.next('.select2-container'));
					//$(".select2-selection").addClass("input-error");							
				}else{
					error.insertAfter(element);
				}
			}
			
		});
				
		if ($('#form_searchTcktBy_id').valid()) 
		{
			var filter_data = JSON.stringify(
			{
				"DT_RowId":$("#searchby_tcktName").val()
			});
			$(".custom-tktSearch").hide();
			
			filterUrl=ticketDataUrl+"filterbasedonticket";
			
			$('#tickettable').DataTable().destroy();
			ticket_dataTable(filterUrl,filter_data);
		}
		
	});
	$('#searchTckt_all').on("click",function() {
		$("#form_searchTckt_all").validate({
			ignore: "",
			errorClass : "input-error",
			errorElement : 'div',
			errorPlacement: function (error, element) {					
				if (element.attr("type") == "checkbox") {
					error.insertBefore("ul.list-group");
				}else if(element.next('.select2-container').length) {
					error.insertAfter(element.next('.select2-container'));
					//$(".select2-selection").addClass("input-error");							
				}else{
					error.insertAfter(element);
				}
			}
			
		});
		if ($('#form_searchTckt_all').valid()) 
		{
			$(".custom-tktSearch").hide();
			var format_dateFrom,format_dateTo;
			var f_date, t_date ;
			if($("#searchTckt_pStartD").val()!=""){
				fromdate=$("#searchTckt_pStartD").val();
				format_dateFrom=fromdate.split("/");
				f_date=format_dateFrom[2]+"/"+format_dateFrom[0]+"/"+format_dateFrom[1];
			}
			else{
				f_date="";
			}
			if($("#searchTckt_pEndD").val()!="")
			{
				todate=$("#searchTckt_pEndD").val();
				format_dateTo=todate.split("/");
				t_date=format_dateTo[2]+"/"+format_dateTo[0]+"/"+format_dateTo[1];
			}
			else{
				t_date="";
			}
			
		
			var filter_data = JSON.stringify(
			{
				"projectname":$("#searchTckt_ProjectSelect").val().join(),
				"status":$("#searchTckt_statusSelect").val().join(),
				"category":$("#searchTckt_catSelect").val().join(),
				"planstartdate":f_date,
				"planenddate":t_date
			});
			filterUrl=ticketDataUrl+"filterbasedonadvance";
			
			$('#tickettable').DataTable().destroy();
			ticket_dataTable(filterUrl,filter_data);
		}
	});
} );