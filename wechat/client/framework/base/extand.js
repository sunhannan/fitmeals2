_.extend(Blaze.View.prototype, {
    closest: function(searchedViewName) {
        currentView = this;
        while (currentView && currentView.name != searchedViewName) {
            currentView = currentView.parentView;
        }
        return currentView;
    }
});
// extend Blaze.TemplateInstance to expose added Blaze.View functionalities
_.extend(Blaze.TemplateInstance.prototype, {
    closestInstance: function(viewName) {
        var view = this.view.closest(viewName);
        return view ? view.templateInstance() : null;
    }
});
