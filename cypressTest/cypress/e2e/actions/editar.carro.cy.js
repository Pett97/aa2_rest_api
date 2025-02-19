/// <reference types="cypress" />

import LOC_TELA_EDITAR from "../../support/locators/loc.tela.editar";

context("Teste Tela Editar  Carros", () => {
  let json;
  let carros;

  before(() => {
    cy.fixture("example.json").then((dataJson) => {
      json = dataJson;
    });
    cy.fixture("carros.json").then((dataJson) => {
      carros = dataJson.carros;
      console.log(carros);
    });
    cy.criarCarroFerrariENZO450();
  });

  beforeEach(() => {
    cy.meuLogin();
  });

  it("Devo Conseguir Editar o carro ENZO > CYPRESS_TESTE", () => {
    cy.editarCarro("ENZO");
    cy.get(LOC_TELA_EDITAR.CAMPO_NOME_CARRO)
      .should("be.visible")
      .clear()
      .type("CYPRESS_TESTE");

    cy.get(LOC_TELA_EDITAR.BOTAO_ATUALIZAR_CARRO).should("be.visible").click();

    cy.editarCarro("CYPRESS_TESTE");
  });

  it("Caso não passe nenhum parametro o carro deve estar IGUAL", () => {
    cy.editarCarro("CYPRESS_TESTE");
    cy.get(LOC_TELA_EDITAR.CAMPO_NOME_CARRO)
      .should("be.visible")
      .clear()
      .type("CYPRESS_TESTE");

    cy.get(LOC_TELA_EDITAR.BOTAO_ATUALIZAR_CARRO).should("be.visible").click();

    cy.editarCarro("CYPRESS_TESTE");
  });
});
