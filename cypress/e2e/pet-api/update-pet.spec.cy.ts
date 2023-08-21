// import { PET } from '../../constants';

describe('PUT /pet API', () => {
  it('create a PET with name kurikuri under the category pomeranian and update it with tag SUPER CUTE', () => {
    const PET = {
      id: 10,
      name: 'kurikuri',
      category: {
        id: 1,
        name: 'pomeranian',
      },
      tags: [
        {
          id: 0,
          name: 'doggie',
        },
      ],
      status: 'available',
    };
    cy.request('POST', '/pet', PET).then((response) => {
      cy.logDebug(`EXPECTED = ${JSON.stringify(PET)}`);
      expect(response.status).to.equal(200);

      cy.logDebug(`ACTUAL = ${JSON.stringify(response.body)}`);
      expect(response.body).to.deep.include(PET);

      cy.logDebug(`PET with name KURIKURI and category POMERANIAN was created`);

      // Update the tags of the PET
      const updatedPet = {
        ...PET,
        tags: [
          {
            id: 0,
            name: 'SUPER CUTE',
          },
        ],
      };

      cy.request('PUT', `/pet/`, updatedPet).then((updateResponse) => {
        cy.logDebug(`EXPECTED UPDATED = ${JSON.stringify(updatedPet)}`);
        expect(updateResponse.status).to.equal(200);

        cy.logDebug(`ACTUAL UPDATED = ${JSON.stringify(updateResponse.body)}`);
        expect(updateResponse.body).to.deep.include(updatedPet);

        cy.logDebug(`PET with tag SUPER CUTE was updated`);
      });
    });
  });

  /*
   * Skipping,
   * The documentation says that when username that does not exist is provided,
   * the response code is 404, but in reality, it returns 200.
   */
  xit('should return 404 when the petId does not exist', () => {
    const PET_UPDATED = {
      id: null,
      name: 'kitten',
      category: {
        id: 1,
        name: 'Cats',
      },
      tags: [
        {
          id: 0,
          name: 'cat',
        },
      ],
      status: 'available',
    };
    cy.request({
      method: 'PUT',
      url: `/pet`,
      body: PET_UPDATED,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.equal(404);
    });
  });

  it('should return 500 when the petId is invalid(when provided with string)', () => {
    const PET_UPDATED = {
      id: 'abc',
      name: 'kitten',
      category: {
        id: 1,
        name: 'Cats',
      },
      tags: [
        {
          id: 0,
          name: 'cat',
        },
      ],
      status: 'available',
    };
    cy.request({
      method: 'PUT',
      url: `/pet`,
      body: PET_UPDATED,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.equal(500);
      cy.logDebug(`EXPECTED = ${JSON.stringify(response.body)}`);
    });
  });
});
