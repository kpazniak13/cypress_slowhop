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
        return cy.get(navigationBarContainer);
    }

    getLogoContainer() {
        return cy.get(logoContainer);
    }

    getRightSideNav() {
        return cy.get(navigationBarContainerRight).first();
    }

    navigateToEvents() {
        cy.get(eventsLink).click();
    }

    getLastMinuteLink() {
        return cy.get(placesLink).eq(4);
    }

    clickExploreAndBookBtn() {
        cy.get(exploreAndBookBtn).click();
    }

    selectLanguage() {
        return selectLanguage;
    }

    logoSvg() {
        return logoSvg;
    }
}