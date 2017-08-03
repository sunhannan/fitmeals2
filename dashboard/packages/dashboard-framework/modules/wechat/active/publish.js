Meteor.publishComposite('wxActiveById', function(id) {
    var uid = this.userId;
    return {
        find: function() {
            return WxActive.find({_id:id}, {});
        }
    }
});
Meteor.publishComposite('wxActivePicturesById', function(id) {
    var uid = this.userId;
    return {
        find: function() {
            return WxActivePictures.find({active:id,status:true}, {});
        }
    }
});
Meteor.publishComposite('wxActiveMembersById', function(id) {

    var uid = this.userId;
    return {
        find: function() {
            return WxActiveUsers.find({active:id});
        },
        children:[
        	{
        		find:function(wau){
        			return Meteor.users.find({_id:wau.userid},{fields:{profile:1}});
        		}
        	}
        ]
    }
});
