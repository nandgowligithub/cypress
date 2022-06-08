import { HomePage } from "../../PageObjects/HomePage";
import { LoginPage } from "../../PageObjects/LoginPage";

let bearerToken: string;
let appId: string;
let userName = `chetan.nandgowli`;
let passwd = `Test1234`;
const API_BASE_URL = Cypress.config().baseUrl;
let id: string;

before(() => {

    cy.visit(`/login`);

    // intercept create record req for fetching application ID
    cy.intercept('POST', '/api/user/login').as('login');

    // enter valid username
    LoginPage.enterUserName(userName);
    // enter valid password
    LoginPage.enterPassword(passwd);
    // submit button should be enabled then click on it
    LoginPage.LoginSubmitBtn().should(`be.enabled`).click();
    cy.wait('@login', { timeout: 20000 }).its('response.body').then((req) => {

        bearerToken = JSON.stringify(req.token).split(`"`)[1];
        // cy.log(`Bearer token is >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> ${bearerToken}`);

    }).then(() => {
        // login should be sucessfull and avtar should be displayed
        HomePage.homePadeDisplayCheck().should(`be.visible`);
    });



    HomePage.createNewRecordBtn().click({ force: true });

    cy.url().should(`contain`, `record`).then((url) => {
        appId = JSON.stringify(url).split(`/record/`)[1].split(`/`)[0];
        // cy.log(`currUrl >>>>>>>>>>>>>>>>>>>>>>>>>>>>>> ${currUrl}`)
    })

})


describe(`API spec file`, () => {

    // Create a new record
    it('Add a record', () => {
        const req: Partial<Cypress.RequestOptions> = {
            method: 'POST',
            url: API_BASE_URL + `/app/${appId}/record`,
            headers: { Accept: 'application/json, application/hal+json', Authorization: `Bearer ${bearerToken}` },
            failOnStatusCode: false,
            body: {}/////////////Some Body Here////////////////////
        };

        // make an api request
        cy.request(req).then(({ body, status, statusText, headers, duration }) => {
            // validate status should be 200
            expect(200).to.eq(200);

            id = body.recordID;  // assuming the record id

        });
    });

    it(`Fetch a record`, () => {

        const req: Partial<Cypress.RequestOptions> = {
            method: 'GET',
            url: API_BASE_URL + `/app/${appId}/record/${id}`,
            headers: { Accept: 'application/json, application/hal+json', Authorization: `Bearer ${bearerToken}` },
            failOnStatusCode: false,
            body: {}
        };

        // make an api request
        cy.request(req).then(({ body, status, statusText, headers, duration }) => {
            // validate status should be 200
            expect(200).to.eq(200);

        });
    });

    it(`Delete a record`, () => {

        const req: Partial<Cypress.RequestOptions> = {
            method: 'DELETE',
            url: API_BASE_URL + `/app/${appId}/record/${id}`,
            headers: { Accept: 'application/json, application/hal+json', Authorization: `Bearer ${bearerToken}` },
            failOnStatusCode: false
        };

        // make an api request
        cy.request(req).then(({ body, status, statusText, headers, duration }) => {
            // validate status should be 200
            expect(200).to.eq(200);

        });
    });

});
