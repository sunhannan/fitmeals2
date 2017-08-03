Meteor.publishComposite('wxMenu', function(id) {
    return {
        find: function() {
            return WxMenu.find({}, {})
        },
        children: [{
            find: function(menu) {
            	if(menu.type == "media"){
            		return WxMedia.find({_id:menu.link});
            	}else if(menu.type == "active"){
            		return WxActive.find({_id:menu.link});
            	}else if(menu.type == "cmedia"){
            		return Category.find({_id:menu.link});
            	}else if(menu.type == "cactive"){
            		return Category.find({_id:menu.link});
            	}
            }
        }]
    }
});
