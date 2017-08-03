Meteor.startup(function(){
	CategoryType.insert({key:"wx-active",name:"实时活动类型",view:"[wechat]/wx/active/detail?id=[id]"});
});