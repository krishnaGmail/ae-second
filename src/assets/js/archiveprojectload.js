jQuery(document).ready(function($){
	var oTable = jQuery('#archiveprojecttable').DataTable( {
		"processing": true,
		"language": 
		{          
		"processing": "<i class='fa fa-spinner fa-spin fa-2x'></i>",
		"loadingRecords": "<i class='fa fa-spinner fa-spin fa-2x'></i>",
		},
		"sAjaxSource": const_url+"/ProjectService/Achivelist/",
		"iDisplayLength": 10,
		"bLengthMenu": [[5, 10, 25, 50, -1], [5, 10, 25, 50, "All"]],
		"bFilter": true, //to show search
		"deferRender": true,
		"columns": [
			{ data: "projectname" },			
			{ data: "",
			  "defaultContent": ''
			},
			{ data: "",
			  "defaultContent": ''
			},
			{ 
				data: null, 
				render: function ( data, type, row ) {
					return '<span class="badge badge-secondary font-1xl">'+data.status+'</span><input type="hidden" name="txtStatusCode" id="txtStatusCode" value="'+data.statuscode+'">';
				}
			},
			{
				data: null, 
				render: function ( data, type, row ) {
					return '<a href="javascript:void(0);" class="unarchive font-2xl" title="Unarchive" data-toggle="tooltip" data-id="'+data.DT_RowId+'"><i class="fa fa-undo"></i></a> <a href="javascript:void(0);" class="delete font-2xl" title="Remove" data-toggle="tooltip" data-id="'+data.DT_RowId+'"><span class="ti-trash"></span></a>';
				}
			}
		],
		"drawCallback": function() {
			$('[data-toggle="tooltip"]').tooltip({trigger : 'hover'});
		  } 
	});
	
	var $row,projectid;
	$('#archiveprojecttable tbody').on( 'click', '.unarchive', function () {
		$row = $(this).closest('tr');
		projectid = oTable.row( $row ).id();
		var tableRow = oTable.row($(this).parents('tr'));
		$.snackbar({content: "Project unarchived successfully.", timeout: 5000});
		var unarchive_url = const_url+"/ProjectService/unarchived/"+projectid;
		$.ajax({
			url : unarchive_url,
			type:"PUT",
			success : function(data,textStatus,jQxhr) {
				oTable.row( tableRow ).remove().draw(false);
				$.snackbar({content: "Project unarchived successfully.", timeout: 5000});
			},
			error: function( jqXhr, textStatus, errorThrown ){
				alert( 'ERROR '+errorThrown );
			}
		});
	});
	
	$('#archiveprojecttable tbody').on( 'click', '.delete', function () {
		$row = $(this).closest('tr');
		projectid = oTable.row( $row ).id();
		var tableRow = oTable.row($(this).parents('tr'));
		var delete_url = const_url+"/ProjectService/delete/"+projectid;
		$('.modal-container').load(const_url+"/home/DeleteRecord",function(result) {
			$('#deleterecord-popup').modal({show : true});
			$('#btnDeleteDetails').on( 'click', function (e) {
				$.ajax({
					url : delete_url,
					type:"DELETE",
					beforeSend: function(){
						$(".loading-fa").html("<i class='fa fa-spinner fa-spin'></i>");
					},
					success : function(data,textStatus,jQxhr) {
						oTable.row( tableRow ).remove().draw(false);
						$('#deleterecord-popup').modal('hide');	
						$.snackbar({content: "Project deleted successfully.", timeout: 5000});
					},
					error: function( jqXhr, textStatus, errorThrown ){
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
