/// <reference types="Cypress" />

describe("tasks management", () => {
  it("should open and close the new task modal", () => {
    cy.visit("http://localhost:5173/");
    cy.contains("Add Task").click();
    cy.get(".backdrop").click({ force: true });
    cy.get(".backdrop").should("not.exist");
    cy.get("modal").should("not.exist");
    // Cancel Checks
    cy.contains("Add Task").click();
    cy.contains("Cancel").click();
    cy.get(".backdrop").should("not.exist");
    cy.get("modal").should("not.exist");
  });

  it("should create a new task", () => {
    cy.visit("http://localhost:5173/");
    cy.contains("Add Task").click();
    cy.get("#title").type("A Cypress Task");
    cy.get("#summary").type("A Summary for this Cypress Task");
    cy.get(".modal").contains("Add Task").click();
    cy.get(".backdrop").should("not.exist");
    cy.get("modal").should("not.exist");
    cy.get(".task").should("have.length", 1);
    cy.get(".task h2").contains("A Cypress Task");
    cy.get(".task p").contains("A Summary for this Cypress Task");
  });

  it("should validate user input", () => {
    cy.visit("http://localhost:5173/");
    cy.contains("Add Task").click();
    cy.get(".modal").contains("Add Task").click();
    cy.get(".error-message").should("be.visible");
  });
});
