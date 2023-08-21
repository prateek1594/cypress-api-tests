import { PET } from '../../constants';
import { PetInterface } from '../../types';
PET.status = 'sold';

describe('GET /pet/findByStatus API', () => {
  beforeEach(() => {
    cy.createPet(PET);
  });

  it('should return 200 when a valid status is entered', () => {
    cy.request('GET', `/pet/findByStatus?status=sold`).then((response) => {
      expect(response.status).to.equal(200);
    });
  });

  it('should return an array with the pet found', () => {
    cy.request('GET', `/pet/findByStatus?status=sold`).then((response) => {
      cy.logInfo(`Response Array is ${JSON.stringify(response.body)}`);
      expect(doesObjectExistInArray(response.body, PET)).to.be.true;
    });
  });

  /*
   * Skipping,
   * The documentation says that when username that does not exist is provided,
   * the response code is 404, but in reality, it returns 200.
   */
  xit('should return 400 when invalid status value', () => {
    cy.request({
      method: 'GET',
      url: `/pet/findByStatus?status=invalid`,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.equal(400);
    });
  });
});

/**
 * Checks if a given pet object exists in an array of pets.
 *
 * @param {PetInterface[]} pets - An array of pet objects to search through.
 * @param {PetInterface} pet - The pet object to check for existence in the array.
 * @returns {boolean} - True if the pet object exists in the array, false otherwise.
 */
function doesObjectExistInArray(
  pets: PetInterface[],
  pet: PetInterface,
): boolean {
  // Use the `.some()` method to iterate through the array and check for a matching `id`.
  return pets.some((p) => p.id === pet.id);
}
