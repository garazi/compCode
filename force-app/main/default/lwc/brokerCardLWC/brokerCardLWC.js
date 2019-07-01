import { LightningElement, api, track, wire } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

const fields = [
    'Property__c.Name',
    'Property__c.Broker__c'
]

export default class brokerCard extends LightningElement {
    @api recordId;
    @track property;
    @track cardTitle;
    @track brokerId;
    @track brokerFields = ['Name', 'Title__c', 'Phone__c', 'Mobile_Phone__c','Email__c'];


    @wire(getRecord, { recordId: '$recordId', fields })
    wiredProperty(value) {
        if (value.data) {
            this.property = value.data;
            this.cardTitle = 'The Broker for ' + this.property.fields.Name.value;
            this.brokerId = this.property.fields.Broker__c.value;
        } else if (value.error) {
            console.log("ERROR: ", value.error)
        }
    }

    fireToast() {
        const evt = new ShowToastEvent({
            title: "Success!",
            message: "The Broker's record has been successfully saved.",
            variant: "success",
        });
        this.dispatchEvent(evt);
    }
}