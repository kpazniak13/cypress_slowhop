import { CatalogPage } from "../../pages/catalog_page_slowhop";
import { EventsPage } from "../../pages/events_page_slowhop";
import { EventDetailsPage } from "../../pages/event_details_page_slowhop";
import { HomePage } from "../../pages/home_page_slowhop";
import { LastMinutePage } from "../../pages/last_minute_page_slowhop";
require('datejs')

describe('Smoke tests set', () => {
    const homePage = new HomePage();
    const eventsPage = new EventsPage();
    const lastMinutePage = new LastMinutePage();
    const eventDetailsPage = new EventDetailsPage();
    const catalogPage = new CatalogPage();
    const textForAddress = 'Poland';
    const urlLastMinuteToValidate = '/last-minute/v2';
    const urlEventsToValidate = '/wydarzenia/';
    const eventTitle = 'Sielski weekend z jogą';
    const aboutHost = 'O Gospodarzu';
    const aboutPlace = 'O miejscu';
    const price = 'Cennik';
    const location = 'Lokalizacja';
    const review = 'Opinie';
    const photos = 'Zdjęcia';
    const dateFromFilter = Date.today();
    const dateToFilter = Date.today().addWeeks(2);
    const filterTestData = [
        {
            fieldName: "place",
            place: "Mazovia",
            mainTitleText: 'Mazovia'
        },
        {
            fieldName: "place",
            place: "Beskid Mountains",
            mainTitleText: 'Beskid Mountains'
        },
        {
            fieldName: "dates",
            dateFrom: Date.today(),
            dateTo: Date.today().addWeeks(2),
            mainTitleText: 'Unique places'
        },
        {
            fieldName: "guests",
            adults: 2,
            children: 1,
            mainTitleText: 'Unique places'
        },
        {
            fieldName: "filters",
            locationFilter: "By the sea, By the lake",
            food: "Self catering, Vegan cuisine only",
            mainTitleText: 'Unique places'
        }
    ]

    beforeEach(() => {
        homePage.navigateToSlowhop();
    });

    it('visits the Slowhop.pl and verifies the navigation bar', () => {
        homePage.getNavigationBarItems()
                    .should('have.length', 5)
                    .and('contain.text', 'MIEJSCA')
                    .and('contain.text', 'WYDARZENIA')
                    .and('contain.text', 'MAPA')
                    .and('contain.text', 'POMYSŁY')
                    .and('contain.text', 'LAST MINUTE');
        homePage.getLogoContainer()
                    .find('a').should('have.attr', 'href');
        homePage.getLogoContainer()
                    .find(homePage.logoSvg());
        homePage.getRightSideNav().first()
                    .find('li')
                    .should('have.length', 4)
                    .and('contain.text', 'O NAS')
                    .and('contain.text', 'ZALOGUJ SIĘ')
                    .and('contain.text', 'DODAJ OFERTĘ')
                    .eq(3)
                    .find(homePage.selectLanguage())
                    .should('exist');
    });

    context('checks events at Wydarzenia tab', () => {
        it.only('checks the first event', () => {
            let firstEventTitle = '';
    
            homePage.navigateToEvents();
            eventsPage.getSearchResults().should('exist');
            eventsPage.getSearchResults()
                        .find(eventsPage.getEventsTitleInTable())
                        .eq(0)
                        .then(($el) => {
                            firstEventTitle = $el.text()
                            eventsPage.getEventToCLick()
                                        .eq(0)
                                        .invoke('removeAttr', 'target')
                                        .click();
                            eventsPage.validateUrlContains(urlEventsToValidate);
                            eventsPage.validateEventTitle(firstEventTitle);
                        });
        });

        it('checks the specified event', () => {
            homePage.navigateToEvents();
            eventsPage.getSearchResults().should('exist');
            eventsPage.getSearchResults()
                        .contains(eventTitle)
                        .invoke('removeAttr', 'target')
                        .click();
            eventsPage.validateUrlContains(urlEventsToValidate);
            eventsPage.validateEventTitle(eventTitle);
            eventsPage.getProductHeaderSection()
                        .get(eventsPage.getCoverPhoto())
                        .should('exist');
            eventsPage.getProductInfoSection()
                        .should('not.to.be.empty');
            eventsPage.getProductPriceSection()
                        .should('not.to.be.empty');
            eventsPage.getProductRentalSection()
                        .should('not.to.be.empty');
            eventsPage.getProductLocationSection()
                        .should('not.to.be.empty');
            eventsPage.getproductOpinionSection()
                        .should('not.to.be.empty');
            eventsPage.getMenuBarItems()
                        .should('contain.text', aboutHost)
                        .should('contain.text', aboutPlace)
                        .should('contain.text', price)
                        .should('contain.text', location)
                        .should('contain.text', review)
                        .should('contain.text', photos);
        });
    });
    
    it('checks the first item at Last Minute tab', () => {
        homePage.getLastMinuteLink()
                    .should('have.class', 'red')
                    .click()
                    .should('not.exist');
        lastMinutePage.validateMainTitle();
        lastMinutePage.validateUrl();
        lastMinutePage.validateInstantBookingLabel();
        lastMinutePage.getResultsTable()
                        .find(lastMinutePage.eventDetailsLink())
                        .first()
                        .invoke('removeAttr', 'target')
                        .click();
        eventDetailsPage.validateUrlContains(urlLastMinuteToValidate);
        eventDetailsPage.getBookingRequestSection().should('exist');
        eventDetailsPage.validateAboutPlaceSectionTitle();
        eventDetailsPage.validateTotalPriceText();
        eventDetailsPage.validateTermsCancellationText();
        eventDetailsPage.validatePaymentMethodsTitle();
        eventDetailsPage.validateGoToPaymentText();
        eventDetailsPage.clickGoToPaymentBtn();
        eventDetailsPage.getLoginPopupWindow()
                            .should('be.visible')
                            .then(($obj) => {
                                expect($obj).to.be.visible;
                                expect($obj).to.contain('Log in');
                                expect($obj).to.contain('Email');
                                expect($obj).to.contain('Password');
                                expect($obj).to.have.descendants(eventDetailsPage.loginBtn());
                                expect($obj).to.have.descendants(eventDetailsPage.loginWithFacebookBtn());
                            });
        eventDetailsPage.clickOnScreenFreeSpace();
        eventDetailsPage.getLoginPopupWindow().should('not.exist');
    });

    it('checks the search filter', () => {
        homePage.clickExploreAndBookBtn();
        catalogPage.getPlacesField()
                        .click()
                        .should('be.visible')
                        .next()
                        .find(catalogPage.placesFieldItems())
                        .first()
                        .then(($field) => {
                            let value = $field.text().trim();
                            cy.get($field).click();
                            catalogPage.getPlacesField().should('have.value', value);
                        });
        catalogPage.getDatesField()
                        .then(($obj) => {
                            let dateFilled = dateFromFilter.toString("dd MMM yyyy") + ' ' + '-' + ' ' + dateToFilter.toString("dd MMM yyyy");

                            catalogPage.fillDateFilterField(dateFromFilter, dateToFilter);
                            cy.get($obj).find(catalogPage.dateInputText())
                                            .then(($date) => {
                                                let dateText = $date.text();
                                                expect(dateText).to.contain(dateFilled);
                                            });
                        });
        catalogPage.getGuestsSelectPopup()
                        .then(($obj) => {
                            cy.get($obj).click()
                                .find(catalogPage.guestPickerOptions())
                                .should('be.visible')
                                .find(catalogPage.selectNumberBtn())
                                .eq(1)
                                .click();
                            cy.get(catalogPage.guestsPickerWindow())
                                .find(catalogPage.advancedOptionsButtons())
                                .eq(1)
                                .click();
                            cy.get(catalogPage.guestPickerOptions())
                            .should('not.be.visible');
                        });
        catalogPage.clickSearchBtn();
        catalogPage.validateMainTitleText(textForAddress);
        catalogPage.validateItemsAddress(textForAddress);
    });

    context('It tests the search filter', () => {
        filterTestData.forEach(element => {
            it(`verifies that the ${element.fieldName} filter and returns correct results`, () => {
                homePage.clickExploreAndBookBtn();
                catalogPage.searchBy(element.fieldName, element);
                catalogPage.getCatalogListItems().should('have.length', 24);
                catalogPage.validateMainTitleText(element.mainTitleText);
                if(element.fieldName == 'place') {
                    catalogPage.validateItemsAddress(element.mainTitleText);
                }
            });
        });
    })
});