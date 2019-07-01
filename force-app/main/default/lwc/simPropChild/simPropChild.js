import { LightningElement, api, track, wire } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { registerListener, unregisterAllListeners, fireEvent } from 'c/pubsub';
import { NavigationMixin, CurrentPageReference } from 'lightning/navigation';

export default class SimPropChild extends NavigationMixin(LightningElement) {
    @api theitem;
    @track editMode=false;

    @wire(CurrentPageReference) pageRef;

    navigateToRecord() {
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: this.theitem.Id,
                objectApiName: 'Property__c',
                actionName: 'view',
            },
        });
    }

    editRecord() {
        this.editMode = true;
    }

    handleSuccess() {
            const evt = new ShowToastEvent({
                title: "Success!",
                message: "The record has been successfully saved.",
                variant: "success",
            });
            this.dispatchEvent(evt);
            fireEvent(this.pageRef, 'propertyUpdated');
            this.editMode=false;
    }

    handleCancel() {
        this.editMode=false;
    }
}