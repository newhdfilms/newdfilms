import Hero from "@/components/Hero";
import { AiCreationsCarousel, TeamCarousels } from "@/components/Work";
import Team from "@/components/Team";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="bg-background-dark text-white font-display overflow-x-hidden min-h-screen selection:bg-primary selection:text-background-dark">
      {/* Background */}
      <div className="fixed inset-0 z-[-1] bg-background-dark">
        <img
          alt="Cinematic abstract dark motion background"
          className="video-bg opacity-40"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBO2v8F64_-7xhxRQszre23H058TQX_gtsZVLM9zu6r2EV6JzIwpU-pjvvwcdaKPEJj_VirySF9miklXRp0f1_Ku0wmvQxv8EQlsxOILQnMiUiWH9mk_veqoAPfnQjZ5E1YUA_FatfV8tuglj6SY2s8yD-XfQ_AXb0nuX8K_oVZP5VaDHLV-IvbS8gYY3Tad4xB5I1l-0gMEk5CAPeTcU9wXlyI3CGiSnkLdes-18SVAPemk4nnPCrG3c8f34Di517d8lrA4K4_bCk"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background-dark/30 to-background-dark/95"></div>
      </div>

      <main className="container mx-auto px-6 relative">
        <Hero />
        <AiCreationsCarousel />
        <Team />
        <TeamCarousels />
      </main>

      <Footer />
    </div>
  );
}
