'use client';
import Nav from '@/components/Nav';
import Link from 'next/link';
import plotData from '@/../public/data/plot_data.json';
import { useState, useEffect } from 'react';
import Image from 'next/image';

function FeatureCard({ emoji, title, link }: { emoji: string; title: string; link: string }) {
  return (
    <Link href={link}>
      <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition flex flex-col items-center cursor-pointer border border-gray-100 hover:border-green-300">
        <div className="text-4xl mb-2">{emoji}</div>
        <h2 className="text-lg font-semibold text-green-700">{title}</h2>
      </div>
    </Link>
  );
}

export default function Home() {
  const plotNames = plotData[0].plots.map(p => p.name);

  // Slideshow data
  const slides = [
    {
      image: '/hero.jpg',
      headline: 'Conservation Agriculture Demonstration Area at RICA',
      subtext: 'A digital window into our demonstration plot, offering real-time seasonal data, crop updates, and soil health metrics.'
    },
    {
      image: '/hero2.jpg',
      headline: 'Comparing Agricultural Practices',
      subtext: 'Explore the benefits of Conservation Agriculture (CA) vs. Conventional Tillage (CT) in real field conditions.'
    },
    {
      image: '/hero3.jpg',
      headline: 'Soil Health & Erosion Control',
      subtext: 'Our plots focus on improving soil health, reducing erosion, and achieving sustainable yields.'
    },
    {
      image: '/hero4.jpg',
      headline: 'Innovation in Farming',
      subtext: 'From crop rotation to intercropping and anti-erosion barriers, see how innovation shapes the future of farming at RICA.'
    },
  ];
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    const timer = setTimeout(() => setCurrent((current + 1) % slides.length), 6000);
    return () => clearTimeout(timer);
  }, [current]);
  const goTo = (idx: number) => setCurrent(idx);
  const prev = () => setCurrent((current - 1 + slides.length) % slides.length);
  const next = () => setCurrent((current + 1) % slides.length);

  return (
    <>
      <Nav />
      <main className="bg-gray-50 min-h-screen font-sans">
        {/* Hero Section */}
        <section className="relative h-[420px] md:h-[520px] flex items-center justify-center mb-16 overflow-hidden">
          <img src={slides[current].image} alt="Farming Hero" className="absolute inset-0 w-full h-full object-cover object-center z-0 transition-all duration-700" />
          <div className="absolute inset-0 bg-black/60 z-10" />
          <div className="relative z-20 text-center max-w-2xl mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 drop-shadow-lg transition-all duration-700">
              {slides[current].headline}
            </h1>
            <p className="text-white/90 max-w-xl mx-auto text-lg md:text-xl mb-6 drop-shadow transition-all duration-700">
              {slides[current].subtext}
            </p>
          </div>
          {/* Slide Controls */}
          <button onClick={prev} className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-black/40 hover:bg-green-600 text-white rounded-full p-2 transition shadow-lg"><span className="sr-only">Previous</span><svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" /></svg></button>
          <button onClick={next} className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-black/40 hover:bg-green-600 text-white rounded-full p-2 transition shadow-lg"><span className="sr-only">Next</span><svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" /></svg></button>
          {/* Dots */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-30">
            {slides.map((_, idx) => (
              <button key={idx} onClick={() => goTo(idx)} className={`w-3 h-3 rounded-full border-2 ${idx === current ? 'bg-green-500 border-white' : 'bg-white/60 border-white/80'} transition`} aria-label={`Go to slide ${idx + 1}`}></button>
            ))}
          </div>
        </section>
        {/* About Section */}
        <section className="max-w-6xl mx-auto my-16 px-2">
          <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row animate-fade-in-up w-full min-h-[320px]">
            <div className="md:w-1/2 w-full h-56 md:h-auto relative min-h-[220px]">
              <Image src="/hero2.jpg" alt="History & Purpose" fill className="object-cover object-center w-full h-full" />
            </div>
            <div className="p-10 flex-1 flex flex-col justify-center">
              <h3 className="text-2xl font-bold text-green-800 mb-2">History & Purpose</h3>
              <p className="mb-4 text-gray-700">Established in 2024, the demonstration plot at the Rwanda Institute for Conservation Agriculture (RICA) serves as a key learning site. It was designed to showcase the impact of Conservation Agriculture (CA) practices compared to conventional farming methods, focusing on soil health, erosion and run-off control, and sustainable yields.</p>
              <h4 className="text-lg font-semibold text-green-700 mb-1">Plot Details</h4>
              <ul className="list-disc list-inside space-y-1 text-gray-700 text-base">
                <li><strong>Total Area:</strong> 1,060 m²</li>
                <li><strong>Number of Plots:</strong> {plotNames.length}</li>
                <li><strong>Average Slope:</strong> 2%</li>
                <li><strong>Paved Area:</strong> 20 m²</li>
                <li><strong>Established:</strong> September 2024</li>
              </ul>
            </div>
          </div>
        </section>
        {/* Experimental Plots Cards */}
        <section className="max-w-6xl mx-auto mb-16 px-2">
          <h3 className="text-2xl font-bold text-green-800 mb-4">Experimental Plots</h3>
          <div className="flex gap-6 overflow-x-auto pb-2 animate-slide-in-x">
            {plotData[0].plots.map((plot, idx) => {
              let img = "/hero3.jpg";
              if (plot.name === "CT-Intercropping") img = "/CT-Intercropping.webp";
              if (plot.name === "CA-Rotation") img = "/CA-rop rotation.webp";
              if (plot.name === "CA-Intercropping") img = "/Intercropping.jpg";
              if (plot.name === "CA-Rotation-AntiErosion") img = "/CA-rotation-strip.webp";
              return (
                <div key={plot.name} className="relative min-w-[260px] max-w-xs h-64 rounded-2xl shadow-lg overflow-hidden group transform transition duration-300 hover:scale-105" style={{ animationDelay: `${idx * 0.12}s` }}>
                  <Image src={img} alt={plot.name} fill className="object-cover object-center w-full h-full group-hover:brightness-75 transition" />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
                    <h4 className="text-lg font-bold text-white mb-1 drop-shadow">{plot.name}</h4>
                    <p className="text-white text-sm drop-shadow">{plot.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
        {/* Video Section */}
        <section className="max-w-5xl mx-auto my-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-green-700 mb-6">See the Plot in Action</h2>
          <div className="aspect-video bg-black rounded-xl shadow-lg overflow-hidden">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </section>
        {/* Feature Cards */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto my-16">
          <FeatureCard emoji="📊" title="Dashboard" link="/dashboard" />
          <FeatureCard emoji="🌽" title="Crop Calendar" link="/calendar" />
          <FeatureCard emoji="🖼️" title="Photo Gallery" link="/gallery" />
          <FeatureCard emoji="📥" title="PDF Downloads" link="/downloads" />
          <FeatureCard emoji="💡" title="Did You Know?" link="/did-you-know" />
          <FeatureCard emoji="💬" title="Leave Feedback" link="/feedback" />
        </section>
      </main>
    </>
  );
}