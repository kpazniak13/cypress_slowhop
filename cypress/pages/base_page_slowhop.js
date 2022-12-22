export class BasePage {

    validateUrlContains(text) {
        return cy.url().should('include', text);
    }

    clickOnScreenFreeSpace() {
        cy.get('body').click(0,0);
    }
}