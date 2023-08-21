import { ORDER } from '../../constants';
import { PET } from '../../constants';

describe('POST /store/order API', () => {
  it('create an order for PUPO and expect 200 response on success', () => {
    cy.request('POST', '/store/order', ORDER).then((response) => {
      cy.logDebug(`Check that response status is 200`);
      expect(response.status).to.equal(200);

      cy.logDebug(`Check that id in response is equal to the PET id`);
      expect(response.body.petId).to.equal(PET.id);

      cy.logDebug(`Check that the status must be PLACED now`);
      expect(response.body.status).to.equal('placed');

      cy.logDebug(`Check that the complete field is true`);
      expect(response.body.complete).to.equal(true);
    });
  });

  it('should return 500 when placing new order ID is invalid(string in this case)', () => {
    cy.request({
      method: 'POST',
      url: '/store/order',
      body: { ...ORDER, id: 'abc' },
      failOnStatusCode: false,
    }).then((response) => {
      cy.logDebug(`Check that response status is 500`);
      expect(response.status).to.equal(500);

      cy.logDebug(`Check that the message is "something bad happened"`);
      cy.logDebug(`${JSON.stringify(response.body)}`);
    });
  });
});
