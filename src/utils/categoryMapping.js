// Map category IDs to names and vice versa
export const CATEGORY_IDS = {
    HOUSE: 24,
    AUTO: 25,
    SUBLEASE: 26,
    ELECTRONICS: 27,
    APPLIANCES: 28,
    APPARELS: 29,
    ROOMMATE: 30,
  }
  
  export const CATEGORY_NAMES = {
    24: "House",
    25: "Auto",
    26: "Sublease",
    27: "Electronics",
    28: "Appliances",
    29: "Apparels",
    30: "Roommate",
  }
  
  // Helper function to parse specific details string
  export function parseSpecificDetails(detailsArray) {
    if (!detailsArray || !Array.isArray(detailsArray)) return {}
  
    const details = {}
    detailsArray.forEach((detail) => {
      const [key, value] = detail.split(":")
      if (key && value) {
        details[key] = value
      }
    })
  
    return details
  }
  
  // Helper function to format API data for our components
  export function formatApiData(apiData) {
    if (!apiData) return null
  
    const categoryId = apiData.category_id
    const categoryName = CATEGORY_NAMES[categoryId] || "Other"
  
    // Parse specific details
    const specificDetails = parseSpecificDetails(apiData.specific_details)
  
    // Base formatted data
    const formattedData = {
      id: apiData.id || "",
      title: apiData.title || "",
      price: apiData.price || 0,
      image: apiData.cover_photo || "/placeholder.svg?height=600&width=800",
      images: [apiData.cover_photo, ...(apiData.product_images || [])].filter(Boolean),
      description: apiData.more_description || "",
      story: apiData.reason_for_selling || "",
      category: categoryName,
      categoryId: categoryId,
      used: specificDetails.condition !== "new",
      distance: apiData.distance || "2.5 km away",
      seller: {
        name: apiData.full_name || apiData.seller?.name || "Seller",
        verified: true,
        address: `${apiData.address1 || ""} ${apiData.address2 || ""} ${apiData.state || ""}`.trim(),
        phone: apiData.phone_number,
      },
      ...specificDetails,
    }
  
    // Add category-specific properties
    switch (categoryId) {
      case CATEGORY_IDS.HOUSE:
        formattedData.bedrooms = specificDetails.bedNo || "3"
        formattedData.bathrooms = specificDetails.bathNo || "2"
        formattedData.propertyType = specificDetails.propertyType || "House"
        formattedData.size = specificDetails.squareFoot || "1,500"
        break
  
      case CATEGORY_IDS.AUTO:
        formattedData.make = specificDetails.make || ""
        formattedData.model = specificDetails.model || ""
        formattedData.year = specificDetails.year || ""
        formattedData.mileage = specificDetails.kmRan || ""
        formattedData.engine = specificDetails.engine || ""
        break
  
      case CATEGORY_IDS.SUBLEASE:
        formattedData.bedrooms = specificDetails.bedNo || "1"
        formattedData.bathrooms = specificDetails.bathNo || "1"
        formattedData.leaseLength = specificDetails.leaseLength || "6 months"
        formattedData.availableFrom = specificDetails.availableFrom || "Immediately"
        formattedData.size = specificDetails.squareFoot || "800"
        break
  
      case CATEGORY_IDS.ELECTRONICS:
      case CATEGORY_IDS.APPLIANCES:
        formattedData.condition = specificDetails.condition || "Used"
        formattedData.brand = specificDetails.brand || ""
        formattedData.model = specificDetails.model || ""
        formattedData.year = specificDetails.year || ""
        break
  
      case CATEGORY_IDS.APPARELS:
        formattedData.type = specificDetails.apparelType || ""
        formattedData.size = specificDetails.size || ""
        formattedData.brand = specificDetails.brand || ""
        formattedData.condition = specificDetails.condition || "Used"
        formattedData.color = specificDetails.color || ""
        break
  
      case CATEGORY_IDS.ROOMMATE:
        formattedData.roomType = specificDetails.roomType || "Private"
        formattedData.preferredGender = specificDetails.preferredGender || "Any"
        formattedData.moveInDate = specificDetails.moveInDate || "Immediately"
        formattedData.duration = specificDetails.duration || "Long term"
        break
    }
  
    return formattedData
  }
  
  // Format API response data for listings
  export function formatApiListings(apiResponse) {
    if (!apiResponse || !apiResponse.data) return []
  
    return apiResponse.data.map((item) => formatApiData(item))
  }
  