
Meteor.methods({
    "wxActive.all": function(sel, pro) {

        var objs = WxActive.find(sel, pro).fetch();
       
        for (var i = 0; i < objs.length; i++) {

            if (objs[i].category) {
                var ca = Category.findOne({ _id: objs[i].category });
                if (ca) {
                    objs[i].category_name = ca.name;
                }
            } else {
                objs[i].category_name = "未分类";
            }

            objs[i].picture_count = WxActivePictures.find({status:true,active:objs[i]._id}).count();
            objs[i].member_count = WxActiveUsers.find({active:objs[i]._id}).count();
        }
        return {
            rows: objs,
            total: WxActive.find(sel, pro).count()
        };
    }
});