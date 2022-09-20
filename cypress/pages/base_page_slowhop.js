export class BasePage {

    validateUrlContains(text) {
        return cy.url().should('include', text);
    }

    clickOnScreenFReeSpace() {
        cy.get('body').click(0,0);
    }

}