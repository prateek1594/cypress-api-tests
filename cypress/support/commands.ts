/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

declare global {
  namespace Cypress {
    interface Chainable {
      createUser(username: string): void;
      deleteUser(username: string): void;
      loginUser(username: string): void;
      logoutUser(): void;
      createPet(pet: PetInterface): void;
      deletePet(petId: number): void;
      createOrder(order: OrderInterface): void;
      deleteOrder(orderId: number): void;

      logInfo(message: string): Chainable;
      logError(message: string): Chainable;
      logDebug(message: string): Chainable;
      logWarn(message: string): Chainable;
    }
  }
}

import { OrderInterface, PetInterface } from '../types';

Cypress.Commands.add('logInfo', (message: string) => {
  cy.log(`INFO: ${message}`);
});

Cypress.Commands.add('logError', (message: string) => {
  cy.log(`ERROR: ${message}`);
});

Cypress.Commands.add('logDebug', (message: string) => {
  cy.log(`DEBUG: ${message}`);
});

Cypress.Commands.add('logWarn', (message: string) => {
  cy.log(`WARN: ${message}`);
});

Cypress.Commands.add('createUser', (username: string) => {
  cy.logInfo(`Creating user ${username}`);
  cy.request('POST', '/user', {
    id: 10,
    username: username,
    firstName: `${username}-firstName`,
    lastName: `${username}-lastname`,
    email: `${username}@email.com`,
    password: '12345',
    phone: '123456789',
    userStatus: 1,
  });
});

Cypress.Commands.add('deleteUser', (username: string) => {
  cy.logInfo(`Deleting user ${username}`);
  cy.request('DELETE', `/user/${username}`);
});

Cypress.Commands.add('loginUser', (username: string) => {
  cy.logInfo(`Logging in user ${username}`);
  cy.createUser(username);
  cy.request('GET', `/user/login?username=${username}&password=12345`);
});

Cypress.Commands.add('logoutUser', () => {
  cy.logInfo(`Logging out user`);
  cy.request('GET', `/user/logout`);
});

Cypress.Commands.add('createPet', (pet: PetInterface) => {
  cy.logInfo(`Adding a PET`);
  cy.request('POST', '/pet', pet);
});

Cypress.Commands.add('deletePet', (petId: number) => {
  cy.logInfo(`Deleting a PET`);
  cy.request('DELETE', `/pet/${petId}`);
});

Cypress.Commands.add('createOrder', (order: OrderInterface) => {
  cy.logInfo(`Creating an order`);
  cy.request('POST', '/store/order', order);
});

Cypress.Commands.add('deleteOrder', (orderId: number) => {
  cy.logInfo(`Deleting an order`);
  cy.request('DELETE', `/store/order/${orderId}`);
});
