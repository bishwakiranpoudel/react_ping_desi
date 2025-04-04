import { handleGetRequest, handlePostRequest } from "../hooks/api";

// Service to handle location related requests. No need for error handling as it will be caught with outer component which calls this
export const getListingCategories = async () => {
  const endpoint = "classified/getListingCategories";
  const categories = await handleGetRequest(endpoint, undefined);
  if (categories.error) {
    throw new Error(categories.error);
  }
  return categories;
};

export const getAllCategoriesListings = async () => {
  const endpoint = "classified/getListingProducts";
  const geohash = localStorage.getItem("geohash") || "9v6m";
  const payload = { geohash: geohash, limit: 10, category: "all" };
  const listings = await handlePostRequest(endpoint, payload, undefined);
  if (listings.error) {
    throw new Error(listings.error);
  }
  return listings;
};

export const getListing = async id => {
  const endpoint = "classified/getListingProduct/" + id;
  const listing = await handleGetRequest(endpoint);
  if (listing.error) {
    throw new Error(listing.error);
  }
  return listing;
};


export const queryListings = async (userInput = {}) => {
  const endpoint = "classified/getListingProducts";

  // Start with geohash (always required)
  const payload = {
    geohash: localStorage.getItem("geohash") || "9v6m",
  };

  // Conditionally add fields if they exist in userInput
  if (userInput.query) payload.query = userInput.query;
  if (userInput.category) payload.category = userInput.category;
  if (userInput.sort_by) payload.sort_by = userInput.sort_by;
  if (userInput.sort_order) payload.sort_order = userInput.sort_order;
  if (userInput.page_size) payload.page_size = userInput.page_size;
  if (userInput.page) payload.page = userInput.page;
  if (userInput.min_price !== undefined) payload.min_price = userInput.min_price;
  if (userInput.max_price !== undefined) payload.max_price = userInput.max_price;
  if (userInput.limit) payload.limit = userInput.limit;

  const listings = await handlePostRequest(endpoint, payload, undefined);
  if (listings.error) {
    throw new Error(listings.error);
  }
  return listings;
};

