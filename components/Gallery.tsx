import Image from "next/image";
import { getGallery } from "@/lib/strapi";
import { GalleryClient } from "./GalleryClient";

export async function Gallery() {
  const { data: images } = await getGallery();
  const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

  return <GalleryClient images={images} strapiUrl={strapiUrl} />;
}
