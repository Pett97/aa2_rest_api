const USUARIO_TESTE = "cypressPett@gmail.com";
const SENHA_TESTE = "pett123456";
const BASE_URL = "http://localhost:8081/";
const DATABASE_URL = "http://127.0.0.1:8090";

import LOC_TELA_LOGIN from "./locators/loc.tela.login";
import LOC_TELA_FORMULARIO from "./locators/loc.tela.cadastrar";

let meuToken;

Cypress.Commands.add("meuLogin", (email = USUARIO_TESTE, pw = SENHA_TESTE) => {
  cy.visit(BASE_URL).then(() => {
    cy.intercept(
      "http://127.0.0.1:8090/api/collections/users/auth-with-password"
    ).as("rotaLogin");
    cy.get(LOC_TELA_LOGIN.BOTAO_LOGIN)
      .should("be.visible")
      .click({ force: true })
      .then(() => {
        cy.wait("@rotaLogin").then((intercption) => {
          meuToken = intercption.response.body.token;
          console.log(meuToken);
        });
      });
  });
});

Cypress.Commands.add("deletarCarroBaseTestes", () => {
  cy.meuLogin().then(() => {
    cy.request(
      "delete",
      `${DATABASE_URL}/api/collections/cars/records/5hepo31gvjxxv3c`,
      {
        headers: {
          Authorization: `Bearer ${meuToken}`,
          "Content-Type": "application/json",
        },
      }
    ).then((response) => {
      console.log(`RETORNO ${response}`);
      console.log("Carro deletado com sucesso");
    });
  });
});

Cypress.Commands.add("criarCarroFordGt140", () => {
  cy.meuLogin().then(() => {
    cy.request({
      method: 'POST', 
      url: `${DATABASE_URL}/api/collections/cars/records`, 
      body: {
        id:"5hepo31gvjxxv3c",
        brand: "cypress",
        name: "JavaScript",
        hp: 123,
      },
      headers: {
        Authorization: `Bearer ${meuToken}`,
        "Content-Type": "application/json",
      },
    }).then(response => {
      console.log('Carro criado:', response);
    });
  });
});

Cypress.Commands.add("adicionarNovoCarro",(carro)=>{
  cy.get(LOC_TELA_FORMULARIO.CAMPO_MARCA_CARRO)
    .last()
    .type(carro.brand,{force:true});

  cy.get(LOC_TELA_FORMULARIO.CAMPO_NOME_CARRO)
    .last()
    .type(carro.name,{force:true});
    
  cy.get(LOC_TELA_FORMULARIO.CAMPO_HP)
    .last()
    .type(carro.hp,{force:true})  
});

