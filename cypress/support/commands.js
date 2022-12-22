import { faker } from "@faker-js/faker";

// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('createAPIUser', (fixtureTitle) => {
    return cy.fixture(fixtureTitle).then((data) => {
        data.user.name = faker.name.fullName();
        data.user.email = faker.internet.email();

        // Creating the USER for the tests
        cy.request({
            method: 'POST',
            url: 'https://gorest.co.in/public/v2/users',
            auth: {
                bearer: Cypress.env('bearerToken')
            },
            body: {
                name: data.user.name,
                email: data.user.email,
                gender: data.user.gender,
                status: data.user.status
            }
        })
    });
});

Cypress.Commands.add('createFullAPIData', (fixtureTitle) => {
    return cy.fixture(fixtureTitle).then((data) => {
        let userData = {};
        data.user.name = faker.name.fullName();
        data.user.email = faker.internet.email();
        data.todo.due_on = faker.date.future();
        userData.name = data.user.name;
        userData.email = data.user.email;
        userData.due_on = data.todo.due_on;
        userData.gender = data.user.gender;
        userData.status = data.user.status;
        userData.postBody = data.post.body;
        userData.commentBody = data.comment.body;
        userData.title = data.todo.title;
        userData.todoStatus = data.todo.status;

        // Creating the USER for the tests
        cy.request({
            method: 'POST',
            url: 'https://gorest.co.in/public/v2/users',
            auth: {
                bearer: Cypress.env('bearerToken')
            },
            body: {
                name: data.user.name,
                email: data.user.email,
                gender: data.user.gender,
                status: data.user.status
            }
        })
        .then(response => {
            userData.userId = response.body.id;
        })
        .then(() => {
            // Creating the POST for the user for the tests
            cy.request({
                method: 'POST',
                url: `https://gorest.co.in/public/v2/users/${userData.userId}/posts`,
                auth: {
                    bearer: Cypress.env('bearerToken')
                },
                body: {
                    title: data.post.title,
                    body: data.post.body,
                }
            })
            .then(response => {
                userData.postId = response.body.id;
            })
            .then(() => {
                // Creating the COMMENT for the user for the tests
                cy.request({
                    method: 'POST',
                    url: `https://gorest.co.in/public/v2/posts/${userData.postId}/comments`,
                    auth: {
                        bearer: Cypress.env('bearerToken')
                    },
                    body: {
                        name: data.user.name,
                        email: data.user.email,
                        body: data.comment.body
                    }
                })
                .then(response => {
                    userData.commentId = response.body.id;
                });
            })
            .then(() => {
                // Creating the TODOS for the user for the tests
                cy.request({
                    method: 'POST',
                    url: `https://gorest.co.in/public/v2/users/${userData.userId}/todos`,
                    auth: {
                        bearer: Cypress.env('bearerToken')
                    },
                    body: {
                        title: data.todo.title,
                        due_on: data.todo.due_on,
                        status: data.todo.status
                    }
                })
                .then(response => {
                    userData.todoId = response.body.id;
                    return userData;
                });
            });
        });
        
     });
})