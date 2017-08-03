Meteor.startup(function(){
	CategoryType.insert({key:"wx-media",name:"微信图文类型",view:"[wechat]/wx/media?id=[id]"});
});