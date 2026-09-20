import HeroImage from "../../components/heroImage/HeroImage";
import HeroCta from "../../components/heroCta/HeroCta";
import FeaturedSongs from "../../components/featuredSongs/FeaturedSongs";
import FeaturesSection from "../../components/features/FeaturesSection";
import TopLists from "../../components/topLists/TopLists";
import ReviewsSection from "../../components/reviews/ReviewsSection";
import Reveal from "../../components/reveal/Reveal";
import type { Song } from "../../data/mockData";
import "./Home.css";

type HomeProps = {
  songs: Song[];
  scores: Record<number, number | null>;
  addPlay: (id: number) => void;
};

const Home = ({ songs, scores, addPlay }: HomeProps) => {
  return (
    <div className="app-container catalog">
      <HeroImage />
      <HeroCta />
      <Reveal>
        <FeaturedSongs songs={songs} scores={scores} onPlay={addPlay} />
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
  );
};

export default Home;