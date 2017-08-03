Meteor.methods({
    wxMenuSync: function() {


        var roots = WxMenu.find({ parent: "root" },{sort:{orderBy:1}}).fetch();

        var obj = { button: [] }

        for (var i = 0; i < roots.length; i++) {
            var rm = roots[i];

            var obj_1 = { name: rm.text }

            var cmenus = WxMenu.find({ parent: rm._id },{sort:{orderBy:1}}).fetch();

            if (cmenus.length) {
                obj_1.sub_button = [];
                for (var j = 0; j < cmenus.length; j++) {

                    var cm = cmenus[j];

                    var obj_2 = { name: cm.text };

                    if (cm.type == "url") {
                        obj_2.type = "view";
                        obj_2.url = cm.url;
                    } else if (cm.type == "media") {
                        obj_2.type = "media_id";
                        var media = WxMedia.findOne({ _id: cm.link });
                        obj_2.media_id = media.media_id;
                    } else if (cm.type == "active") {
                        obj_2.type = "view";
                        obj_2.url = framework.client.wechat + "/wx/active/detail?id=" + cm.link;
                    } else if (cm.type == "cmedia") {
                        obj_2.type = "view";
                        obj_2.url = framework.client.wechat + "/wx/media?id=" + cm.link;
                    } else if (cm.type == "cactive") {
                        obj_2.type = "view";
                        obj_2.url = framework.client.wechat + "/wx/active?id=" + cm.link;
                    } else if (cm.type == "text") {
                        obj_2.type = "click";
                        obj_2.key = cm.link;
                    }

                    obj_1.sub_button.push(obj_2);
                }
            } else {
                if (rm.type == "url") {
                    obj_1.type = "view";
                    obj_1.url = rm.url;
                } else if (rm.type == "media") {
                    obj_1.type = "media_id";
                    var media = WxMedia.findOne({ _id: rm.link });
                    obj_1.media_id = media.media_id;
                } else if (rm.type == "active") {
                    obj_1.type = "view";
                    obj_1.url = framework.client.wechat + "/wx/active/detail?id=" + rm.link;
                } else if (rm.type == "rmedia") {
                    obj_1.type = "view";
                    obj_1.url = framework.client.wechat + "/wx/media?id=" + rm.link;
                } else if (rm.type == "cactive") {
                    obj_1.type = "view";
                    obj_1.url = framework.client.wechat + "/wx/active?id=" + rm.link;
                } else if (rm.type == "text") {
                    obj_1.type = "click";
                    obj_1.key = rm.link;
                }
            }

            obj.button.push(obj_1);
        }
       console.log(JSON.stringify(obj));
       var res = HTTP.post("https://api.weixin.qq.com/cgi-bin/menu/create?access_token=" + framework.wechat.token(),{data:obj});
       console.log(res.content);
    },

    "wxActive.category.all": function(sel, pro) {
        return {
            rows: Category.find({ type: "wx-active" }).fetch(),
            total: Category.find({ type: "wx-active" }).count()
        };
    },
    "wxMedia.category.all": function(sel, pro) {
        return {
            rows: Category.find({ type: "wx-media" }).fetch(),
            total: Category.find({ type: "wx-media" }).count()
        };
    }
})
