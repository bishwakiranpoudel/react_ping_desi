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
