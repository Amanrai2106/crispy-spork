import Loader from "@/components/Loader";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import SelectedProjects from "@/components/SelectedProjects";
import ProjectStack from "@/components/ProjectStack";
import AboutGrid from "@/components/AboutGrid";
import CoreValues from "@/components/CoreValues";
import BrandShowcase from "@/components/BrandShowcase";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Nav />
      <Loader />
      <Hero />
      <AboutGrid />
      <SelectedProjects />
      <ProjectStack />
      <CoreValues />
      <BrandShowcase />
      <Footer />
    </main>
  );
}
