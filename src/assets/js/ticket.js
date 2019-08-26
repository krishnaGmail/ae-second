jQuery(document).ready(function($){
	var roleId=$(".roleId").val();
	var myDropzone;
	 var wrapperThis;
	$.selectAssigneeMemRASCI = function(selecttxt,selectMem){
		var autoassigneememberRASCI = $('#' + selecttxt);
		autoassigneememberRASCI.select2({
			closeOnSelect: false,
			placeholder: "Select"
		});	
		autoassigneememberRASCI.on("select2:open", function (e) { 
			$(".select2-results").addClass("rasci-block "); 
		});
		if(selectMem!=""){
			autoassigneememberRASCI.val(selectMem).trigger('change');
			
		}	
		
	};	
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
	function dynamicTkt_display()
 	{
		$.ajax({
		url : const_url+"/TicketService/recFivelist/",
		type : 'GET',
		contentType : 'application/json',
		success : function(data,textStatus,jQxhr) {
				
				var ticketStatus;
				$("#ticketTable tbody").empty();
				if(data.length>0)
				{
					
					$("#no-ticket-msg").addClass("d-none");
					$("#ticketTable").removeClass("d-none");
					$.each(data,function(key,entry) {
						
						if(entry.status == "Active"){
						ticketStatus= '<span class="badge badge-success font-1xl">'+entry.status+'</span>';
						}else if(entry.status == "On hold"){
							ticketStatus= '<span class="badge badge-danger font-1xl">'+entry.status+'</span>';
						}else if(entry.status == "In Progress"){
							ticketStatus= '<span class="badge badge-info font-1xl">'+entry.status+'</span>';
						}else if(entry.status == "Archived"){
							ticketStatus= '<span class="badge badge-secondary font-1xl">'+entry.status+'</span>';
						}else if(entry.status == "Open"){
							ticketStatus= '<span class="badge badge-warning font-1xl">'+entry.status+'</span>';
						}else if(entry.status == "Close"){
							ticketStatus= '<span class="badge badge-dark font-1xl">'+entry.status+'</span>';
						}else {
							return '';
						}
						var datePercentage;
					if(entry.planenddate!="")
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
						//var firstDate = new Date(entry.planstartdate);
						var secondDate = new Date(entry.planenddate);
						var today = new Date(todayDate);
						if(secondDate>=today)
						{

							//var diffDays1 = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime())/(oneDay)));
							var diffDays2 = Math.round(Math.abs((secondDate.getTime()- today.getTime())/(oneDay)));
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
						var timeSpan;
						if(datePercentage>=0 && datePercentage<25)  {
							timeSpan='<div class="ticket-progress">'+
									'<div class="progress mb-2 ">'+
										'<div class="progress-bar bg-warning progress-bar-striped progress-bar-animated" role="progressbar" style="width:'+datePercentage+'%;text-align: right;    padding-left: 15px;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">'+
											datePercentage+'%'+
											
										'</div>'+
										
									'</div>'+
									'<a  href="javascript:void(0);"  title="PSD - '+entry.planstartdate+'" data-toggle="tooltip" class="dot-left"></a>'+
									'<a  href="javascript:void(0);"  title="PED - '+entry.planenddate+'" data-toggle="tooltip"class="dot-right"></a>'+
								'</div>';
						}
						else if(datePercentage>=25 && datePercentage<50)  {
							timeSpan= '<div class="ticket-progress">'+
									'<div class="progress mb-2 ">'+
										'<div class="progress-bar bg-success progress-bar-striped progress-bar-animated" role="progressbar" style="width:'+datePercentage+'%;text-align: right;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">'+
											datePercentage+'%'+
											
										'</div>'+
										
									'</div>'+
									'<a  href="javascript:void(0);"  title="PSD - '+entry.planstartdate+'" data-toggle="tooltip" class="dot-left"></a>'+
									'<a  href="javascript:void(0);"  title="PED - '+entry.planenddate+'" data-toggle="tooltip"class="dot-right"></a>'+
								'</div>';
						}
						else if(datePercentage>=50 && datePercentage<75)  {
							timeSpan= '<div class="ticket-progress">'+
									'<div class="progress mb-2 ">'+
										'<div class="progress-bar .bg-info progress-bar-striped progress-bar-animated" role="progressbar" style="width:'+datePercentage+'%"; aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">'+
											datePercentage+'%'+
											
										'</div>'+
										
									'</div>'+
									'<a  href="javascript:void(0);"  title="PSD - '+entry.planstartdate+'" data-toggle="tooltip" class="dot-left"></a>'+
									'<a  href="javascript:void(0);"  title="PED - '+entry.planenddate+'" data-toggle="tooltip"class="dot-right"></a>'+
								'</div>';
						}
						else if(datePercentage>=75 && datePercentage<100)  {
							timeSpan= '<div class="ticket-progress">'+
									'<div class="progress mb-2 ">'+
										'<div class="progress-bar bg-danger progress-bar-striped progress-bar-animated" role="progressbar" style="width:'+datePercentage+'%"; aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">'+
											datePercentage+'%'+
											
										'</div>'+
										
									'</div>'+
									'<a  href="javascript:void(0);"  title="PSD - '+entry.planstartdate+'" data-toggle="tooltip" class="dot-left"></a>'+
									'<a  href="javascript:void(0);"  title="PED - '+entry.planenddate+'" data-toggle="tooltip"class="dot-right"></a>'+
								'</div>';
						}
						else if(datePercentage==100)  {
							timeSpan= '<div class="ticket-progress">'+
									'<div class="progress mb-2 ">'+
										'<div class="progress-bar  bg-danger progress-bar-striped progress-bar-animated" role="progressbar" style="width:'+datePercentage+'%;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">'+
											datePercentage+'%'+
											
										'</div>'+
										
									'</div>'+
									'<a  href="javascript:void(0);"  title="PSD - '+entry.planstartdate+'" data-toggle="tooltip" class="dot-left"></a>'+
									'<a  href="javascript:void(0);"  title="PED - '+entry.planenddate+'" data-toggle="tooltip"class="dot-right"></a>'+
								'</div>';
						}
						else if(datePercentage=="Over Due")  {
							timeSpan= '<div class="ticket-progress">'+
									'<div class="progress mb-2 ">'+
										'<div class="progress-bar  bg-danger progress-bar-striped progress-bar-animated" role="progressbar" style="width:100%;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">'+
											datePercentage+
											
										'</div>'+
										
									'</div>'+
									'<a  href="javascript:void(0);"  title="PSD - '+entry.planstartdate+'" data-toggle="tooltip" class="dot-left"></a>'+
									'<a  href="javascript:void(0);"  title="PED - '+entry.planenddate+'" data-toggle="tooltip" class="dot-right"></a>'+
								'</div>';
						}
						else if(datePercentage==0)  {
							timeSpan= '<div class="ticket-progress">'+
									'<div class="progress mb-2 ">'+
										'<div class="progress-bar   progress-bar-striped progress-bar-animated" role="progressbar" style="width:'+datePercentage+'%;margin-left: 10px;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">'+
											datePercentage+'%'+
											
										'</div>'+
										
									'</div>'+
									'<a  href="javascript:void(0);"  title="PSD - '+entry.planstartdate+'" data-toggle="tooltip" class="dot-left"></a>'+
									'<a  href="javascript:void(0);"  title="PED - '+entry.planenddate+'" data-toggle="tooltip"class="dot-right"></a>'+
								'</div>';
						}
						else {
							timeSpan= '<span style="color: #d3d3d3;font-style: italic;">Not Set</span>';
						}
						
						
					
						$("#ticketTable tbody").append('<tr>'+
							'<td style="color: #007bff;" class="wrapellipse" data-toggle="tooltip" rel="tooltip" title="'+entry.tickettitle+'">#'+entry.DT_RowId+'</td>'+
							'<td>'+ticketStatus+'</td>'+
							'<td>'+timeSpan+'</td>'+
							
						'</tr>');
												
																		
							ellipse();				
					
					});
					
				}
				else
				{
					
					$("#ticketTable").addClass("d-none");
					$("#no-ticket-msg").removeClass("d-none");
				}				
				$('[data-toggle="tooltip"]').tooltip();
			
			
		},
		error: function( jqXhr, textStatus, errorThrown ){
			alert( 'ERROR '+errorThrown );
		}
		});
	}	
	//dynamicTkt_display();
	$(document).on('click','.linkAddTicket',function()
	{
		$('.modal-container').load(const_url+"/home/tickets/AddNewTicket",function(result) {
			$('#addnewticket-details').modal({show:true});
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
						$("#txtProjectSelect").append('<option  value="' + entry.DT_RowId + '">' + entry.projectname +'</option>');
					});
					
				},
				error: function( jqXhr, textStatus, errorThrown ){
					$(".loading-fa").html("");
					alert( 'ERROR '+errorThrown );
				}
			});	
			//Date
			$("#addAssigneeError").text("");
			$('[data-toggle="tooltip"]').tooltip();		
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
				dropdownParent: $("#addnewticket-details")
			});
			
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
			// user click  cancel button of addNew category
			$("#cancelTicketCat").click(function(){
				$('#txtCategory').val(null).trigger('change');
			});
			
			$.datepickercal("txtPlannedStartDate", "txtPlannedDueDate", "txtActualStartDate", "txtActualEndDate");
			
			$.selectdata("txtPrimaryAssignee","");
			$.selectdata("txtSecondaryAssignee","");
			$.selectdata("txtTertiaryAssignee","");
			$.selectdata("txtAuxiliaryAssignee","");

			
			
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
						$('#tabslist a[href="#'+tadId+'"]').tab('show');
					}
				}
				});
			});
			
		});
	});
	$(document).on('click','#createTicketSubmit',function(e){
		e.preventDefault();
		if ($('#addnewticket_form').valid()) 
		{
			var addTicketSubmit=true;
			var tickettitle = $("#txtTicketTitle").val();
			var project_idfk = $("#txtProjectSelect").val();
			var priority = $("#txtPriority").val();
			var category_idfk = $("#txtCategory").val();
			var statuscode = $("#txtStatus").val();
			var ticketdesc = $("#txtTicketDescription").val();
			var environment = $('#txtEnvironment').val();
			var planstartdate = $('#txtPlannedStartDate').val();
			var planenddate = $('#txtPlannedDueDate').val();
			var actstartdate = $('#txtActualStartDate').val();
			var actenddate = $('#txtActualEndDate').val();
			var passignee = $('#txtPrimaryAssignee').val();
			var primaryrasci = $('#txtPrimaryRASCI').val();
			var sassignee = $('#txtSecondaryAssignee').val();
			var secondaryrasci = $('#txtSecondaryRASCI').val();
			var tassignee = $('#txtTertiaryAssignee').val();
			var tertiaryrasci = $('#txtTertiaryRASCI').val();
			var aassignee = $('#txtAuxiliaryAssignee').val();
			var auxillaryrasci = $('#txtAuxiliaryRASCI').val();
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
				
				$('#tabslist a[href="#assignees"]').tab('show');
				$("#addAssigneeError").text("Assignee duplicate occur");
				addTicketSubmit=false;
			}
			else if((sassignee==passignee || sassignee==tassignee || aassignee.search(sassignee)>-1) && (sassignee!=""))
			{
				
				$('#tabslist a[href="#assignees"]').tab('show');
				$("#addAssigneeError").text("Assignee duplicate occur");
				addTicketSubmit=false;
			}
			else if((tassignee==passignee || tassignee==sassignee || aassignee.search(tassignee)>-1) && (tassignee!=""))
			{
				
				$('#tabslist a[href="#assignees"]').tab('show');
				$("#addAssigneeError").text("Assignee duplicate occur");
				addTicketSubmit=false;
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
				
				$('#tabslist a[href="#assignees"]').tab('show');
				$("#addAssigneeError").text("Primary Assignee is required");
				addTicketSubmit=false;
			}
			else if( sassignee=="" && secondaryrasci!="")
			{
				
				$('#tabslist a[href="#assignees"]').tab('show');
				$("#addAssigneeError").text("Secondary Assignee is required");
				addTicketSubmit=false;
			}
			else if(tassignee=="" && tertiaryrasci!="")
			{
				
				$('#tabslist a[href="#assignees"]').tab('show');
				$("#addAssigneeError").text("Tertiary Assignee is required");
				addTicketSubmit=false;
			}
			else if(aassignee=="" && auxillaryrasci!="")
			{
				
				$('#tabslist a[href="#assignees"]').tab('show');
				$("#addAssigneeError").text("Auxiliary Assignee is required");
				addTicketSubmit=false;
			}

			var filesCount = myDropzone.getQueuedFiles().length;
			var dataJSON = JSON.stringify(
			{
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
			
			//addTicketSubmit
			if(addTicketSubmit)
			{
				 $('#createTicketSubmit').prop('disabled', true);
				 $.ajax({
					url : const_url+"/TicketService/addticket",
					type : 'POST',
					contentType : 'application/json',
					data : dataJSON,
					beforeSend: function(){
						$(".ticket-loading-fa").html("<i class='fa fa-spinner fa-spin'></i>");
					},
					success : function(data,textStatus,jQxhr) {
						
						if($("#tickettable").length){
							$('#tickettable').DataTable().ajax.reload();
						}	
						console.log("file count-->"+filesCount);
						if(filesCount>0)
						{
							$.each(data,function(key,entry) {
								fDT_RowId=entry.DT_RowId;
								fproject_idfk=entry.project_idfk;
								fcontact_idfk=entry.contact_idfk;
								
							});
							// append extra data to  file
							wrapperThis.on('sending', function(file, xhr, formData){
								formData.append('DT_RowId',fDT_RowId);
								formData.append('project_idfk',fproject_idfk);
								formData.append('contact_idfk',fcontact_idfk);
								formData.append('editFile_flag',0);
								
							});
							// files sending
							wrapperThis.processQueue();	
									
									
							
						}
						//Ticket count
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
									var chartData=[entry.users,entry.acitiveusers,entry.pendingusers,entry.inactiviteusers];
									$.ticket_chart(chartData);
								});

							},
							error: function( jqXhr, textStatus, errorThrown ){
								alert( 'ERROR '+errorThrown );
							}
						});
						dynamicTkt_display();
						$('#createTicketSubmit').prop('disabled', false);
						$('#addnewticket-details').modal('hide');	
						$.snackbar({content: "New ticket  created successfully.", timeout: 5000});
					},
					error: function( jqXhr, textStatus, errorThrown ){
						$('#createTicketSubmit').prop('disabled', false);
						alert( 'ERROR '+errorThrown );
					}
				}); 
			}
		}
	});
	//add ticket via email notes popup modal
	$(document).on('click','.addnewticket-email',function()
	{
		$('.addticketemail-popup').modal('show');		
	});
});