declare global {
  interface Window {
    google: any;
  }
}

export default function loadGoogleMapsScript(
  userLocale: string
): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    // Check if the script is already loaded
    if (window.google && window.google.maps) {
      resolve();
      return;
    }

    // Dynamically load the Google Maps script
    const googleMapsScript = document.createElement("script");
    googleMapsScript.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.VUE_APP_GOOGLE_MAPS_API_KEY}&libraries=places&language=${userLocale}`;
    googleMapsScript.async = true;
    googleMapsScript.defer = true;
    document.head.appendChild(googleMapsScript);

    googleMapsScript.addEventListener("load", () => resolve());
    googleMapsScript.addEventListener("error", reject);
  });
}
