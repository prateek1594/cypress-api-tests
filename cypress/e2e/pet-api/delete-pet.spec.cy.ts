import { PET } from '../../constants';

describe('DELETE /pet/{petId} API', () => {
  beforeEach(() => {
    cy.createPet(PET);
  });

  it('should return 200 when the pet is successfully deleted', () => {
    cy.request('DELETE', `/pet/${PET.id}`).then((response) => {
      expect(response.status).to.equal(200);
    });
  });

  it('should return 404 when the petId not found', () => {
    cy.request({
      method: 'DELETE',
      url: `/pet/199`,
      failOnStatusCode: false,
    }).then((response) => {
      cy.logInfo(
        `Setting the PET.id to 199 which is not found in the database`,
      );
      expect(response.status).to.equal(404);
    });
  });
});
