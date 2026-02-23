import FeaturedCategories from "@/components/modules/homePage/featuredCategory";
import HeroSection from "@/components/modules/homePage/heroSection";
import HowItWorks from "@/components/modules/homePage/howItWorks";
import MenuItemForHome from "@/components/modules/homePage/menuItem";

export default function HomePage() {
  return (
    <div>
      <HeroSection></HeroSection>
      <HowItWorks></HowItWorks>

      <MenuItemForHome></MenuItemForHome>
      <FeaturedCategories></FeaturedCategories>
    </div>
  );
}
