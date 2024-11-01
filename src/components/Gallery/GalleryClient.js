"use client";

import Head from "next/head";
import PageHeader from "@/app/gallerypage/styles/galleryclient.styles";
import { imgData } from "@/src/data/imgData";
import CommonStrings from "@/src/utils/constants";
import DraggableImageGrid from "@/src/components/DraggableImageGrid/index";

const GalleryClient = () => {
  console.log("imgData:", imgData);

  return (
    <div>
      <Head>
        <title>{CommonStrings.testPage.title}</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageHeader>
        <h1>{CommonStrings.testPage.header}</h1>
        <p>{CommonStrings.testPage.date}</p>
      </PageHeader>
      <DraggableImageGrid imgData={imgData} />
    </div>
  );
};

export default GalleryClient;
