beforeEach(() => {
  cy.visit("/");
});

describe("Carousel Item Details", () => {
  it("should navigate to movie details page when clicking on a movie item", () => {
    cy.get(".cypress-carousel-item").first().click(); // Adjust selector as needed
    cy.url().should("include", "/details");
  });
  it("should go to the right and left carousel item", () => {
    cy.get(".cypress-chevron-right").first().click();
    cy.get(".cypress-chevron-left").first().click();
  });
});

describe("Banner Item Details", () => {
  it("should go to the right and left banner item", () => {
    cy.get(".cypress-chevron-right").first().click();

    cy.get(".cypress-chevron-left").first().click();
  });

  it("should navigate to movie details page when clicking on a banner item", () => {
    cy.get(".cypress-banner-item").first().click();
  });
});
