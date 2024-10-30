"use server";

import { imgData } from "@/src/data/imgData";
import GalleryClient from "@/src/components/Gallery/GalleryClient";

export default async function GalleryPage() {
  return <GalleryClient initialData={imgData} />;
}
