import { faker } from "@faker-js/faker";

Cypress.Commands.add("cadastroOuEdicao", (type, isValid = true) => {
  const randomName = faker.person.fullName();
  const randomEmail = faker.internet.email();
  const randomPassword = faker.internet.password();
  const bodyCadastro = {
    nome: `${randomName}`,
    email: `${!isValid ? "oi@a.com" : randomEmail}`,
    password: `${randomPassword}`,
    administrador: "true",
  };

  if (type === "Editar") {
    cy.get("@_id").then((id) => {
      makeRequest(type, id);
    });
  } else {
    makeRequest(type);
  }

  function requestMessage(type, isValid, response) {
    if (!isValid) {
      console.log(response);
      expect(response.body.message).to.equal("Este email já está sendo usado");
    } else {
      if (type !== "Cadastrar") {
        expect(response.body.message).to.equal("Registro alterado com sucesso");
      } else {
        expect(response.body.message).to.equal(
          "Cadastro realizado com sucesso",
        );
      }
    }
  }
  function codeResponse(type, isValid) {
    if (!isValid) return 400;
    else if (type !== "Cadastrar") return 200;
    return 201;
  }

  function makeRequest(type, id) {
    console.log("HOPAAA");

    cy.request({
      method: type !== "Cadastrar" ? "PUT" : "POST",
      url: type !== "Cadastrar" ? `usuarios/${id}` : "usuarios",
      body: bodyCadastro,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.equal(codeResponse(type, isValid));
      requestMessage(type, isValid, response);

      if (type === "Cadastrar" && isValid) {
        cy.wrap(response.body._id).as("_id");
        expect(response.body._id).to.be.a("string");
      }
    });
  }
});
