import { faker } from "@faker-js/faker";
import { API_Functions } from "../../pages/api_functions_page";

describe('PUT operations on Gorest User table', () => {
    let userId;
    let randomNameEditted = faker.name.fullName();
    let randomEmailEditted = faker.internet.email();
    const api_functions = new API_Functions();
    let genderEditted = "female";
    let statusEditted = "inactive";
    const urlsTable = {
        users: 'https://gorest.co.in/public/v2/users',
        usersIncorrectURL: 'https://gorest.co.in/public/v2/user'
    };
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
        cy.allure()
            .epic('API calls')
            .feature('Gorest application')
            .suite('Gorest API tests suite')
            .subSuite('PUT operation');
    });

    it('Veryfying that updating all the fields of the created user works correctly', () => {
        const body = {
            name: randomNameEditted,
            email: randomEmailEditted,
            gender: "female",
            status: "inactive"
        }

        api_functions.updateRecordInTable(urlsTable.users + `/${userId}`, body)
                        .then(response => {
                            expect(response.status).to.equal(200);
                            expect(response.body.name).to.eq(randomNameEditted);
                            expect(response.body.email).to.eq(randomEmailEditted);
                            expect(response.body.gender).to.eq(genderEditted);
                            expect(response.body.status).to.eq(statusEditted);
                        })
    });

    specify("Updtaing email field", () => {
        dataSetValuesEmail.forEach((item) => {
            it(`Updating the email with ${item.value} returns status ${item.status}`, () => {
                cy.allure()
                    .suite('Gorest API tests suite')
                    .subSuite('PUT operation');
                const body = {
                    email: item.value
                }
        
                api_functions.updateRecordInTable(urlsTable.users + `/${userId}`, body)
                .then(response => {
                    expect(response.status).to.equal(item.status);
                });
            });
        });
    });

    specify("Updtaing name field", () => {
        dataSetValuesName.forEach((item) => {
            it(`Updating the name with ${item.value} returns status ${item.status}`, () => {
                cy.allure()
                    .suite('Gorest API tests suite')
                    .subSuite('PUT operation');
                const body = {
                    name: item.value
                }
        
                api_functions.updateRecordInTable(urlsTable.users + `/${userId}`, body)
                                .then(response => {
                                    expect(response.status).to.equal(item.status);
                                });
            });
        });
    });

    it('Updating the name on incorrect endpoint throws error', () => {
        const body = {
            name: randomNameEditted
        }

        api_functions.updateRecordInTable(urlsTable.usersIncorrectURL + `/${userId}`, body)
                        .then(response => {
                            expect(response.status).to.equal(404);
                        });
    });
});