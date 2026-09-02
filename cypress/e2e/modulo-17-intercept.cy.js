/// <reference types="cypress" />

describe('Exercícios do módulo 17 - Intercept', () => {

    beforeEach(() => {
        cy.visit('login.html')
        cy.setCookie('jwt_education_shown', 'true')
    });

    it('Deve listar reservas usando Intercept', () => {
        cy.intercept('GET', '**/api/reservations*', {
            statusCode: 200,
            body: {
                reservations: [
                    {
                        id: 3,
                        status: "active",
                        reservation_date: "2026-08-25 21:21:20",
                        pickup_deadline: "2026-08-27T21:21:20.042Z",
                        pickup_date: null,
                        return_deadline: null,
                        return_date: null,
                        notes: "",
                        renewal_count: 0,
                        title: "Livro do módulo 17",
                        author: "George Orwell",
                        category: "Ficção",
                        cover_image: "1984.jpg",
                        isbn: "978-0-452-28423-4",
                        editor: "Companhia das Letras",
                        language: "Português",
                        calculated_status: "active",
                        hours_remaining: 47
                    }
                ]
            }
        }).as('getReservations')

        cy.login('usuario@teste.com', 'user123')

        cy.wait('@getReservations')

        cy.get('body').should('contain', 'Livro do módulo 17')
    });


    it('Deve exibir mensagem de erro quando a API de reservas falhar', () => {
    cy.intercept('GET', '**/api/reservations', {
        statusCode: 500,
        body: {
            
        }
    }).as('reservationsError')

    cy.login('usuario@teste.com', 'user123')

    cy.wait('@reservationsError')
cy.get('#alert-container').should('contain', ' HTTP 500: Internal Server Error')
    
    
});

const mockReservasAdmin = {
    reservations: [
        {
            id: 1,
            user_name: "Ana Souza",
            user_email: "ana.souza@teste.com",
            title: "O Senhor dos Anéis: A Sociedade do Anel",
            author: "J.R.R. Tolkien",
            status: "active",
            reservation_date: "2026-08-25 10:00:00",
            pickup_deadline: "2026-08-27T10:00:00.000Z",
            return_deadline: "2026-09-10T10:00:00.000Z"
        },
        {
            id: 2,
            user_name: "Carlos Silva",
            user_email: "carlos.silva@teste.com",
            title: "1984",
            author: "George Orwell",
            status: "pending",
            reservation_date: "2026-08-26 14:30:00",
            pickup_deadline: "2026-08-28T14:30:00.000Z",
            return_deadline: "2026-09-11T14:30:00.000Z"
        },
        {
            id: 3,
            user_name: "Mariana Lima",
            user_email: "mariana.lima@teste.com",
            title: "O Pequeno Príncipe",
            author: "Antoine de Saint-Exupéry",
            status: "returned",
            reservation_date: "2026-08-20 09:15:00",
            pickup_deadline: "2026-08-22T09:15:00.000Z",
            return_deadline: "2026-09-05T09:15:00.000Z"
        },
        {
            id: 4,
            user_name: "Lucas Pesseguini",
            user_email: "lucas.pesseguini@teste.com",
            title: "Clean Code: Habilidades Práticas do Agile Software",
            author: "Robert C. Martin",
            status: "active",
            reservation_date: "2026-08-27 16:45:00",
            pickup_deadline: "2026-08-29T16:45:00.000Z",
            return_deadline: "2026-09-12T16:45:00.000Z"
        },
        {
            id: 5,
            user_name: "Fernanda Costa",
            user_email: "fernanda.costa@teste.com",
            title: "Orgulho e Preconceito",
            author: "Jane Austen",
            status: "cancelled",
            reservation_date: "2026-08-21 11:20:00",
            pickup_deadline: "2026-08-23T11:20:00.000Z",
            return_deadline: "2026-09-06T11:20:00.000Z"
        }
    ],
    
};

it('Deve exibir a listagem de reservas administrativas com sucesso usando mock', () => {
    
    
    cy.intercept('GET', '**/api/admin/reservations', {
        statusCode: 200,
        body: mockReservasAdmin
    }).as('adminReservations');


    cy.login('admin@biblioteca.com', 'admin123')
    cy.visit('/admin-reservations.html');

    cy.wait('@adminReservations');
    cy.get('body').should('contain', 'O Senhor dos Anéis: A Sociedade do Anel');
    cy.get('body').should('contain', 'Clean Code: Habilidades Práticas do Agile Software');
});

    
});