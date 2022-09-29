describe('WHen I test all the PUT operations on Gorest User table', () => {
    let userId;
     
    before(() => {
        cy.createAPIUser('api_gorest')
            .then((data) => {
                userId = data.body.id;
            });
    });

    it('Then deleting with no auth token provided throws error', () => {
        cy.request({
            method: 'DELETE',
            failOnStatusCode: false,
            url: `https://gorest.co.in/public/v2/users/${userId}`,
        })
        .then(response => {
            expect(response.status).to.equal(404);
        })
    });

    it('Then deleting with incorrect endpoint throws error', () => {
        cy.request({
            method: 'DELETE',
            failOnStatusCode: false,
            url: `https://gorest.co.in/public/v2/user/${userId}`,
        })
        .then(response => {
            expect(response.status).to.equal(404);
        })
    });

    it('Then deleting with no user id throws error', () => {
        cy.request({
            method: 'DELETE',
            failOnStatusCode: false,
            url: `https://gorest.co.in/public/v2/users/`,
        })
        .then(response => {
            expect(response.status).to.equal(404);
        })
    });

    it('Then deleting with all the fields of the created user works correctly', () => {
        cy.request({
            method: 'DELETE',
            auth: {
                bearer: Cypress.env('bearerToken')
            },
            url: `https://gorest.co.in/public/v2/users/${userId}`,
        })
        .then(response => {
            expect(response.status).to.equal(204);
        })
    });
});