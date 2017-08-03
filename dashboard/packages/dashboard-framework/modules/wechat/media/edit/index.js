Template.wxMediaEdit.onCreated(function() {
    this.subscribe("wxMediaById", FlowRouter.getQueryParam("id"));
    this.subscribe("categoryByType",'wx-media');
});


Template.wxMediaEdit.helpers({
    media: function() {
        return WxMedia.findOne({ _id: FlowRouter.getQueryParam("id") });
    },
    arrJoin:function(arr){
        return arr ? arr.join(" "): "";
    },
    categorys: function(pid) {
        return Category.find({parent:pid});
    },
    checkStatus: function(str1, str2) {
        return str1 == str2 ? "selected" : "";
    }
});
Template.wxMediaEdit.events({
    'click #save': function() {

        WxMedia.update({ _id: FlowRouter.getQueryParam("id") }, {
            $set: {
                category: $("#category").val(),
                orderBy: $("#orderBy").val()*1,
                recommend: ($("#recommend").val() == 1) ? true : false,
                status: ($("#status").val() == 1) ? true : false,
            }
        });
        toastr.success("条目已更新");
        
        FlowRouter.go("/wx/media");
    },

});

Template.wxMediaEdit.onRendered(function() {

});
