Meteor.publish('config', function(key) {
   
    return [
    	Config.find({key:key,side:{$in:["client"]}}, {}),
    ]
});