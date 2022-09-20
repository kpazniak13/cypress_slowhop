const mainTitle = 'h1.main-title';
const gridResultsTiles = '.grid-results__tiles';
const instantBookingLabel = '.catalog-tile span.catalog-tile__sticker--thunder';
const eventDetailsLink = '.catalog-tile__link';



export class LastMinutePage {

    getMainTitle() {
        return cy.get(mainTitle);
    }

    getResultsTable() {
        return cy.get(gridResultsTiles);
    }

    validateMainTitle() {
        cy.get(mainTitle).should('have.text', 'Last minute');
    }

    validateUrl() {
        cy.url().should('include', '/last-minute');
    }

    validateInstantBookingLabel() {
        cy.get(gridResultsTiles)
            .find(instantBookingLabel)
            .should('contain.text', 'Instant booking');
    }

    eventDetailsLink() {
        return eventDetailsLink;
    }
}