import Image from "next/image";
import { getGallery } from "@/lib/strapi";
import { GalleryClient } from "./GalleryClient";

export async function Gallery() {
  const { data: images } = await getGallery();

  return <GalleryClient images={images} />;
}
