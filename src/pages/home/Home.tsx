import HeroImage from "../../components/heroImage/HeroImage";
import FeaturedSongs from "../../components/featuredSongs/FeaturedSongs";
import FeatureSection from "../../components/FeatureSection/FeatureSection";
import TopLists from "../../components/topLists/TopLists";
import ReviewsSection from "../../components/reviews/ReviewsSection";
import Reveal from "../../components/reveal/Reveal";

const Home = () => {
  return (
    <>
      <HeroImage />
      <div className="app-container">
        <Reveal>
          <FeaturedSongs />
        </Reveal>
        <Reveal>
          <FeatureSection />
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
