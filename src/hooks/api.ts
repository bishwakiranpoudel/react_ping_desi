import {getValidToken, refreshToken, Token} from '../services/jwt';
import axios from 'axios'
import {envConfig} from '../config/env';

const handleAxiosError = (
  error: unknown
): { message: string; status?: number } => {
  if (axios.isAxiosError(error)) {
    return {
      message:
        error.response?.data?.message ||
        error.message ||
        "An unexpected error occurred",
      status: error.response?.status,
    };
  }
  return { message: "An unexpected error occurred" };
};

  export const getApiUrl = (): string => {
    return  envConfig.apiUrl
  };

  export const handleGetToken = (): string | null => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("access_token");
  };


  export const handleGetRequest = async (endpoint: string, headers?: object) => {
    const API_URL = getApiUrl();
    const token = handleGetToken();
    headers = headers ? headers : { Authorization: `Bearer ${token}` };

    try {
      const response = await axios.get(`${API_URL}${endpoint}`, {
        headers: headers,
        validateStatus: (status) => {
          return status < 500;
        },
      });

      if (response.status >= 400) {
        if (response.status === 401) {
          try {
            const refreshedAccessToken = await getValidTokenRefresh();
            headers = {
              ...headers,
              Authorization: `Bearer ${refreshedAccessToken}`,
            };
            return await handleGetRequest(endpoint, headers);
          } catch (refreshTokenError) {
            console.error(`Failed to refresh token: ${refreshTokenError}`);
            return { error: "Session expired. Please log in again." };
          }
        }

        if (response.status === 404) {
          return { error: "Resource not found" };
        }

        if (response.status === 403) {
          return { error: "You don't have permission to access this resource" };
        }

        return { error: response.data?.message || "An error occurred" };
      }

      return response.data;
    } catch (error) {
      console.error(`Error making GET ${endpoint}: `, error);
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          try {
            const refreshedAccessToken = await getValidTokenRefresh();
            headers = {
              ...headers,
              Authorization: `Bearer ${refreshedAccessToken}`,
            };
            return await handleGetRequest(endpoint, headers);
          } catch (refreshTokenError) {
            console.error(`Failed to refresh token: ${refreshTokenError}`);
            return { error: "Session expired. Please log in again." };
          }
        }
        return {
          error:
            error.response?.data?.message ||
            error.message ||
            "Failed to connect to the server. Please check your connection.",
        };
      }
      return { error: "An unexpected error occurred" };
    }
  };

  export const handlePostRequest = async (
    endpoint: string,
    data: object,
    headers?: object,
    multipart = false
  ) => {
    const API_URL = getApiUrl();
    const token = handleGetToken();
    
    // If headers are not provided, add Authorization header with token
    // If headers are provided, add Authorization header with token if it doesn't already exist
    // If headers is explicitly provided as an empty object, don't add Authorization header
    if (headers === undefined) {
      headers = { Authorization: `Bearer ${token}` };
    } else if (Object.keys(headers).length > 0) {
      headers = { ...headers, Authorization: `Bearer ${token}` };
    }
    if (multipart) {
      headers = {
        ...headers,
        "Content-Type": "multipart/form-data",
      };
    }
    try {
      const response = await axios.post(`${API_URL}${endpoint}`, data, {
        headers: headers,
        validateStatus: (status) => {
          return status < 500;
        },
      });
      if (response.status >= 400) {
        throw response;
      }
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          try {
            const refreshedAccessToken = await getValidTokenRefresh();

            // update authorization header with newly refreshed token
            headers = {
              ...headers,
              Authorization: `Bearer ${refreshedAccessToken}`,
            };

            return await handlePostRequest(endpoint, data, headers);
          } catch (refreshTokenError) {
            console.error(`Failed to refresh token: ${refreshTokenError}`);
            throw refreshTokenError;
          }
        } else if (
          endpoint === "/api/register/token/" &&
          error.response?.status === 404
        ) {
          return;
        } else if (
          endpoint.startsWith("/api/register/") &&
          error.response?.status === 400
        ) {
          return {
            error: error.response.data.email?.[0] || "An error occurred",
          };
        } else if (
          endpoint === "/api/server/minecraft/" &&
          error.response?.status === 400
        ) {
          const errorMessage =
            error.response.data.name?.[0] ||
            error.response.data.message ||
            "An error occurred while creating the server";
          return { error: errorMessage };
        }
      }
      console.error(`Error making POST ${endpoint}: `, error);
      throw error;
    }
  };

  export const handlePatchRequest = async (endpoint: string, data: object) => {
    const API_URL = getApiUrl();
    const token = handleGetToken();
    try {
      const response = await axios.patch(`${API_URL}${endpoint}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      const { message, status } = handleAxiosError(error);
      if (status === 401) {
        try {
          await getValidTokenRefresh();
          return await handlePatchRequest(endpoint, data);
        } catch (refreshTokenError) {
          console.error(`Failed to refresh token: ${refreshTokenError}`);
          throw { message: "Failed to refresh token", status: 401 };
        }
      }
      throw { message, status };
    }
  };

  const getValidTokenRefresh = async () => {
    if (typeof window === "undefined") return;

    const tokenString = localStorage.getItem("token");
    if (!tokenString) {
      throw new Error("No token found in local storage");
    }

    const token: Token = JSON.parse(tokenString);
    console.log("getting a new token");
    const new_token = await getValidToken(token);
    console.log("Setting new access token: ", new_token.access);
    localStorage.setItem("access_token", new_token.access);
    localStorage.setItem("token", JSON.stringify(new_token));
    return new_token.access;
  };

