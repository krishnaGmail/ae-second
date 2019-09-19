jQuery(document).ready(function ($) {
    $(document).on( 'click', '#compModal', function () {
        $('#company-details').modal({ show: true , backdrop: 'static',
        keyboard: false,});
        $.hasClassadd();
        $('[data-toggle="tooltip"]').tooltip();
        $(".cmpError-msg").hide();
        $.form_validator("companydetails_form");
       
        $('.selectIndu').select2({
            width: 'auto',
            placeholder: "Select"
        });
        var dropdown = $('#txtCompanyType');
        dropdown.empty();
        var url = "assets/js/industryfetchjson.js";
        $.getJSON(url, function (data) {
            $.each(data, function (key, entry) {
                dropdown.append($('<option></option>').attr('value', entry.val).text(entry.name));
            })
        });
    });   
   
    
    $(document).on('click', '#btnSubmit_cmp', function () {
        const token=JSON.parse(localStorage.getItem('token'));
        if (jQuery('#companydetails_form').valid()) {
            $('#btnSubmit_cmp').prop('disabled', true);
            var field_ID = ["txtCompanyName", "txtDomainUrl", "txtCompanyType"];
            var data = $.getField_val(field_ID);
            var dataJSON = JSON.stringify(
                {
                    "partnername": data[0],
                    "description": data[1],
                    "industrytype": data[2]
                });
           
            $.ajax({
                url: "/api/company/create",
                type: 'POST',
                contentType: 'application/json',
                data: dataJSON,
                headers: {
                    'Authorization':'Bearer '+ token,
                },
                beforeSend: function () {
                    $(".cmp-loading-fa").html("<i class='fa fa-spinner fa-spin' style='margin: 0px;padding:0px;font-size: 19px;'></i>");
                },
                success: function (data, textStatus, jQxhr) {
                    if (data.success) {
                        localStorage.clear();
                        localStorage.setItem('userData', JSON.stringify(data.userData));
                        localStorage.setItem('token', JSON.stringify(data.token));
                        location.href = '/dashboard';
                    }
                    else {
                        $(".cmpError-msg").show();
                        $(".cmpError-msg").text(data.msg);
                        $(".cmp-loading-fa").html("");
                        $('#btnSubmit_cmp').prop('disabled', false);
                        setTimeout(function () {
                            $(".cmpError-msg").text("");
                            $(".cmpError-msg").hide();
                        }, 3000);
                    }
                },
                error: function (jqXhr, textStatus, errorThrown) {
                    $('#btnSubmit_cmp').prop('disabled', false);
                    $(".cmp-loading-fa").html("");
                    alert('ERROR ' + errorThrown);
                }
            });
        }
    });
    //new workspace
	/*$('.linkaddworkspace').on("click",function() {
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
			var url = "../resources/assets/js/industryfetchjson.js";
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
	});*/
});