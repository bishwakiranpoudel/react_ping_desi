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

    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=${radius}&type=${type}&keyword=${keyword}&key=${googleApiKey}`;

    const response = await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    });

    console.log("response", response);
    if (!response.ok) {
      throw new Error("API request failed");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Client fetch error:", error);
    throw error;
  }
}
