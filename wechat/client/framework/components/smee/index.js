Template.smee.onCreated(function() {
    this.subscribe("smee",this.data.userid);
});

Template.smee.helpers({
    smees: function() {
        return Smee.find({$or:[
                { userid:this.userid,target:Meteor.userId()},
                { target:Meteor.userId(),target:this.userid},
                { target:Meteor.userId(),target:"SYSTEM"}
            ]},{sort:{createdAt:-1}})
    },
    owner: function() {
        return Meteor.users.findOne( );
    },
});

Template.smee.events({
   "click #send":function(){
        if($("#content").val()){
            Smee.insert({
                userid:Meteor.userId(),
                target:this.userid,
                createdAt:new Date(),
                isread:false,
                content:$("#content").val()
           });
            $("#content").val("");
        }
       
   }
});

Template.smee.onRendered(function() {
    Tracker.autorun(function(){
        var unreads = Smee.find({target:Meteor.userId(),isread:false}).fetch();
        for(var i = 0 ; i < unreads.length ; i++){

            Smee.update({_id:unreads[i]._id},{$set:{isread:true}});
        }
    });
});
