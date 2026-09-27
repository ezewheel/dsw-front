import HeroImage from "./components/heroImage/HeroImage";
import LatestReviewedTracks from "./components/latestReviewedTracks/LatestReviewedTracks";
import FeatureSection from "./components/featureSection/FeatureSection";
import TopLists from "./components/topLists/TopLists";
import LatestReviews from "./components/latestReviews/LatestReviews";
import Reveal from "./components/reveal/Reveal";

const HomePage = () => {
  return (
    <>
      <HeroImage />
      <div className="app-container">
        <Reveal>
          <LatestReviewedTracks />
        </Reveal>
        <Reveal>
          <FeatureSection />
        </Reveal>
        <Reveal>
          <TopLists />
        </Reveal>
        <Reveal>
          <LatestReviews />
        </Reveal>
      </div>
    </>
  );
};

export default HomePage;
