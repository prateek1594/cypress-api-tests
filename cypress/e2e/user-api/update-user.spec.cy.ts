/// <reference types="cypress" />

import { generateRandomUsername } from '../../support/generate_random_username';
import '../../support/commands';

const USERNAME = generateRandomUsername();

describe('PUT /user/{username} API', () => {
  beforeEach(() => {
    cy.loginUser(USERNAME);
  });

  afterEach(() => {
    cy.logoutUser();
  });

  it('should return 200 when the user is successfully updated', () => {
    const USER_UPDATED = {
      id: 10,
      username: `${USERNAME}_UPDATED`,
      firstName: `${USERNAME}-firstName_UPDATED`,
      lastName: `${USERNAME}-lastname_UPDATED`,
      email: `${USERNAME}_UPDATED@email.com`,
      password: '54321',
      phone: '9874561230',
      userStatus: 1,
    };
    cy.request('PUT', `/user/${USERNAME}`, USER_UPDATED).then((response) => {
      expect(response.status).to.equal(200);
    });
  });

  /*
   * Skipping,
   * The documentation says that when username that does not exist is provided,
   * the response code is 404, but in reality, it returns 200.
   */
  xit('should return 404 when the username does not exist', () => {
    const USER_UPDATED = {
      id: 10,
      username: `${USERNAME}_UPDATED`,
      firstName: `${USERNAME}-firstName_UPDATED`,
      lastName: `${USERNAME}-lastname_UPDATED`,
      email: `${USERNAME}_UPDATED@email.com`,
      password: '54321',
      phone: '9874561230',
      userStatus: 1,
    };
    cy.deleteUser(USERNAME);
    cy.request({
      method: 'PUT',
      url: `/user/${USERNAME}`,
      body: USER_UPDATED,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.equal(404);
    });
  });
});
