Template.robotKnowledgeCreate.onCreated(function() {
   
});


Template.robotKnowledgeCreate.helpers({
    
});
Template.robotKnowledgeCreate.events({
    'click #save': function() {

        Knowledge.insert({
            q: $("#key").val().split(" "),
            orderBy: $("#orderBy").val()*1,
            content: $("#content").val(),
            createdAt:new Date(),
            updatedAt:new Date(),
            hit:0,
        });

        toastr.success("条目已添加");

        FlowRouter.go("/robot");
    },

});

Template.robotKnowledgeCreate.onRendered(function() {

});
