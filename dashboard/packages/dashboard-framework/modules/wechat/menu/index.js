Template.wxMenu.onCreated(function() {
    this.subscribe("wxMenu", { onReady: function() {} });
});
Template.wxMenu.helpers({
    menu: function(parent) {

        return WxMenu.find({ parent: parent }, { sort: { orderBy: 1 } });
    },

    wxMedia: function() {
        return {
            method: "wxMedia.all",
            fields: { category: 1, title: 1, url: 1, },
            selector: function() {
                return { first: true }
            },
            sort: { createdAt: -1 },
            limit: 10,
            columns: [

                {
                    title: "标题",
                    data: "title",
                }, {
                    title: "操作",
                    width: 60,
                    render: function(row) {

                        return "<a href='' onclick=\"_wxMenu.select(\'media:" + row._id + "\')\" > 选择 </a> ";
                    },
                }
            ],
        }
    },
    wxActive: function() {
        return {
            method: "wxActive.all",
            fields: { category: 1, name: 1, },
            selector: function() {
                return {}
            },
            sort: { createdAt: -1 },
            columns: [{
                title: "名称",
                data: "name",
            }, {
                title: "操作",
                width: 60,
                render: function(row) {

                    return "<a href='' onclick=\"_wxMenu.select(\'active:" + row._id + "\')\" > 选择 </a> ";
                },
            }],
        }
    },
    wxMediaCategory: function() {
        return {
            method: "wxMedia.category.all",
            fields: { category: 1, name: 1, },
            selector: function() {
                return {}
            },
            sort: { createdAt: -1 },
            columns: [{
                title: "名称",
                data: "name",
            }, {
                title: "操作",
                width: 60,
                render: function(row) {

                    return "<a href='' onclick=\"_wxMenu.select(\'cmedia:" + row._id + "\')\" > 选择 </a> ";
                },
            }],
        }
    },
    wxActiveCategory: function() {
        return {
            method: "wxActive.category.all",
            fields: { category: 1, name: 1, },
            selector: function() {
                return {}
            },
            sort: { createdAt: -1 },
            columns: [{
                title: "名称",
                data: "name",
            }, {
                title: "操作",
                width: 60,
                render: function(row) {

                    return "<a href='' onclick=\"_wxMenu.select(\'cactive:" + row._id + "\')\" > 选择 </a> ";
                },
            }],
        }
    },
    target: function() {
        return Session.get("wxMenuTarget");
    },
    isCreate: function() {
        var wmt = Session.get("wxMenuTarget");
        if (wmt && wmt._id == "root") {
            if (WxMenu.find({ parent: "root" }).count() > 2) {
                return false;
            }
        } else {
            if (wmt && wmt.parent != "root") {
                if (WxMenu.find({ parent: wmt.parent }).count() > 4) {
                    return false;
                }
            }

        }
        return true;
    },
    isSave: function() {
        var wmt = Session.get("wxMenuTarget");
        if (wmt && wmt._id != "root") {
            return true;
        }
    },
    isDelete: function() {
        var wmt = Session.get("wxMenuTarget");
        if (wmt && wmt._id != "root") {
            return true;
        }
    },
    targetText: function() {
        var wmt = Session.get("wxMenuTarget");
        if (wmt && wmt._id != "root") {
            return wmt.text;
        }
    },
    media: function() {
        return WxMedia.findOne({ _id: this.link });
    },
    active: function() {
        return WxActive.findOne({ _id: this.link });
    },
    category: function() {
        return Category.findOne({ _id: this.link });
    },
    children: function() {
        return WxMenu.find({ parent: this._id }).count() > 0;
    }
});
Template.wxMenu.events({
    "click #root": function() {
        Session.set("wxMenuTarget", { _id: "root", text: "根目录" })
    },
    "click #save": function() {
        var wxt = Session.get("wxMenuTarget")
        var obj = {
            text: $("#text").val(),
            url: $("#url").val(),
            orderBy: $("#orderBy").val() * 1,
            parent: wxt._id,
            click:0,
        }
        if (obj.url.indexOf("http:") == 0) {
            obj.type = "url";
        } else if (obj.url.indexOf("https:") == 0) {
            obj.type = "url";
        } else if (obj.url.indexOf("media:") == 0) {
            obj.type = "media";
            obj.link = obj.url.split(":")[1];
        } else if (obj.url.indexOf("active:") == 0) {
            obj.type = "active";
            obj.link = obj.url.split(":")[1];
        } else if (obj.url.indexOf("cmedia:") == 0) {
            obj.type = "cmedia";
            obj.link = obj.url.split(":")[1];
        } else if (obj.url.indexOf("cactive:") == 0) {
            obj.type = "cactive";
            obj.link = obj.url.split(":")[1];
        } else if (obj.url.indexOf("text:") == 0) {
            obj.type = "text";
            obj.link = obj.url.split(":")[1];
        }
        if (obj.text && obj.url) {
            WxMenu.insert(obj);
        } else {
            toastr.error("请填写和URL");
        }

    },
    "click .wxMenu .item": function() {
        Session.set("wxMenuTarget", this)
    },
    "click .item2": function() {
        Session.set("wxMenuTarget", this)
        return false;
    },
    "click  .wxMenu  #delete": function() {
        var wmt = Session.get("wxMenuTarget");
        WxMenu.remove(wmt._id);
        Session.set("wxMenuTarget", { _id: "root", text: "根目录" });
    },
    "click #update": function() {

        var wxt = Session.get("wxMenuTarget")

        var obj = {
            text: $("#text").val(),
            url: $("#url").val(),
            orderBy: $("#orderBy").val() * 1,
        }
        if (obj.url.indexOf("http:") == 0) {
            obj.type = "url";
        } else if (obj.url.indexOf("https:") == 0) {
            obj.type = "url";
        } else if (obj.url.indexOf("media:") == 0) {
            obj.type = "media";
            obj.link = obj.url.split(":")[1];
        } else if (obj.url.indexOf("active:") == 0) {
            obj.type = "active";
            obj.link = obj.url.split(":")[1];
        } else if (obj.url.indexOf("cmedia:") == 0) {
            obj.type = "cmedia";
            obj.link = obj.url.split(":")[1];
        } else if (obj.url.indexOf("cactive:") == 0) {
            obj.type = "cactive";
            obj.link = obj.url.split(":")[1];
        } else if (obj.url.indexOf("text:") == 0) {
            obj.type = "text";
            obj.link = obj.url.split(":")[1];
        }
        if (obj.text && obj.url) {
            WxMenu.update({ _id: wxt._id }, { $set: obj });
        } else {
            toastr.error("请填写和URL");
        }

    },
    "click #sync": function() {
        Meteor.call("wxMenuSync", function(err, res) {
            toastr.success("同步已完成，请在公众号中查看。");
        })
    }
});
Template.wxMenu.onRendered(function() {
    // Meteor.call("wxMenuLoad",function(err,res){
    // 	Session.set("wxMenu",res);
    // 	console.log(res);
    // })
    $('.menu .item').tab({});
    Session.set("wxMenuTarget", { _id: "root", text: "根目录" })
});
_wxMenu = {
    select: function(url) {
        $("#url").val(url);
    }
}
