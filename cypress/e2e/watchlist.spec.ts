describe("Sign in Functionality", () => {
  it("should sign in using an account and redirect to the home page", () => {
    cy.visit("/auth");
    cy.get('input[id="email"]').type("max@gmail.com");
    cy.get('input[id="password"]').type("test1234");
    cy.get('button[type="submit"]').click();

    cy.url().should("eq", Cypress.config().baseUrl + "/");
  });
});

describe("Profile Page Functionality", () => {
  it("should visit profile page and see sign out button", () => {
    cy.visit("/profile");
    cy.get("button").contains("Sign Out").should("be.visible");
  });
});

describe("Add to Watchlist Functionality", () => {
  it("should add a movie to watchlist and display a success message", () => {
    cy.visit("/details/movie/1022789");
    cy.get("button.cypress-add-to-watchlist").should("be.visible").click();
    cy.contains("Item added to watchlist!").should("be.visible");
  });
});

describe("Confirmation Dialog Functionality", () => {
  it("should open and close the confirmation dialog", () => {
    // Navigate to the movie details page and add the movie to watchlist
    cy.visit("/details/movie/1022789");
    cy.get("button.cypress-add-to-watchlist").click();
    cy.visit("/watchlist");

    // Open the confirmation dialog
    cy.get("button.cypress-remove").click();
    cy.get(".cypress-alert-dialog-title").contains("Are you sure?");

    // Click "Cancel" and verify item is still in watchlist
    cy.get(".cypress-alert-dialog-cancel").click();
    cy.contains("Inside Out 2").should("be.visible");
  });
});

describe("Remove from Watchlist Functionality", () => {
  it("should remove a movie from watchlist after confirming", () => {
    // Navigate to the movie details page and add the movie to watchlist
    cy.visit("/details/movie/1022789");
    cy.get("button.cypress-add-to-watchlist").click();
    cy.visit("/watchlist");

    // Open the confirmation dialog
    cy.get("button.cypress-remove").click();
    cy.get(".cypress-alert-dialog-action").contains("Continue").click();

    cy.contains("Inside Out 2").should("not.exist");
  });
});
