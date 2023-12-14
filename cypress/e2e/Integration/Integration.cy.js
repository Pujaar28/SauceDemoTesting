/// <reference types="cypress"/>

describe('Web functional testing',()=>{
    before(()=>{
        cy.visit('https://www.saucedemo.com/')
    })

    it('Should contain login form', () => {
        cy.get('#login_button_container').should('be.visible')
        cy.get('[data-test="username"]').should('be.visible')
        cy.get('[data-test="password"]').should('be.visible')
        cy.get('[data-test="login-button"]').should('be.visible')
    });

    it('Should show error information when username or password incorrect', () => {
        cy.goLogin('username','password')
        cy.get('[data-test="login-button"]').click()
        cy.get('[data-test="username"]').clear()
        cy.get('[data-test="password"]').clear()
         });

  it('Should login with valid data', () => {
    cy.fixture('sauceUsers').then((sauceUsers) => {
        cy.goLogin(sauceUsers.username,sauceUsers.password)
    })
  })

  it('Visiting inventory page', () => {
    cy.url().should('include','inventory.html')
    cy.get('.inventory_container').should('be.visible')
    cy.get('.inventory_item').should('be.visible')
    cy.get('button').should('be.visible')
    cy.get('.inventory_item_img').should('be.visible')
    cy.get('.title').should('be.visible')
    cy.get('[data-test="product_sort_container"]').should('be.visible')
    cy.get('.inventory_item_name').should('be.visible')
    cy.get('.inventory_item_price').should('be.visible')
  });

})