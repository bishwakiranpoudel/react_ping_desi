import { handlePostRequest } from "../hooks/api";

const googleApiKey = process.env.REACT_APP_GOOGLEMAP_API;
export async function googleMapHandler({
  latitude,
  longitude,
  radius,
  type,
  keyword,
}) {
  try {
    const payload = {
      googleApiKey,
      latitude,
      longitude,
      type,
      keyword,
      radius,
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

export async function googleMapImageHandler({ photo_reference }) {
  try {
    const payload = {
      apiKey: googleApiKey,
      photoReference: photo_reference,
    };

    console.log("Photo payload:", payload);

    const response = await handlePostRequest(
      "/location/retrieveGoogleMapsApiImages",
      payload,
      undefined,
      false
    );

    if (response.status !== "success") {
      throw new Error("Image API request failed");
    }
    console.log(response.imageUrl, "image url");

    return response.imageUrl;
  } catch (error) {
    console.error("Client image fetch error:", error);
    throw error;
  }
}

// export async function googleMapHandler(requestBody) {
//   const endpoint = "/location/retrieveGoogleMapsApiData";
//   console.log(requestBody, "body");
//   const response = await handlePostRequest(endpoint, requestBody, {}, false);
//   if (response?.error) {
//     throw new Error(response.error);
//   }
//   return response;
// }
