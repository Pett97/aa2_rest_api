/// <reference types="cypress" />
import LOC_TELA_HOME from "../../support/locators/loc.tela.home";
import LOC_TELA_LOGIN from "../../support/locators/loc.tela.login";

context("Teste Tela Criar  Carros", () => {
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
  });

  beforeEach(() => {
    cy.meuLogin();
  });

  describe("Castrar Carro", () => {
    it("Cadastrar Carros", () => {
      carros.forEach((carro) => {
        cy.get(LOC_TELA_HOME.BOTAO_CADASTRAR_NOVO_CARRO)
          .first()
          .click({ force: true })
          .then(() => {
            cy.adicionarNovoCarro(carro);
            cy.get(LOC_TELA_FORMULARIO.BOTAO_CADASTRAR_CARRO)
              .last()
              .click({ force: true });
          });
      });
    });

    it("Check: tenhos os carros cadastrados", () => {
      carros.forEach((carro) => {
        cy.get(LOC_TELA_HOME.TEXTO_NOME_CARRO(carro.name)).should("be.visible");
      });
    });
  });

  describe("Teste Formulario Criar", () => {
    beforeEach(() => {
      cy.get(LOC_TELA_HOME.BOTAO_CADASTRAR_NOVO_CARRO);
      cy.adicionarNovoCarro(carros[0]);
    });

    it("não posso cadastrar carro sem infomar nome marca", () => {
      
    });
  });
});
