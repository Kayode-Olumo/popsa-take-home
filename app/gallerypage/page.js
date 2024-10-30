"use server";

import { imgData } from "@/data/imgData";
import GalleryClient from "@/components/GalleryClient/GalleryClient";

export default async function GalleryPage() {
  return <GalleryClient initialData={imgData} />;
}
