const slowHopeLink = 'https://slowhop.com/pl/';
const navigationBarContainer = '.nav-item.pull-left li';
const logoContainer = '.logo-container';
const navigationBarContainerRight = '.nav-item.navbar-right';
const eventsLink = '.navbar-header > .nav-item > :nth-child(2) > a';
const placesLink = '.navbar-header .nav-item > li > a';
const exploreAndBookBtn = '.main-text-container a';
const selectLanguage = 'button.langs-s__trigger';
const logoSvg = '.svg-icon svg';

export class HomePage {

    navigateToSlowhop() {
        cy.visit(slowHopeLink);
    }

    getNavigationBarItems() {
        cy.allure().step('Getting navigation bar items')
        return cy.get(navigationBarContainer);
    }

    getLogoContainer() {
        cy.allure().step('Getting logo container')
        return cy.get(logoContainer);
    }

    getRightSideNav() {
        cy.allure().step('Getting right side Navigation bar')
        return cy.get(navigationBarContainerRight).first();
    }

    navigateToEvents() {
        cy.allure().step('Switching to Evants Tab')
        cy.get(eventsLink).click();
    }

    getLastMinuteLink() {
        cy.allure().step('Getting last minute link')
        return cy.get(placesLink).eq(4);
    }

    clickExploreAndBookBtn() {
        cy.allure().step('Clicking Explore and Book Button')
        cy.get(exploreAndBookBtn).click();
    }

    selectLanguage() {
        cy.allure().step('Selecting Language')
        return selectLanguage;
    }

    logoSvg() {
        return logoSvg;
    }
}