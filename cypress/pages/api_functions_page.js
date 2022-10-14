export class API_Functions {

    getRecordsFromTable(urlValue) {
        return cy.request({
            method: 'GET',
            url: urlValue
        });
    }

    getRecordsFromTableWithNoStatusFail(urlValue) {
        return cy.request({
            method: 'GET',
            url: urlValue,
            failOnStatusCode: false
        });
    }

    getRecordsFromTableWithToken(urlValue) {
        return cy.request({
            method: 'GET',
            url: urlValue,
            auth: {
                bearer: Cypress.env('bearerToken')
            }
        });
    }

    deleteWithNoToken(urlValue){
        return cy.request({
            method: 'DELETE',
            failOnStatusCode: false,
            url: urlValue,
        });
    }

    
    deleteWithToken(urlValue){
        return cy.request({
            method: 'DELETE',
            auth: {
                bearer: Cypress.env('bearerToken')
            },
            url: urlValue
        });
    }


    createRecordInTable(url, body) {
        return cy.request({
            method: 'POST',
            url: url,
            failOnStatusCode: false,
            auth: {
                bearer: Cypress.env('bearerToken')
            },
            body: body
        });
    }

    createRecordInTableNoToken(url, body) {
        return cy.request({
            method: 'POST',
            url: url,
            failOnStatusCode: false,
            body: body
        });
    }

    createRecordInTableIncorrectToken(url, body) {
        return cy.request({
            method: 'POST',
            url: url,
            failOnStatusCode: false,
            auth: {
                bearer: 'notcorrecttoken'
            },
            body: body
        });
    }
    
    updateRecordInTable(url, body) {
        return cy.request({
            method: 'PUT',
            url: url,
            failOnStatusCode: false,
            auth: {
                bearer: Cypress.env('bearerToken')
            },
            body: body
        })
    }

    updateRecordInTableNoToken(url, body) {
        return cy.request({
            method: 'PUT',
            url: url,
            failOnStatusCode: false,
            body: body
        })
    }
}