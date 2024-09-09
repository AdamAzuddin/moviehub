describe('Watchlist Functionality', () => {
    it('should add and remove a movie from watchlist', () => {
      // Sign in
      cy.visit('/auth/sign-in');
      cy.get('input[name="email"]').type('user@example.com');
      cy.get('input[name="password"]').type('password');
      cy.get('button').contains('Sign In').click();
  
      // Navigate to movie details
      cy.visit('/movie-details/1'); // Adjust movie ID as needed
      cy.get('button').contains('Add to Watchlist').click();
      cy.visit('/watchlist');
      cy.contains('Inception').should('be.visible'); // Adjust movie name as needed
  
      // Remove from watchlist
      cy.get('button').contains('Remove from Watchlist').click();
      cy.contains('Inception').should('not.exist');
    });
  });
  