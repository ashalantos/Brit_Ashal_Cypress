/// <reference types="cypress" />

describe("BRIT Insurance ", () => {
  it("should search IFRS 17 and get results", () => {
    cy.visit("https://www.britinsurance.com/");
    cy.get("#CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll").click();

    cy.wait(50000);
    cy.get(".component--header__search > button").should("be.visible", {
      timeout: 50000,
    });
    cy.get(".component--header__search > button").click();
    cy.get(".header--search > input").should("be.visible", { timeout: 50000 });
    cy.get(".header--search > input").type("IFRS 17{enter}");

    // Wait for the element to become visible
    cy.get("h1.hero-static__title span").should("be.visible");

    // Assert on the first element's text
    cy.get("h1.hero-static__title span")
      .should("have.text", "IFRS 17")
      .should("contain.text", "IFRS 17");

    // Log a message
    cy.log('2. Search for term "IFRS 17" in the search bar top right');

    // Define the expected titles
    const expectedTitles = [
      "Interim results for the six months ended 30 June 2022",
      "Gavin Wilkinson",
      "John King",
    ];

    // Assert on the number of result titles
    const expectedNumberOfResults = 3;
    cy.get("a.s-results__tag")
      .should("have.length", expectedNumberOfResults)
      .each(($resultTitle, index) => {
        cy.wrap($resultTitle).should("have.text", expectedTitles[index]);
      });

    // Log a message
    cy.log(
      "3. Assert on the three results returned, confirm three results and assert on each result title"
    );
  });

  it("should navigate to contact page and validate Bermuda office address", () => {
    // Step 1: Go to the website and handle cookies
    cy.visit("https://www.britinsurance.com/");
    cy.get("#CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll").click();
    cy.wait(50000);
    cy.get('button[data-trigger="mega-menu"]')
      .scrollIntoView()
      .should("be.visible")
      .click();
    cy.wait(50000);
    cy.get(".level-two > .sub-nav > .back > a")
      .scrollIntoView()
      .should("be.visible")
      .click();
    cy.wait(50000);

    // Step 2: Navigate to the contact page
    cy.get('a:contains("contact")')
      .scrollIntoView()
      .should("be.visible")
      .click();
    cy.log("2. Navigate to the contact page using the menus ");

    const expectedBermudaLocationCity = "\n        Pembroke\n        \n\n    ";
    const expectedBermudaAddress =
      "\n Ground Floor, Chesney HouseThe Waterfront, 96 Pitts Bay Road, Pembroke, Hamilton HM 08, Bermuda\n        ";

    cy.get(
      "#bermudaoffice > .component--container > .component--content > .row > .col-768-12 > .location > .location__city"
    ).should("have.text", expectedBermudaLocationCity);
    cy.get(
      "#bermudaoffice > .component--container > .component--content > .row > .col-768-12 > .location > address"
    ).should("have.text", expectedBermudaAddress);

    cy.log(
      "3. Extract the Bermuda office address from the Bermuda office section and validate it "
    );
  });
});
