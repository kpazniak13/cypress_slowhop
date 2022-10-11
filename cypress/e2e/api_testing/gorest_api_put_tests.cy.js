import { faker } from "@faker-js/faker";

describe('WHen I test all the PUT operations on Gorest User table', () => {
    let userId;
    let randomNameEditted = faker.name.fullName();
    let randomEmailEditted = faker.internet.email();
    let genderEditted = "female";
    let statusEditted = "inactive";
    let dataSetValuesName = [{
            "value": "123",
            "status": 200
        },
        {
            "value": "$%^&",
            "status": 200
        },
        {
            "value": 123456789,
            "status": 200
        },
        {
            "value": " ",
            "status": 422
        },
        {
            "value": "",
            "status": 422
        }
    ]
    let dataSetValuesEmail = [{
            "value": "123",
            "status": 422
        },
        {
            "value": "123@.",
            "status": 422
        },
        {
            "value": " ",
            "status": 422
        }
    ]

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

    context("Updtaing name field", () => {
        dataSetValuesEmail.forEach((item) => {
            it(`Then updating the email with ${item.value} returns status ${item.status}`, () => {
                cy.request({
                    method: 'PUT',
                    auth: {
                        bearer: Cypress.env('bearerToken')
                    },
                    failOnStatusCode: false,
                    url: `https://gorest.co.in/public/v2/users/${userId}`,
                    body: {
                        email: item.value
                    }
                })
                .then(response => {
                    expect(response.status).to.equal(item.status);
                });
            });
        });
    });

    context("Updtaing name field", () => {
        dataSetValuesName.forEach((item) => {
            it(`Then updating the name with ${item.value} returns status ${item.status}`, () => {
                cy.request({
                    method: 'PUT',
                    auth: {
                        bearer: Cypress.env('bearerToken')
                    },
                    failOnStatusCode: false,
                    url: `https://gorest.co.in/public/v2/users/${userId}`,
                    body: {
                        name: item.value
                    }
                })
                .then(response => {
                    expect(response.status).to.equal(item.status);
                });
            });
        });
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
        });
    });
});