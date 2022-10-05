import { faker } from '@faker-js/faker';

describe('WHen I test the process of CRUD operations for users on Gorest', () => {
    const randomName = faker.name.fullName();
    const randomEmail = faker.internet.email();
    let userId;

    it('Then getting the list of existing users works correctly', () => {
        cy.request({
            method: 'GET',
            url: 'https://gorest.co.in/public/v2/users'
        })
        .then(response => {
            expect(response.headers['content-type']).includes('application/json');
            expect(response.status).to.equal(200);
            expect(response.body.length).to.be.equal(10);
        })
    });

    it('Then creating a new user works correctly', () => {
        cy.request({
            method: 'POST',
            url: 'https://gorest.co.in/public/v2/users',
            auth: {
                bearer: Cypress.env('bearerToken')
            },
            body: {
                name: randomName,
                email: randomEmail,
                gender: 'male',
                status: 'active'
            }
        })
        .then(response => {
            userId = response.body.id;
            expect(response.status).to.eq(201);
            expect(response.body.name).to.eq(randomName);
            expect(response.body.email).to.eq(randomEmail);
            expect(response.body.gender).to.eq('male');
            expect(response.body.status).to.eq('active');
        })
    });

    it('Then finding the created user returns the correct item', () => {
        cy.request({
            method: 'GET',
            auth: {
                bearer: Cypress.env('bearerToken')
            },
            url: `https://gorest.co.in/public/v2/users/${userId}`
        })
        .then(response => {
            expect(response.status).to.equal(200);
            expect(response.body.name).to.eq(randomName);
            expect(response.body.email).to.eq(randomEmail);
            expect(response.body.gender).to.eq('male');
            expect(response.body.status).to.eq('active');
        })
    });

    it('Then updating the data of the created user works correctly', () => {
        let randomNameEditted = faker.name.fullName();
        let randomEmailEditted = faker.internet.email();

        cy.request({
            method: 'PUT',
            auth: {
                bearer: Cypress.env('bearerToken')
            },
            url: `https://gorest.co.in/public/v2/users/${userId}`,
            body: {
                name: randomNameEditted,
                email: randomEmailEditted
            }
        })
        .then(response => {
            expect(response.status).to.equal(200);
            expect(response.body.name).to.eq(randomNameEditted);
            expect(response.body.email).to.eq(randomEmailEditted);
            expect(response.body.gender).to.eq('male');
            expect(response.body.status).to.eq('active');
        })
    });

    it('Then removing the created user works correctly', () => {
        cy.request({
            method: 'DELETE',
            auth: {
                bearer: Cypress.env('bearerToken')
            },
            url: `https://gorest.co.in/public/v2/users/${userId}`,
        })
        .then(response => {
            expect(response.body).to.be.empty;
            expect(response.status).to.equal(204);
        })
    });

    it('Then error message is shown when I am trying to get the deleted user', () => {
        cy.request({
            method: 'GET',
            url: `https://gorest.co.in/public/v2/users/${userId}`,
            failOnStatusCode: false
        })
        .then(response => {
            expect(response.status).is.eq(404);
        })
    });
});