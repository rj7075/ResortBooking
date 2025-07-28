import React from "react";
import Hero from "../components/Hero";
import FeatureDestination from "../components/FeatureDestination";
import ExclusiveOffer from "../components/ExclusiveOffer";
import Testimonials from "../components/Testimonials";
import NewsLeter from "../components/NewsLeter";

const Home = () => {
  return (
    <div>
      <Hero />
      <FeatureDestination />
      <ExclusiveOffer />
      <Testimonials />
      <NewsLeter />
    </div>
  );
};

export default Home;
