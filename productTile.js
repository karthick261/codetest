import { LightningElement, api } from 'lwc';

/**
 * A presentation component to display a Product__c sObject. The provided
 * Product__c data must contain all fields used by this component.
 */
export default class ProductTile extends LightningElement {
    /** Whether the tile is draggable. */
    @api draggable;

    _product;
    /** Product__c to display. */
    @api
    get product() {
        return this._product;
    }
    set product(value) {
        this._product = value;
        this.pictureUrl = value.Picture_URL__c;
        this.name = value.Name;
        this.msrp = value.MSRP__c;
    }

    /** Product__c field values to display. */
    pictureUrl;
    name;
    msrp;
    
    //added this method to handle the REST API to check the inventory whether the selected product is available
    //facing  CORS issue. based on the response I will dislay the message in yhr  product detail page as "No stocks in inventory".
    async handleFetch() {
        let endPoint = "https://vpsdevds2-viasat.cs32.force.com/paymentservice/services/apexrest/ebikestockcheck/?pname="+this.product.Name;
        const response = await fetch(endPoint , {
              method: "GET",
              mode: "cors",
              headers:{
                "x-api-key": "abc123",
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Cookie": "BrowserId=Jlnf3nImEeumZZ88qOXBuw",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "Origin, Content-Type, Accept",
                "Access-Control-Allow-Methods":  "GET, OPTIONS",
            },
            });
        const repos = await response.json();
         console.log(repos);
      }

    handleClick() {
       // this.handleFetch(); 
        const selectedEvent = new CustomEvent('selected', {
            detail: this.product.Id  // change it to  detail: this.product.Name
        });
        this.dispatchEvent(selectedEvent);
    }

    handleDragStart(event) {
        event.dataTransfer.setData('product', JSON.stringify(this.product));
    }
}
