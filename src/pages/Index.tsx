import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import Pricing from "@/components/landing/Pricing";
import Footer from "@/components/landing/Footer";
import UploadZone from "@/components/dashboard/UploadZone";

const Index = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <Hero />
    <section className="py-16 px-4">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-display font-bold mb-4 text-center">
          Try SnapCut AI in seconds
        </h2>
        <p className="text-muted-foreground text-sm md:text-base mb-8 text-center max-w-2xl mx-auto">
          Upload an image below to instantly remove the background. No account required to get started.
        </p>
        <UploadZone />
      </div>
    </section>
    <Features />
    <Pricing />
    <Footer />
  </div>
);

export default Index;
