Template.wxActiveEdit.onCreated(function() {
    this.subscribe("categoryByType",'wx-active');
    this.subscribe("wxActiveById", FlowRouter.getQueryParam("id"));
});


Template.wxActiveEdit.helpers({
    categorys: function(pid) {
        return Category.find({parent:pid});
    },
    active:function(){
        return WxActive.findOne(FlowRouter.getQueryParam("id"));
    }
});
Template.wxActiveEdit.events({
    'click #save': function() {
        if(!uploader.loaded()){
            toastr.error("图片未上传完成");
            return false;
        }
        var imgs = uploader.get("thumb");

      WxActive.update({_id:FlowRouter.getQueryParam("id")},{
            name: $("#name").val(),
            category: $("#category").val(),
            summary: $("#summary").val(),
            pwd: $("#pwd").val().substr(0,4),
            isOpen:($("#isOpen").val() == 1),
            orderBy: $("#orderBy").val()*1,
            thumb:imgs.length > 0 ? imgs[0] : "",
            updatedAt:new Date(),
            status:($("#status").val() == 1),
            recommend: ($("#recommend").val() == 1) ? true : false,
            op:Meteor.userId(),
        });

        AdminTrack.insert({
            userId: Meteor.userId(),
            createdAt: new Date(),
            action: "wx.active.update",
            link: FlowRouter.getQueryParam("id")
        });

        toastr.success("活动已更新");

        FlowRouter.go("/wx/active");
    },

});

Template.wxActiveEdit.onRendered(function() {

});
