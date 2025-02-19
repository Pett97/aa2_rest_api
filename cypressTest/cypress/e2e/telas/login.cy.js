/// <reference types="cypress" />
import LOC_TELA_LOGIN from "../../support/locators/loc.tela.login";

context("Teste Tela Login", () => {
  let json;

  before(() => {
    cy.fixture("example.json").then((dataJson) => {
      json = dataJson;
    }).then(()=>{
      cy.visit(json.BASE_URL_PROJETO);
    })
  });

  it("Devo Conseguir Fazer O login na aplicacao",()=>{
    cy.get(LOC_TELA_LOGIN.BOTAO_LOGIN)
      .should("be.visible")
      .click();
  });

  it("Devo Conseguir Retornar para tela de Home",()=>{

  });
  
});
