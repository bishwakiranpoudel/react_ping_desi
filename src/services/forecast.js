import { handleGetRequest, handlePostRequest } from "../hooks/api";

// Service to handle location related requests. No need for error handling as it will be caught with outer component which calls this
export const fetchWeatherForecast = async () => {
  const geohash = localStorage.getItem("geohash") || "9v6m";
  const weatherForecast = await handlePostRequest(
    "/news/wetherReport",
    { geohash: geohash },
    {},
    false
  );
  return weatherForecast;
};

export const fetchAllergyForecast = async payload => {
  const payload = { geohash: localStorage.getItem("geohash") || "geohash" };
  const allergyForecast = await handlePostRequest(
    "/news/allergySummary",
    payload,
    {},
    false
  );
  return allergyForecast;
};
