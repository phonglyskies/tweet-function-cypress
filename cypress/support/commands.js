Cypress.Commands.add('LoginAndGoToHome', (username, password) => {
  cy.fixture('elements').then((el) => {
    cy.visit('/login')
    cy.get(el.infoLoginInput, { timeout: 300000 }).type(username)
    cy.get('span').contains('Next').click()
    cy.get(el.passwordInput).type(password)
    cy.get(el.loginButton).click()
    cy.visit('/home')
  })
})

Cypress.on(
  'uncaught:exception',
  (err) => !err.message.includes('ResizeObserver loop limit exceeded')
)

