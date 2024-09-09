describe('Search Functionality', () => {
    it('should display search results', () => {
      cy.visit('/');
      cy.get('input[placeholder="Search"]').type('Inception');
      cy.get('.search-results').should('contain', 'Inception');
    });
  });
  