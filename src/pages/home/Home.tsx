import HeroImage from "../../components/heroImage/HeroImage";
import FeaturedSongs from "../../components/featuredSongs/FeaturedSongs";
import FeaturesSection from "../../components/features/FeaturesSection";
import TopLists from "../../components/topLists/TopLists";
import ReviewsSection from "../../components/reviews/ReviewsSection";
import Reveal from "../../components/reveal/Reveal";
import "./Home.css";

const Home = () => {
  return (
    <>
      <HeroImage />
      <div className="app-container catalog">
        <Reveal>
          <FeaturedSongs />
        </Reveal>
        <Reveal>
          <FeaturesSection />
        </Reveal>
        <Reveal>
          <TopLists />
        </Reveal>
        <Reveal>
          <ReviewsSection />
        </Reveal>
      </div>
    </>
  );
};

export default Home;
