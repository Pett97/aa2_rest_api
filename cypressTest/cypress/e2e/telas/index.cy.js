/// <reference types="cypress" />
import LOC_TELA_LOGIN from "../../support/locators/loc.tela.login";

context("Teste Home", () => {
  let json;

  before(() => {
    cy.fixture("example.json").then((dataJson) => {
      json = dataJson;
    });
  });

  beforeEach(() => {
    cy.visit(json.BASE_URL_PROJETO);
  });

  it("Deve Ter um botão de Login", () => {
    cy.get(LOC_TELA_LOGIN.BOTAO_LOGIN).should("be.visible");
  });

  it("Devo ter um Titulo Index", () => {
    cy.get(LOC_TELA_LOGIN.TITULO_HEADER).should("be.visible");
  });
});
