/**
 * API Client for Sanmei Web Backend
 */

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5001';

export const sanmeiAPI = {
  /**
   * Calculate destiny table for a single person
   * @param {string} birthDate - YYYY-MM-DD format
   * @returns {Promise<Object>} Destiny calculation result
   */
  calculateDestiny: async (birthDate) => {
    try {
      const response = await fetch(`${API_BASE}/api/v1/destiny`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ birth_date: birthDate }),
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error calculating destiny:', error);
      throw error;
    }
  },

  /**
   * Calculate compatibility between two people
   * @param {string} person1BirthDate - YYYY-MM-DD format
   * @param {string} person2BirthDate - YYYY-MM-DD format
   * @returns {Promise<Object>} Compatibility analysis result
   */
  calculateCompatibility: async (person1BirthDate, person2BirthDate) => {
    try {
      const response = await fetch(`${API_BASE}/api/v1/compatibility`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          person1_birth_date: person1BirthDate,
          person2_birth_date: person2BirthDate,
        }),
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error calculating compatibility:', error);
      throw error;
    }
  },

  /**
   * Health check endpoint
   * @returns {Promise<Object>} Health status
   */
  health: async () => {
    try {
      const response = await fetch(`${API_BASE}/health`);
      return await response.json();
    } catch (error) {
      console.error('Health check failed:', error);
      throw error;
    }
  },

  /**
   * Get debug information
   * @returns {Promise<Object>} Debug data
   */
  debug: async () => {
    try {
      const response = await fetch(`${API_BASE}/api/v1/debug`);
      return await response.json();
    } catch (error) {
      console.error('Debug request failed:', error);
      throw error;
    }
  },
};
