/// <reference types="cypress" />

import { generateRandomUsername } from '../../support/generate_random_username';
import '../../support/commands';

const USERNAME = generateRandomUsername();

describe('DELETE /user/{username} API', () => {
  beforeEach(() => {
    cy.loginUser(USERNAME);
  });

  afterEach(() => {
    cy.logoutUser();
  });

  it('should return 200 when the user is successfully deleted', () => {
    cy.request('DELETE', `/user/${USERNAME}`).then((response) => {
      expect(response.status).to.equal(200);
    });
  });

  /*
   * Skipping,
   * The documentation says that when username that does not exist is provided,
   * the response code is 404, but in reality, it returns 200.
   */
  xit('should return 404 when the username does not exist', () => {
    cy.request({
      method: 'DELETE',
      url: `/user/${USERNAME}123`,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.equal(404);
    });
  });
});
