/// <reference types="cypress" />

context("Teste Deletar  Carro", () => {
  before(() => {
    cy.criarCarroFordGt140();
  });

  beforeEach(() => {
    cy.meuLogin();
  });

  it("Devo Conseguir Deletar o Carro FordGt", () => {
    cy.deletarCarro("GT");
  });

  it("O carro FORD GT não pode mais estar listado",()=>{
    cy.get(`div:contains(GT) div:contains(Deletar):last`)
    .should("not.exist")
  })
});
