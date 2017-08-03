Meteor.startup(function(){
	if(!Menus.findOne({router:"wechat"})){
		Menus.insert({parent:"root",router:"wechat",name:"微信管理",roles:["admin"]})
	}
	Menus.insert({parent:"wechat",router:"wxActive",name:"实时活动",roles:["admin"]})
});