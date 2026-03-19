const GOOGLE_API_KEY = "AIzaSyAKZcEFxx9xyuup02kwsksXlXw9yJ7CmhM"; //API_KEY = Excluída.

// Desabilitar a assinatura da URL na página de credenciais
// const signature = "JSFOQAKCR8518VLYZFJlGCjn5pQ=";

export function getMapPreview(lat, lng) {
  //   const imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lgt}&zoom=13&size=400x200&maptype=roadmap&markers=color:red%7Clabel:S%7C${lat},${lgt}&key=${GOOGLE_MAPS_API}&signature=azZhYX6Yg4Ft3D817HQyMgzz5lM=`;
  const imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:S%7C${lat},${lng}&key=${GOOGLE_API_KEY}`;
  return imagePreviewUrl;
}

// const url =
//   "https://maps.googleapis.com/maps/api/staticmap?center=37.33233141,-122.0312186&zoom=13&size=400x200&maptype=roadmap&markers=color:red%7Clabel:S%7C37.33233141,-122.0312186&key=AIzaSyAKZcEFxx9xyuup02kwsksXlXw9yJ7CmhM&signature=azZhYX6Yg4Ft3D817HQyMgzz5lM=";

export async function getAddress(lat, lng) {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_API_KEY}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Faild to fetch address!");
  }

  const data = await response.json();
  // console.log("data: ", data);

  const address = data.results[0].formatted_address;
  // console.log("address: ", address);
  return address;
}
