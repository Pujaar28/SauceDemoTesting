/// <reference types="cypress"/>

describe('Web functional testing',()=>{
    before(()=>{
      cy.clearLocalStorage()
      cy.clearCookies() 
      cy.visit('https://www.saucedemo.com/', { timeout : 10000})
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
    cy.get('.app_logo').should('be.visible')
    cy.get('.shopping_cart_link').should('be.visible')
    cy.get('.inventory_container').should('be.visible')
    cy.get('.inventory_item').should('be.visible')
    cy.get('button').should('be.visible')
    cy.get('.inventory_item_img').should('be.visible')
    cy.get('.title').should('be.visible')
    cy.get('[data-test="product_sort_container"]').should('be.visible')
    cy.get('.inventory_item_name').should('be.visible')
    cy.get('.inventory_item_price').should('be.visible')
    cy.get('.inventory_item_desc').should('be.visible')
    cy.get('.bm-burger-button').should('be.visible')
});

  it('Checking side button menu', () => {
    cy.get('.bm-burger-button').click()
    cy.get('.bm-item-list').should('be.visible')
  });

  it('Check product detail', () => {
    cy.get('#item_4_title_link > .inventory_item_name').click()
    cy.url().should('include', 'inventory-item.html')
    cy.get('.inventory_details_img').should('be.visible')
    cy.get('.inventory_details_desc').should('be.visible')
    cy.get('.inventory_details_price').should('be.visible')
    cy.get('[data-test="back-to-products"]').should('be.visible')
    cy.get('button').should('be.visible')
    cy.get('[data-test="back-to-products"]').should('include.text','Back to products')
    cy.get('[data-test="back-to-products"]').click()
  });

it('Check shooping cart function', () => {
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
    cy.get('.shopping_cart_link').click()
    cy.url().should('include','cart.html')
});

})