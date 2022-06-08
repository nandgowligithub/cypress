import cypress from "cypress";
import { HomePage } from "../../PageObjects/HomePage";
import { LoginPage } from '../../PageObjects/LoginPage';
import { HelperMethod } from '../../PageObjects/HelperMethod';

let applicationID: string;


describe(`Application records`, () => {

    let randomNumber = Math.floor(Math.random() * 10000) + 1;
    let userName = `chetan.nandgowli`;
    let password = `Test1234`;
    let recordFirstName = `First Name ${randomNumber}`
    let recordLastName = `Last Name ${randomNumber}`
    let recordCity = `City ${randomNumber}`


    beforeEach(() => {

        // visit login page for login
        cy.visit(`login`)
        // login to the application
        LoginPage.login(userName, password);
        // navigate to landing page
        cy.visit(`/welcome`);

    });

    it(`Save button should be disabled without entering mandatory fields`, () => {

        // click on new record
        HomePage.createNewRecordBtn().click({ force: true });
        // validate personal information heading is displayed
        HomePage.validatePersonalInfoHeader(`Employee Personal Information`);
        // save button should not be available
        HomePage.validateRecordSaveBtn().should(`not.be.visible`);

    });

    it(`Display alert on saving data without mandatory fields`, () => {

        //----Enter first name only and validate data should not be saved----//
        // click on create new record
        HomePage.createNewRecordBtn().click({ force: true });
        // enter first name
        HomePage.enterFieldData(`First Name`).type(recordFirstName);
        // save button should be displayed
        HomePage.validateRecordSaveBtn().should(`be.visible`).click();
        // time spent alert should display and click on save
        HomePage.readAndAcceptModalContent()
        // error should be thrown
        HelperMethod.validateToastMsg(`The record has validation error`).should(`be.visible`);

        //----Enter first name last name and validate data should not be saved----//
        // enter first name
        HomePage.enterFieldData(`First Name`).type(recordFirstName);
        // enter last name
        HomePage.enterFieldData(`Last Name`).type(recordLastName);
        // click on save button
        HomePage.validateRecordSaveBtn().should(`be.visible`).click();
        // read and accept time spent modal
        HomePage.readAndAcceptModalContent()
        // error msg should be displayed
        HelperMethod.validateToastMsg(`The record has validation error`).should(`be.visible`);

        //----Enter last name, city and validate data should not be saved----//
        // clear first name
        HomePage.enterFieldData(`First Name`);
        //enter last name
        HomePage.enterFieldData(`Last Name`).type(recordLastName);
        // enter city name
        HomePage.enterFieldData(`City`).type(recordCity);
        // click on save button
        HomePage.validateRecordSaveBtn().should(`be.visible`).click();
        // accept time spent
        HomePage.readAndAcceptModalContent()
        //error should be displayed
        HelperMethod.validateToastMsg(`The record has validation error`).should(`be.visible`);

    });

    it(`Create a record and validate alert message`, () => {

        // intercept create record req for fetching application ID
        cy.intercept('POST', '/api/app/**/record').as('appID');

        //----------Enter the mandatory fields and save the record--------------//
        // click on new record
        HomePage.createNewRecordBtn().click({ force: true });
        // enter first name
        HomePage.enterFieldData(`First Name`).type(recordFirstName);;
        // enter last name
        HomePage.enterFieldData(`Last Name`).type(recordLastName);
        // enter city
        HomePage.enterFieldData(`City`).type(recordCity);
        // click on save button
        HomePage.validateRecordSaveBtn().should(`be.visible`).click();
        //accept time spent
        HomePage.readAndAcceptModalContent()
        cy.wait('@appID', { timeout: 20000 }).its('response.body.applicationId').then((req) => {

            applicationID = JSON.stringify(req);
            cy.log(`applicationID is >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> ${applicationID}`);

        }).then(() => {
            // record saved message should display
            HelperMethod.validateToastMsg(`Record Saved`).should(`be.visible`);
        })

    });


});

