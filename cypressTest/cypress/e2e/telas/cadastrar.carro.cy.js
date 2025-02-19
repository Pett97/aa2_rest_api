/// <reference types="cypress" />
import LOC_TELA_HOME from "../../support/locators/loc.tela.home";
import LOC_TELA_FORMULARIO from "../../support/locators/loc.tela.cadastrar";

context("Teste Tela Cadastrar Carro", () => {
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
      cy.visit("http://localhost:8081/telaFormulario");
    });
    it("Campo Marca do Carro", () => {
      cy.get(LOC_TELA_FORMULARIO.CAMPO_MARCA_CARRO).should("be.visible");
    });

    it("Campo Nome Do Carro", () => {
      cy.get(LOC_TELA_FORMULARIO.CAMPO_NOME_CARRO).should("be.visible");
    });

    it("Campo Hp Carro", () => {
      cy.get(LOC_TELA_FORMULARIO.CAMPO_HP).should("be.visible");
    });

    it("Botao Cadastrar Carro",()=>{
      cy.get(LOC_TELA_FORMULARIO.BOTAO_CADASTRAR_CARRO).should("be.visible");
    });
  });
});
