Template.robotKnowledgeEdit.onCreated(function() {
    this.subscribe("knowledgeById", FlowRouter.getQueryParam("id"));
});


Template.robotKnowledgeEdit.helpers({
    knowledge: function() {
        return Knowledge.findOne({ _id: FlowRouter.getQueryParam("id") });
    },
    arrJoin:function(arr){
        return arr ? arr.join(" "): "";
    }
});
Template.robotKnowledgeEdit.events({
    'click #save': function() {

        Knowledge.update({ _id: FlowRouter.getQueryParam("id") }, {
            $set: {
                q: $("#key").val().split(" "),
                orderBy: $("#orderBy").val()*1,
                content: $("#content").val(),
            }
        });
        toastr.success("条目已更新");
        
        FlowRouter.go("/robot");
    },

});

Template.robotKnowledgeEdit.onRendered(function() {

});
