import { PET } from '../../constants';

describe('POST /pet API', () => {
  it('create a PET with name PUPO; category PAJARO and expect 200', () => {
    cy.request('POST', '/pet', PET).then((response) => {
      cy.logDebug(`EXPECTED = ${JSON.stringify(PET)}`);
      expect(response.status).to.equal(200);

      cy.logDebug(`ACTUAL = ${JSON.stringify(response.body)}`);
      expect(response.body).to.deep.equal(PET);

      cy.logDebug(`PET with name PUPO and category PAJARO was created`);
    });
  });
});
