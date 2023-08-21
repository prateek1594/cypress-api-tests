import { PetInterface } from '../types';

/**
 * Represents an example pet available to POST.
 *
 * @type {PetInterface}
 */

export const PET: PetInterface = {
  id: 100,
  name: 'pupo',
  category: {
    id: 1,
    name: 'pajaro',
  },
  photoUrls: ['photo_url'],
  tags: [
    {
      id: 0,
      name: 'dog',
    },
  ],
  status: 'available',
};
