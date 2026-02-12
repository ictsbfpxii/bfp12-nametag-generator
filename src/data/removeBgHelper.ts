// removeBgHelper.ts

const API_KEY = "sarrPXcS4zDakkhUmKyxoHJN"; // 🔴 REPLACE THIS WITH YOUR KEY

export async function removeBackgroundApi(imageBlob: Blob): Promise<string> {
  const formData = new FormData();
  formData.append("image_file", imageBlob);
  formData.append("size", "auto");

  const response = await fetch("https://api.remove.bg/v1.0/removebg", {
    method: "POST",
    headers: {
      "X-Api-Key": API_KEY,
    },
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Failed to remove background: " + response.statusText);
  }

  // The API returns the raw image data as a Blob
  const resultBlob = await response.blob();

  // Create a local URL for it
  return URL.createObjectURL(resultBlob);
}
