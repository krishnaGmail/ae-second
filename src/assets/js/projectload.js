jQuery(document).ready(function($){
	$('[data-toggle="tooltip"]').click(function () {
		$('[data-toggle="tooltip"]').tooltip("hide");

	 });
	var roleId=$(".roleId").val();
	var contactId=$(".contactId").val();
	
	var projectDataUrl;
	if(roleId==1011)
	{
		 projectDataUrl="/ProjectService/projectlist/";
	}
	else{
		projectDataUrl="/ProjectService/projectuserlist/";
	}
	var projectAccess=[];
	
	var prjEdit,prjDelete,prjWrite;
	function permission(){
		$.ajax({
			
			url : const_url+"/ActiveRoleService/editdata/"+roleId+"/"+contactId+"/",
			type : 'GET',
			contentType : 'application/json',
			success : function(data,textStatus,jQxhr) {
				
				$.each(data,function(key,entry) {
					if(entry.eledescription=="Project")
					{
						projectAccess.push(entry.actdescription);
					}
					else
					{
						return false;
					}
				});
				
				prjEdit=$.inArray( "Edit", projectAccess );
				prjDelete=$.inArray( "Delete", projectAccess );
				prjWrite=$.inArray( "Write", projectAccess );
				if(prjWrite==-1)
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
	//permission();
	
		
		
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
		var PLANSTARTDATE,PLANENDDATE;

		if(d.PLANSTARTDATE=="" || d.PLANSTARTDATE === undefined || d.PLANSTARTDATE === null )
		{
			PLANSTARTDATE=" ";
		}
		else
		{
			PLANSTARTDATE=d.PLANSTARTDATE;
		}
		if(d.PLANENDDATE=="" || d.PLANENDDATE === undefined || d.PLANENDDATE === null )
		{
			PLANENDDATE=" ";
		}
		else
		{
			PLANENDDATE=d.PLANENDDATE;
		}
		return '<div class="row">'+
		'<div class="col-sm-12 mb-2"><span class="fw-b">Created by: </span>'+d.CREATEDBY+'</div>'+
		'<div class="col-sm-12 mb-2"><span class="fw-b">Planned Start Date: </span>'+PLANSTARTDATE+'</div>'+
		'<div class="col-sm-12 mb-2"><span class="fw-b">Planned End Date: </span>'+PLANENDDATE+'</div>'+
		'</div>';
	}

	var oTable = jQuery('#projecttable').DataTable( {
		"processing": true,
		"language": 
		{          
		"processing": "<i class='fa fa-spinner fa-spin fa-2x'></i>",
		"loadingRecords": "<i class='fa fa-spinner fa-spin fa-2x'></i>",
		},
		"sAjaxSource":"/projects/Projectservice/admprojectlist",
		"iDisplayLength": 10,
		"bLengthMenu": [[5, 10, 25, 50, -1], [5, 10, 25, 50, "All"]],
		"bFilter": true, //to show search
		"deferRender": true,
		"columns": [
			{
				"className":      'details-control ',
				"orderable":      false,
				"data":           null,
				"defaultContent": ''
			},
			{ 	
				data: null, 
				render: function ( data, type, row ) {
					return "<span class='wrapellipse' title='"+data.PROJECTNAME+"'data-toggle='tooltip'>"+data.PROJECTNAME+"</span>";
					
				}
			},
			{ data: "PRIORITY",
			  "defaultContent": ''
			},
			{ 
				data: null, 
				render: function ( data, type, row ) {
					if(data.STATUS_IDFK == "1"){
						return '<span class="badge badge-warning font-1xl">'+data.STATUS+'</span><input type="hidden" name="txtStatusCode" id="txtStatusCode" value="'+data.STATUS_IDFK+'">';
					}else if(data.STATUS_IDFK == "2"){
						return '<span class="badge badge-info font-1xl">'+data.STATUS+'</span><input type="hidden" name="txtStatusCode" id="txtStatusCode" value="'+data.STATUS_IDFK+'">';
					}else if(data.STATUS_IDFK == "3"){
						return '<span class="badge badge-dark font-1xl">'+data.STATUS+'</span><input type="hidden" name="txtStatusCode" id="txtStatusCode" value="'+data.STATUS_IDFK+'">';
					}else if(data.STATUS_IDFK == "4"){
						return '<span class="badge badge-danger font-1xl">'+data.STATUS+'</span><input type="hidden" name="txtStatusCode" id="txtStatusCode" value="'+data.STATUS_IDFK+'">';
					}else {
						return '';
					}	
				}
			},
			{ data: "ACTSTARTDATE",
			  "defaultContent": ''
			},
			{ data: "ACTENDDATE",
			  "defaultContent": ''
			},
			{
				data: "CREATEDBY", 
				"visible": false
			},
			{
				data: null, 
				render: function ( data, type, row ) {
					var action;
					// if(prjEdit==-1 && prjDelete==-1)
					// {
						
					// 	action=' ';
						
					// }
					// else if(prjEdit!=-1 && prjDelete!=-1)
					// {
					// 	action='<div class="dropdown for-addnew btn-action " style="cursor: pointer;">'+
					// 				'<span data-toggle="dropdown" aria-haspopup="true"  '+
					// 					'aria-expanded="false" title="Project Action"> <i '+
					// 					'class="fa fa-ellipsis-v" aria-hidden="true"></i>'+
					// 				'</span> '+
					// 				'<div class="add-menu dropdown-menu fz-14">'+
					// 					'<a href="javascript:void(0);" class="nav-link edit" title="Edit" data-id="'+data.DT_RowId+'"><span class="ti-pencil mr-2"></span>Edit</a><a href="javascript:void(0);" class="nav-link delete" title="Remove" data-id="'+data.DT_RowId+'"><span class="ti-trash mr-2"></span>Delete</a><a href="javascript:void(0);" class="nav-link archive" title="Archive" data-id="'+data.DT_RowId+'"><span class="ti-archive mr-2"></span>Archive</a>'+
					// 				'</div>'+
					// 			'</div>';
					// }
					// else if(prjDelete!=-1)
					// {
					// 	action='<div class="dropdown for-addnew btn-action " style="cursor: pointer;">'+
					// 				'<span data-toggle="dropdown" aria-haspopup="true"  '+
					// 					'aria-expanded="false" title="Project Action"> <i '+
					// 					'class="fa fa-ellipsis-v" aria-hidden="true"></i>'+
					// 				'</span> '+
					// 				'<div class="add-menu dropdown-menu fz-14">'+
					// 					'<a href="javascript:void(0);" class=" nav-link delete" title="Remove" data-id="'+data.DT_RowId+'"><span class="ti-trash mr-2"></span>Delete</a><a href="javascript:void(0);" class="nav-link archive" title="Archive" data-id="'+data.DT_RowId+'"><span class="ti-archive mr-2"></span>Archive</a>';
					// 				'</div>'+
					// 			'</div>';
					// }
					// else if(prjEdit!=-1)
					// {
					// 	action='<div class="dropdown for-addnew btn-action " style="cursor: pointer;">'+
					// 				'<span data-toggle="dropdown" aria-haspopup="true"  '+
					// 					'aria-expanded="false" title="Project Action"> <i '+
					// 					'class="fa fa-ellipsis-v" aria-hidden="true"></i>'+
					// 				'</span> '+
					// 				'<div class="add-menu dropdown-menu fz-14">'+
					// 					'<a href="javascript:void(0);" class="edit nav-link" title="Edit" data-id="'+data.DT_RowId+'"><span class="ti-pencil mr-2"></span>Edit</a><a href="javascript:void(0);" class="archive nav-link" title="Archive" data-id="'+data.DT_RowId+'"><span class="ti-archive mr-2"></span>Archive</a>';
					// 				'</div>'+
					// 			'</div>';
					// } 
										
					// return action+'<input type="hidden" name="txtProjName" id="txtProjName" value="'+data.projectname+'"><input type="hidden" name="txtProjDescription" id="txtProjDescription" value="'+data.description+'"><input type="hidden" name="txtProjPlannedStartDate" id="txtProjPlannedStartDate" value="'+data.planstartdate+'"><input type="hidden" name="txtProjPlannedEndDate" id="txtProjPlannedEndDate" value="'+data.planenddate+'">';
					return '';
				}
			}
		],
		
		"drawCallback": function() {
			ellipse();
			$('[data-toggle="tooltip"]').tooltip();
		  } 
	});
	
	// Add event listener for opening and closing details
	$('#projecttable tbody').on('click', 'td.details-control', function () {
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
	
	function dynamic_count(){
		$.ajax({
			url : const_url+"/ProjectService/countdata/",
			type : 'GET',
			contentType : 'application/json',
			success : function(data,textStatus,jQxhr) {
				$.each(data,function(key,entry) {
					$(".count_prjopen").text(entry.projects);
					$(".count_prjctive").text(entry.acitiveprojects);
					$(".count_prjinprg").text(entry.inprogressprojects);
					$(".count_prjarch").text(entry.archiveprojects);
				});
			},
			error: function( jqXhr, textStatus, errorThrown ){
				alert( 'ERROR '+errorThrown );
			}
		});
	}
	
	var $row,projectid;
	
	$('#projecttable tbody').on( 'click', '.edit', function () {
		$row = $(this).closest('tr');
		projectid = oTable.row( $row ).id();
		var projectname = $('td', $row).eq(6).find("#txtProjName").val();
		var projpriority = $('td', $row).eq(2).text();
		var projdescription = $('td', $row).eq(6).find("#txtProjDescription").val();
		var projstatus = $('td', $row).eq(3).find("#txtStatusCode").val();
		var projstartdate = $('td', $row).eq(4).text();
		var projenddate = $('td', $row).eq(5).text();
		var projcreatedby = $('td', $row).eq(6).text();
		var projplannedsd = $('td', $row).eq(6).find("#txtProjPlannedStartDate").val();
		var projplanneded = $('td', $row).eq(6).find("#txtProjPlannedEndDate").val();
		var fetchrow_url = const_url+"/ProjectService/editdata/"+projectid;
		
		$('.modal-container').load(const_url+"/home/project/EditProjectMod",function(result) {
			$('#editproject-details').modal({show : true});
			$("#txtEditProjectName").val(projectname);
			$("#txtEditDescription").val(projdescription);
			$("#txtEditPriority").val(projpriority);
			$("#txtEditStatus").val(projstatus);
			
			$("#txtEditPlannedStartDate").datepicker("setDate", projplannedsd );
			$("#txtEditPlannedDueDate").datepicker("setDate", projplanneded);
			$("#txtEditActualStartDate").datepicker("setDate", projstartdate);
			$("#txtEditActualEndDate").datepicker("setDate", projenddate);
			
			$("#txtEditPlannedDueDate").datepicker('setStartDate', new Date(projplannedsd));
			$("#txtEditActualEndDate").datepicker('setStartDate', new Date(projstartdate));				
			$.datepickercal("txtEditPlannedStartDate", "txtEditPlannedDueDate", "txtEditActualStartDate", "txtEditActualEndDate");
			
			function iformat(icon) {
				var originalOption = icon.element;
				return $('<span><i class="fa ' + $(originalOption).data('icon') + '"></i> ' + icon.text + '</span>');
			}

			$('#txtEditStatus').select2({
				width: 'auto',
				templateSelection: iformat,
				templateResult: iformat,
				allowHtml: true,
				dropdownAutoWidth : true,
				escapeMarkup: function(m) { 
				   return m; 
				}
			});
			$('#txtEditPriority').select2({
				width: 'auto',
				placeholder: "Select Priority"
			});
			
			jQuery('#editproject_form').validate({
				ignore: "",
				errorClass : "input-error",
				errorElement : 'div',
				errorPlacement: function (error, element) {
					if (element.attr("type") == "checkbox") {
						error.insertBefore("ul.list-group");
					}else if(element.next('.select2-container').length) {
						error.insertAfter(element.next('.select2-container'));
						$(".select2-selection").addClass("input-error");	
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
			var arrItems = [];
			$.ajax({
				url : fetchrow_url,
				type : "GET",
				dataType: "json",
				success : function(data,textStatus,jQxhr) {					
					$.each(data,function(key,entry) {
						var element = entry.email;
						arrItems.push(element);
					});
					

					
					$.selectdata("txtEditAddMembers",arrItems);
					
				},
				error: function( jqXhr, textStatus, errorThrown ){
					alert( 'ERROR '+errorThrown );
				}
			});

			
			$('#btnUpdateProject').on( 'click', function (e) {
				
				if ($('#editproject_form').valid()) 
				{
					$('#btnUpdateProject').prop('disabled', true);
					var projectname = $("#txtEditProjectName").val();
					var description = $("#txtEditDescription").val();
					var planstartdate = $("#txtEditPlannedStartDate").val();
					var planenddate = $("#txtEditPlannedDueDate").val();
					var actstartdate = $("#txtEditActualStartDate").val();
					var actenddate = $("#txtEditActualEndDate").val();
					var priority = $("#txtEditPriority").val();
					var members = $('#txtEditAddMembers').val();
					var prjstatus=$('#txtEditStatus').val();					 
					if(members)
					{
						members=members.toString();
					}
					else
					{
						members="";
					}					
					
					var updaterow_url =  const_url+"/ProjectService/updateproject/";
					var dataJSON = JSON.stringify(
					{
						"DT_RowId":projectid,
						"projectname":projectname,
						"priority":priority,
						"actstartdate":actstartdate,
						"actenddate":actenddate,
						"description":description,
						"planstartdate":planstartdate,
						"planenddate":planenddate,
						"members":members,
						"status":prjstatus
					});
									
					$.ajax({
						url : updaterow_url,
						type : 'PUT',
						contentType : 'application/json',
						data : dataJSON,
						beforeSend: function(){
							$(".pj-loading-fa").html("<i class='fa fa-spinner fa-spin'></i>");
						},
						success : function(data,textStatus,jQxhr) {
							oTable.ajax.reload();
							dynamic_count();
							$('#btnUpdateProject').prop('disabled', false);
							$('#editproject-details').modal('hide');
							
							$.snackbar({content: "Project updated successfully.", timeout: 5000});
						},
						error: function( jqXhr, textStatus, errorThrown ){
							$('#btnUpdateProject').prop('disabled', false);
							alert( 'ERROR '+errorThrown );
						}
					});
				}
			});
		});
	} );
	
	//archive project
	$('#projecttable tbody').on( 'click', '.archive', function () {
		$row = $(this).closest('tr');
		projectid = oTable.row( $row ).id();
		var tableRow = oTable.row($(this).parents('tr'));
		var archive_url = const_url+"/ProjectService/archived/"+projectid;
		$('.modal-container').load(const_url+"/home/project/ArchivedProjectPopup",function(result) {
			$('#archiverecord-popup').modal({show : true});
			$('#btnArchive').on( 'click', function (e) {
				$('#btnArchive').prop('disabled', true);
				$.ajax({
					url : archive_url,
					type:"PUT",
					beforeSend: function(){
						$(".loading-fa").html("<i class='fa fa-spinner fa-spin'></i>");
					},
					success : function(data,textStatus,jQxhr) {
						oTable.row( tableRow ).remove().draw(false);	
						dynamic_count();
						$('#archiverecord-popup').modal('hide');
						$.snackbar({content: "Project archived successfully.", timeout: 5000});	
					},
					error: function( jqXhr, textStatus, errorThrown ){
						alert( 'ERROR '+errorThrown );
					}
				});				
			});				
		});	
	});
	
	$('#projecttable tbody').on( 'click', '.delete', function () {
		$row = $(this).closest('tr');
		projectid = oTable.row( $row ).id();
		var tableRow = oTable.row($(this).parents('tr'));
		var delete_url = const_url+"/ProjectService/delete/"+projectid;
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
						}else{
						oTable.row( tableRow ).remove().draw(false);	
							 
								dynamic_count();
								$('#deleterecord-popup').modal('hide');	
								$('#btnDeleteDetails').prop('disabled', false);
								$.snackbar({content: "Project deleted successfully.", timeout: 5000});	
							
						}
						
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
	//add project via email notes popup modal
	$(document).on('click','.addnewprj-email',function()
	{
		$('.addprjemail-popup').modal('show');		
	});
});
