describe('Movie Item Details', () => {
    it('should navigate to movie details page when clicking on a movie item', () => {
      cy.visit('/');
      cy.get('.carousel-item').first().click(); // Adjust selector as needed
      cy.url().should('include', '/movie-details');
    });
  });
  