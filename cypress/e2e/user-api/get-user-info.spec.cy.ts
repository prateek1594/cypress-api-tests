/// <reference types="cypress" />

import { generateRandomUsername } from '../../support/generate_random_username';
import '../../support/commands';

const USERNAME = generateRandomUsername();

describe('GET /user/{username} API', () => {
  beforeEach(() => {
    cy.loginUser(USERNAME);
  });

  afterEach(() => {
    cy.logoutUser();
  });

  it('should return 200 when the user information are successfully returned', () => {
    cy.request('GET', `/user/${USERNAME}`).then((response) => {
      expect(response.status).to.equal(200);
    });
  });

  it('should return the user object', () => {
    const USER_EXPECTED = {
      id: 10,
      username: USERNAME,
      firstName: `${USERNAME}-firstName`,
      lastName: `${USERNAME}-lastname`,
      email: `${USERNAME}@email.com`,
      password: '12345',
      phone: '123456789',
      userStatus: 1,
    };

    cy.request('GET', `/user/${USERNAME}`).then((response) => {
      expect(response.body).to.deep.equal(USER_EXPECTED);
    });
  });

  it('should return 404 when the username is not found', () => {
    cy.deleteUser(USERNAME);
    cy.request({
      method: 'GET',
      url: `/user/${USERNAME}`,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.equal(404);
    });
  });
});
