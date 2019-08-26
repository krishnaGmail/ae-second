jQuery(document).ready(function ($) {
    $.form_validator("login_form");
    $(document).on('click', '#btnSubmitLogin', function () {
        if (jQuery('#login_form').valid()) {
            $('#btnSubmitLogin').prop('disabled', true);
            var field_ID = ["txtEmailID", "txtPassword"];
            var data = $.getField_val(field_ID);
            var dataJSON = JSON.stringify(
            {
                "email": data[0],
                "pwd": data[1]
            });
            $.ajax({
                url: "api/login/check",
                type: 'POST',
                contentType: 'application/json',
                data: dataJSON,
                beforeSend: function () {
                    $(".pj-loading-fa").html("<i class='fa fa-spinner fa-spin' style='margin: 0px;padding:0px;font-size: 19px;'></i>");
                },
                success: function (data, textStatus, jQxhr) {
                    if (data.success) {
                        location.href = '/dashboard';
                    }
                    else {
                        toastr.options.positionClass = 'toast-bottom-right';
                        toastr.error(data.msg);
                        $(".pj-loading-fa").html("");
                        $('#btnSubmitLogin').prop('disabled', false);
                    }
                },
                error: function (jqXhr, textStatus, errorThrown) {
                    $('#btnSubmitLogin').prop('disabled', false);
                    $(".pj-loading-fa").html("");
                    alert('ERROR ' + errorThrown);
                }
            });
        }
    });
});
