describe('NBP Web Api Testing', () => {

    it('Testing today`s USD exchange rates', () => {
        cy.request({
            method: 'GET',
            url: 'http://api.nbp.pl/api/exchangerates/rates/c/usd/today/?format=json'
        })
        .then(response => {
            expect(response.headers['content-type']).includes('application/json');
            expect(response.status).to.equal(200);
            expect(response.body.code).to.equal('USD');
            expect(response.body.rates.length).to.be.equal(1);
        });
    });

    it('Testing Current table of exchange rates of type A', () => {
        cy.request({
            method: 'GET',
            url: 'http://api.nbp.pl/api/exchangerates/tables/A/?format=json'
        })
        .then(response => {
            expect(response.body).not.to.be.empty
            expect(response.status).to.equal(200);
            expect(response.body[0].table).to.equal('A');
            expect(response.body[0].rates.length).to.be.equal(34);

            let codesArray = [];
            let codesBase = ['THB', 'USD', 'AUD', 'HKD', 'CAD', 'NZD', 'SGD', 'EUR', 'HUF', 'CHF', 'GBP', 
                            'UAH', 'JPY', 'CZK', 'DKK', 'ISK', 'NOK', 'SEK', 'HRK', 'RON', 
                            'BGN', 'TRY', 'ILS', 'CLP', 'PHP', 'MXN', 'ZAR', 'BRL', 'MYR', 
                            'IDR', 'INR', 'KRW', 'CNY', 'XDR']

            for(let i = 0; i < response.body[0].rates.length; i++) {
                codesArray.push(response.body[0].rates[i].code);
            }

            codesArray.forEach(code => {
                expect(codesBase.includes(code)).to.eq(true);
            });
        });
    });

    it('Testing exchange rate of currency BRL from the exchange rate table of type B', () => {
        cy.request({
            method: 'GET',
            url: 'http://api.nbp.pl/api/exchangerates/rates/B/BRL/?format=json'
        })
        .then(response => {
            expect(response.body).has.property('country', 'Brazylia');
            expect(response.body).has.property('currency', 'real');
            expect(response.body.table).to.eq('B');
            expect(response.body.rates.length).to.be.equal(1);
        });
    });

    it('Testing the table of type A published today, if today`s table has not been published yet, the 404 error code is returned', () => {
        cy.request({
            method: 'GET',
            failOnStatusCode: false,
            url: 'http://api.nbp.pl/api/exchangerates/tables/a/today/'
        })
        .then(response => {
            if(response.status == 200) {
                expect(response.body[0].table).to.eq('A');

                let todayDate = new Date();
                let formattedDate = todayDate.getFullYear() + '-' + ('0' + (todayDate.getMonth() + 1)).slice(-2) + '-' 
                                    + ('0' + todayDate.getDate()).slice(-2);

                expect(response.body[0].effectiveDate).to.eq(formattedDate);
                expect(response.body[0].rates.length).to.be.equal(34);
            }
            else {
                expect(response.status).to.equal(404);
            }
        });
    });

    it('Testing series of the last 10 quotations of GBP average exchange rate in the JSON', () => {
        cy.request({
            method: 'GET',
            url: 'http://api.nbp.pl/api/exchangerates/rates/a/gbp/last/10/?format=json'
        })
        .then(response => {
            expect(response.body.rates.length).to.eq(10);
            expect(response.body.code).is.eq('GBP');
        });
    });

    it('Testing series of GBP average exchange rates from 2012-01-01 to 2012-01-31', () => {
        cy.request({
            method: 'GET',
            url: 'http://api.nbp.pl/api/exchangerates/rates/a/gbp/2012-01-01/2012-01-31/'
        })
        .then(response => {
            expect(response.body.rates.length).to.eq(21);
            expect(response.body.code).is.eq('GBP');
            expect(response.body.rates[0].effectiveDate).is.eq('2012-01-02');
            expect(response.body.rates[20].effectiveDate).is.eq('2012-01-31');
        });
    });

    it('Testing forbidden PUT request', () => {
        cy.request({
            method: 'PUT',
            failOnStatusCode: false,
            url: 'http://api.nbp.pl/api/exchangerates/rates/a/chf/'
        })
        .then(response => {
            expect(response.status).is.eq(404);
        });
    });

});