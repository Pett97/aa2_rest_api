/// <reference types="cypress" />

const BASE_URL = "http://localhost:8081/";
const DATABASE_URL = "http://127.0.0.1:8090";

import LOC_TELA_LOGIN from "../../support/locators/loc.tela.login";

context("TESTES API DELETAR CARRO", () => {
  beforeEach(() => {
    cy.visit(BASE_URL).then(() => {
      cy.intercept(
        "http://127.0.0.1:8090/api/collections/users/auth-with-password"
      ).as("rotaLogin");
      cy.get(LOC_TELA_LOGIN.BOTAO_LOGIN)
        .should("be.visible")
        .click({ force: true })
        .then(() => {
          cy.wait("@rotaLogin").then((interception) => {
            cy.wrap(interception.response.body.token).as("meuToken");
          });
        });
    });
  });

  it("criar Carro VW FUSCA", function () {
    cy.get("@meuToken").then((token) => {
      cy.request({
        method: "POST",
        url: `${DATABASE_URL}/api/collections/cars/records`,
        body: {
          id: "5hepo31gvjxxv5x",
          brand: "VW",
          name: "FUSCA",
          hp: 140,
        },
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }).then((response) => {
        expect(response.status).to.be.oneOf([200, 201]);
      });
    });
  });

  it("devo conseguir deletar o carro VW FUSCA",function(){
    cy.get("@meuToken").then((token) => {
      cy.request({
        method: "DELETE",
        url: `${DATABASE_URL}/api/collections/cars/records/5hepo31gvjxxv5x`,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }).then((response) => {
        expect(response.status).to.be.oneOf([204]);
      });
    }).then(()=>{
      cy.reload();
    })
  });



});
