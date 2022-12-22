import { BasePage } from "./base_page_slowhop";

const searchResultsTableContainer = '#search-results';
const eventTitleInTable = 'div.row div.search-product--text h5';
const eventsToSelect = '#search-results a.search-product';
const eventTitle = '.product--info--heading h1';
const menuBarContainer = '.menu-bar-container';
const headerSection = '#product--header';
const productInfoSection = '#product--info';
const productPriceSection = '#product--price';
const productRentalSection = '#product--rental';
const placeLocation = '.product--map';
const productOpinion = '#product--opinion';
const coverPhoto = '.product-gallery-photo-main-wrap';

export class EventsPage extends BasePage {

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

    getMenuBarItems() {
        return cy.get(menuBarContainer).find('li');
    }

    getProductHeaderSection() {
        return cy.get(headerSection);
    }

    getProductInfoSection() {
        return cy.get(productInfoSection);
    }

    getProductPriceSection() {
        return cy.get(productPriceSection);
    }

    getProductRentalSection() {
        return cy.get(productRentalSection);
    }

    getProductLocationSection() {
        return cy.get(placeLocation);
    }

    getproductOpinionSection() {
        return cy.get(productOpinion);
    }

    getCoverPhoto() {
        return coverPhoto;
    }
}
