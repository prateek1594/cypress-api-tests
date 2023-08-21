/// <reference types="cypress" />

/**
 * Generates a random username consisting of six lowercase letters.
 *
 * @returns {string} A randomly generated username composed of six lowercase letters.
 */
export function generateRandomUsername() {
  return [...Array(6)]
    .map((_) => String.fromCharCode(97 + Math.floor(Math.random() * 26)))
    .join('');
}
