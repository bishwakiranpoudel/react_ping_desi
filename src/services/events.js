import { handleGetRequest, handlePostRequest } from "../hooks/api";

// Service to handle location related requests. No need for error handling as it will be caught with outer component which calls this
export const fetchCommunityEvents = async filters => {
  const events = await handlePostRequest(
    "/events/getCommunityEvents",
    filters,
    {},
    false
  );
  return events;
};

export const getPersonalEvents = async () => {
  const events = await handleGetRequest("/events/getPersonalEvents", undefined);
  return events;
};
