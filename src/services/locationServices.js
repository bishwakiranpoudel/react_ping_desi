import { handleGetRequest, handlePostRequest } from "../hooks/api";

// Service to handle location related requests. No need for error handling as it will be caught with outer component which calls this
export const fetchMasterCities = async () => {
  const masterCities = await handleGetRequest(
    "/location/getAllLocationInfo",
    {}
  );
  console.log("masterCities", masterCities);
  return masterCities;
};

export const retrieveMasterCity = async payload => {
  const masterCity = await handlePostRequest(
    "/location/retrieveLocationByCityAndStateInfo",
    payload,
    {}
  );
  return masterCity;
};
