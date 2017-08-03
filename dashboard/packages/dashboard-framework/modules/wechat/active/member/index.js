Template.wxAcitveMember.onCreated(function() {
    this.subscribe("wxActiveById", FlowRouter.getQueryParam("id"));
    this.subscribe("wxActiveMembersById", FlowRouter.getQueryParam("id"));

});


Template.wxAcitveMember.helpers({

    active: function() {
        return WxActive.findOne(FlowRouter.getQueryParam("id"));
    },
    itemWidth: function() {
        return $(".wap-grid").width() / 4;
    },
    members: function() {
        return WxActiveUsers.find({}, { sort: { createdAt: -1 } });
    },
    info:function(){
        return Meteor.users.findOne({_id:this.userid});
    }
});
Template.wxAcitveMember.events({
    'click .grid-item': function() {
        var that = this;
        $(".ui.basic.modal").modal({
            onApprove: function() {
                WxActivePictures.update({_id:that._id},{$set:{status:false}});
            }
        }).modal('show');
      
    },

});

Template.wxAcitveMember.onRendered(function() {
    var maso = $(".wap-grid").masonry({
        itemSelector: '.grid-item',
        columnWidth: 280,
        isAnimated: true,
    })
    Tracker.autorun(function() {
        var pics = WxActivePictures.find({}, { sort: { createdAt: -1 } }).fetch();

        Meteor.setTimeout(function() {
            maso.masonry("reload");
        }, 500);
    });
});
