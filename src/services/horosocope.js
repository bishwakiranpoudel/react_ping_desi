import { handleGetRequest,  } from "../hooks/api";

// Service to handle location related requests. No need for error handling as it will be caught with outer component which calls this
export const fetchHoroscope = async payload => {
  let endpoint = "/horoscope/";
  if (payload.mode.toLowerCase() == "sun") {
    endpoint += "getSunHoroscope";
  } else if (payload.mode.toLowerCase() == "moon") {
    endpoint += "getMoonHoroscope";
  }
  const horoscope = await handleGetRequest(
    endpoint + "?sign=" + payload.sign,
    {},
  );
  return horoscope;
};
