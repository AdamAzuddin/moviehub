describe('Search Functionality', () => {
  it('should display search results when typing into the search input', () => {
    cy.visit('/');
    cy.viewport("macbook-13")

    cy.get('.cypress-search-button').click();

    cy.get('.cypress-search-input').should('exist').type('Inception');

    cy.get('.cypress-search-result').should('contain', 'Inception');
  });
  it('should go to the details page on click', () => {
    cy.visit('/');
    cy.viewport("macbook-13")

    cy.get('.cypress-search-button').click();

    cy.get('.cypress-search-input').should('exist').type('Inception');

    cy.get('.cypress-search-result').should('contain', 'Inception');
    cy.get('.cypress-search-result-item').should('contain', 'Inception').first().click();
    cy.url().should("include", "/details/movie/");
  });
  it('should go to the search results page on click', () => {
    cy.visit('/');
    cy.viewport("macbook-13")

    cy.get('.cypress-search-button').click();

    cy.get('.cypress-search-input').should('exist').type('Inception');

    cy.get('.cypress-search-result').should('contain', 'Inception');
    cy.get('.cypress-show-more-button').click();
    cy.url().should("include", "/search-results");
  });
});
