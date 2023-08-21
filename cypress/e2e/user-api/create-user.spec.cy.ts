/// <reference types="cypress" />

import { generateRandomUsername } from '../../support/generate_random_username';

const USERNAME = generateRandomUsername();
const USER_OBJECT = {
  id: 10,
  username: USERNAME,
  firstName: `${USERNAME}-firstName`,
  lastName: `${USERNAME}-lastname`,
  email: `${USERNAME}@email.com`,
  password: '12345',
  phone: '123456789',
  userStatus: 1,
};

describe('Create user by using POST to /user endpoint', () => {
  it('should create a new user and return 200', () => {
    cy.logDebug(`Generated Username: ${USERNAME}`);
    cy.request('POST', '/user', USER_OBJECT).then((response) => {
      expect(response.status).to.eq(200);
    });
  });
});
