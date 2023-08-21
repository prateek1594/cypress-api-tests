import { ORDER } from '../../constants';

describe('DELETE /store/order/{orderId} API', () => {
  beforeEach(() => {
    cy.createOrder(ORDER);
  });

  it('should return 200 when the order is successfully deleted', () => {
    cy.request('DELETE', `/store/order/${ORDER.id}`).then((response) => {
      expect(response.status).to.equal(200);
    });
  });

  it('should return 404 when the orderId is invalid', () => {
    cy.request({
      method: 'DELETE',
      url: `/store/order/abc`,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.equal(404);
    });
  });

  it('should return 404 when the orderId is not found', () => {
    cy.request({
      method: 'DELETE',
      url: `/store/order/543`,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.equal(404);
    });
  });
});
