export async function fetchPropertyById(propertyId: string) {
  try {
    const response = await fetch(`/api/properties/${propertyId}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching property by ID:', error);
    return null;
  }
}