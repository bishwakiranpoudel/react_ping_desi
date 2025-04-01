"use client";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { getApiUrl } from "../hooks/api";

class TokenRefreshError extends Error {
  constructor(message) {
    super(message);
    this.name = "TokenRefreshError";
  }
}

const isTokenValid = (token) => {
  if (!token) return false;

  try {
    const decodedToken = jwtDecode(token);
    if (!decodedToken.exp) return false;
    const currentTime = Date.now() / 1000;
    return decodedToken.exp > currentTime;
  } catch (error) {
    console.error("Error decoding token:", error);
    return false;
  }
};

export const refreshToken = async (refreshToken) => {
  if (!isTokenValid(refreshToken)) {
    console.log("Refresh token is invalid");
    localStorage.clear();
    window.location.href = "/home";
  }
  const apiUrl = getApiUrl();
  const tokenEndpoint = `${apiUrl}/auth/refresh-token`;

  const payload = {
    token: refreshToken
  };

  try {
    const response = await axios.post(tokenEndpoint, payload, {
      headers: {
        "Content-Type": "application/json"
      }
    });

    return {
      access: response.data.token.access,
      refresh: response.data.token.refresh
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new TokenRefreshError(
        error.response ? error.response.data : error.message
      );
    } else {
      throw new TokenRefreshError(`Error refreshing token: ${error}`);
    }
  }
};

const getValidToken = async (currentTokens) => {
  console.log("Checking token validity...");
  if (isTokenValid(currentTokens.access)) {
    console.log("TOKEN VALID returning current tokens");
    return currentTokens;
  }

  console.log("Access token is invalid. Attempting to refresh...");
  const newTokens = await refreshToken(currentTokens.refresh);
  console.log(newTokens, "new token here");
  console.log("Token refreshed successfully");
  return newTokens;
};

export { isTokenValid, getValidToken };
