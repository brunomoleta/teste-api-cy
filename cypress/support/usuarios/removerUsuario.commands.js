Cypress.Commands.add("removerUsuario", () => {
  cy.get("@_id").then((id) => {
    removerUsuario(id);
  });

  function removerUsuario(id) {
    cy.request({
      method: "DELETE",
      url: `usuarios/${id}`,
    }).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.body.message).to.equal("Registro excluído com sucesso");
    });
  }
});
