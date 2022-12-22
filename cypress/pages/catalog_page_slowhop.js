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
const placesInput = '.search-bar-input';
const placesList = '.result-links__list li';
const dateLocatorStart = '[date="';
const dateLocatorEnd = '"]';
const catalogListTable = '.catalog-tile';
const filtersContainer = '.filters.container';
const filtersButton = '.search-bar__btn--filters';
const filterLocationOptionText = 'In which location?';
const filterFoodOptionText = 'What about food?';
const parametersFilterContainer = '.filters__parameters--only-desktop'
const filterFoodCheckboxesLocators = {
    'Self catering': '#food_main-no_food',
    'Vegan cuisine only': '#food_main-only-vegan'
}
const serachBarBtn = 'search-bar__btn';

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
        return cy.get(serachBarBtn).eq(2)
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
        cy.get(pageMainTitle).should('contain.text', text);
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

    getPlacesList() {
        return cy.get(placesList);
    }

    filtersButtonClick() {
        return cy.get(filtersButton).click();
    }

    searchBy(fieldName, object) {
        switch(fieldName) {
            case 'place' :
                this.getPlacesField()
                        .click()
                        .next()
                        .find(placesInput)
                        .type(object.place)
                        .then(() => {
                            this.getPlacesList()
                                    .should('contain.text', object.place)
                                    .first()
                                    .click();
                            this.clickSearchBtn();
                        });
            break;
            case 'dates' :
                this.fillDateFilterField(object.dateFrom, object.dateTo)
                        .then(() => {
                            this.clickSearchBtn();
                        });
            break;
            case 'guests' :
                this.fillGuestsFilterField(object.adults, object.children, object.pets)
                        .then(() => {
                            this.clickSearchBtn();
                        });
            break;
            case 'filters' :
                this.selectFiltersFilter(object.locationFilter, object.food)
                        .then(() => {
                            this.clickSearchBtn();
                        });
            break;
        }
    }

    fillDateFilterField(dateFrom, dateTo) {
        let dateFromFormatted = dateFrom.toString("yyyy-MM-dd");
        let dateToFormatted = dateTo.toString("yyyy-MM-dd");
            
        return this.getDatesField()
                .then(($obj) => {
                    cy.get($obj)
                        .find(this.datesInputField())
                        .click();
                    cy.get($obj)
                        .find(this.calendarRange())
                        .should('be.visible')
                        .find(dateLocatorStart + dateFromFormatted + dateLocatorEnd)
                        .click();
                    cy.get($obj)
                        .find(this.calendarRange())
                        .should('be.visible')
                        .find(dateLocatorStart + dateToFormatted + dateLocatorEnd)
                        .click();
                });
    }

    fillGuestsFilterField(adults, children, pets) {
        return this.getGuestsSelectPopup()
                .then(($obj) => {
                    cy.get($obj).click()
                    if(adults) {
                        for(let n = 0; n < adults; n++) {
                            cy.get($obj)
                                .find(this.guestPickerOptions())
                                .should('be.visible')
                                .find(this.selectNumberBtn())
                                .eq(1)
                                .click();
                        }
                    }
                    if(children) {
                        for(let n = 0; n < children; n++) {
                            cy.get($obj)
                            .find(this.guestPickerOptions())
                            .should('be.visible')
                            .find(this.selectNumberBtn())
                            .eq(3)
                            .click();
                        }
                    }
                    if(pets) {
                        cy.get(this.guestPickerOptions())
                        .should('not.be.visible');
                    }
                });
    }

    selectFiltersFilter(location, food) {
        return this.filtersButtonClick()
                        .then(() => {
                                if(location) {
                                    let locationsArray = location.split(', ');
                                        cy.get(filtersContainer)
                                            .find(`span:contains(${filterLocationOptionText})`)
                                            .parent()
                                            .click()
                                            .should('be.visible');
                                                    locationsArray.forEach((item) => {
                                                        const lastWord = item.split(' ').pop();
                                                        cy.get(filtersContainer)
                                                            .find(parametersFilterContainer)
                                                            .should('contain.text', item)
                                                            .find(`input[value="${lastWord}"]`)
                                                            .check();
                                                    })
                                }
                                if(food) {
                                    let foodsArray = food.split(', ');
                                    cy.get(filtersContainer)
                                        .find(`span:contains(${filterFoodOptionText})`)
                                        .parent()
                                        .click()
                                        .should('be.visible');
                                        foodsArray.forEach((item) => {
                                                    cy.get(filtersContainer)
                                                        .find(parametersFilterContainer)
                                                        .should('contain.text', item)
                                                        .find(`${filterFoodCheckboxesLocators[item]}`)
                                                        .check();
                                                    })
                                }
                        });
    }

    getCatalogListItems() {
        return cy.get(catalogListTable);
    }
}