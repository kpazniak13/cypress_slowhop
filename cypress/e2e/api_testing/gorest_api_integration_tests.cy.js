import { faker } from '@faker-js/faker';
import { API_Functions } from "../../pages/api_functions_page";

describe('WHen I test the process of CRUD operations for users on Gorest', () => {
    const randomName = faker.name.fullName();
    const randomEmail = faker.internet.email();
    const api_functions = new API_Functions();
    let userId;
    const urlsTable = {
        users: 'https://gorest.co.in/public/v2/users'
    };

    it('Then getting the list of existing users works correctly', () => {
        api_functions.getRecordsFromTable(urlsTable.users)
                        .then(response => {
                            expect(response.headers['content-type']).includes('application/json');
                            expect(response.status).to.equal(200);
                            expect(response.body.length).to.be.equal(10);
                        });
    });

    it('Then creating a new user works correctly', () => {
        const body = {
            name: randomName,
            email: randomEmail,
            gender: 'male',
            status: 'active'
        }

        api_functions.createRecordInTable(urlsTable.users, body)
                        .then(response => {
                            userId = response.body.id;
                            expect(response.status).to.eq(201);
                            expect(response.body.name).to.eq(randomName);
                            expect(response.body.email).to.eq(randomEmail);
                            expect(response.body.gender).to.eq('male');
                            expect(response.body.status).to.eq('active');
                        });
    });

    it('Then finding the created user returns the correct item', () => {
        api_functions.getRecordsFromTableWithToken(urlsTable.users + `/${userId}`)
                        .then(response => {
                            expect(response.status).to.equal(200);
                            expect(response.body.name).to.eq(randomName);
                            expect(response.body.email).to.eq(randomEmail);
                            expect(response.body.gender).to.eq('male');
                            expect(response.body.status).to.eq('active');
                        });
    });

    it('Then updating the data of the created user works correctly', () => {
        const randomNameEditted = faker.name.fullName();
        const randomEmailEditted= faker.internet.email();
        const body = {
            name: randomNameEditted,
            email: randomEmailEditted
        }

        api_functions.updateRecordInTable(urlsTable.users + `/${userId}`, body)
                        .then(response => {
                            expect(response.status).to.equal(200);
                            expect(response.body.name).to.eq(body.name);
                            expect(response.body.email).to.eq(body.email);
                            expect(response.body.gender).to.eq('male');
                            expect(response.body.status).to.eq('active');
                        });
    });

    it('Then removing the created user works correctly', () => {
        api_functions.deleteWithToken(urlsTable.users + `/${userId}`)
                        .then(response => {
                            expect(response.body).to.be.empty;
                            expect(response.status).to.equal(204);
                        });
    });

    it('Then error message is shown when I am trying to get the deleted user', () => {
        api_functions.getRecordsFromTableWithNoStatusFail(urlsTable.users + `/${userId}`)
                        .then(response => {
                            expect(response.status).is.eq(404);
                        });
    });
});