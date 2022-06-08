import { HomePage } from "./HomePage";

let bearerToken: string;

export class LoginPage {

  // all  actionable elements here
  public static loginPageUserNameInputField = `[data-cy="username__input"]`;
  public static loginPagePwdInputField = `[data-cy="password__input"]`;
  public static loginPageSubmitBtn = `[data-cy="submit__btn"]`;
  public static loginPageWelcomeMsg = `[data-cy="welcome__message"]`;
  public static loginPageLoginError = `.login-error`;

  // all actionable methods here

  // enter username for login page
  public static enterUserName(username = ``): Cypress.Chainable {

    return cy.get(this.loginPageUserNameInputField).find(`input`).clear().should(`be.visible`).type(username, { force: true });

  }

  // enter password for login page
  public static enterPassword(pwd = ``): Cypress.Chainable {

    return cy.get(this.loginPagePwdInputField).find(`input`).clear().should(`be.visible`).type(pwd, { force: true });

  }

  // click login page submit button
  public static LoginSubmitBtn(): Cypress.Chainable {

    return cy.get(this.loginPageSubmitBtn).should(`be.visible`);

  }

  // check title of the login page
  public static loginPageTitleCheck(): Cypress.Chainable {

    return cy.get(this.loginPageWelcomeMsg).should(`be.visible`);

  }

  // error check for invalid credentials
  public static loginErrorCheck(errorMsg: string): Cypress.Chainable {

    return cy.get(this.loginPageLoginError).contains(errorMsg);

  }

  // login into swimlane application
  public static login(userName: string, password: string): any {

    // intercept create record req for fetching application ID
    cy.intercept('POST', '/api/user/login').as('login');

    // enter valid username
    LoginPage.enterUserName(userName);
    // enter valid password
    LoginPage.enterPassword(password);
    // submit button should be enabled then click on it
    LoginPage.LoginSubmitBtn().should(`be.enabled`).click();
    cy.wait('@login', { timeout: 20000 }).its('response.body').then((req) => {

      bearerToken = JSON.stringify(req.token);
      // cy.log(`Bearer token is >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> ${bearerToken}`);

    }).then(() => {
      // login should be sucessfull and avtar should be displayed
      HomePage.homePadeDisplayCheck().should(`be.visible`);
    });
  }

}