Meteor.publishComposite('wxMediaById', function(id) {
    return {
        find: function() {
        	// console.log(WxMedia.find({_id:id}, {}).fetch());
            return WxMedia.find({_id:id}, {});
        }
    }
});

Meteor.publish('wxMediaBase', function(id) {
    var uid = this.userId;
    return [
    	Category.find({type:"media"}, {}),
    	
    ]
});