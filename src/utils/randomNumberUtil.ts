/**
 * randomNumberUtil.ts
 *
 * Utility function to generate a random number within a specified range.
 *
 * Author: Ammar Barish
 * Date: 2024-07-08
 */

/**
 * Generate a random number within a specified range.
 *
 * @param min - The minimum value.
 * @param max - The maximum value.
 * @param decimal - The number of decimal places.
 * @returns {number} - A random number within the specified range.
 */
export const generateRandomNumber = (min: number, max: number, decimal: number): number => {
    const randomValue = Math.random() * (max - min) + min;
    return parseFloat(randomValue.toFixed(decimal));
  };
  