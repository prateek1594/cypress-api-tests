/// <reference types="cypress" />

import { generateRandomUsername } from '../../support/generate_random_username';
import '../../support/commands';

const USERNAME = generateRandomUsername();

describe('GET /user/logout API', () => {
  beforeEach(() => {
    cy.loginUser(USERNAME);
  });

  afterEach(() => {
    cy.deleteUser(USERNAME);
  });

  it('should return 200 when the user is successfully logged out', () => {
    cy.request('GET', `/user/logout`).then((response) => {
      expect(response.status).to.equal(200);
    });
  });
});
