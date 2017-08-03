Template.wxActive.onCreated(function() {
    // this.subscribe("wxActiveBase",{onReady:function(){}});
});
Template.wxActive.helpers({
    option: function() {
        return {
            method: "wxActive.all",
            fields: { category: 1, name: 1, thumb: 1, status: 1, url: 1, summary: 1 ,recommend:1,isOpen:1,pwd:1},
            selector: function() {
                return {}
            },
            sort: { orderBy:-1,updatedAt: -1 },
            columns: [{
                    title: "封面",
                    width:100,
                    render: function(row) {

                        var arr = [];

                        arr.push("<img  class='' src='" + row.thumb + "?x-oss-process=image/resize,m_pad,w_80,h_80,limit_0/auto-orient,0/quality,q_90'/>");


                        return arr.join("");
                    },
                },

                {
                    title: "名称",
                    render: function(row) {

                        var arr = [];

                        arr.push('<h4 class="ui  header">');

                        arr.push('<div class="content" >');
                        arr.push(row.name);

                        if (row.summary) {
                            arr.push('<div class="sub header">' + row.summary + "</div>");
                        }
                        arr.push('</div>');
                        arr.push('</h4>');


                        return arr.join("");
                    }
                }, {
                    title: "排序",
                    width:60,
                    data: "orderBy"
                }, {
                    title: "状态",
                    width: 60,
                    render: function(row) {


                        return row.status ? "上线" : "下线";
                    },
                }, {
                    title: "上传",
                    width:60,
                    render: function(row) {

                        return row.isOpen ? "开放" : "关闭";
                    },
                }, {
                    title: "密码",
                    width: 60,
                    render: function(row) {

                        return row.pwd ? row.pwd : "无";
                    },
                },{
                    title: "推荐",
                    width: 60,
                    render: function(row) {


                        return row.recommend ? "是" : "否";
                    },
                },{
                    title: "分类",
                    width: 60,
                    data: "category_name"
                }, {
                    title: "照片",
                    width: 60,
                    render: function(row) {
                        return row.picture_count > 0 ? ("<a href='/wx/active/picture?id=" + row._id + "'> "+row.picture_count+"</a> ") : 0;
                    },
                }, {
                    title: "参与",
                    width: 60,
                    render: function(row) {
                        return row.member_count > 0 ? ("<a href='/wx/active/member?id=" + row._id + "'> "+row.member_count+"</a> ") : 0;
                    },
                },  {
                    title: "操作",
                    width: 140,
                    render: function(row) {

                        var arr = [];

                        arr.push("<a href='' onclick=\"_wxActive.delete(\'" + row._id + "\')\" > 删除 </a> ");
                        arr.push("<a href='/wx/active/edit?id=" + row._id + "'> 修改</a> ");
                        arr.push("<a href='' onclick=\"qrcode.show(\'" + (framework.client.wechat + "/wx/active/detail?id=" + row._id) + "\')\" > 预览 </a>");

                        return arr.join("|");
                    },
                }
            ],
        }
    }
});
Template.wxActive.events({
    "click #sync": function() {
        $("#sync").find(".fa-cloud-download").hide();
        $("#sync").find(".fa-refresh").show();
        Meteor.call("wxActive.sync", function(err, res) {
            if (err) {
                toastr.error(err.reason);
            } else {
                toastr.success("共发现素材:" + res.total + ",其中新增:" + res.inc);
            }

            $("#sync").find(".fa-cloud-download").show();
            $("#sync").find(".fa-refresh").hide();
            grid.flash("wxActive");
        });
    }
});
Template.wxActive.onRendered(function() {

});
_wxActive = {
    delete: function(id) {
        if (confirm("确认删除这条数据")) {
            wxActive.update({ _id: id }, { status: true });
            grid.flash("wxActive");
        }
    },
}
