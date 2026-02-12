// removeBgLocal.ts
import { removeBackground } from "@imgly/background-removal";

export async function removeBackgroundLocal(
  imageSrc: string | Blob,
): Promise<string> {
  // Config: 'publicPath' tells it where to find the AI models.
  // By default it fetches from the internet (CDN) on first load.
  const blob = await removeBackground(imageSrc, {
    progress: (key, current, total) => {
      console.log(
        `Downloading AI Model (${key}): ${Math.round((current / total) * 100)}%`,
      );
    },
  });

  // Convert the result Blob into a URL we can display
  return URL.createObjectURL(blob);
}
