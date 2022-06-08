export class HomePage {

  // all  actionable elements here
  public static homePageAvtar = `.avatar-container`;
  public static homePageNewRecordButton = `[data-cy="new-record1__btn"]`;
  public static homePagePanelHeading = `.panel-heading`;
  public static homePageToolbar = `.page-toolbar`;
  public static homePageRecordEditForm = `[data-cy="record-editor__form"]`;
  public static applicationID: string;


  // all actionable methods here

  public static homePadeDisplayCheck(): Cypress.Chainable {

    return cy.get(this.homePageAvtar);

  }

  // click on create new record button
  public static createNewRecordBtn(): Cypress.Chainable {

    return cy.get(this.homePageNewRecordButton).find(`i`).should(`exist`);

  }

  // validate home page header
  public static validatePersonalInfoHeader(msg: string): Cypress.Chainable {

    // validate personal information heading is displayed
    return cy.get(this.homePagePanelHeading).contains(msg).should(`be.visible`);

  }

  // save button should not be available
  public static validateRecordSaveBtn(): Cypress.Chainable {

    return cy.get(this.homePageToolbar).find(`.text`).contains(`Save`).should(`exist`);

  }

  // provide field details
  public static enterFieldData(msg: string): Cypress.Chainable {

    return cy.get(this.homePageRecordEditForm).contains(msg, { matchCase: false }).parents(`div[class="form-group field-container"]`)
      .find(`input.form-input`).should(`exist`).clear({ force: true });

  }

  // read and accept the effort
  public static readAndAcceptModalContent(): Cypress.Chainable {

    return cy.contains(/Time you spent working on the record/gmi).should(`be.visible`).parents(`.modal-content`)
      .find(`button`).contains(`Save`).should(`be.visible`).click();

  }

}