import { handlePostRequest } from "../hooks/api";
export async function getNews() {
  const endpoint = "/news/getNews";
  const response = handlePostRequest(endpoint, {}, undefined);
  if (response?.error) {
    throw new Error(response.error);
  }
  return response;
}
