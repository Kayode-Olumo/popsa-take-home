import HomeClient from "@/src/components/Home/HomeClient";
import CommonStrings from "@/src/utils/constants";

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
