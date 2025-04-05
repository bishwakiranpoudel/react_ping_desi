import { handleGetRequest } from "../hooks/api";

export async function GetProfile() {
  const endpoint = "/auth/me";
  const profile = await handleGetRequest(endpoint, undefined);

  if (profile?.error) {
    throw new Error(profile.error);
  }
  return profile;
}
