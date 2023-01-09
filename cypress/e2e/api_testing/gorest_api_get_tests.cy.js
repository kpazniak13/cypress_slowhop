import { API_Functions } from "../../pages/api_functions_page";

describe('GET operations on Gorest', () => {
    let userData = {};
    const api_functions = new API_Functions();
    const urlsTable = {
        users: 'https://gorest.co.in/public/v2/users',
        activeUsersOnly: 'https://gorest.co.in/public/v2/users?status=active',
        posts: 'https://gorest.co.in/public/v2/posts',
        comments: 'https://gorest.co.in/public/v2/comments',
        todos: 'https://gorest.co.in/public/v2/todos'
    }

    before(() => {
        cy.createFullAPIData('api_gorest')
            .then((data) => {
                userData = data;
            });
        cy.allure()
            .epic('API calls')
            .feature('Gorest application')
            .suite('Gorest API tests suite')
            .subSuite('GET operation');
    })

    it('Getting the list of existing users works correctly', () => {
        api_functions.getRecordsFromTable(urlsTable.users)
            .then(response => {
                expect(response.headers['content-type']).includes('application/json');
                expect(response.status).to.equal(200);
                expect(response.body.length).to.be.equal(10);
            });
    });

    it('Getting only active users returns correct results', () => {
        api_functions.getRecordsFromTable(urlsTable.activeUsersOnly)
                        .then(response => {
                            response.body.forEach(element => {
                                expect(element.status).is.eq('active');
                            });
                        });
    });

    it('Veryfying that it is NOT possible to get the specific user by its id without the access token', () => {
        api_functions.getRecordsFromTableWithNoStatusFail(urlsTable.users + `/${userData.userId}`)
                        .then(response => {
                            expect(response.status).is.eq(404);
                        });
    });

    it('Veryfying that it is possible to get the specific user by its id', () => {
        api_functions.getRecordsFromTableWithToken(urlsTable.users + `/${userData.userId}`)
                        .then(response => {
                            expect(response.status).is.eq(200);
                            expect(response.body.id).is.eq(userData.userId);
                            expect(response.body.email).is.eq(userData.email);
                            expect(response.body.name).is.eq(userData.name);
                            expect(response.body.gender).is.eq(userData.gender);
                            expect(response.body.status).is.eq(userData.status);
                        });
    });

    it('Getting the list of existing posts works correctly', () => {
        api_functions.getRecordsFromTable(urlsTable.posts)
                        .then(response => {
                            expect(response.status).to.equal(200);
                            expect(response.body.length).to.be.equal(10);
                            expect(response.body[0]).has.property('id');
                            expect(response.body[0]).has.property('user_id');
                            expect(response.body[0]).has.property('title').not.to.be.empty;
                            expect(response.body[0]).has.property('body').not.to.be.empty;
                        });
    });

    it('Getting the post of a specified user returns the correct value', () => {
        api_functions.getRecordsFromTableWithToken(urlsTable.users + `/${userData.userId}` + '/posts')
                        .then(response => {
                            expect(response.status).to.equal(200);
                            expect(response.body[0].user_id).is.eq(userData.userId);
                            expect(response.body[0].id).is.eq(userData.postId);
                            expect(response.body[0].body).is.eq(userData.postBody);
                        });
    });

    it('Getting the list of existing post comments works correctly', () => {
        api_functions.getRecordsFromTable(urlsTable.comments)
                        .then(response => {
                            expect(response.status).to.equal(200);
                            expect(response.body.length).to.be.equal(10);
                            expect(response.body[0]).has.property('id');
                            expect(response.body[0]).has.property('post_id');
                            expect(response.body[0]).has.property('email').not.to.be.empty;
                            expect(response.body[0]).has.property('body').not.to.be.empty;
                        });
    });

    it('Getting the post of a specified user returns the correct value', () => {
        api_functions.getRecordsFromTableWithToken(urlsTable.posts + `/${userData.postId}` + '/comments')
                        .then(response => {
                            expect(response.status).to.equal(200);
                            expect(response.body[0].post_id).is.eq(userData.postId);
                            expect(response.body[0].id).is.eq(userData.commentId);
                            expect(response.body[0].name).is.eq(userData.name);
                            expect(response.body[0].email).is.eq(userData.email);
                            expect(response.body[0].body).is.eq(userData.commentBody);
                        });
    });

    it('Getting the list of existing todos comments works correctly', () => {
        api_functions.getRecordsFromTable(urlsTable.todos)
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

    it('Getting the todo of a specified user returns the correct value', () => {
        api_functions.getRecordsFromTableWithToken(urlsTable.users + `/${userData.userId}` + '/todos')
                        .then(response => {
                            expect(response.status).to.equal(200);
                            expect(response.body[0].user_id).is.eq(userData.userId);
                            expect(response.body[0].id).is.eq(userData.todoId);
                            expect(response.body[0].title).is.eq(userData.title);
                            expect(response.body[0].status).is.eq(userData.todoStatus);
                        });
    });
});
