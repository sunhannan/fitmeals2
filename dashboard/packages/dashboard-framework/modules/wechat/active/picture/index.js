Template.wxAcitvePicture.onCreated(function() {
    this.subscribe("wxActiveById", FlowRouter.getQueryParam("id"));
    this.subscribe("wxActivePicturesById", FlowRouter.getQueryParam("id"));
});


Template.wxAcitvePicture.helpers({

    active: function() {
        return WxActive.findOne(FlowRouter.getQueryParam("id"));
    },
    itemWidth: function() {
        return $(".wap-grid").width() / 4;
    },
    pictures: function() {
        return WxActivePictures.find({}, { sort: { createdAt: -1 } });
    }
});
Template.wxAcitvePicture.events({
    'click .grid-item': function() {
        var that = this;
        $(".ui.basic.modal").modal({
            onApprove: function() {
                WxActivePictures.update({_id:that._id},{$set:{status:false}});
            }
        }).modal('show');
      
    },

});

Template.wxAcitvePicture.onRendered(function() {
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
