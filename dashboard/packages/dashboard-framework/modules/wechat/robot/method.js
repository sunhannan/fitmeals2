Meteor.methods({
	queryAllKnowledge:function(sel, pro) {
        return {
            rows: Knowledge.find(sel, pro).fetch(),
            total: Knowledge.find(sel, pro).count()
        };
    },
    testAi:function(txt){
    	console.log(_robot.ask(this.userId,txt));
    }
});