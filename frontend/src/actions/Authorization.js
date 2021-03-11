import { authAPI } from "../utils/api";

export const login = async (username, password) => {
  /**
   * @desc Log in and get a token.
   * @param {string} username - Username required to login.
   * @param {string} password - Password required to login.
   * @returns {object} { success: true, token: { token : 'Bearer ...', valid: 1d } }
   */

  try {
    const response = await authAPI.post(
      "http://financeos:30002/api/auth/login",
      { username, password }
    );

    if (response.status === 200) {
      return response.data;
    }
  } catch (err) {
    if (err.isAxiosError === true) {
      if (err.response.status === 401) {
        throw new Error(err.response.data.error);
      }
      throw new Error("Login failed");
    }
  }
};

export const validateToken = async (token) => {
  /**
   * @desc Takes a token and validates it with the authentication service.
   * @param {string} token - Bearer token, which needs to be validated.
   * @returns {object} { success: true, valid: true }
   */
  try {
    const response = await authAPI.get(
      "http://financeos:30002/api/auth/verify",
      {
        headers: { Authorization: token },
      }
    );
    if (response.status === 200) {
      return response.data;
    }
  } catch (err) {
    if (err.isAxiosError === true) {
      if (err.response.status === 401) {
        throw new Error(err.response.data);
      }
      throw new Error("GET /api/auth/verify failed");
    }
  }
};
