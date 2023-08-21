import { formatISO } from 'date-fns';
import { OrderInterface } from '../types';

/**
 * Represents an example order for a pet.
 *
 * @type {OrderInterface}
 */
export const ORDER: OrderInterface = {
  id: 10,
  petId: 100,
  quantity: 7,
  shipDate: formatISO(new Date()),
  status: 'placed',
  complete: true,
};
