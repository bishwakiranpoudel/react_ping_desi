import { handlePostRequest } from "../hooks/api";
export async function postComments(requestBody) {
  const endpoint = "/posting/addCommentInPosting";
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
export async function getComments(postid) {
  const requestBody = { postid: postid };

  const endpoint = "/posting/getComments";
  const response = await handlePostRequest(endpoint, requestBody, {}, false);
  if (response?.error) {
    throw new Error(response.error);
  }

  return response;
}
export async function removeComments(postid) {
  const requestBody = { postid: postid };

  const endpoint = "/posting/removeCommentFromPosting";
  const response = await handlePostRequest(endpoint, requestBody, {}, false);
  if (response?.error) {
    throw new Error(response.error);
  }

  return response;
}
