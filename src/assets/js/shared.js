
jQuery(document).ready(function ($) {
    $(".user-menu").niceScroll();
    $.ellipse=function ellipse() {
        var divs = $(".wrapellipse");
        var showChar = 30;
        var ellipsestext = "...";
        $(divs).each(function () {
            var content = $(this).html();
            if (content.length > showChar) {
                var c = content.substr(0, showChar);
                var html = c + ' ' + ellipsestext + '  ';
                $(this).html(html);
            }
        });
    }
    $.getField_val = function (field_ID) {
        var data = [];
        $.each(field_ID, function (index, id) {
            data.push($("#" + id).val());
        });
        return data;
    }
    $.datepickercal = function (txt1, txt2, txt3, txt4) {
        var plannedstartdate = $('#' + txt1);
        var plannedenddate = $('#' + txt2);
        var actualstartdate = $('#' + txt3);
        var actualenddate = $('#' + txt4);
        //Planned Start Dates
        plannedstartdate.datepicker({
            todayHighlight: true,
            autoclose: true
        }).on('changeDate', function () {
            console.log($(this).val());
            plannedenddate.datepicker('setStartDate', new Date($(this).val())); //set PlannedStartDate as start date for PlannedDueDate and ActualStartDate
        });
        //Planned Due Date
        plannedenddate.datepicker({
            todayHighlight: true,
            autoclose: true
        }).on('changeDate', function () {
            plannedstartdate.datepicker('setEndDate', new Date($(this).val())); //set PlannedDueDate as end date for PlannedStartDate
        });
        //Actual Start Date
        actualstartdate.datepicker({
            todayHighlight: true,
            autoclose: true
        }).on('changeDate', function () {
            actualenddate.datepicker('setStartDate', new Date($(this).val())); //set ActualStartDate as start date for ActualEndDate
        });
        //Actual End Date
        actualenddate.datepicker({
            todayHighlight: true,
            autoclose: true
        }).on('changeDate', function () {
            actualstartdate.datepicker('setEndDate', new Date($(this).val())); //set ActualEndDate as end date for PlannedDueDate and ActualStartDate						
        });
        //Make all datepicker input fields as readonly
        $('.datepickercal').click(function (event) {
            event.preventDefault();
            $(this).prev().focus();
        });
        //End of datepicker//
        $('[data-toggle="tooltip"]').tooltip();
    }
    //select2
    $.selectdata = function (selecttxt, selectMem) {
        var addmemberauto = $('#' + selecttxt);
        function formatResult(data) {
            var emailid = $(data.element).data('email');
            var $result = $(
                '<div>' + data.text + '</div><div><small style="color:#726F6F">' + emailid + '</small></div>'
            );
            return $result;
        }
        function formatResultSelection(data) {
            return data.text;
        }
        addmemberauto.select2({
            placeholder: "Start typing...",
            allowClear: true,
            width: "100%",
            matcher: function (params, data) {
                if ($.trim(params.term) === '') { return data; }
                if (typeof data.text === 'undefined') { return null; }
                var q = params.term.toLowerCase();
                if (data.text.toLowerCase().indexOf(q) > -1 || data.id.toLowerCase().indexOf(q) > -1) {
                    return $.extend({}, data, true);
                }
                return null;
            },
            templateResult: formatResult,
            templateSelection: formatResultSelection,
            language: {
                noResults: function () {
                    fetchedVal = event.target.value;
                    inviteSelector = addmemberauto;
                    return '<a href="javascript:void(0);" id="linkPopup" class="select2-searchresult"><i class="fa fa-envelope"></i>&nbsp;Invite new user <b>' + fetchedVal + '</b></a>';
                }
            },
            escapeMarkup: function (m) {
                return m;
            }
        });
        //disable auto sorting
        addmemberauto.on("select2:select", function (evt) {
            var element = evt.params.data.element;
            var $element = $(element);
            $(element).detach();
            $(this).append($element);
            $(this).trigger("change");
        });
        // Fetch member list
        var url = const_url + "/GetMemberService/memberlist/";
        if (selectMem != "") {
            addmemberauto.empty();
            $.getJSON(url, function (data) {
                $.each(data, function (key, entry) {
                    var email = entry.email;
                    var fname = entry.firstname;
                    var lname = entry.lastname;
                    var domainid = entry.domain_idfk;
                    var partenerid = entry.partner_idfk;
                    var dropdown = addmemberauto;
                    dropdown.append('<option data-email="' + email + '" value="' + email + '">' + fname + ' ' + lname + '</option>');
                });

                addmemberauto.val(selectMem).trigger('change');

            });

        }
        else {
            $.getJSON(url, function (data) {
                $.each(data, function (key, entry) {
                    var email = entry.email;
                    var fname = entry.firstname;
                    var lname = entry.lastname;
                    var domainid = entry.domain_idfk;
                    var partenerid = entry.partner_idfk;
                    var dropdown = addmemberauto;
                    dropdown.append('<option data-email="' + email + '" value="' + email + '">' + fname + ' ' + lname + '</option>');
                });

            });
        }

    }

    $.form_validator = function (formId) {
        $('#' + formId).validate({
            ignore: "",
            errorClass: "input-error",
            errorElement: 'div',
            errorPlacement: function (error, element) {
                if (element.attr("type") == "checkbox") {
                    error.insertBefore("ul.list-group");
                } else if (element.next('.select2-container').length) {
                    error.insertAfter(element.next('.select2-container'));
                    //$(".select2-selection").addClass("input-error");							
                } else {
                    error.insertAfter(element);
                }
            },
            invalidHandler: function (e, validator) {
                if (validator.errorList.length) {
                    $('#tabslist a[href="#' + jQuery(validator.errorList[0].element).closest(".tab-pane").attr('id') + '"]').tab('show');
                }
            }
        });
    };

    $.ticket_chart = function (chartData) {
        if ($("#myChart").length > 0) {
            var ctx = document.getElementById("myChart").getContext('2d');
            var myChart = new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: ["Open", "In Progress", "On Hold", "Close"],
                    datasets: [{
                        label: '#',
                        data: chartData,
                        backgroundColor: [
                            '#ffc107',

                            '#17a2b8',

                            '#dc3545',
                            '#343a40'

                        ],
                        borderColor: "transparent"
                    }],
                },

                options: {
                    maintainAspectRatio: false,
                    cutoutPercentage: 60,
                    legend: {
                        display: !1
                    }
                },
                plugins: [{
                    afterDraw: function (chart) {
                        if (chartData.length == 0) {

                            // No data is present
                            var ctx = chart.chart.ctx;
                            var width = chart.chart.width;
                            var height = chart.chart.height
                            chart.clear();
                            ctx.save();
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'middle';
                            ctx.font = "40px";
                            ctx.fontWeight = "600";
                            ctx.fillText('No data to display', width / 2, height / 2);
                            ctx.restore();
                        }

                    }
                }],
            });
        }
    }
});