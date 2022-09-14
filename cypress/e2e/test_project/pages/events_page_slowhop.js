class EventsPage {

    getSearchResults() {
        return cy.get('#search-results')
    }

    getEventToCLick() {
        return cy.get('#search-results a.search-product')
    }

    getEventTitle() {
        return cy.get('.product--info--heading h1')
    }

}

export default EventsPage;