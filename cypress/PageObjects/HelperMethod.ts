export class HelperMethod {

  // all actionable methods here

  public static validateToastMsg(msg: string): Cypress.Chainable {

    return cy.contains(msg, { matchCase: false }).should(`exist`);

  }


}