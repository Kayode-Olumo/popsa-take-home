import HomeClient from "@/components/HomeClient/HomeClient";
import CommonStrings from "@/utils/constants";

export const metadata = {
  title: CommonStrings.mainPage.title,
  description: "",
};

export default function Home() {
  return (
    <div>
      <HomeClient />
    </div>
  );
}
