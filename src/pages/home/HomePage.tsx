import HeroImage from "./components/heroImage/HeroImage";
import LatestReviewedTracks from "./components/latestReviewedTracks/LatestReviewedTracks";
import FeatureSection from "./components/featureSection/FeatureSection";
import TopLists from "./components/topLists/TopLists";
import LatestReviews from "./components/latestReviews/LatestReviews";
import Reveal from "./components/reveal/Reveal";
import "./HomePage.css";

const HomePage = () => {
  return (
    <>
      <HeroImage />
      <div className="app-container home-sections">
        <Reveal>
          <FeatureSection />
        </Reveal>
        <Reveal>
          <LatestReviewedTracks />
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
