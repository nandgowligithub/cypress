import cypress from "cypress";
import { HomePage } from "../../PageObjects/HomePage";
import { LoginPage } from '../../PageObjects/LoginPage';

describe(`Login spec`, () => {

  let userName = `chetan.nandgowli`;
  let password = `Test1234`;

  before(() => {
    // visit login page for login
    cy.visit(`login`)
  });

  it(`Validate login page text`, () => {

    // validate swimlane login page text should be displayed
    LoginPage.loginPageTitleCheck();;

  });

  it(`Validate submit button should be disabled for empty user name and password`, () => {

    // submit button should be disabled for empty user name and password
    LoginPage.LoginSubmitBtn().should(`not.be.enabled`);

  });

  it(`Validate login should be failed for correct username and incorrect password`, () => {

    // enter valid username
    LoginPage.enterUserName(userName);
    // enter invalid password
    LoginPage.enterPassword(`dummy password`);
    // submit button should be enabled then click on it
    LoginPage.LoginSubmitBtn().should(`be.enabled`).click();
    // validate "Login failed" error message
    LoginPage.loginErrorCheck(`Login failed`).should(`be.visible`);

  });

  it(`Validate login should be failed for correct password and incorrect username`, () => {

    // enter in valid username
    LoginPage.enterUserName(`incorrect user name`);
    // enter valid password
    LoginPage.enterPassword(password);
    // submit button should be enabled then click on it
    LoginPage.LoginSubmitBtn().should(`be.enabled`).click();
    // validate "Login failed" error message
    LoginPage.loginErrorCheck(`Login failed`).should(`be.visible`);

  });

  it(`Validate login should be successful for valid username and password`, () => {

    // login to the application with valid user name and password
    LoginPage.login(userName, password);

  });


});
