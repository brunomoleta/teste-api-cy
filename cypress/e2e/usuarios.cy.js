/// <reference types="cypress" />
import contrato from "../contracts/usuarios/listarUsuarios.contract";

describe("Testes da Funcionalidade Usuários", () => {
  const url = "usuarios";
  it("Deve cadastrar um usuário com sucesso", () => {
    cy.cadastroOuEdicao("Cadastrar");
  });

  it("Deve validar contrato de usuários", () => {
    cy.request("usuarios").then((response) => {
      return contrato.validateAsync(response.body);
    });
  });

  it("Deve listar usuários cadastrados", () => {
    cy.request({
      method: "GET",
      url: url,
    }).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.body.quantidade).to.be.a("number").that.is.at.least(0);
      expect(response.body.usuarios).to.be.a("array");
    });
  });

  it("Deve invalidar um usuário com email inválido", () => {
    cy.cadastroOuEdicao("Cadastrar", false);
  });

  it("Deve editar um usuário previamente cadastrado", () => {
    cy.cadastroOuEdicao("Cadastrar");
    cy.cadastroOuEdicao("Editar");
  });

  it("Deve deletar um usuário previamente cadastrado", () => {
    cy.cadastroOuEdicao("Cadastrar");
    cy.removerUsuario();
  });
});
