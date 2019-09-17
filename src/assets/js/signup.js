jQuery(document).ready(function ($) {
    $.hasClassadd();
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
                url: "/api/signup/create",
                type: 'POST',
                contentType: 'application/json',
                data: dataJSON,
                beforeSend: function () {
                    $(".pj-loading-fa").html("<i class='fa fa-spinner fa-spin' style='margin: 0px;padding:0px;font-size:19px'></i>");
                },
                success: function (data, textStatus, jQxhr) {
                    if (data.success) {
                        localStorage.clear();
                        localStorage.setItem('userData', JSON.stringify(data.userData));
                        localStorage.setItem('token', JSON.stringify(data.token));
                        location.href = '/dashboard';
                    }
                    else {
                        toast.error(data.msg);
                        $(".pj-loading-fa").html("");
                        $('#btnSubmit').prop('disabled', false);
                    }
                },
                error: function (jqXhr, textStatus, errorThrown) {
                    $('#btnSubmit').prop('disabled', false);
                    $(".pj-loading-fa").html("");
                    alert('ERROR ' + errorThrown);
                }
            });
        }
    });
});
