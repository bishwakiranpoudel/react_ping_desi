import { handlePostRequest } from "../hooks/api";

export async function googleMapHandler({
  latitude,
  longitude,
  radius,
  type,
  keyword
}) {
  console.log(
    latitude,
    longitude,
    radius,
    type,
    keyword,
    "at google map handler"
  );

  try {
    const googleApiKey = process.env.REACT_APP_GOOGLEMAP_API;

    if (!googleApiKey) {
      throw new Error("Api Key missing");
    }

    const payload = {
      googleApiKey: googleApiKey,
      latitude,
      longitude,
      type,
      keyword,
      radius
    };
    console.log("payyload", payload);
    const response = await handlePostRequest(
      "/location/retrieveGoogleMapsApiData",
      payload,
      undefined,
      false
    );
    if (response.status != "success") {
      throw new Error("API request failed");
    }

    return response.data;
  } catch (error) {
    console.error("Client fetch error:", error);
    throw error;
  }
}
