import TickerSymbol from '@salesforce/schema/Account.TickerSymbol';
import { LightningElement, api, track } from 'lwc';

export default class Paginator extends LightningElement {
    /** The current page number. */
    @api pageNumber;

   // @track TypeOptions;
    @api pageSize;


    /** The number of items on a page. */
  

    /** The total number of items in the list. */
    @api totalItemCount;

    handlePrevious() {
        this.dispatchEvent(new CustomEvent('previous'));
    }

    handleNext() {
        this.dispatchEvent(new CustomEvent('next'));
    }

    handleKeyChange( event ) {
        this.pageSize = event.target.value;
        this.dispatchEvent(new CustomEvent("pagesizeevt", { detail: this.pageSize }))
    }

    get currentPageNumber() {
        return this.totalItemCount === 0 ? 0 : this.pageNumber;
    }

    get isFirstPage() {
        return this.pageNumber === 1;
    }

    get isLastPage() {
        return this.pageNumber >= this.totalPages;
    }

    get totalPages() {
        return Math.ceil(this.totalItemCount / this.pageSize);
    }
}
