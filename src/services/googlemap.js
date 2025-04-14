export async function googleMapHandler({
  latitude,
  longitude,
  radius,
  type,
  keyword,
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
    const response = await fetch("/api/places", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ latitude, longitude, radius, type, keyword }),
    });

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
