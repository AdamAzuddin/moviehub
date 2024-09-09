describe("Navigation Tests", () => {
  it("should sign in using an account and redirect to the home page", () => {
    cy.visit("/auth");
    cy.get('input[id="email"]').type("max@gmail.com");
    cy.get('input[id="password"]').type("test1234");
    cy.get('button[type="submit"]').click();

    cy.url().should("eq", Cypress.config().baseUrl + "/");
  });
  
  it("should navigate to different paths from header on desktop", () => {
    cy.viewport("macbook-13");
    cy.visit("/");

    cy.contains("Movies").as("moviesLink").click();
    cy.url().should("include", "/movies");

    cy.contains("TV Series").as("tvSeriesLink").click();
    cy.url().should("include", "/series");

    cy.contains("Watchlist").as("watchlistLink").click();
    cy.url().should("include", "/watchlist");

    cy.contains("Favourites").as("favouritesLink").click();
    cy.url().should("include", "/favourites");

    cy.get(".cypress-menu").as("menuButton");

    cy.get(".cypress-avatar-desktop").should("be.visible").click();
    cy.url().should("include", "/profile");

    cy.contains("Home").as("homeLink").click();
    cy.url().should("include", "/");
  });
});

describe("Mobile Header", () => {
  it("should sign in using an account and redirect to the home page", () => {
    cy.visit("/auth");
    cy.get('input[id="email"]').type("max@gmail.com");
    cy.get('input[id="password"]').type("test1234");
    cy.get('button[type="submit"]').click();

    cy.url().should("eq", Cypress.config().baseUrl + "/");
  });

  it("should open the mobile menu and navigate to different sections", () => {
    cy.visit("/");
    cy.viewport("iphone-6");

    cy.get(".cypress-menu").as("menuButton");

    cy.get("@menuButton").click();
    cy.get(".cypress-menu-item")
      .contains("Movies")
      .should("be.visible")
      .click();
    cy.url().should("include", "/movies");

    cy.get("@menuButton").click();
    cy.get(".cypress-menu-item")
      .contains("TV Series")
      .should("be.visible")
      .click();
    cy.url().should("include", "/series");

    cy.get("@menuButton").click();
    cy.get(".cypress-menu-item")
      .contains("Watchlist")
      .should("be.visible")
      .click();
    cy.url().should("include", "/watchlist");

    cy.get("@menuButton").click();
    cy.get(".cypress-menu-item")
      .contains("Favourites")
      .should("be.visible")
      .click();
    cy.url().should("include", "/favourites");

    cy.get("@menuButton").click();
    cy.get(".cypress-avatar-mobile").should("be.visible").click();
    cy.url().should("include", "/profile");

    cy.get("@menuButton").click();
    cy.get(".cypress-menu-item")
      .contains("Home")
      .should("be.visible")
      .click();
    cy.url().should("include", "/");
  });

  it("should close the mobile menu when the close button is clicked", () => {
    cy.visit("/");
    cy.viewport("iphone-6");

    cy.get(".cypress-menu").as("menuButton").click();
    cy.get(".cypress-close-menu").should("be.visible").click();
  });
});
