class CatalogPage {

    getPlacesField() {
        return cy.get('#where')    
    }

    getDatesField() {
        return cy.get('#range-datepicker-inline-trigger')
    }

    getGuestsField() {
        return cy.get('search-bar__btn').eq(2)
    }


}

export default CatalogPage;