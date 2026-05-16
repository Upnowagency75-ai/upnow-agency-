import SmoothScroll   from "@/components/SmoothScroll";
import Navbar         from "@/components/Navbar";
import Hero           from "@/components/Hero";
import KpiStrip       from "@/components/KpiStrip";
import Services       from "@/components/Services";
import SocialMedia    from "@/components/SocialMedia";
import Pricing        from "@/components/Pricing";
import PhysicalMarketing from "@/components/PhysicalMarketing";
import Evenement      from "@/components/Evenement";
import CTA            from "@/components/CTA";
import Footer         from "@/components/Footer";

export default function Home() {
  return (
    <SmoothScroll>
      <main style={{ background: "#000", color: "#f5f5f7" }}>
        <Navbar />
        <Hero />
        <div className="glow-line" />
        <KpiStrip />
        <div className="glow-line" />
        <Services />
        <div className="glow-line" />
        <SocialMedia />
        <div className="glow-line" />
        <Pricing />
        <div className="glow-line" />
        <PhysicalMarketing />
        <div className="glow-line" />
        <Evenement />
        <div className="glow-line" />
        <CTA />
        <Footer />
      </main>
    </SmoothScroll>
  );
}
