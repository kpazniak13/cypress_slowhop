import { BasePage } from "../../../pages/base_page_slowhop";
import { CatalogPage } from "../../../pages/catalog_page_slowhop";
import { EventsPage } from "../../../pages/events_page_slowhop";
import { EventDetailsPage } from "../../../pages/event_details_page_slowhop";
import { HomePage } from "../../../pages/home_page_slowhop";
import { LastMinutePage } from "../../../pages/last_minute_page_slowhop";

describe('Smoke tests set', () => {

    const basePage = new BasePage();
    const homePage = new HomePage();
    const eventsPage = new EventsPage();
    const lastMinutePage = new LastMinutePage();
    const eventDetailsPage = new EventDetailsPage();
    const catalogPage = new CatalogPage();

    const textForAddress = 'Poland';
    const urlLastMinuteToValidate = '/last-minute/v2';
    const urlEventsToValidate = '/wydarzenia/';

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

    it('checks the first event at Wydarzenia tab', () => {

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

                        basePage.validateUrlContains(urlEventsToValidate);

                        eventsPage.validateEventTitle(firstEventTitle);
                    })
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

        basePage.validateUrlContains(urlLastMinuteToValidate);

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
                        
        basePage.clickOnScreenFReeSpace();
        
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

                            let today = new Date();
                            let dateFrom = today.getFullYear() + '-' + ('0' + (today.getMonth() + 1)).slice(-2) + '-' 
                                            + ('0' + today.getDate()).slice(-2);
                            
                            let todayInTwoWeeks = new Date();
                            todayInTwoWeeks.setDate(todayInTwoWeeks.getDate() + 2 * 7);

                            let dateTo = todayInTwoWeeks.getFullYear() + '-' + ('0' + (todayInTwoWeeks.getMonth() + 1)).slice(-2) 
                                            + '-' + ('0' + todayInTwoWeeks.getDate()).slice(-2);
                                                        
                            let dateLocatorFrom = '[date=' + '"' + dateFrom + '"]'
                            let dateLocatorTo = '[date=' + '"' + dateTo + '"]'

                            cy.get($obj).find(catalogPage.datesInputField())
                                            .click();

                            cy.get($obj).find(catalogPage.calendarRange())
                                            .should('be.visible')
                                            .find(dateLocatorFrom)
                                            .click();

                            cy.get($obj).find(catalogPage.calendarRange())
                                            .should('be.visible')
                                            .find(dateLocatorTo)
                                            .click();

                            
                            const month = today.toLocaleString('default', { month: 'short' });
                            const month2 = todayInTwoWeeks.toLocaleString('default', { month: 'short' });

                            let dateFilled = ('0' + today.getDate()).slice(-2) + ' ' + month + ' ' + today.getFullYear() + ' ' 
                                                + '-' + ' ' + ('0' + todayInTwoWeeks.getDate()).slice(-2) + ' ' + month2 + ' ' 
                                                + todayInTwoWeeks.getFullYear();

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
                            })

                            catalogPage.clickSearchBtn();

                            catalogPage.validateMainTitleText(textForAddress);

                            catalogPage.validateItemsAddress(textForAddress);
    })
});