import { faker } from "@faker-js/faker";
import { API_Functions } from "../../pages/api_functions_page";

describe('WHen I test all the POST operations on Gorest for the User', () => {
    let userData;
    const api_functions = new API_Functions();
    const urlsTable = {
        users: 'https://gorest.co.in/public/v2/users',
        activeUsersOnly: 'https://gorest.co.in/public/v2/users?status=active',
        posts: 'https://gorest.co.in/public/v2/posts',
        comments: 'https://gorest.co.in/public/v2/comments',
        todos: 'https://gorest.co.in/public/v2/todos'
    }

    before(() => {
        cy.fixture('api_gorest').then((data) => {
            userData = data;
            userData.user.name = faker.name.fullName();
            userData.user.email = faker.internet.email();
        });
    });

    it('Then it is not possible to create User with filled only "name" field', () => {
        const body = {
            name: userData.user.name
        }

        api_functions.createRecordInTable(urlsTable.users, body)
                        .then(response => {
                            expect(response.status).is.eq(422);
                        });
    });

    it('Then it is not possible to create User with filled only "email" field', () => {
        const body = {
            email: userData.user.email
        }

        api_functions.createRecordInTable(urlsTable.users, body)
                        .then(response => {
                            expect(response.status).is.eq(422);
                        });
    });

    it('Then it is not possible to create User with filled only "gender" field', () => {
        const body = {
            gender: userData.user.gender
        }

        api_functions.createRecordInTable(urlsTable.users, body)
                        .then(response => {
                            expect(response.status).is.eq(422);
                        });
    });

    it('Then it is not possible to create User with filled only "status" field', () => {
        const body = {
            status: userData.user.status
        }

        api_functions.createRecordInTable(urlsTable.users, body)
                        .then(response => {
                            expect(response.status).is.eq(422);
                        });
    });

    it('Then it is not possible to create User with filled only "name" and "email" fields', () => {
        const body = {
            name: userData.user.name,
            email: userData.user.email
        }

        api_functions.createRecordInTable(urlsTable.users, body)
                        .then(response => {
                            expect(response.status).is.eq(422);
                        });
    });


    it('Then it is not possible to create User with filled only "name", "gender" and "email" fields', () => {
        const body = {
            name: userData.user.name,
            gender: userData.user.gender,
            email: userData.user.email
        }

        api_functions.createRecordInTable(urlsTable.users, body)
                        .then(response => {
                            expect(response.status).is.eq(422);
                        });
    });

    it('Then it is not possible to create User without access token', () => {
        const body = {
            name: userData.user.name,
            gender: userData.user.gender,
            email: userData.user.email,
            status: userData.user.status
        }

        api_functions.createRecordInTableNoToken(urlsTable.users, body)
                        .then(response => {
                            expect(response.status).is.eq(401);
                        });
    });

    it('Then it is not possible to create User without the correct access token', () => {
        const body = {
            name: userData.user.name,
            gender: userData.user.gender,
            email: userData.user.email,
            status: userData.user.status
        }

        api_functions.createRecordInTableIncorrectToken(urlsTable.users, body)
                        .then(response => {
                            expect(response.status).is.eq(401);
                        });
    });

    it('Then it is not possible to create User with incorrect fields in the request body', () => {
        const body = {
            surname: userData.user.name,
            gender: userData.user.gender,
            email: userData.user.email,
            status: userData.user.status
        }

        api_functions.createRecordInTable(urlsTable.users, body)
                        .then(response => {
                            expect(response.status).is.eq(422);
                        });
    });

    it('Then it is possible to create User with all the fields filled', () => {
        const body = {
            name: userData.user.name,
            gender: userData.user.gender,
            email: userData.user.email,
            status: userData.user.status
        }

        api_functions.createRecordInTable(urlsTable.users, body)
                        .then(response => {
                            expect(response.status).is.eq(201);
                        });
    });
});