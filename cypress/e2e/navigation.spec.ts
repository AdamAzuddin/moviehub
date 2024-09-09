describe('Navigation Tests', () => {
    it('should navigate to different paths from header', () => {
      cy.visit('/');
      cy.contains('Movies').click();
      cy.url().should('include', '/movies');
      cy.contains('TV Series').click();
      cy.url().should('include', '/series');
      cy.contains('Watchlist').click();
      cy.url().should('include', '/watchlist');
      cy.contains('Favourites').click();
      cy.url().should('include', '/favourites');
    });
  });
  