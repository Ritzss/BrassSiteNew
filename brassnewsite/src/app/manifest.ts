import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Brass",
    short_name: "Brass",
    description: "Premium brass products for modern living.",
    start_url: "/",
    display: "standalone",
    background_color: "#F4F2DD",
    theme_color: "#0E4001",
    orientation: "portrait",
    icons: [
      {
        src: "/Assets/Icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/Assets/Icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}