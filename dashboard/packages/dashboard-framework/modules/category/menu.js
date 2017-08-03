Meteor.startup(function(){
	if(!Menus.findOne({router:"system"})){
		Menus.insert({parent:"root",router:"system",name:"系统设置",roles:["admin"]})
	}
	Meteor.startup(function(){Menus.insert({parent:"system",router:"category",name:"分类管理",roles:["admin"]})}); 
});