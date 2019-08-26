jQuery(document).ready(function ($) {
    $.form_validator("signup_form");
    $(document).on('click', '#btnSubmit', function () {
        if (jQuery('#signup_form').valid()) {
            $('#btnSubmit').prop('disabled', true);
            var field_ID = ["txtFname", "txtLname", "txtPhoneNum", "txtEmailID", "txtPassword", "txtConfirmPassword"];
            var data = $.getField_val(field_ID);
            var dataJSON = JSON.stringify(
            {
                "fname": data[0],
                "lname": data[1],
                "phone": data[2],
                "email": data[3],
                "pwd": data[4],
                "cnf_pwd": data[5]
            });
            $.ajax({
                url: "/signup/create",
                type: 'POST',
                contentType: 'application/json',
                data: dataJSON,
                beforeSend: function () {
                    $(".pj-loading-fa").html("<i class='fa fa-spinner fa-spin' style='margin: 0px;padding:0px;font-size:19px'></i>");
                },
                success: function (data, textStatus, jQxhr) {
                    if (data.success) {
                        location.href = '/dashboard';
                    }
                    else {
                        toastr.options.positionClass = 'toast-bottom-right';
                        toastr.error(data.msg);
                        $(".pj-loading-fa").html("");
                        $('#btnSubmit').prop('disabled', false);
                    }
                },
                error: function (jqXhr, textStatus, errorThrown) {
                    $('#btnSubmit').prop('disabled', false);
                    alert('ERROR ' + errorThrown);
                }
            });
        }
    });
});
