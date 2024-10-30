"use client";

import Image from "next/image";
import Link from "next/link";
import Intro from "@/app/styles/home.styles";
import CommonStrings from "@/src/utils/constants";

export default function HomeClient() {
  return (
    <Intro>
      <Image src="/logo.svg" alt="Popsa" width="127" height="32" />
      <h1>{CommonStrings.mainPage.intro}</h1>
      <Link href="/gallerypage">{CommonStrings.mainPage.link}</Link>
    </Intro>
  );
}
