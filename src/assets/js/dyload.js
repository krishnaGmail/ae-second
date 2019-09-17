jQuery(document).ready(function($){
    $.ellipse();
	
    var defaultMem = $("input[name=defaultSessionMem]").val();
    var fetchedVal;
    var inviteSelector;
	$(document).on('click','#linkPopup',function() {
				$(".seltxtbox").select2('close');
				$("#formSendInvite")[0].reset();
				$('.invitememberpopup').modal({show : true});				
				$("#txtInviteNewMemberEmailID").val(fetchedVal);
				$('.selectinput').select2({
					width: 'auto',
					placeholder: "Select"
				});
				// Validate
				$('#formSendInvite').validate(
				{
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
				$("#linkSendInviteMembers").unbind().click(function(event) {
					if ($('#formSendInvite').valid()) {
						var newusername = $("[name^=txtInviteNewUserName]").map(function(){        
						  return $(this).val();				
						}).get();
						var newuserfname=[], newuserlname=[];		
						var newuseremailid = $("[name^=txtInviteNewUserEmailID]").map(function(){        
						  return $(this).val();				
						}).get();			
						var newusersrole = $("[name^=txtInviteNewUserRole]").map(function(){        
						  return $(this).val();				
						}).get();
						newusername.forEach(function( element ) {
						  var newusernamearr = element.split(" ");
						  newuserfname.push(newusernamearr[0]);
						  newuserlname.push(newusernamearr[1]);
						});	
						var name = $("#txtInviteNewMemberName");
						var email = $("#txtInviteNewMemberEmailID");
						var workinghours = $("#txtInviteNewMemberBWH");
						var roleid = $("#txtInviteNewMemberRole");																								
						var url = const_url+"/SendInviteService/invitemembers";						
						var fullname = name.val().split(" ");
						var fname = fullname[0];
						var lname = fullname[1];
						$.ajax({
							url : url,
							type : 'post',
							contentType : 'application/json',
							data : JSON.stringify({"firstname" : fullname[0], "email" : email.val(), "lastname" : fullname[1], "role_idfk" : roleid.val(),"workinghours":workinghours.val()}),
							beforeSend: function(){
								$(".loading-fa").html("<i class='fa fa-spinner fa-spin'></i>");
							},
							success : function(data,textStatus,jQxhr) {							
								$.each(data,function(key,entry) {
									var id = entry.email;
									var text = entry.firstname +" "+entry.lastname;
									
									if (inviteSelector.find("option[value='"+ id + "']").length) {
										inviteSelector.val(id).trigger('change');
									} 
									else{ 
									
										var newOptionSelected = '<option data-email="' + id + '" value="' + id + '"selected>' + text + '</option>';
										var newOption = '<option data-email="' + id + '" value="' + id + '">' + text + '</option>';
										inviteSelector.append(newOptionSelected).trigger('change');
										
										//var oldSelectVal=[];
										/* if(inviteSelector.selector=="#txtAuxiliaryAssignee" || inviteSelector.selector=="#txtAddMembers")
										{
											oldSelectVal.push($(""+inviteSelector.selector).val());
										
											
											oldSelectVal.push(id);
											console.log("With Val  "+oldSelectVal);
											inviteSelector.val(null).trigger('change');
											inviteSelector.val(oldSelectVal).trigger('change');
										}
										else
										{
											oldSelectVal.push(id);
											console.log("Without Val"+oldSelectVal);
											inviteSelector.val(id).trigger('change');
										} */
										if(inviteSelector.selector=="#txtPrimaryAssignee")
										{
											$("#txtSecondaryAssignee").append(newOption);
											$("#txtTertiaryAssignee").append(newOption);
											$("#txtAuxiliaryAssignee").append(newOption);
										}
										else if(inviteSelector.selector=="#txtSecondaryAssignee")
										{
											$("#txtPrimaryAssignee").append(newOption);
											$("#txtTertiaryAssignee").append(newOption);
											$("#txtAuxiliaryAssignee").append(newOption);
										}
										else if(inviteSelector.selector=="#txtTertiaryAssignee")
										{
											$("#txtPrimaryAssignee").append(newOption);
											$("#txtSecondaryAssignee").append(newOption);
											$("#txtAuxiliaryAssignee").append(newOption);
										}
										else if(inviteSelector.selector=="#txtAuxiliaryAssignee")
										{
											$("#txtPrimaryAssignee").append(newOption);
											$("#txtSecondaryAssignee").append(newOption);
											$("#txtTertiaryAssignee").append(newOption);
										}
									}
									// $('#txtAddMembers').val(["mark@gmail.com"]).change();
									$(".loading-fa").html("");									
									$('.invitememberpopup').modal('hide');
								});
								$.snackbar({content: "Invite sent.", timeout: 5000});
							},
							error: function( jqXhr, textStatus, errorThrown ){
								alert( 'ERROR '+errorThrown );
							}
							
				});
			}
		});
	});
	var chartData=[];
	// remove after added ticket operation
    $.ticket_chart(chartData);
	  	
	/*$.ajax({
		url : const_url+"/TicketService/countdata/",
		type : 'GET',
		contentType : 'application/json',
		success : function(data,textStatus,jQxhr) {
			var chartData=[];
			 
			if(textStatus=="success")
			{
				$.each(data,function(key,entry) {
					//console.log(data);
					$(".count_tktopen").text(entry.users);
					$(".count_tktprog").text(entry.acitiveusers);
					$(".count_tkthold").text(entry.pendingusers);	
					$(".count_tktclose").text(entry.inactiviteusers);
					if(entry.users==0 && entry.acitiveusers==0 && entry.pendingusers==0 && entry.inactiviteusers==0){
						 chartData=[];	
										 
					}
					else{
						chartData=[entry.users,entry.acitiveusers,entry.pendingusers,entry.inactiviteusers];
					}
				});
			}
			
			
			$.ticket_chart(chartData);	
		},
		error: function( jqXhr, textStatus, errorThrown ){
			alert( 'ERROR '+errorThrown );
			console.log(jqXhr.status);
		}
	});*/
	
	function dynamicProj_display()
	{
		var d;
		var date;
		$.ajax({
			url : "/projects/Projectservice/recfiveprojectlist",
			type : 'GET',
			contentType : 'application/json',
			beforeSend: function(){
				$(".pj-loading-fa").html("<i class='fa fa-spinner fa-spin'></i>");
			},
			success : function(data,textStatus,jQxhr) {
				$("#dynamic-projects").empty();
				// $.ajax({
				// 	url : const_url+"/UserService/countdata/",
				// 	type : 'GET',
				// 	contentType : 'application/json',
				// 	success : function(data,textStatus,jQxhr) {
				// 		$.each(data,function(key,entry) {
				// 			var t_porj=$(".totalPrj-count").text();
				// 			var t_prjinprg=$(".count_prjinprg").text();
				// 			$(".totalPrj-count").text(parseInt(t_porj)+1);
				// 			//$(".count_prjinprg").text(parseInt(t_prjinprg)+1);
				// 			$(".totalUser-count").text(entry.users);
				// 		});
				// 	},
				// 	error: function( jqXhr, textStatus, errorThrown ){
				// 		alert( 'ERROR '+errorThrown );
				// 	}
				// });
					if(data.length>0)
					{
						var i=0;
						$.each(data,function(key,entry) {
							
							if(i<=1)
							{
								if(entry.DUEDATE=="Not Set" || entry.DUEDATE=="" || entry.DUEDATE === undefined || entry.DUEDATE === null )
								{
									date='<p style="color: #d3d3d3;"><i>Not Set</i></p>';
								}
								else
								{
									date='<p class="project_date1">'+entry.DUEDATE+'</p>';
								}
								$("#dynamic-projects").append('<div class="col-lg-4 col-md-4">'+
									'<section class=" card">'+
										'<a href="/projects" >'+
											'<div class="twt-feed">'+
												'<div class="media">'+
													'<div class="media-body">'+
														'<h2 class="text-black display-6 wrapellipse"   title="'+entry.PROJECTNAME+'"data-toggle="tooltip">'+entry.PROJECTNAME+'</h2>'+
													'</div>'+
												'</div>'+
											'</div>'+
										'</a>'+
										'<div class="weather-category twt-category">'+
											'<ul>'+
												'<li class="active">'+
													'<p class="project_date1">'+entry.TEAMCOUNT+'</p>'+
													'Team'+
												'</li>'+
												'<li>'+date+
													'Due Date'+
												'</li>'+
											'</ul>'+
										'</div>'+
									'</section> '+                                
								' </div>');
								i++;
							}
							
						});
					}
					$("#dynamic-projects").append('<div class="col-lg-4 col-md-4">'+
						'<div class="card  dash-container">   '+                        
						' <div class="card-body d-flex justify-content-center pb-2" style="height:235px;">'+
							'<div class="align-self-center">'+
									'<a class="linkAddProject" href="javascript:void(0);"'+
								'title="Add new project"><i class="fa fa-plus-circle fa-4x"></i></a>'+
							'</div>'+
						' </div>   '+        
						'</div>   '+                                
					  '</div>');
					  var rowCount = $('.tableproject table tbody tr').length;
							$(".tableproject table").removeClass("d-none");
							
							//  if(rowCount<3)
							// {
							// 	$(".tableproject table tbody").empty();
								/*$.ajax({
									url : const_url+"/ProjectService/recFivelist/",
									type : 'GET',
									contentType : 'application/json',
									success : function(data,textStatus,jQxhr) {

										$.each(data,function(key,entry) {
											
															 
										if(entry.duedate=="Not Set" || entry.duedate=="" || entry.duedate === undefined || entry.duedate === null )
									
										{
											date='<p style="color: #d3d3d3;"><i>Not Set</i></p>';
											
										}
										else
										{
											date='<p class="project_date1">'+entry.duedate+'</p>';
										}
										
										
											$(".tableproject table tbody").append('<tr>'+
												'<td> <span class="name wrapellipse" style="text-transform: capitalize;" title="'+entry.projectname+'"data-toggle="tooltip">'+entry.projectname+'</span> </td>'+
													'<td> <span class="product">'+entry.contact_idfk+'</span> </td>'+
														'<td><span >'+date+'</span></td>'+
															
														
																					
											' </tr>');
										});
									},
									error: function( jqXhr, textStatus, errorThrown ){
										alert( 'ERROR '+errorThrown );
									}
								});*/
							//}
							// else{
							// 		$(".tableproject table tbody").find("tr:gt(3)").remove();
							// 		var count=0;
							// 		$.each(data.data,function(key,entry) {
							// 			count++;
							// 			if(count<2)
							// 			{
							// 				console.log(count);
							// 				if(entry.duedate=="Not Set" || entry.duedate=="" || entry.duedate === undefined || entry.duedate === null )
									
							// 				{
							// 					date='<p style="color: #d3d3d3;"><i>Not Set</i></p>';
												
							// 				}
							// 				else
							// 				{
							// 					date='<p class="project_date1">'+entry.duedate+'</p>';
							// 				}
											
							// 				$(".tableproject table tbody ").prepend('<tr>'+
							// 					'<td> <span class="name wrapellipse" style="text-transform: capitalize;" title="'+entry.projectname+'"data-toggle="tooltip">'+entry.projectname+'</span> </td>'+
							// 						'<td> <span class="product">'+entry.contact_idfk+'</span> </td>'+
							// 							'<td><span>'+date+'</span></td>'+
															
														
																					
							// 				' </tr>');
							// 				return true;
							// 			}	
							// 			else{
							// 				return false;
							// 			}
									
							// 	}); 
							
							
							//} 
					$.ellipse();
					$('[data-toggle="tooltip"]').tooltip();
				$('#addproject-details').modal('hide');		  
			},
			error: function( jqXhr, textStatus, errorThrown ){
				alert( 'ERROR '+errorThrown );
			}
		});
	}
	$(document).on( 'click', '.linkAddProject', function () {
      

            $('#addproject-details').modal({ show: true });

			$('.selectinput').select2({
				width: 'auto',
				placeholder: "Select"
            });
			$.hasClassadd();
			
			$.datepickercal("txtPlannedStartDate", "txtPlannedDueDate", "txtActualStartDate", "txtActualEndDate");	

           // $.selectdata("txtAddMembers", defaultMem);
			
			// Validate
			$.form_validator("addproject_form");
			
		
	});
	
	//Add new Project
	$(document).on( 'click', '#addProject_submit', function () {
		if ($('#addproject_form').valid()) {
			
			 $('#addProject_submit').prop('disabled', true);
			
			var field_ID = ["txtProjectName", "txtDescription","txtPlannedStartDate","txtPlannedDueDate","txtActualStartDate","txtActualEndDate","txtPriority"];
			var data = $.getField_val(field_ID);
			
			
			// if(data[7])
			// {
			// 	members=data[7].toString();
			// }
			// else
			// {
			// 	members="";
			// }
			var dataJSON = JSON.stringify(
			{
				"projectname": data[0], 
				"description": data[1],
				"planstartdate": data[2],
				"planenddate":data[3],
				"actstartdate":data[4],
				"actenddate":data[5],
				"priority": data[6]
				
			});
			console.log(dataJSON);
			$.ajax({
				url : "projects/Projectservice/addproject",
				type : 'POST',
				contentType : 'application/json',
				data : dataJSON,
				beforeSend: function(){
					$(".pj-loading-fa").html("<i class='fa fa-spinner fa-spin'></i>");
				},
				success : function(data,textStatus,jQxhr) {
						dynamicProj_display();						
						if($("#projecttable").length){
							$('#projecttable').DataTable().ajax.reload();

						}
						 $('#addProject_submit').prop('disabled', false);
						 $('#addproject-details').modal('hide');
						 toast.success("New project created successfully");
						 
						
				},
				error: function( jqXhr, textStatus, errorThrown ){
					 $('#addProject_submit').prop('disabled', false);
					 $(".pj-loading-fa").html(" ");
					alert( 'ERROR '+errorThrown );
				}
			});
		}
	});
	$('.linkAddUser').on("click",function() {
		$('.modal-container').load(const_url+"/home/users/InviteNewUser",function(result) {
			$('#addnewuser-details').modal({show : true});	
			$('.selectrole').select2({
				width: 'auto',
				placeholder: "Select"
			});		
			//Validate
			jQuery('#formInviteNewUser').validate({
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
			var max_field = 100;
			var addButton = $('.addusers-btn');
			var wrapper = $('.row-wrapper');
			var x = 1;
			var length=1;
			$(addButton).click(function() {
				length=$(wrapper).children().length;
				x += 1;
				if( length < max_field) {
					$(wrapper).append('<div class="row mb-20" style="padding-top: 10px;margin-top: 10px;border-top: 2px dotted #ccc;">'+
								'<div class="col-lg-6">'+
									'<label for="txtInviteNewUserName">Full Name</label>'+
									'<input type="text" class="form-control capital" name="txtInviteNewUserName['+x+']" value="" placeholder="Full Name" data-rule-required="true" data-rule-lettersonly="true" data-rule-twowords="true" autocomplete="off"/>'+
								'</div>'+
								'<div class="col-lg-6">'+
									'<label for="txtInviteNewUserEmailID">Email ID</label>'+
									'<input type="text" class="form-control" name="txtInviteNewUserEmailID['+x+']" value="" placeholder="Email" data-rule-required="true" data-rule-emailCheck="true" autocomplete="off"/>'+
								'</div>'+	
							'</div>'+
							'<div class="row ">'+
								'<div class="col-lg-6">'+
									'<label for="txtInviteNewUserRole">Set Role</label>'+
									'<select name="txtInviteNewUserRole['+x+']" class="form-control" data-rule-required="true" ><option value="">Select</option>'+dynamicsetrole+'</select>'+
								'</div>'+
								'<div class="col-lg-4">'+
									'<label for="txtInviteNewUserRole">Base Working Hours  </label>'+
									'<a style="margin-left: 5px;" data-toggle="tooltip" title="Base working hours per week"><i class="fa fa-info-circle info-tt"></i></a>'+
									 '<input type="text" class="form-control" name="txtInviteNewUserBWH[0]" value="" placeholder="BWH" data-rule-required="true" data-rule-digits="true" autocomplete="off" />'+
								 '</div>'+
								'<div class="col-lg-2">'+
									'<a href="javascript:void(0);" class="remove_button"><div style="display: inline-block; margin-top:30px;"><span class="fa fa-minus-circle fa-lg"></span></div>'+
									'</a>'+
								'</div>'+
							'</div>');       
					$('.selectrole').select2({
						width: 'auto',
						placeholder: "Select"
					}); 					
				}
			});
			//Remove button is clicked
			$(wrapper).on('click', '.remove_button', function(e) {
				e.preventDefault();
				$(this).parent().parent('div').prev().remove();
				$(this).parent().parent('div').remove();
				length=$(wrapper).children().length;				
			});
			$("#btnAddNewUser").click(function(event) {
				if ($('#formInviteNewUser').valid()) {	
					$('#btnAddNewUser').prop('disabled', true);
					var newusername = $("[name^=txtInviteNewUserName]").map(function(){        
					  return $(this).val();				
					}).get();
					var newuserfname=[], newuserlname=[];		
					var newuseremailid = $("[name^=txtInviteNewUserEmailID]").map(function(){        
					  return $(this).val();				
					}).get();			
					var newusersrole = $("[name^=txtInviteNewUserRole]").map(function(){        
					  return $(this).val();				
					}).get();
					var newusersBHW = $("[name^=txtInviteNewUserBWH]").map(function(){        
					  return $(this).val();				
					}).get();
					newusername.forEach(function( element ) {
					  var newusernamearr = element.split(" ");
					  newuserfname.push(newusernamearr[0]);
					  newuserlname.push(newusernamearr[1]);
					});					
					var addrow_url =  const_url+"/SendInviteService/inviteusers";
					var dataJSON = [];
					for(var i=0; i<newuseremailid.length; i++){
						var data = {
						  "firstname": newuserfname[i],
						  "email": newuseremailid[i],						  
						  "lastname": newuserlname[i],
						  "role_idfk": newusersrole[i],
						  "workinghours": newusersBHW[i],
						  
						};
						dataJSON.push(data)
					}
					
					$.ajax({
						url : addrow_url,
						type : 'POST',
						contentType : 'application/json',
						data : JSON.stringify(dataJSON),
						beforeSend: function(){
							$(".loading-fa").html("<i class='fa fa-spinner fa-spin'></i>");
						},
						success : function(data,textStatus,jQxhr) {
							$.ajax({
								url : const_url+"/UserService/countdata/",
								type : 'GET',
								contentType : 'application/json',
								success : function(data,textStatus,jQxhr) {
									$.each(data,function(key,entry) {
										$(".totalUser-count").text(entry.users);
										$(".active-user").text(entry.acitiveusers);
										$(".inactive-user").text(entry.inactiviteusers);
										$(".pending-user").text(entry.pendingusers);
									});
								},
								error: function( jqXhr, textStatus, errorThrown ){
									alert( 'ERROR '+errorThrown );
								}
							});
							if($("#usertable").length){
								$('#usertable').DataTable().ajax.reload();
							}
							$('#btnAddNewUser').prop('disabled', false);
							$('#addnewuser-details').modal('hide');
							$.snackbar({content: "Invite sent.", timeout: 5000});
						},
						error: function( jqXhr, textStatus, errorThrown ){
							$('#btnAddNewUser').prop('disabled', false);
							alert( 'ERROR '+errorThrown );
						}
					});
				}
			});
		});
	});
	
	
	
	//navigate domain
	$('.linkdomain-nav').on("click",function() {
		var domid = $(this).attr("data-id");
		//alert('btn click domain '+domid);
		console.log("Domain"+domid);
		sessionStorage.setItem("flag", "1");
		sessionStorage.setItem("domid", domid);
		//sessionStorage.setItem("roleid", roleid);
		console.log("Flag"+sessionStorage.getItem("flag"));
		console.log("Session domain Id"+sessionStorage.getItem("domid"));
		$("#dashFlag").val(1);
		$("#dashDomain").val(domid);
		//$("#dashDomain").val(roleid);
		//alert($("#dashFlag").val());
		//alert($("#dashDomain").val());
		//
		$("#dashBoaForm" ).submit();
		
		/* $.ajax({
			url : const_url+"/MultiDomService/navigaation/"+domid,
			type : "GET",
			beforeSend: function(){
				$(".loading-fa").html("<i class='fa fa-spinner fa-spin'></i>");
			},
			success : function(data,textStatus,jQxhr) {	
				
				
				sessionStorage.setItem("flag", "1");
				 sessionStorage.setItem("domid", 107);
				var flag= sessionStorage.getItem("flag");
				 alert(flag);
				
			var domid= sessionStorage.getItem("domid");
				 alert(domid);
				 //window.location = const_url+"/home/project/ArchivedProject";
				window.location = const_url+"/home/Dashboard";
				console.log('success');		
				
			},
			error: function( jqXhr, textStatus, errorThrown ){
				alert( 'ERROR '+errorThrown );
			}
		}); */
	});
	if($("#prjAdd_option").val())
	{
		
		$(".tableprjaddbtn").removeClass("d-none");
	} 
	$("#gridproject").click(function(){
	  $(".gridproject").removeClass("d-none");
	  $(".tableproject").addClass("d-none");
	  $(".tableproject").parent().css({"padding":"1.25em" ,"margin-top":"0px"});
	});
	$("#tableproject").click(function(){
		
	if($(".tableproject table tbody tr").length==0)
	{
		$(".tableproject table").addClass("d-none");
		
	}
	else
	{
	  $(".gridproject").addClass("d-none");
	  $(".tableproject").removeClass("d-none");
	  $(".tableproject").parent().css({"padding":"0px" ,"margin-top":"-12px"});	  
	}
	});
	
	//General settings
	if($("#generalsetting").length){
		var error_msg=$('.general_error_msg').text();
		console.log(error_msg);
		if(error_msg!="")
		{
			$.snackbar({content: "Data updated successfully", timeout: 5000});
		}
		jQuery('#generalsetting-details').validate({
			errorClass : "input-error",
			errorElement : 'div'
		});
		 
		$('.selectinput').select2({
			width: 'auto',
			placeholder: "Select"
		});
		
		
		
		
	}
	$("#updateGeneralSettings").click(function(e){
		$('#updateGeneralSettings').prop('disabled', true);
		e.preventDefault();
		var post_valid=true;
		var post_code=$('#txtGeneralPostalCode').val();
		var regex = /^[0-9\s]*$/;
           
		if(post_code!="" && !regex.test(post_code))
		{
			post_valid=false;
			$("#postal_code_error").text("Only numeric data.");
			$('#updateGeneralSettings').prop('disabled', false);
			setTimeout(function() { $("#postal_code_error").text(""); }, 3000);
		} 
		
		if ($('#generalsetting-details').valid() && post_valid) 
		{
			$('#updateGeneralSettings').prop('disabled', false);
			
			$('#generalsetting-details').submit();
			
		} 
	});
	//Update my profile settings
	if($("#myprofile").length){	
		jQuery('#formMyProfile').validate({
			ignore: "",
			errorClass : "input-error",
			errorElement : 'div',
			invalidHandler: function(e, validator){
				if(validator.errorList.length){
					$('#tabslist a[href="#' + jQuery(validator.errorList[0].element).closest(".tab-pane").attr('id') + '"]').tab('show');
				}
			}
		});
			
		
		$('#myprofile_submit').on("click",function() {
			var pwd_valid=true;
			var txtMyProfileCurrentPassword=$("#txtMyProfileCurrentPassword").val();
			var txtMyProfileNewPassword = $("#txtMyProfileNewPassword").val();
			var txtMyProfileConfirmPassword = $("#txtMyProfileConfirmPassword").val();
			if(txtMyProfileCurrentPassword!="" && txtMyProfileNewPassword=="")
			{
				pwd_valid=false;
				$("#new_pwd_error").text("This field is required");
				setTimeout(function() { $("#new_pwd_error").text(""); }, 3000);
				$('#tabslist a[href="#account"]').tab('show');
			}
			else if(txtMyProfileNewPassword!="" && txtMyProfileConfirmPassword=="")
			{
				pwd_valid=false;
				$("#cnf_pwd_error").text("This field is required");
				setTimeout(function() { $("#cnf_pwd_error").text(""); }, 3000);
				$('#tabslist a[href="#account"]').tab('show');
			}
			else if(txtMyProfileCurrentPassword=="" && (txtMyProfileNewPassword!="" && txtMyProfileConfirmPassword!=""))
			{
				pwd_valid=false;
				$("#cur_pwd_error").text("This field is required");
				setTimeout(function() { $("#cur_pwd_error").text(""); }, 3000);
				$('#tabslist a[href="#account"]').tab('show');
			}
			if ($('#formMyProfile').valid() && pwd_valid) {
				$('#myprofile_submit').prop('disabled', true);
				var txtMyProfileFName = $("#txtMyProfileFName").val();
				var txtMyProfileLName = $("#txtMyProfileLName").val();
				var txtMyProfileMobilePh = $("#txtMyProfileMobilePh").val();
				var txtMyProfileHomePh = $("#txtMyProfileHomePh").val();
				var txtMyProfileWorkPh = $("#txtMyProfileWorkPh").val();
				var txtMyProfileFax = $("#txtMyProfileFax").val();
				var txtMyProfileTwitter = $("#txtMyProfileTwitter").val();
				var txtMyProfileFacebook = $("#txtMyProfileFacebook").val();
				var txtMyProfileLinkedin = $("#txtMyProfileLinkedin").val();
				var txtMyProfileGoogle = $("#txtMyProfileGoogle").val();
				var txtMyProfileCurrentPassword = $("#txtMyProfileCurrentPassword").val();
				var txtMyProfileNewPassword = $("#txtMyProfileNewPassword").val();
				var txtMyProfileConfirmPassword = $("#txtMyProfileConfirmPassword").val();
				
				var add_url = const_url+"/SettingService/updateprofile";
				if(txtMyProfileCurrentPassword==""){
					txtMyProfileCurrentPassword=null;
				}
				var dataJSON = JSON.stringify(
				{
					"firstname": txtMyProfileFName,
					"lastname": txtMyProfileLName,
					"mobilephone": txtMyProfileMobilePh,
					"workphone": txtMyProfileHomePh,
					"othercontact": txtMyProfileWorkPh,
					"fax": txtMyProfileFax,
					"twitter": txtMyProfileTwitter,
					"linkedin": txtMyProfileFacebook,
					"facebook": txtMyProfileLinkedin,
					"googleplus": txtMyProfileGoogle,
					"oldpassword": txtMyProfileCurrentPassword,
					"newpassword": txtMyProfileNewPassword
					
				});
				
				 $.ajax({
					url : add_url,
					type : 'PUT',
					
					contentType : 'application/json',
					data : dataJSON,
					
					beforeSend: function(){
						$(".loading-fa").html("<i class='fa fa-spinner fa-spin'></i>");
					},
					success : function(data,textStatus,jQxhr) {
						if(jQxhr.status==202)
						{
							window.location=const_url+"/LoginDetails";
						}
						else{
							$("#formMyProfile")[0].reset();
						$(".loading-fa").html(" ");
						$('#myprofile_submit').prop('disabled', false);
						$.snackbar({content: "Profile updated successfully.", timeout: 5000});
						}
						console.log(jQxhr.status);
						
					},
					error: function( jqXhr, textStatus, errorThrown ){
						if(jqXhr.status==406)
						{
							$.snackbar({content: "Current password is incorrect.", timeout: 5000});
							
							$(".loading-fa").html(" ");
						}
						else{
							alert( 'ERROR '+errorThrown );
						}
						$('#myprofile_submit').prop('disabled', false);
					}
				}); 
			}
		});
	}
	
});