const whereField = '#where';
const datePicker = '#range-datepicker-inline-trigger';
const datesInputField = '.search-bar__btn';
const calendarRange = '.calendar-range';
const dateInputText = '.search-bar-text';
const guestsInputField = '.search-bar-col';
const guestPickerOptions = '.guest-picker-options';
const selectNumberBtn = '.guest-picker-row-buttons svg';
const guestsPickerWindow = '.advanced-options--show';
const advancedOptionsButtons = '.advanced-options__footer button';
const searchBtn = '.search-button';
const pageMainTitle = 'h1.main-title';
const tableAddresses  = '.catalog-tile__content address';
const placesFieldItems = '.result-links__item a';

export class CatalogPage {

    getPlacesField() {
        return cy.get(whereField);  
    }

    getDatesField() {
        return cy.get(datePicker);
    }

    getGuestsSelectPopup() {
        return cy.get(guestsInputField).eq(2);
    }

    getGuestsField() {
        return cy.get('search-bar__btn').eq(2)
    }

    datesInputField() {
        return datesInputField;
    }

    calendarRange() {
        return calendarRange;
    }

    dateInputText() {
        return dateInputText;
    }

    guestPickerOptions() {
        return guestPickerOptions;
    }

    selectNumberBtn() {
        return selectNumberBtn;
    }

    guestsPickerWindow() {
        return guestsPickerWindow;
    }

    advancedOptionsButtons() {
        return advancedOptionsButtons;
    }

    clickSearchBtn() {
        cy.get(searchBtn).click();
    }

    validateMainTitleText(text) {
        cy.get(pageMainTitle).should('have.text', text);
    }

    pageMainTitle() {
        return pageMainTitle;
    }

    validateItemsAddress(text) {
        cy.get(tableAddresses).should('contain.text', text);
    }

    placesFieldItems() {
        return placesFieldItems;
    }
}