
Meteor.startup(function(){
	if(!Menus.findOne({router:"system"})){
		Menus.insert({parent:"root",router:"system",name:"系统设置",roles:["admin"]})
	}
	Menus.insert({parent:"system",router:"adminMembers",name:"系统用户管理",roles:["admin"]})
});