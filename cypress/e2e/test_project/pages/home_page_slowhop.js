class HomePage {

    navigateToSlowhop() {
        cy.visit('https://slowhop.com/pl/')
    }

    getNavigationBarItems() {
        return cy.get('.nav-item.pull-left li')
    }

    getLogoContainer() {
        return cy.get('.logo-container')
    }

    getRightSideNav() {
        return cy.get('.nav-item.navbar-right').first()
    }

    navigateToWydarzenia() {
        cy.get('.navbar-header > .nav-item > :nth-child(2) > a').click()
    }

    getLastMinuteLink() {
        return cy.get('.navbar-header .nav-item > li > a').eq(4)
    }

    clickExploreAndBookBtn() {
        cy.get('.main-text-container a').click()
    }

}

export default HomePage;