import React from "react";
import HeroSection from "./components/HeroSection";
import FeaturesSection from "./components/FeatureSection";
import HowItWorks from "./components/HowItWork";
import CtaSection from "./components/CTASection";

const Home = () => {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <HowItWorks />
      <CtaSection />
    </>
  );
};

export default Home;
