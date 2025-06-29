"use client";
import React, { useState } from 'react';
import Nav from '@/components/Nav';

const images = [
  { src: '/hero.jpg', caption: 'Hero image 1', alt: 'Hero 1' },
  { src: '/hero2.jpg', caption: 'Hero image 2', alt: 'Hero 2' },
  { src: '/hero3.jpg', caption: 'Hero image 3', alt: 'Hero 3' },
  { src: '/hero4.jpg', caption: 'Hero image 4', alt: 'Hero 4' },
  { src: '/intercropping.png', caption: 'Intercropping', alt: 'Intercropping' },
  { src: '/mulching.jpg', caption: 'Mulching', alt: 'Mulching' },
  { src: '/water retention.png', caption: 'Water retention', alt: 'Water retention' },
  { src: '/worm.png', caption: 'Worm', alt: 'Worm' },
  { src: '/carbon sequence.png', caption: 'Carbon sequence', alt: 'Carbon sequence' },
  { src: '/CA-rotation-strip.webp', caption: 'CA rotation strip', alt: 'CA rotation strip' },
  { src: '/CA-rop rotation.webp', caption: 'CA rop rotation', alt: 'CA rop rotation' },
];

export default function GalleryPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openModal = (idx: number) => {
    setCurrentIndex(idx);
    setModalOpen(true);
  };
  const closeModal = () => setModalOpen(false);
  const showPrev = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };
  const showNext = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <>
      <Nav />
      <main className="pt-28 bg-gray-50 min-h-screen font-sans">
        <section className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold text-green-800 mb-4 text-center drop-shadow-lg">Photo & Video Gallery</h1>
          <p className="text-gray-600 mb-10 text-center text-lg">A visual journey through our seasons, showcasing our methods and results.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {images.map((image, index) => (
              <button
                key={index}
                className="bg-white rounded-2xl shadow-lg overflow-hidden group transition-transform hover:scale-105 focus:outline-none"
                onClick={() => openModal(index)}
                aria-label={`View ${image.caption}`}
              >
                <div className="relative">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-60 object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all" />
                </div>
                <div className="p-5">
                  <p className="text-base text-gray-700 text-center">{image.caption}</p>
                </div>
              </button>
            ))}
          </div>
        </section>
        {/* Modal for image display */}
        {modalOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm transition-all"
            onClick={closeModal}
          >
            <div className="relative max-w-3xl w-full mx-4 bg-white rounded-2xl shadow-2xl p-6 flex flex-col items-center" onClick={e => e.stopPropagation()}>
              <img
                src={images[currentIndex].src}
                alt={images[currentIndex].alt}
                className="max-h-[60vh] w-auto rounded-lg mb-4 shadow-lg"
              />
              <p className="text-lg text-gray-800 mb-4 text-center">{images[currentIndex].caption}</p>
              <div className="flex justify-between w-full">
                <button
                  onClick={showPrev}
                  className="px-4 py-2 bg-green-600 text-white rounded-full shadow hover:bg-green-700 transition"
                  aria-label="Previous image"
                >
                  &larr; Prev
                </button>
                <button
                  onClick={showNext}
                  className="px-4 py-2 bg-green-600 text-white rounded-full shadow hover:bg-green-700 transition"
                  aria-label="Next image"
                >
                  Next &rarr;
                </button>
              </div>
              <button
                onClick={closeModal}
                className="absolute top-2 right-2 text-gray-500 hover:text-red-600 text-2xl font-bold"
                aria-label="Close modal"
              >
                &times;
              </button>
            </div>
          </div>
        )}
      </main>
    </>
  );
}
