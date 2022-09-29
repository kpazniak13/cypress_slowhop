import { faker } from "@faker-js/faker";

describe('WHen I test all the PUT operations on Gorest User table', () => {
    let userId;
    let randomNameEditted = faker.name.fullName();
    let randomEmailEditted = faker.internet.email();
    let genderEditted = "female";
    let statusEditted = "inactive";
    
    before(() => {
        cy.createAPIUser('api_gorest')
            .then((data) => {
                userId = data.body.id;
            });
    });

    it('Then updating all the fields of the created user works correctly', () => {
        cy.request({
            method: 'PUT',
            auth: {
                bearer: Cypress.env('bearerToken')
            },
            url: `https://gorest.co.in/public/v2/users/${userId}`,
            body: {
                name: randomNameEditted,
                email: randomEmailEditted,
                gender: "female",
                status: "inactive"
            }
        })
        .then(response => {
            expect(response.status).to.equal(200);
            expect(response.body.name).to.eq(randomNameEditted);
            expect(response.body.email).to.eq(randomEmailEditted);
            expect(response.body.gender).to.eq(genderEditted);
            expect(response.body.status).to.eq(statusEditted);
        })
    });

    it('Then updating the email with incorrect value throws error', () => {
        cy.request({
            method: 'PUT',
            auth: {
                bearer: Cypress.env('bearerToken')
            },
            failOnStatusCode: false,
            url: `https://gorest.co.in/public/v2/users/${userId}`,
            body: {
                email: 123
            }
        })
        .then(response => {
            expect(response.status).to.equal(422);
        })
    });

    it('Then updating the name with special characters works correctly', () => {
        cy.request({
            method: 'PUT',
            auth: {
                bearer: Cypress.env('bearerToken')
            },
            failOnStatusCode: false,
            url: `https://gorest.co.in/public/v2/users/${userId}`,
            body: {
                name: "~$#@"
            }
        })
        .then(response => {
            expect(response.status).to.equal(200);
        })
    });

    it('Then updating the name on incorrect endpoint throws error', () => {
        cy.request({
            method: 'PUT',
            auth: {
                bearer: Cypress.env('bearerToken')
            },
            failOnStatusCode: false,
            url: `https://gorest.co.in/public/v2/user/${userId}`,
            body: {
                name: randomNameEditted
            }
        })
        .then(response => {
            expect(response.status).to.equal(404);
        })
    });

    it('Then updating the name with empty string throws error', () => {
        cy.request({
            method: 'PUT',
            auth: {
                bearer: Cypress.env('bearerToken')
            },
            failOnStatusCode: false,
            url: `https://gorest.co.in/public/v2/users/${userId}`,
            body: {
                name: ""
            }
        })
        .then(response => {
            expect(response.status).to.equal(422);
        })
    });
});