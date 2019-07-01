({
    doSearch : function(component, event, helper) {
        var spinner = component.find("spinner");
        $A.util.removeClass(spinner, "slds-hide");
        var action = component.get("c.getSimilarProperties");
        action.setParams({
            recordId: component.get("v.recordId"),
            beds: component.get("v.property.fields.Beds__c.value"),
            price: component.get("v.property.fields.Price__c.value"),
            searchCriteria: component.get("v.searchCriteria"),
            priceRange: parseInt(component.get("v.priceRange"), 10)
        });
        action.setCallback(this, function(response){
            var similarProperties = response.getReturnValue();
            component.set("v.similarProperties", similarProperties);
            $A.util.addClass(spinner, "slds-hide");
        });
        $A.enqueueAction(action);
    },
    toggle: function(component,event,helper) {
		var event = $A.get("e.c:toggleColumn");
		event.fire();
	}
})