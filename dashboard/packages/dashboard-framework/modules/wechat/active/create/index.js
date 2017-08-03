Template.wxActiveCreate.onCreated(function() {
    this.subscribe("categoryByType",'wx-active');
});


Template.wxActiveCreate.helpers({
    categorys: function(pid) {
        return Category.find({parent:pid});
    }
});
Template.wxActiveCreate.events({
    'click #save': function() {
        if(!uploader.loaded()){
            toastr.error("图片未上传完成");
            return false;
        }
        var imgs = uploader.get("thumb");

        var objId = WxActive.insert({
            name: $("#name").val(),
            category: $("#category").val(),
            summary: $("#summary").val(),
            orderBy: $("#orderBy").val()*1,
            thumb:imgs.length > 0 ? imgs[0] : "",
            createdAt:new Date(),
            updatedAt:new Date(),
            status:($("#status").val() == 1),
            recommend: ($("#recommend").val() == 1) ? true : false,
            op:Meteor.userId(),
            isOpen:true,
        });

        AdminTrack.insert({
            userId: Meteor.userId(),
            createdAt: new Date(),
            action: "wx.active.insert",
            link: objId
        });

        toastr.success("活动已添加");

        FlowRouter.go("/wx/active");
    },

});

Template.wxActiveCreate.onRendered(function() {

});
