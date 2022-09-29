import { faker } from "@faker-js/faker";

describe('WHen I test all the POST operations on Gorest for the User', () => {
    let userData;
    
    before(() => {
        cy.fixture('api_gorest').then((data) => {
            userData = data;
            userData.user.name = faker.name.fullName();
            userData.user.email = faker.internet.email();
        });
    });

    it('Then it is not possible to create User with filled only "name" field', () => {
        cy.request({
            method: 'POST',
            url: 'https://gorest.co.in/public/v2/users',
            failOnStatusCode: false,
            auth: {
                bearer: Cypress.env('bearerToken')
            },
            body: {
                name: userData.user.name,
            }
        })
        .then(response => {
            expect(response.status).is.eq(422);
        })
    });

    it('Then it is not possible to create User with filled only "email" field', () => {
        cy.request({
            method: 'POST',
            url: 'https://gorest.co.in/public/v2/users',
            failOnStatusCode: false,
            auth: {
                bearer: Cypress.env('bearerToken')
            },
            body: {
                email: userData.user.email,
            }
        })
        .then(response => {
            expect(response.status).is.eq(422);
        })
    });

    it('Then it is not possible to create User with filled only "gender" field', () => {
        cy.request({
            method: 'POST',
            url: 'https://gorest.co.in/public/v2/users',
            failOnStatusCode: false,
            auth: {
                bearer: Cypress.env('bearerToken')
            },
            body: {
                gender: userData.user.gender,
            }
        })
        .then(response => {
            expect(response.status).is.eq(422);
        })
    });

    it('Then it is not possible to create User with filled only "status" field', () => {
        cy.request({
            method: 'POST',
            url: 'https://gorest.co.in/public/v2/users',
            failOnStatusCode: false,
            auth: {
                bearer: Cypress.env('bearerToken')
            },
            body: {
                status: userData.user.status,
            }
        })
        .then(response => {
            expect(response.status).is.eq(422);
        })
    });

    it('Then it is not possible to create User with filled only "name" and "email" fields', () => {
        cy.request({
            method: 'POST',
            url: 'https://gorest.co.in/public/v2/users',
            failOnStatusCode: false,
            auth: {
                bearer: Cypress.env('bearerToken')
            },
            body: {
                name: userData.user.name,
                email: userData.user.email
            }
        })
        .then(response => {
            expect(response.status).is.eq(422);
        })
    });


    it('Then it is not possible to create User with filled only "name", "gender" and "email" fields', () => {
        cy.request({
            method: 'POST',
            url: 'https://gorest.co.in/public/v2/users',
            failOnStatusCode: false,
            auth: {
                bearer: Cypress.env('bearerToken')
            },
            body: {
                name: userData.user.name,
                gender: userData.user.gender,
                email: userData.user.email
            }
        })
        .then(response => {
            expect(response.status).is.eq(422);
        })
    });

    it('Then it is not possible to create User without access token', () => {
        cy.request({
            method: 'POST',
            url: 'https://gorest.co.in/public/v2/users',
            failOnStatusCode: false,
            body: {
                name: userData.user.name,
                gender: userData.user.gender,
                email: userData.user.email,
                status: userData.user.status
            }
        })
        .then(response => {
            expect(response.status).is.eq(401);
        })
    });

    it('Then it is not possible to create User without the correct access token', () => {
        cy.request({
            method: 'POST',
            url: 'https://gorest.co.in/public/v2/users',
            auth: {
                bearer: 'notcorrecttoken'
            },
            failOnStatusCode: false,
            body: {
                name: userData.user.name,
                gender: userData.user.gender,
                email: userData.user.email,
                status: userData.user.status
            }
        })
        .then(response => {
            expect(response.status).is.eq(401);
        })
    });

    it('Then it is not possible to create User with incorrect fields in the request body', () => {
        cy.request({
            method: 'POST',
            url: 'https://gorest.co.in/public/v2/users',
            auth: {
                bearer: Cypress.env('bearerToken')
            },
            failOnStatusCode: false,
            body: {
                surname: userData.user.name,
                gender: userData.user.gender,
                email: userData.user.email,
                status: userData.user.status
            }
        })
        .then(response => {
            expect(response.status).is.eq(422);
        })
    });

    it('Then it is possible to create User with all the fields filled', () => {
        cy.request({
            method: 'POST',
            url: 'https://gorest.co.in/public/v2/users',
            failOnStatusCode: false,
            auth: {
                bearer: Cypress.env('bearerToken')
            },
            body: {
                name: userData.user.name,
                gender: userData.user.gender,
                email: userData.user.email,
                status: userData.user.status
            }
        })
        .then(response => {
            expect(response.status).is.eq(201);
        })
    });







});