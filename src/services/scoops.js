import { handlePostRequest } from "../hooks/api";

export async function getPostings(requestBody) {
  const endpoint = "/posting/getAllPostings";
  const response = await handlePostRequest(
    endpoint,
    requestBody,
    undefined,
    false
  );
  if (response?.error) {
    throw new Error(response.error);
  }

  return response;
}

export async function getScoops() {
  const endpoint = "/scoop/getAllScoops";
  const response = await handlePostRequest(endpoint, {}, {}, false);

  if (response?.error) {
    throw new Error(response.error);
  }

  return response;
}

export async function addLike(payload) {
  const endpoint = "/posting/addLikeInPosting";
  const response = await handlePostRequest(endpoint, payload, undefined, false);

  console.log("rsponsel", response);
  if (response?.error) {
    throw new Error(response.error);
  }

  return response;
}
