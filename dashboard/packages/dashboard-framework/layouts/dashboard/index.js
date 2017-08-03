Template.dashboard.onRendered(function() {
	// console.log($('#header-dropdown').dropdown);
    $('#header-dropdown').dropdown({action: 'hide' });
});
Template.dashboard.helpers({
    user: function() {
        var user = Meteor.user();
        return user ? user.emails[0].address.substr(0, user.emails[0].address.indexOf("@")) : "";
    },
    links:function(){
    	return Links.find();
    },
 	target:function(){
		var map = FlowRouter._routesMap;
		// console.log(map);
		return (map && (map[this.router])) ? map[this.router].path : "/";
	},
});
