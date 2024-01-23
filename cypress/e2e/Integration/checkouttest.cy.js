/// <reference types="cypress"/>

describe('Checkout Testing',()=>{
    before(()=>{
        cy.visit('https://www.saucedemo.com/')
    })
   
    it('Login', () => {
        cy.fixture('sauceUsers').then((sauceUsers) => {
            cy.goLogin(sauceUsers.username,sauceUsers.password)
        })
    });

    it('Should checkout an item', () => {
        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
        cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]').click()
        cy.get('.shopping_cart_link').click()
        cy.get('.title').should('be.visible')
        cy.get('.cart_desc_label').should('be.visible')
        cy.get('.inventory_item_name').should('be.visible')
        cy.get('.cart_quantity_label').should('be.visible')
        cy.get('.cart_quantity').should('be.visible')
        cy.get('.inventory_item_desc').should('be.visible')
        cy.get('.item_pricebar').should('be.visible')
        cy.get('[data-test="remove-sauce-labs-backpack"]').should('be.visible')
        cy.get('[data-test="continue-shopping"]').should('be.visible')
        cy.get('[data-test="checkout"]').should('be.visible')
        cy.get('[data-test="checkout"]').click()
        cy.url().should('include','checkout-step-one.html')
        cy.get('.title')
        .should('be.visible')
        .and('contain.text', 'Checkout: Your Information');
        cy.get('form').should('be.visible')
        cy.get('.checkout_info').should('be.visible')
        cy.get('[data-test="cancel"]').should('be.visible')
        cy.get('[data-test="continue"]').should('be.visible')
        cy.get('[data-test="firstName"]').should('be.visible')
        cy.get('[data-test="lastName"]').should('be.visible')
        cy.get('[data-test="postalCode"]').should('be.visible')
        cy.fixture('sauceUsers').then((sauceUsers) => {
            const randomFirst = sauceUsers.firstName[Math.floor(Math.random() * sauceUsers.firstName.length)];
            const randomLast = sauceUsers.lastName[Math.floor(Math.random() * sauceUsers.lastName.length)];
            const randomCode = sauceUsers.postalCode[Math.floor(Math.random() * sauceUsers.postalCode.length)];

            cy.fillForm(randomFirst,randomLast,randomCode)
        })
    });

    it('Should check checkout information', () => {
        cy.get('.title')
        .should('be.visible')
        .and('contain.text','Checkout: Overview')
        cy.get('.cart_quantity_label') .should('be.visible')
        cy.get('.cart_list') .should('be.visible')
        cy.get('.cart_quantity') .should('be.visible')
        cy.get('.cart_item_label') .should('be.visible')
        cy.get('.inventory_item_desc') .should('be.visible')
        cy.get('.inventory_item_price') .should('be.visible')
        cy.get('.cart_item') .should('be.visible')
        cy.get('.summary_info').should('be.visible')
        cy.get('.summary_total_label').should('be.visible')
        cy.get('[data-test="cancel"]').should('be.visible')
        cy.get('[data-test="finish"]').click(
        )
    });

    it('Should check finish checkout page', () => {
        cy.get('.title').should('be.visible').and('contain.text','Checkout: Complete!')
        cy.get('.pony_express').should('be.visible')
        cy.get('.complete-header').should('be.visible').and('contain.text','Thank you for your order!')
        cy.get('.complete-text').should('be.visible').and('contain.text','Your order has been dispatched, and will arrive just as fast as the pony can get there!')
        cy.get('[data-test="back-to-products"]').should('be.visible')
        cy.get('[data-test="back-to-products"]').click()
    });
})