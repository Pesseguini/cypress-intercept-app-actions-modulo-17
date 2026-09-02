/// <reference types="cypress" />

describe('Exercícios do módulo 17 - App Actions', () => {

    beforeEach(() => {
        cy.visit('login.html')
        cy.setCookie('jwt_education_shown', 'true')
    });

    it('Deve fazer login via API e adicionar um livro ao carrinho', () => {
    cy.request({
        method: 'POST',
        url: 'api/login',
        body: {
            "email": "admin@biblioteca.com",
            "password": "admin123"
        }
    }).then((response) => {
        expect(response.status).to.equal(200)

        window.localStorage.setItem('authToken', response.body.token)
        window.localStorage.setItem('isAdmin', false)
        window.localStorage.setItem('userId', response.body.id)
        window.localStorage.setItem('userName', response.body.name)
    })

    cy.visit('catalog.html')

    cy.get(':nth-child(1) > .card > .card-body > .mt-auto > .d-grid > .btn-primary').click()

    cy.get('#global-alert-container').should('contain', 'foi adicionado à cesta!')
})


it.only('Deve fazer o login e adicionar um livro à cesta usando App Actions', () => {
    cy.request({
        method: 'POST',
        url: 'api/login',
        body: {
            "email": "admin@biblioteca.com",
            "password": "admin123"
        }
    }).then((response) => {
        expect(response.status).to.equal(200)

        // Pega o token direto da resposta
        const token = response.body.token

        cy.request({
            method: 'POST',
            url: 'api/basket',
            headers: {
                // Se a API espera o token puro sem a palavra Bearer escrita manualmente:
                Authorization: token
            },
            body: {
                "userId": 2,
                "bookId": 3,
                "quantity": 1
            }
        }).then((basketResponse) => {
            expect(basketResponse.status).to.equal(201)
        })
    })

    cy.visit('basket.html')
})
})
