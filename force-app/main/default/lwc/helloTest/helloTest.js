import { LightningElement, track, api, wire } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
   
const fields = [
    'Property__c.Name',
    'Property__c.Broker__c'
]

export default class HelloTest extends LightningElement {
    @api recordId;
    @track property;
    @track cardTitle;
    @track brokerId;
    @track brokerFields = ['Name', 'Title__c', 'Phone__c', 'Mobile_Phone__c', 'Email__c'];
    @track fieldsToDisplay = '';
    @track fields = [];
    @track myVal = "<ins>Inserted Text</ins>";

    @wire(getRecord, { recordId: '$recordId', fields })
    wiredProperty(value) {
        if (value.data) {
            this.property = value.data;
            this.cardTitle = 'Broker for ' + this.property.fields.Name.value;
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

    testFunc(evt) {
        this.fieldsToDisplay = evt.target.value;
    }

    updateForm () {
        console.log("TEST: ", this.fieldsToDisplay)
        this.brokerFields = null;
        this.showNew();
        
    }

    showNew (){
        let form = this.template.querySelector('lightning-record-form');
        form.recordId = null;
        this.fields = this.fieldsToDisplay.split(",");
        this.brokerFields = this.fields;
        form.fields = this.brokerFields;
        console.log("FIELDS: ", this.brokerFields)
    }
}