describe("Authentication Tests", () => {
  beforeEach(() => {
    cy.visit("/auth"); // Visit the auth page before each test
  });

  it("should toggle between Sign In and Sign Up", () => {
    // Check initial state (Sign In form should be visible)
    cy.get(".auth-title").should("contain.text", "Login"); // Checks for the sign-in title

    // Click to switch to Sign Up form
    cy.contains("Sign Up").click();
    cy.get(".auth-title").should("contain.text", "Sign Up"); // Checks for the sign-up title

    // Click to switch back to Sign In form
    cy.contains("Sign In").click();
    cy.get(".auth-title").should("contain.text", "Login"); // Checks for the sign-in title
  });

  it("should display errors on invalid sign in", () => {
    // Ensure we're on the Sign In form
    cy.get(".auth-title").should("contain.text", "Login");

    // Submit form with invalid data
    cy.get('input[id="email"]').type("invalid-email");
    cy.get('input[id="password"]').type("short");
    cy.get('button[type="submit"]').click();

    // Check for error message
    cy.contains("Invalid email or password.").should("be.visible");
  });

  it("should display an error for invalid email", () => {
    // Switch to Sign Up form if needed
    cy.contains("Sign Up").click();
    cy.get(".auth-title").should("contain.text", "Sign Up");

    // Submit form with invalid email
    cy.get('input[id="username"]').type("john_doe");
    cy.get('input[id="email"]').type("invalid-email");
    cy.get('input[id="password"]').type("validpassword");
    cy.get('button[type="submit"]').click();

    // Check for email error message
    cy.contains("Please enter a valid email address.").should("be.visible");

    // Ensure password error message is not visible
    cy.contains("Password must be at least 6 characters long.").should(
      "not.exist"
    );
  });

  it("should display an error for invalid password", () => {
    // Switch to Sign Up form if needed
    cy.contains("Sign Up").click();
    cy.get(".auth-title").should("contain.text", "Sign Up");

    // Submit form with short password
    cy.get('input[id="username"]').type("john_doe");
    cy.get('input[id="email"]').type("valid@example.com");
    cy.get('input[id="password"]').type("short");
    cy.get('button[type="submit"]').click();

    // Check for password error message
    cy.contains("Password must be at least 6 characters long.").should(
      "be.visible"
    );

    // Ensure email error message is not visible
    cy.contains("Please enter a valid email address.").should("not.exist");
  });

});

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

  beforeEach(() => {
    cy.visit("/profile");
  })
  it("should visit profile page and see sign out button and sign out", () => {
    
    cy.get("button").contains("Sign Out").should("be.visible").click();
  });

});