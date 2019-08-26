
function format ( d ) {
	// `d` is the original data object for the row		
	return '<div class="row">'+
	'<div class="col-sm-12 mb-2"><span class="fw-b">Email: </span>'+d.email+'</div>'+
	
	'</div>';
}

jQuery(document).ready(function($){
	var roleId=$(".roleId").val();
	var contactId=$(".contactId").val();
	
	var userAccess=[];
	
	var userEdit,userDelete,userWrite;
	function permission(){
		$.ajax({
			
			url : const_url+"/ActiveRoleService/editdata/"+roleId+"/"+contactId+"/",
			type : 'GET',
			contentType : 'application/json',
			success : function(data,textStatus,jQxhr) {
				
				$.each(data,function(key,entry) {
					if(entry.eledescription=="User Setting")
					{
						userAccess.push(entry.actdescription);
					}
					
				});
				
				userEdit=$.inArray( "Edit", userAccess );
				userDelete=$.inArray( "Delete", userAccess );
				userWrite=$.inArray( "Write", userAccess );
				if(userWrite==-1)
				{
					$('#btnInviteNewUser').hide();
				}
				
			},
			error: function( jqXhr, textStatus, errorThrown ){
				alert( 'ERROR '+errorThrown );
			}
		});
	}	
	permission();
	
	var oTable = jQuery('#usertable').DataTable( {
		"processing": true,
		"language": 
		{          
		"processing": "<i class='fa fa-spinner fa-spin fa-2x'></i>",
		"loadingRecords": "<i class='fa fa-spinner fa-spin fa-2x'></i>",
		},
		'order': [[1, 'asc']],
		"sAjaxSource": const_url+"/ContactService/userlist/",
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
			{ data: "fullname" },
			{ data: "roleename"},
			{ 
				data: null, 
				render: function ( data, type, row ) {
					if(data.statuscode == "sts001"){
						return '<span class="badge badge-warning font-1xl">'+data.description+'</span><input type="hidden" name="txtStatusCode" id="txtStatusCode" value="'+data.statuscode+'">';
					}else if(data.statuscode == "sts003"){
						return '<span class="badge badge-success font-1xl">'+data.description+'</span><input type="hidden" name="txtStatusCode" id="txtStatusCode" value="'+data.statuscode+'">';
					}else if(data.statuscode == "sts002"){
						return '<span class="badge badge-light font-1xl">'+data.description+'</span><input type="hidden" name="txtStatusCode" id="txtStatusCode" value="'+data.statuscode+'">';
					}else if(data.statuscode == "sts004"){
						return '<span class="badge badge-secondary font-1xl">'+data.description+'</span><input type="hidden" name="txtStatusCode" id="txtStatusCode" value="'+data.statuscode+'">';
					}
				}
			},
			{
				data: null,
				render: function ( data, type, row ) {
					var action;
					if(userEdit==-1 )
					{
						
						action=' ';
						
					}
					else if(userEdit!=-1)
					{
						action='<div class="dropdown for-addnew btn-action " style="cursor: pointer;">'+
									'<span data-toggle="dropdown" aria-haspopup="true"  '+
										'aria-expanded="false" title="User Action"> <i '+
										'class="fa fa-ellipsis-v" aria-hidden="true"></i>'+
									'</span> '+
									'<div class="add-menu dropdown-menu fz-14">'+
										'<a href="javascript:void(0);" class="nav-link edit" title="Edit" data-id="'+data.DT_RowId+'"><span class="ti-pencil mr-2"></span>Edit</a> <a href="javascript:void(0);" class="nav-link inactive" title="Inactive" data-id="'+data.DT_RowId+'"><span class="fa fa-user-times mr-2"></span>Inactive</a>'+
									'</div>'+
								'</div>';
					}
					/* else if(userDelete!=-1)
					{
						action='<div class="dropdown for-addnew btn-action " style="cursor: pointer;">'+
									'<span data-toggle="dropdown" aria-haspopup="true"  '+
										'aria-expanded="false" title="User Action"> <i '+
										'class="fa fa-ellipsis-v" aria-hidden="true"></i>'+
									'</span> '+
									'<div class="add-menu dropdown-menu fz-14">'+
										'<a href="javascript:void(0);" class="nav-link delete" title="Remove" data-id="'+data.DT_RowId+'"><span class="ti-trash mr-2"></span>Delete</a>'+
									'</div>'+
								'</div>';
					} */
					/* else if(userEdit!=-1)
					{
						action='<div class="dropdown for-addnew btn-action " style="cursor: pointer;">'+
									'<span data-toggle="dropdown" aria-haspopup="true"  '+
										'aria-expanded="false" title="User Action"> <i '+
										'class="fa fa-ellipsis-v" aria-hidden="true"></i>'+
									'</span> '+
									'<div class="add-menu dropdown-menu fz-14">'+
										'<a href="javascript:void(0);" class="nav-link edit" title="Edit" data-id="'+data.DT_RowId+'"><span class="ti-pencil mr-2"></span>Edit</a>'+
									'</div>'+
								'</div>';
					} */
					
					
					if(data.statuscode == "sts001" && action!=" "){
						//action=action+'<a href="javascript:void(0);" class="reinvite font-2xl" title="Resend invite" data-toggle="tooltip" data-id="'+data.DT_RowId+'"><span class="ti-email"></span></a>';
						action='<div class="dropdown for-addnew btn-action " style="cursor: pointer;">'+
									'<span data-toggle="dropdown" aria-haspopup="true"  '+
										'aria-expanded="false" title="User Action"> <i '+
										'class="fa fa-ellipsis-v" aria-hidden="true"></i>'+
									'</span> '+
									'<div class="add-menu dropdown-menu fz-14">'+
										'<a href="javascript:void(0);" class="nav-link edit" title="Edit" data-id="'+data.DT_RowId+'"><span class="ti-pencil mr-2"></span>Edit</a> <a href="javascript:void(0);" class="nav-link inactive" title="Inactive" data-id="'+data.DT_RowId+'"><span class="fa fa-user-times mr-2"></span>Inactive</a> <a href="javascript:void(0);" class="nav-link reinvite" title="Resend invite" data-id="'+data.DT_RowId+'"><span class="ti-email mr-2"></span>Resend Invite</a>'+
									'</div>'+
								'</div>'
					}
					return action+'<input type="hidden" id="txtUserBWH" value="'+data.workinghours+'"><input type="hidden" id="txtUserRoleID" value="'+data.role_idfk+'"><input type="hidden" id="txtUserFullname" value="'+data.fullname+'"><input type="hidden" id="txtUserEmailID" value="'+data.email+'">';
					
				}
			}
		],
		"drawCallback": function() {
			$('[data-toggle="tooltip"]').tooltip({trigger : 'hover'});
			
		  }  
	});
	
	// Add event listener for opening and closing details
	$('#usertable tbody').on('click', 'td.details-control', function () {
		var tr = $(this).closest('tr');
		var row = oTable.row( tr );
		if ( row.child.isShown() ) {
			// This row is already open - close it
			row.child.hide();
			tr.removeClass('shown');
		}
		else {
			// Open this row
			row.child( format(row.data()), "bgcol" ).show();
			tr.addClass('shown');
		}
	} );
	
	function checkrole_permission(){
		if($("input.chkProjectRole:checked").length > 0){
			$("#chkProjectAll").parent().next().next().next().addClass("show");
			$("#chkProjectAll").parent().prev().removeClass("collapsed");
			if($("input.chkProjectRole:checked").length == 4){
				$("#chkProjectAll").prop('checked', true);
			}
		}
		
		if($("input.chkUserRole:checked").length > 0){
			$("#chkUsersAll").parent().next().next().next().addClass("show");
			$("#chkUsersAll").parent().prev().removeClass("collapsed");
			if($("input.chkUserRole:checked").length == 3){
				$("#chkUsersAll").prop('checked', true);
			}
		}
		
		if($("input.chkTicketRole:checked").length > 0){
			$("#chkTicketAll").parent().next().next().next().addClass("show");
			$("#chkTicketAll").parent().prev().removeClass("collapsed");
			if($("input.chkTicketRole:checked").length == 4){
				$("#chkTicketAll").prop('checked', true);
			}
		}
		
		if($("input.chkRoleAction:checked").length > 0){
			$("#chkRoleAll").parent().next().next().next().addClass("show");
			$("#chkRoleAll").parent().prev().removeClass("collapsed");
			if($("input.chkRoleAction:checked").length == 4){
				$("#chkRoleAll").prop('checked', true);
			}
		}	
	}
	
	var $row,userid;
	
	$('#usertable tbody').on( 'click', '.reinvite', function () {
		$row = $(this).closest('tr');
		userid = oTable.row( $row ).id();
		
		var userroleid = $('td', $row).eq(4).find("#txtUserRoleID").val();
		var userEamil = $('td', $row).eq(4).find("#txtUserEmailID").val();
		var userFullName = $('td', $row).eq(4).find("#txtUserFullname").val().split(" ");
		var userFirstName=userFullName[0];
		var userLastName=userFullName[1];
		var dataJSON = JSON.stringify(
			{
				"contact_id" : userroleid,
				"email":userEamil,
				"firstname":userFirstName,
				"lastname":userLastName
				
			});
			console.log("REsend Datt-->"+dataJSON);
		 $.ajax({
			url : const_url+"/SendInviteService/resendinvit",
			type : 'POST',
			contentType : 'application/json',
			data : dataJSON,
			
			beforeSend: function(){
				$(".loading-fa").html("<i class='fa fa-spinner fa-spin'></i>");
			},
			success : function(data,textStatus,jQxhr) {
				
				

				$.snackbar({content: "Invite sent.", timeout: 5000});	

			},
			error: function( jqXhr, textStatus, errorThrown ){
				alert( 'ERROR '+errorThrown );
			}
		}); 
		
	});
	
	$('#usertable tbody').on( 'click', '.edit', function () {
		$row = $(this).closest('tr');
		userid = oTable.row( $row ).id();
		var username = $('td', $row).eq(1).text();
		var userrole = $('td', $row).eq(2).text();
		var userroleid = $('td', $row).eq(4).find("#txtUserRoleID").val();
		var userstatus = $('td', $row).eq(3).find("#txtStatusCode").val();
		var useremailid = $('td', $row).eq(4).find("#txtUserEmailID").val();
		var userbwh = $('td', $row).eq(4).find("#txtUserBWH").val();
		var fetchrow_url = const_url+"/ActiveRoleService/editdata/"+userroleid+"/"+userid;
		
		$('.modal-container').load(const_url+"/home/users/EditUser",function(result) {
			$('[data-toggle="tooltip"]').tooltip({trigger : 'hover'});
			$("h5.modal-title").html(username+"<span class='color-gray'>&nbsp;("+useremailid+")</span>");
			$("#txtEditUserRole").val(userroleid);
			$("#txtEditUser").val(username);
			$("#txtEditBaseWorkingHours").val(userbwh);
			
			$('.selectinput').select2({
				width: 'auto'
			});			
			jQuery('#formEditUser').validate({
				ignore: "",
				errorClass : "input-error",
				errorElement : 'div',
				errorPlacement: function (error, element) {
					if (element.attr("type") == "checkbox") {
						error.insertBefore("ul.list-group");
					}else if(element.next('.select2-container').length) {
						error.insertAfter(element.next('.select2-container'));
					}else{
						error.insertAfter(element);
					}
				}
			});
						
			$.ajax({
				url : fetchrow_url,
				type : "GET",
				dataType: "json",
				success : function(data,textStatus,jQxhr) {
					$.each(data,function(key,entry) {
						var element = entry.eledescription;
						var activity = entry.actdescription;
						if(element == "Project"){
							$("input.chkProjectRole[type='checkbox'][value=" + activity + "]").prop("checked", true);
						}else if(element == "Ticket"){
							$("input.chkTicketRole[type='checkbox'][value=" + activity + "]").prop("checked", true);
						}else if(element == "User Setting"){
							$("input.chkUserRole[type='checkbox'][value=" + activity + "]").prop("checked", true);
						}else if(element == "Role"){
							$("input.chkRoleAction[type='checkbox'][value=" + activity + "]").prop("checked", true);
						}else if(element == "Report"){
							$("input.chkReportRole[type='checkbox'][value=" + activity + "]").prop("checked", true);
						}else if(element == "Collaboration"){
							$("input.chkCollaborationRole[type='checkbox'][value=" + activity + "]").prop("checked", true);
						}	
					});
					checkrole_permission();
					$('#edituser-details').modal({show : true});
				},
				error: function( jqXhr, textStatus, errorThrown ){
					alert( 'ERROR '+errorThrown );
				}
			});
			
			$('.success').on('change', function(e) {
				$(this).checkboxChk();
			});
			
			$('#txtEditUserRole').on('change', function(e) {
				var selectval = $(this).val();
				var selectvalurl = const_url+"/RoleService/editdata/"+selectval;
				
				$.ajax({
					url : selectvalurl,
					type : "GET",
					dataType: "json",
					beforeSend: function(){
						$("input[name='chkRoleParent']:checkbox").prop('checked',false);
						$("input[name='chkRole']:checkbox").prop('checked',false);
						$("input[name='chkRoleParent']").parent().next().next().next().removeClass("show");
						$('.overlay').prepend('<div class="loader active"><i class="fa fa-spinner fa-spin fa-5x"></i></div>');
					},
					success : function(data,textStatus,jQxhr) {
						$(".loader").remove();
						$.each(data,function(key,entry) {
							var element = entry.eledescription;
							var activity = entry.actdescription;
							if(element == "Project"){
								$("input.chkProjectRole[type='checkbox'][value=" + activity + "]").prop("checked", true);
							}else if(element == "Ticket"){
								$("input.chkTicketRole[type='checkbox'][value=" + activity + "]").prop("checked", true);
							}else if(element == "User Setting"){
								$("input.chkUserRole[type='checkbox'][value=" + activity + "]").prop("checked", true);
							}else if(element == "Role"){
								$("input.chkRoleAction[type='checkbox'][value=" + activity + "]").prop("checked", true);
							}else if(element == "Report"){
								$("input.chkReportRole[type='checkbox'][value=" + activity + "]").prop("checked", true);
							}else if(element == "Collaboration"){
								$("input.chkCollaborationRole[type='checkbox'][value=" + activity + "]").prop("checked", true);
							}	
						});
						checkrole_permission();
					},
					error: function( jqXhr, textStatus, errorThrown ){
						alert( 'ERROR '+errorThrown );
					}
				});
			});
			
			$('#btnUpdateUser').on( 'click', function (e) {
				if ($('#formEditUser').valid()){ 
					$('#btnUpdateUser').prop('disabled', true);
					var userroleid = $("#txtEditUserRole").val();
					var userrolename = $("#txtEditUserRole option:selected").text();
					var userbwh = $("#txtEditBaseWorkingHours").val();
					var projectrole = $('.chkProjectRole:checkbox:checked').map(function(){        
					  return $(this).val();				
					}).get();		
					var ticketrole = $('.chkTicketRole:checkbox:checked').map(function(){        
					  return $(this).val();				
					}).get();			
					var usersrole = $('.chkUserRole:checkbox:checked').map(function(){        
					  return $(this).val();				
					}).get();
					var rolepermissions = $('.chkRoleAction:checkbox:checked').map(function(){  
			          return $(this).val();				
			        }).get();
					var reportrole = $('.chkReportRole:checkbox:checked').map(function(){        
					  return $(this).val();				
					}).get();
					var collaborationrole = $('.chkCollaborationRole:checkbox:checked').map(function(){        
					  return $(this).val();				
					}).get();
					var updaterow_url =  const_url+"/UserService/updatedata/";
					var dataJSON = JSON.stringify(
					{
						"roleid": userroleid, 
						"contactid": userid,
						"projectrole": projectrole.toString(),
						"ticketrole": ticketrole.toString(),
						"usersrole": usersrole.toString(),
						"rolepermissions": rolepermissions.toString(),
						"reportrole": reportrole.toString(),
						"collaborationrole": collaborationrole.toString(),
						"workinghours": userbwh
					});
									
					$.ajax({
						url : updaterow_url,
						type : 'PUT',
						contentType : 'application/json',
						data : dataJSON,
						beforeSend: function(){
							$(".loading-fa").html("<i class='fa fa-spinner fa-spin'></i>");
						},
						success : function(data,textStatus,jQxhr) {
							oTable.ajax.reload();
							$('#btnUpdateUser').prop('disabled', false);
							$('#edituser-details').modal('hide');
							$.snackbar({content: "User updated successfully", timeout: 5000});
						},
						error: function( jqXhr, textStatus, errorThrown ){
							$('#btnUpdateUser').prop('disabled', false);
							alert( 'ERROR '+errorThrown );
						}
					});
				}
			});
			
		});
	} );
	
	/* $('#usertable tbody').on( 'click', '.delete', function () {
		$row = $(this).closest('tr');
		userid = oTable.row( $row ).id();
		var userroleid = $('td', $row).eq(4).find("#txtUserRoleID").val();
		var tableRow = oTable.row($(this).parents('tr'));
		var delete_url = const_url+"/UserService/delete/"+userroleid+"/"+userid;
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
						
						$.ajax({
							url : const_url+"/UserService/countdata/",
							type : 'GET',
							contentType : 'application/json',
							beforeSend: function(){
								$(".loading-fa").html("<i class='fa fa-spinner fa-spin'></i>");
							},
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
						oTable.row( tableRow ).remove().draw(false);						
						$('#deleterecord-popup').modal('hide');
						$('#btnDeleteDetails').prop('disabled', false);
						$.snackbar({content: "User deleted successfully", timeout: 5000});
					},
					error: function( jqXhr, textStatus, errorThrown ){
						alert( 'ERROR '+errorThrown );
						$('#btnDeleteDetails').prop('disabled', false);
					}
				});				
			});				
		});	
	} ); */
	$('#usertable tbody').on( 'click', '.inactive', function () {
		$row = $(this).closest('tr');
		userid = oTable.row( $row ).id();
		var userroleid = $('td', $row).eq(4).find("#txtUserRoleID").val();
		var tableRow = oTable.row($(this).parents('tr'));
		var delete_url = const_url+"/MultiDomService/inactive/"+userid;
		
			$('#deleterecord-popup').modal({show : true});
			$('#btnDeleteDetails').on( 'click', function (e) {
				//console.log(userid);
				$('#btnDeleteDetails').prop('disabled', true);
				$.ajax({
					url : delete_url,
					type:"PUT",
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
						
						$('#usertable').DataTable().ajax.reload();
										
						$('#deleterecord-popup').modal('hide');
						$(".loading-fa").html(" ");
						$('#btnDeleteDetails').prop('disabled', false);
						$.snackbar({content: "User inactivated  successfully", timeout: 5000});
						
					},
					error: function( jqXhr, textStatus, errorThrown ){
						alert( 'ERROR '+errorThrown );
						$(".loading-fa").html("");
						$('#btnDeleteDetails').prop('disabled', false);
					}
				});				
			});				
		
	} );
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
});