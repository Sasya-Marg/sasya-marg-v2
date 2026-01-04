import ServiceHero from "./components/ServiceHero";
import CropSuggestionExplainer from "./components/CropSuggestionService";
import MarketExplainer from "./components/MarketExplainer";
import SchemeExplainer from "./components/SchemeExplainer";
import BuyerWishlistExplainer from "./components/BuyerWishlistExplainer";

const Services = () => {
  return (
    <>
      <ServiceHero />
      <CropSuggestionExplainer />
      <MarketExplainer />
      <SchemeExplainer />
      <BuyerWishlistExplainer />
    </>
  );
};

export default Services;
