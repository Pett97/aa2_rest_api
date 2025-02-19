/// <reference types="cypress" />
import LOC_TELA_HOME from "../../support/locators/loc.tela.home";

context("Teste Tela Login", () => {
  let json;

  before(() => {
    cy.fixture("example.json")
      .then((dataJson) => {
        json = dataJson;
      })
      .then(() => {
        cy.meuLogin();
      });
  });

  describe("Teste Componentes Visiveis", () => {
    beforeEach(() => {
      cy.visit("http://localhost:8081/home/Home");
    });

    it("Botao Cadastar Criar Novo Carro",()=>{
      cy.get(LOC_TELA_HOME.BOTAO_CADASTRAR_NOVO_CARRO)
        .should("be.visible");
    });

    it("Devo ter um campo Input para pesquisar marcas",()=>{
      cy.get(LOC_TELA_HOME.CAMPO_PESQUISAR_MARCA_CARRO)
        .should("be.visible");
    });
  });
});
