
describe('Smoke tests set', () => {


    beforeEach(() => {
        cy.visit('https://slowhop.com/pl/')
    });

    it('visits the Slowhop.pl and verifies the navigation bar', () => {
        
        cy.get('.nav-item.pull-left li')
                    .should('have.length', 5)
                    .and('contain.text', 'MIEJSCA')
                    .and('contain.text', 'WYDARZENIA')
                    .and('contain.text', 'MAPA')
                    .and('contain.text', 'POMYSŁY')
                    .and('contain.text', 'LAST MINUTE')

        cy.get('.logo-container')
                    .find('a').should('have.attr', 'href')

        cy.get('.logo-container')
                    .find('.svg-icon svg')

        cy.get('.nav-item.navbar-right').first()
                    .find('li')
                    .should('have.length', 4)
                    .and('contain.text', 'O NAS')
                    .and('contain.text', 'ZALOGUJ SIĘ')
                    .and('contain.text', 'DODAJ OFERTĘ')
                    .eq(3)
                    .find('button.langs-s__trigger')
                    .should('exist')


    });

    it('checks the first event at Wydarzenia tab', () => {

        let firstEventTitle = '';

        cy.get('.navbar-header > .nav-item > :nth-child(2) > a').click()
        cy.get('#search-results').should('exist')

        cy.get('#search-results').find('div.row div.search-product--text h5').eq(0).then(($el) => {
            firstEventTitle = $el.text()

            cy.get('#search-results a.search-product').eq(0).invoke('removeAttr', 'target').click()
            cy.url().should('include', '/wydarzenia/')
    
            cy.get('.product--info--heading h1').should('have.text', firstEventTitle)
        })
    });


    it('checks the first item at Last Minute tab', () => {
        cy.get('.navbar-header .nav-item > li > a').eq(4)
                    .should('have.class', 'red')
                    .click()
                    .should('not.exist')

        cy.get('h1.main-title').should('have.text', 'Last minute')
        cy.url().should('include', '/last-minute')

        cy.get('.grid-results__tiles')
                        .find('.catalog-tile span.catalog-tile__sticker--thunder')
                        .should('contain.text', 'Instant booking')

        cy.get('.grid-results__tiles')
                        .find('.catalog-tile__link')
                        .first()
                        .invoke('removeAttr', 'target')
                        .click()
        cy.url().should('include', '/last-minute/v2')

        cy.get('.booking-request-info').should('exist')

        cy.get('.booking-interlocutor-info')
                        .find('h1')
                        .should('have.text', 'About place')

        cy.get('.offer-info')
                        .find('.price-container__description h2')
                        .should('contain.text', 'Total price for the stay')

        cy.get('.rules-info')
                        .find('h1')
                        .should('have.text', 'Terms and cancellation rules')

        cy.get('.payment-methods')
                        .find('h1')
                        .should('have.text', 'Payment methods')

        cy.get('.booking-layout__aside')
                        .find('.sticky-box button')
                        .should('contain', 'Go to payment')
        
        cy.get('.sticky-box > .w-100').click()
        cy.get('#login-modal___BV_modal_content_')
                        .should('be.visible')
                        .then(($obj) => {
                            
                            expect($obj).to.be.visible
                            expect($obj).to.contain('Log in')
                            expect($obj).to.contain('Email')
                            expect($obj).to.contain('Password')
                            expect($obj).to.have.descendants('.btn--orange.w-100')
                            expect($obj).to.have.descendants('.btn-facebook')
                        })
                        
        cy.get('body').click(0,0)
        
        cy.get('#login-modal___BV_modal_content_').should('not.exist')
    })

    it('checks the search filter', () => {
        cy.get('.main-text-container a').click()

        cy.get('#where') 
                    .click()
                    .should('be.visible')
                    .next()
                    .find('.result-links__item a')
                    .first()
                    .then(($field) => {

                        let value = $field.text().trim();
                        cy.get($field).click()
                        cy.get('#where').should('have.value', value)
                    })
                    
        cy.get('#range-datepicker-inline-trigger')
                        .then(($obj) => {

                            let today = new Date();
                            let dateFrom = today.getFullYear() + '-' + ('0' + (today.getMonth() + 1)).slice(-2) + '-' + ('0' + today.getDate()).slice(-2)
                            
                            let today2 = new Date();
                            today2.setDate(today2.getDate() + 2 * 7);

                            let dateTo = today2.getFullYear() + '-' + ('0' + (today2.getMonth() + 1)).slice(-2) + '-' + ('0' + today2.getDate()).slice(-2)
                                                        
                            let dateLocatorFrom = '[date=' + '"' + dateFrom + '"]'
                            let dateLocatorTo = '[date=' + '"' + dateTo + '"]'

                            cy.get($obj).find('.search-bar__btn')
                            .click()

                            cy.get($obj).find('.calendar-range')
                            .should('be.visible')
                            .find(dateLocatorFrom)
                            .click()

                            cy.get($obj).find('.calendar-range')
                            .should('be.visible')
                            .find(dateLocatorTo)
                            .click()

                            
                            const month = today.toLocaleString('default', { month: 'short' });
                            const month2 = today2.toLocaleString('default', { month: 'short' });

                            let dateFilled = ('0' + today.getDate()).slice(-2) + ' ' + month + ' ' + today.getFullYear() + ' ' + '-' + ' ' + ('0' + today2.getDate()).slice(-2) + ' ' + month2 + ' ' + today2.getFullYear()

                            cy.get($obj).find('.search-bar-text').then(($date) => {
                                let dateText = $date.text();

                                expect(dateText).to.contain(dateFilled)

                            })
                        })
                    

                        cy.get('.search-bar-col').eq(2)
                            .then(($obj) => {

                                cy.get($obj).click()
                                .find('.guest-picker-options')
                                .should('be.visible')
                                .find('.guest-picker-row-buttons svg')
                                .eq(1)
                                .click()

                                cy.get('.advanced-options--show')
                                .find('.advanced-options__footer button')
                                .eq(1)
                                .click()

                                cy.get('.guest-picker-options')
                                .should('not.be.visible')

                                cy.get('.search-button')
                                .click()

                                cy.get('h1.main-title')
                                .should('have.text', 'Poland')

                                cy.get('.catalog-tile__content address')
                                .should('contain.text', 'Poland')
                            })
    })



});