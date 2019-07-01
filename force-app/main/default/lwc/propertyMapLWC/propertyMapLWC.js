import { LightningElement, api, track, wire } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';

const fields = [
    'Property__c.Name',
    'Property__c.Address__c',
    'Property__c.City__c',
    'Property__c.State__c',
    'Property__c.Zip__c',
    'Property__c.Location__Longitude__s',
    'Property__c.Location__Latitude__s',
    'Property__c.Title__c'
]


export default class PropertyMapLWC extends LightningElement {
    @api recordId;
    @track property;
    @track cardTitle;
    @track address;
    @track zoomLevel = "18";
    @api mapMarkers = [];

    @wire(getRecord, { recordId: '$recordId', fields })
    wiredProperty(value) {
        if (value.data) {
            this.zoomLevel = "16";
            this.property = value.data;
            this.address = this.property.fields.Address__c.value + ', ' + this.property.fields.City__c.value + ', ' + this.property.fields.State__c.value;
            this.city = this.property.fields.City__c.value; 
            this.cardTitle = this.property.fields.Title__c.value;
            this.mapMarkers = [{
                location: {
                    Street: this.property.fields.Address__c.value,
                    City: this.property.fields.City__c.value,
                    State: this.property.fields.State__c.value
                },
                title: this.property.fields.Title__c.value,
                description: this.address
            }];
            console.log("MARKERS: ", this.mapMarkers)
        } else if (value.error) {
            console.log("OOOPS: ", value.error)
        }
    }
}