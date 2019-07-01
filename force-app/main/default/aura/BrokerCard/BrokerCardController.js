({
	navToRecord: function(component, event, helper) {
		var navEvt = $A.get("e.force:navigateToSObject");
		navEvt.setParams({
			"recordId": component.get("v.Broker.Id")
		});
		navEvt.fire();
	},
	toggle: function(component,event,helper) {
		var event = $A.get("e.c:toggleColumn");
		event.fire();
	}
})