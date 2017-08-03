Template.smeeList.onCreated(function() {
    this.subscribe("smeeList",this.data.userid);
});

Template.smeeList.helpers({
    smees: function() {
        return Smee.find({$or:[
                { target:Meteor.userId()},
                { target:Meteor.userId()},
            ]},{sort:{createdAt:-1}})
    },
    owner: function() {
        return Meteor.users.findOne( );
    },
    checkStatus:function(){
        return this.isread ? "isread" : "unread"
    }
});

Template.smeeList.events({
   "click .item":function(){
       Smee.update({_id:this._id},{$set:{isread:true}})
       
   },
   "click .reply":function(){
      if(this.userid == Meteor.userId()){
            popup.show(Template.smee,{userid:this.target});
      }else{
            popup.show(Template.smee,{userid:this.userid});
      }
   }
});

Template.smeeList.onRendered(function() {
   
});
