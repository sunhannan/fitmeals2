Template.wxMedia.onCreated(function() {
    // this.subscribe("wxMediaBase",{onReady:function(){}});
});
Template.wxMedia.helpers({
    option: function() {
        return {
            method: "wxMedia.all",
            fields: { category: 1, title: 1, thumb: 1, status: 1, url: 1, digest: 1 ,recommend:1,open:1},
            selector: function() {
                return {}
            },
            sort: { createdAt: -1 },
            columns: [{
                    title: "封面",
                    width:100,
                    render: function(row) {

                        var arr = [];

                        arr.push("<img width='80'  class='' src='" + row.thumb + "?x-oss-process=image/resize,m_pad,w_80,h_80,limit_0/auto-orient,0/quality,q_90'/>");


                        return arr.join("");
                    },
                },

                {
                    title: "标题",
                    render: function(row) {

                        var arr = [];

                        arr.push('<h4 class="ui  header">');

                        arr.push('<div class="content" >');
                        arr.push("<a target='_blank' href='" + row.url + "'>" + row.title + "</a>");

                        if (row.digest) {
                            arr.push('<div class="sub header">' + row.digest + "</div>");
                        }
                        arr.push('</div>');
                        arr.push('</h4>');


                        return arr.join("");
                    }
                }, {
                    title: "排序",
                    data: "orderBy"
                },{
                    title: "打开",
                    width: 60,
                    data: "open"
                }, {
                    title: "状态",
                    width: 60,
                    render: function(row) {


                        return row.status ? "上线" : "下线";
                    },
                },{
                    title: "推荐",
                    width: 60,
                    render: function(row) {


                        return row.recommend ? "是" : "否";
                    },
                }, {
                    title: "分类",
                    width: 100,
                    data: "category_name"
                }, {
                    title: "操作",
                    width: 240,
                    render: function(row) {

                        var arr = [];

                        arr.push("<a href='' onclick=\"_wxMedia.delete(\'" + row._id + "\')\" > 删除 </a> ");

                        arr.push("<a href='/wx/media/edit?id=" + row._id + "'> 修改</a> ");

                        arr.push("<a href='' onclick=\"qrcode.show(\'" + row.url + "\')\" > 预览 </a>");

                        return arr.join("|");
                    },
                }
            ],
        }
    }
});
Template.wxMedia.events({
    "click #sync": function() {
        $("#sync").find(".fa-cloud-download").hide();
        $("#sync").find(".fa-refresh").show();

        Meteor.call("wxMedia.sync", function(err, res) {
            if (err) {
                toastr.error(err.reason);
            } else {
                toastr.success("共发现素材:" + res.total + ",其中新增:" + res.inc);
            }

            $("#sync").find(".fa-cloud-download").show();
            $("#sync").find(".fa-refresh").hide();
            grid.flash("wxMedia");
        });
    }
});
Template.wxMedia.onRendered(function() {

});
_wxMedia = {
    delete: function(id) {
        if (confirm("确认删除这条数据")) {
            WxMedia.update({ _id: id }, { status: true });
            grid.flash("wxMedia");
        }
    },
}
