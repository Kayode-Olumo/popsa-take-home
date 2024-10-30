import HomeClient from "@/components/HomeClient/HomeClient";
import CommonStrings from "@/utils/constants";

export const metadata = {
  title: CommonStrings.mainPage.title,
  description: "",
};

const Home = () => {
  return (
    <div>
      <HomeClient />
    </div>
  );
};

export default Home;
