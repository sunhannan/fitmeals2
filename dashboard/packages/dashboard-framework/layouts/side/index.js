
Template.side.onCreated(function() {
	
});

Template.side.helpers({
	menus:function(){
		// console.log(Menus.find({parent:"root"}).fetch());
		return Menus.find({parent:"root"});
	},
	target:function(){
		var map = FlowRouter._routesMap;
		// console.log(map);
		return (map && (map[this.router])) ? map[this.router].path : "/";
	},
	children:function(){
		return Menus.find({parent:this.router}).count() > 0 ? Menus.find({parent:this.router}) : [];
	},
	count:function(arr){
		return arr.length == 0
	},
	checkRole:function(){
		if($.inArray("default",this.roles) > -1){
			return true;
		}
		if(Roles.userIsInRole(Meteor.userId(),["admin"],"dashboard")){
			return true;
		}

		if(Roles.userIsInRole(Meteor.userId(),this.roles,"dashboard")){
			return true;
		}
		
		return false;
	},
});
Template.side.events({
	"click .l1":function(event){
		var o = $(event.currentTarget);

		if($(".children-open")[0] != o[0]){
			$(".children-open").find(".children").slideUp(300);
			$(".children-open").removeClass("children-open")
		}
		if(o.hasClass("children-open")){
			o.find(".children").slideUp(300);
			o.removeClass("children-open")
		}else{
			o.addClass("children-open");
			o.find(".children").slideDown(300);
		}
	},
	"click a":function(event){
		var o = $(event.currentTarget);
		FlowRouter.go(o.attr("href"));
		$(".cur-item").removeClass("cur-item");
		o.addClass("cur-item");
		return false;
	},
 
});
Template.side.onRendered(function(){
});

