export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { latitude, longitude, radius, type, keyword } = req.body;
    const googleApiKey = process.env.REACT_APP_MAP_API_KEY;

    if (!googleApiKey) {
      return res.status(500).json({ error: "Google API key is missing" });
    }

    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=${radius}&type=${type}&keyword=${keyword}&key=${googleApiKey}`;

    const response = await fetch(url);
    const data = await response.json();

    return res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching places:", error);
    return res.status(500).json({ error: "Failed to fetch places" });
  }
}
