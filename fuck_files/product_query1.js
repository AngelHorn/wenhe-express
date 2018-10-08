$(document).ready(function () {

    // 查询到多条记录
    $('#record_select .weui_cells').on('click', 'label p', function () {
        var record = $(this).parents('label[data-record]').data('record');
        var baseurl = $(this).parents('.weui_cells[data-baseurl]').data('baseurl');
        var url = baseurl + '/' + record;
        window.location.href = url;
    });

    // 初始查询
    if (queryNo.length > 0) {
        //request_query(queryNo, queryCompany);
    }

    // 选择快递公司select
    $(document).on('click', '.select_company', show_select_company);

    // ActionSheet
    $('#header_sheet').on('click', show_header_sheet);

    $('#input_query_str').on('focus', function () {
        $('footer').hide();
    }).on('blur', function () {
        $('footer').show();
    });

});

function request_query(no, company) {
    $('#bill_info, #bill_detail, #bill_error').hide();
    $.showLoading("正在查询...");
    var request = $.ajax({
        //url: "http://apis.dh.cx/query/json",
        url: "/json",
        type: 'POST',
        dataType: 'json',
        data: 'no=' + no + '&company=' + company
    });
    $.hideLoading();
    //request.done(handle_ret_query);
    //request.fail(handle_ret_error);
}

function handle_ret_query(ret) {
    if (ret.status == 'success' && ret.message.length == 0) {
        handle_ret_success(ret);
    } else {
        handle_ret_error(ret);
    }
    $('.text_company').text(ret.company.name);
    $('.text_company_full').text(ret.company.fullname);
    //$('.link_company_page').attr('href', 'http://apis.dh.cx/' + ret.company.code);
}

function handle_ret_success(ret) {
    $.hideLoading();
    //var html = '<div class="weui_media_box"><p class="weui_media_desc">'
    //    + ret.data.data[0].context
    //    + '</p><p class="weui_media_desc"><small><span class="label label-info">'
    //    + ret.data.data[0].diff + '</span>&nbsp;'
    //    + ret.data.data[0].year + '-'
    //    + ret.data.data[0].day + ' '
    //    + ret.data.data[0].time + '</small></p></div>';
    var html = '<div class="weui_media_box"><p class="weui_media_desc">'
        + ret.Result.WaybillProcessInfo[0].ProcessInfo
        + '</p><p class="weui_media_desc"><small>' +
        ret.Result.WaybillProcessInfo[0].Upload_Time
        + '</small></p></div>';
    for (var i = 1; i < ret.Result.WaybillProcessInfo.length; i++) {
        html += '<div class="weui_media_box"><p class="weui_media_desc">'
        + ret.Result.WaybillProcessInfo[i].ProcessInfo
        + '</p><p class="weui_media_desc"><small>'
        + ret.Result.WaybillProcessInfo[i].Upload_Time
        + '</small></p></div>';
    }
    $('#bill_detail_list').html(html);
    $('#bill_info, #bill_detail').show();

}

function handle_ret_error(ret) {
    $.hideLoading();
    //$('#error_official').toggle(ret.company.name.length != 0).find('a:first').attr('href', ret.company.website);
    //$("#what_exp").html(ret.company.fullname ? ret.company.fullname : '无法识别')
    $('#record_info').hide();
    $('#bill_info').hide();
    $('#bill_detail').hide();
    $('#bill_error').show();
}

function show_select_company(e) {
    e.preventDefault();

    $(".select_company").select({
        title: "选择快递公司",
        items: [{
            title: '顺丰',
            value: 'shunfeng'
        }, {
            title: '申通',
            value: 'shentong'
        }, {
            title: '圆通',
            value: 'yuantong'
        }, {
            title: '中通',
            value: 'zhongtong'
        }, {
            title: '百世快递',
            value: 'huitong'
        }, {
            title: '韵达',
            value: 'yunda'
        }, {
            title: '天天',
            value: 'tiantian'
        }, {
            title: 'EMS',
            value: 'ems'
        }, {
            title: '速尔',
            value: 'suer'
        }, {
            title: 'UC优速',
            value: 'yousu'
        }, {
            title: '宅急送',
            value: 'zhaijisong'
        }, {
            title: '德邦',
            value: 'debang'
        }, {
            title: 'DHL',
            value: 'dhl'
        }, {
            title: '国通',
            value: 'guotong'
        }, {
            title: '快捷',
            value: 'kuaijie'
        }, {
            title: '全峰',
            value: 'quanfeng'
        }, {
            title: '安能',
            value: 'anneng'
        }, {
            title: '京东',
            value: 'jingdong'
        }, {
            title: '天地华宇',
            value: 'tiandihuayu'
        }, {
            title: 'UPS',
            value: 'ups'
        }, {
            title: 'FedEx中国 联邦快递',
            value: 'fedexcn'
        }, {
            title: 'FedEx联邦快递',
            value: 'fedex'
        }, {
            title: '龙邦',
            value: 'longbang'
        }, {
            title: '联昊通',
            value: 'lianhaotong'
        }, {
            title: '邮政',
            value: 'youzheng'
        }, {
            title: '百世快运',
            value: 'baishikuaiyun'
        }, {
            title: '安鲜达',
            value: 'exfresh'
        }, {
            title: '跨越速运',
            value: 'kuayue'
        }, {
            title: '全一快递',
            value: 'quanyikuaidi'
        }, {
            title: '安能快递',
            value: 'annengkuaidi'
        }],
        closeText: '关闭',
        onChange: function (d) {
            company = d.values;
            request_query(queryNo, company);
        }
    });
    $(".select_company").select("open");
}

function show_header_sheet() {
    $.actions({
        actions: [{
            text: "查快递",
            onClick: function () {
                window.location.href = 'http://www.yichadan.com';
            }
        }, {
            text: "功能特点",
            onClick: function () {
                window.location.href = 'http://www.yichadan.com/feature';
            }
        }, {
            text: "版本价格",
            onClick: function () {
                window.location.href = 'http://www.yichadan.com/price';
            }
        }, {
            text: "关于我们",
            onClick: function () {
                window.location.href = 'http://www.yichadan.com/about';
            }
        }]
    });
}
