import { handleGetRequest } from "../hooks/api";
export async function GetProfile() {
  const endpoint = "/auth/me";

  const response = await handleGetRequest(endpoint, undefined);
  if (response?.error) {
    throw new Error(response.error);
  }

  return response;
}
