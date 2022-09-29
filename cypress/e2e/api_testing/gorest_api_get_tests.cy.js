describe('WHen I test all the GET operations on Gorest', () => {
    let userData = {};

    before(() => {
        cy.createFullAPIData('api_gorest')
            .then((data) => {
                userData = data;
            });
    })

    it('Then getting the list of existing users works correctly', () => {
        cy.request({
            method: 'GET',
            url: 'https://gorest.co.in/public/v2/users'
        })
        .then(response => {
            expect(response.headers['content-type']).includes('application/json');
            expect(response.status).to.equal(200);
            expect(response.body.length).to.be.equal(10);
        });
    });

    it('Then getting only active users returns correct results', () => {
        cy.request({
            method: 'GET',
            url: 'https://gorest.co.in/public/v2/users?status=active'
        })
        .then(response => {
            response.body.forEach(element => {
                expect(element.status).is.eq('active');
            });
        });
    });

    it('Then it is NOT possible to get the specific user by its id without the access token', () => {
        cy.request({
            method: 'GET',
            url: `https://gorest.co.in/public/v2/users/${userData.userId}`,
            failOnStatusCode: false
        })
        .then(response => {
            expect(response.status).is.eq(404);
        });
    });

    it('Then it is possible to get the specific user by its id', () => {
        cy.request({
            method: 'GET',
            url: `https://gorest.co.in/public/v2/users/${userData.userId}`,
            auth: {
                bearer: Cypress.env('bearerToken')
            }
        })
        .then(response => {
            expect(response.status).is.eq(200);
            expect(response.body.id).is.eq(userData.userId);
            expect(response.body.email).is.eq(userData.email);
            expect(response.body.name).is.eq(userData.name);
            expect(response.body.gender).is.eq(userData.gender);
            expect(response.body.status).is.eq(userData.status);
        });
    });

    it('Then getting the list of existing posts works correctly', () => {
        cy.request({
            method: 'GET',
            url: 'https://gorest.co.in/public/v2/posts'
        })
        .then(response => {
            expect(response.status).to.equal(200);
            expect(response.body.length).to.be.equal(10);
            expect(response.body[0]).has.property('id');
            expect(response.body[0]).has.property('user_id');
            expect(response.body[0]).has.property('title').not.to.be.empty;
            expect(response.body[0]).has.property('body').not.to.be.empty;
        });
    });

    it('Then getting the post of a specified user returns the correct value', () => {
        cy.request({
            method: 'GET',
            url: `https://gorest.co.in/public/v2/users/${userData.userId}/posts`,
            auth: {
                bearer: Cypress.env('bearerToken')
            }
        })
        .then(response => {
            expect(response.status).to.equal(200);
            expect(response.body[0].user_id).is.eq(userData.userId);
            expect(response.body[0].id).is.eq(userData.postId);
            expect(response.body[0].body).is.eq(userData.postBody);
        });
    });

    it('Then getting the list of existing post comments works correctly', () => {
        cy.request({
            method: 'GET',
            url: 'https://gorest.co.in/public/v2/comments'
        })
        .then(response => {
            expect(response.status).to.equal(200);
            expect(response.body.length).to.be.equal(10);
            expect(response.body[0]).has.property('id');
            expect(response.body[0]).has.property('post_id');
            expect(response.body[0]).has.property('email').not.to.be.empty;
            expect(response.body[0]).has.property('body').not.to.be.empty;
        });
    });

    it('Then getting the post of a specified user returns the correct value', () => {
        cy.request({
            method: 'GET',
            url: `https://gorest.co.in/public/v2/posts/${userData.postId}/comments`,
            auth: {
                bearer: Cypress.env('bearerToken')
            }
        })
        .then(response => {
            expect(response.status).to.equal(200);
            expect(response.body[0].post_id).is.eq(userData.postId);
            expect(response.body[0].id).is.eq(userData.commentId);
            expect(response.body[0].name).is.eq(userData.name);
            expect(response.body[0].email).is.eq(userData.email);
            expect(response.body[0].body).is.eq(userData.commentBody);
        });
    });

    it('Then getting the list of existing todos comments works correctly', () => {
        cy.request({
            method: 'GET',
            url: 'https://gorest.co.in/public/v2/todos'
        })
        .then(response => {
            expect(response.status).to.equal(200);
            expect(response.body.length).to.be.equal(10);
            expect(response.body[0]).has.property('id');
            expect(response.body[0]).has.property('user_id');
            expect(response.body[0]).has.property('title').not.to.be.empty;
            expect(response.body[0]).has.property('status').not.to.be.empty;
            expect(response.body[0]).has.property('due_on').not.to.be.empty;
        });
    });

    it('Then getting the todo of a specified user returns the correct value', () => {
        cy.request({
            method: 'GET',
            url: `https://gorest.co.in/public/v2/users/${userData.userId}/todos`,
            auth: {
                bearer: Cypress.env('bearerToken')
            }
        })
        .then(response => {
            expect(response.status).to.equal(200);
            expect(response.body[0].user_id).is.eq(userData.userId);
            expect(response.body[0].id).is.eq(userData.todoId);
            expect(response.body[0].title).is.eq(userData.title);
            expect(response.body[0].status).is.eq(userData.todoStatus);
        });
    });


});
