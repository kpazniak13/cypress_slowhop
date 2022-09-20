const searchResultsTableContainer = '#search-results';
const eventTitleInTable = 'div.row div.search-product--text h5';
const eventsToSelect = '#search-results a.search-product';
const eventTitle = '.product--info--heading h1';

export class EventsPage {

    getEventsTitleInTable() {
        return eventTitleInTable;
    }

    getSearchResults() {
        return cy.get(searchResultsTableContainer);
    }

    getEventToCLick() {
        return cy.get(eventsToSelect);
    }

    getEventTitle() {
        return cy.get(eventTitle);
    }

    validateEventTitle(titleText) {
        cy.get(eventTitle).should('have.text', titleText)
    }
}
