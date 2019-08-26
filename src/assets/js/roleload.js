jQuery(document).ready(function($){
	var roleId=$(".roleId").val();
	var contactId=$(".contactId").val();
	
	var ticketAccess=[];
	
	var tktEdit,tktDelete,tktWrite;
	function permission(){
		$.ajax({
			url : const_url+"/ActiveRoleService/editdata/"+roleId+"/"+contactId+"/",
			type : 'GET',
			contentType : 'application/json',
			success : function(data,textStatus,jQxhr) {
				
				$.each(data,function(key,entry) {
					if(entry.eledescription=="Role")
					{
						ticketAccess.push(entry.actdescription);
					}
					
				});
			
				tktEdit=$.inArray( "Edit", ticketAccess );
				tktDelete=$.inArray( "Delete", ticketAccess );
				tktWrite=$.inArray( "Write", ticketAccess );
				if(tktWrite==-1)
				{
					$('#btnAddNewRole').hide();
					$('#btnAddNewRole').parent().find("a").hide();
					$('#btnAddNewRole').parent().css("border-bottom","0px"); 
				}
			},
			error: function( jqXhr, textStatus, errorThrown ){
				alert( 'ERROR '+errorThrown );
			}
		});
	}	
	//permission();
	var oTable = jQuery('#roletable').DataTable( {
		"processing": true,
		"language": 
        {         
            paginate: {
                    previous: '<i class="fa fa-angle-double-left" aria-hidden="true"></i>',
                next: '<i class="fa fa-angle-double-right" aria-hidden="true"></i>'
            },
		"processing": "<i class='fa fa-spinner fa-spin fa-2x'></i>",
		"loadingRecords": "<i class='fa fa-spinner fa-spin fa-2x'></i>",
		},
        "order": [[2, 'desc'], [0, 'asc']],
           
        
		"sAjaxSource":"/roles/rolelist",
		"iDisplayLength": 10,
		"bLengthMenu": [[5, 10, 25, 50, -1], [5, 10, 25, 50, "All"]],
		"bFilter": true, //to show search
		"deferRender": true,
		"columns": [
            { data: "ROLENAME"},
            { data: "DESCRIPTION"},
			{
				data: null, 
				render: function ( data, type, row ) {
                    if (data.DEFAULTROLE == "Default"){
						return '<span class="flat-color-1">('+data.DEFAULTROLE+')</span>';
					}else{
						var action;
						
						if(tktEdit==-1 && tktDelete==-1)
						{
							action=' ';						
						}
						else if(tktEdit!=-1 && tktDelete!=-1)
						{
							action='<div class="dropdown for-addnew btn-action " style="cursor: pointer;">'+
									'<span data-toggle="dropdown" aria-haspopup="true"  '+
										'aria-expanded="false" title="Role Action"> <i '+
										'class="fa fa-ellipsis-v" aria-hidden="true"></i>'+
									'</span> '+
									'<div class="add-menu dropdown-menu fz-14">'+
										'<a href="javascript:void(0);" class="nav-link edit" title="Edit" data-id="'+data.DT_RowId+'"><span class="ti-pencil mr-2"></span>Edit</a> <a href="javascript:void(0);" class="nav-link delete" title="Remove" data-id="'+data.DT_RowId+'"><span class="ti-trash mr-2"></span>Delete</a><input type="hidden" name="txtProjectRole" id="txtProjectRole" value="'+data.projectrole+'"><input type="hidden" name="txtTicketRole" id="txtTicketRole" value="'+data.ticketrole+'"><input type="hidden" name="txtUserRole" id="txtUserRole" value="'+data.usersrole+'"><input type="hidden" name="txtReportRole" id="txtReportRole" value="'+data.reportrole+'"><input type="hidden" name="txtCollaborationRole" id="txtCollaborationRole" value="'+data.collaborationrole+'">'+
									'</div>'+
								'</div>';
						}
						else if(tktDelete!=-1)
						{
							action='<div class="dropdown for-addnew btn-action " style="cursor: pointer;">'+
									'<span data-toggle="dropdown" aria-haspopup="true"  '+
										'aria-expanded="false" title="Role Action"> <i '+
										'class="fa fa-ellipsis-v" aria-hidden="true"></i>'+
									'</span> '+
									'<div class="add-menu dropdown-menu fz-14">'+
										'<a href="javascript:void(0);" class="nav-link delete" title="Remove" data-id="'+data.DT_RowId+'"><span class="ti-trash mr-2"></span>Delete</a><input type="hidden" name="txtProjectRole" id="txtProjectRole" value="'+data.projectrole+'"><input type="hidden" name="txtTicketRole" id="txtTicketRole" value="'+data.ticketrole+'"><input type="hidden" name="txtUserRole" id="txtUserRole" value="'+data.usersrole+'"><input type="hidden" name="txtReportRole" id="txtReportRole" value="'+data.reportrole+'"><input type="hidden" name="txtCollaborationRole" id="txtCollaborationRole" value="'+data.collaborationrole+'">'+
									'</div>'+
								'</div>';
						}
						else if(tktEdit!=-1)
						{
							action='<div class="dropdown for-addnew btn-action " style="cursor: pointer;">'+
									'<span data-toggle="dropdown" aria-haspopup="true"  '+
										'aria-expanded="false" title="Role Action"> <i '+
										'class="fa fa-ellipsis-v" aria-hidden="true"></i>'+
									'</span> '+
									'<div class="add-menu dropdown-menu fz-14">'+
										'<a href="javascript:void(0);" class="nav-link edit" title="Edit" data-id="'+data.DT_RowId+'"><span class="ti-pencil mr-2"></span>Edit</a> <input type="hidden" name="txtProjectRole" id="txtProjectRole" value="'+data.projectrole+'"><input type="hidden" name="txtTicketRole" id="txtTicketRole" value="'+data.ticketrole+'"><input type="hidden" name="txtUserRole" id="txtUserRole" value="'+data.usersrole+'"><input type="hidden" name="txtReportRole" id="txtReportRole" value="'+data.reportrole+'"><input type="hidden" name="txtCollaborationRole" id="txtCollaborationRole" value="'+data.collaborationrole+'">'+
									'</div>'+
								'</div>';
						}
						return action;
						}
				}
			}
		],
        "drawCallback": function () {
            $(".dataTables_paginate > .pagination").addClass("pagination-rounded");
			//$('[data-toggle="tooltip"]').tooltip({trigger : 'hover'});
		  }  
	});
   
	//Add new role modal load
	$('.linkAddNewRole').on("click",function() {
		$('.modal-container').load("/roles/AddNewRole",function(result) {
            $('#addnewrole-details').modal({ show: true });
           
                
            
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
			jQuery('#formAddNewRole').validate({
				ignore: "",
				errorClass : "input-error",
				errorElement : 'div',
				errorPlacement: function (error, element) {
					if (element.attr("type") == "checkbox") {
						error.insertBefore("ul.list-group");
					}else{
						error.insertAfter(element);
					}
				},
				invalidHandler: function(e, validator){
					if(validator.errorList.length){
						$('#tabslist a[href="#' + jQuery(validator.errorList[0].element).closest(".tab-pane").attr('id') + '"]').tab('show');
					}
				}
			});
			
			$('.success').on('change', function(e) {
				$(this).checkboxChk();
			});
		});
	});
	
	//Insert new role
	$(document).on( 'click', '#btnAddRoleDetails', function () {
		if ($('#formAddNewRole').valid()) {
			$('#btnAddRoleDetails').prop('disabled', true);
			var rolename = $("#txtNewRoleName").val();
			var description = $("#txtNewRoleDescription").val();
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
			
			
			var dataJSON = JSON.stringify(
            {
                "ROLEID": 10302,
                "DEFAULTROLE": "",
                "DESCRIPTION": description,
                "ROLENAME": rolename,
                "DOMAIN_IDFK": 100,
                "Element": "Project",
                "projectrole": projectrole.toString(),
                "ticketrole": ticketrole.toString(),
                "usersrole": usersrole.toString(),
                "reportrole": reportrole.toString(),
				"collaborationrole": collaborationrole.toString()				
			});
								
			$.ajax({
				url : "/roles",
				type : 'POST',
				contentType : 'application/json',
				data : dataJSON,
				beforeSend: function(){
					$(".loading-fa").html("<i class='fa fa-spinner fa-spin'></i>");
				},
				success : function(data,textStatus,jQxhr) {
					oTable.ajax.reload();
					$('#btnAddRoleDetails').prop('disabled', false);
					$('#addnewrole-details').modal('hide');
					$.snackbar({content: "New role added successfully.", timeout: 5000});
				},
				error: function( jqXhr, textStatus, errorThrown ){
					$('#btnAddRoleDetails').prop('disabled', false);
					alert( 'ERROR '+errorThrown );
				}
			});
		}
	});
	
	$('#roletable tbody').on( 'click', '.edit', function () {
		var $row = $(this).closest('tr');
		var roleid = oTable.row( $row ).id();
		var rolename = $('td', $row).eq(0).text();
		var roledesc = $('td', $row).eq(1).text();
		var fetchrow_url = const_url+"/RoleService/editdata/"+roleid;
		
		$('.modal-container').load(const_url+"/home/roles/EditRole",function(result) {
			$("#txtEditRoleName").val(rolename);
			$("#txtEditRoleDescription").val(roledesc);
			
			jQuery('#formEditRole').validate({
				ignore: "",
				errorClass : "input-error",
				errorElement : 'div',
				errorPlacement: function (error, element) {
					if (element.attr("type") == "checkbox") {
						error.insertBefore("ul.list-group");
					}else{
						error.insertAfter(element);
					}
				},
				invalidHandler: function(e, validator){
					if(validator.errorList.length){
						$('#tabslist a[href="#' + jQuery(validator.errorList[0].element).closest(".tab-pane").attr('id') + '"]').tab('show');
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
					$('#editrole-details').modal({show : true});
				},
				error: function( jqXhr, textStatus, errorThrown ){
					alert( 'ERROR '+errorThrown );
				}
			});
			
			$('.success').on('change', function(e) {
				$(this).checkboxChk();
			});
			
			$('#btnUpdateRoleDetails').on( 'click', function (e) {
				if ($('#formEditRole').valid()) {
					$('#btnUpdateRoleDetails').prop('disabled', true);		
					var rolename = $("#txtEditRoleName").val();
					var description = $("#txtEditRoleDescription").val();
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
					var updaterow_url =  const_url+"/RoleService/updatedata/";
					
					var dataJSON = JSON.stringify(
					{
						"roleid": roleid,
						"rolename": rolename,
						"description": description,
						"projectrole": projectrole.toString(),
						"ticketrole": ticketrole.toString(),
						"usersrole": usersrole.toString(),
						"rolepermissions": rolepermissions.toString(),
						"reportrole": reportrole.toString(),
						"collaborationrole": collaborationrole.toString()				
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
							oTable.row('#' + roleid).data({
								"DT_RowId": roleid,
								"rolename": rolename,
								"description": description			
							}).invalidate().draw(false);							
							$('#' + roleid).addClass("highlight");					
							setTimeout(function() {
								$('#' + roleid).removeClass("highlight");
							}, 2000);
							$('#btnUpdateRoleDetails').prop('disabled', false);		
							$('#editrole-details').modal('hide');
							$.snackbar({content: "Role updated successfully.", timeout: 5000});
						},
						error: function( jqXhr, textStatus, errorThrown ){
							$('#btnUpdateRoleDetails').prop('disabled', false);		
							alert( 'ERROR '+errorThrown );
						}
					});
				}
			});
			
		});
	});
	
	$('#roletable tbody').on( 'click', '.delete', function () {
		
		var $row = $(this).closest('tr');
		var roleid = oTable.row( $row ).id();
		var tableRow = oTable.row($(this).parents('tr')); 
		var delete_url = const_url+"/RoleService/delete/"+roleid;
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
						$.snackbar({content: "Role deleted successfully.", timeout: 5000});
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

