import { API_Functions } from "../../pages/api_functions_page";

describe('WHen I test all the DELETE operations on Gorest User table', () => {
    let userId;
    const api_functions = new API_Functions();
    const urlsTable = {
        usersCorrectEndpoint: 'https://gorest.co.in/public/v2/users',
        usersIncorrectEndpoint: 'https://gorest.co.in/public/v2/user'
    }

    before(() => {
        cy.createAPIUser('api_gorest')
            .then((data) => {
                userId = data.body.id;
            });
    });

    it('Then deleting with no auth token provided throws error', () => {
        api_functions.deleteWithNoToken(urlsTable.usersCorrectEndpoint + `/${userId}`)
                        .then(response => {
                            expect(response.status).to.equal(404);
                        });
    });

    it('Then deleting with incorrect endpoint throws error', () => {
        api_functions.deleteWithNoToken(urlsTable.usersIncorrectEndpoint + `/${userId}`)
                        .then(response => {
                            expect(response.status).to.equal(404);
                        });
    });

    it('Then deleting with no user id throws error', () => {
        api_functions.deleteWithNoToken(urlsTable.usersCorrectEndpoint)
                        .then(response => {
                            expect(response.status).to.equal(404);
                        });
    });

    it('Then deleting with all the fields of the created user works correctly', () => {
        api_functions.deleteWithToken(urlsTable.usersCorrectEndpoint + `/${userId}`)
                        .then(response => {
                            expect(response.status).to.equal(204);
                            expect(response.body).to.be.empty;
                        });
    });
});