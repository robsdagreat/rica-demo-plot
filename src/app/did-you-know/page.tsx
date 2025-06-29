'use client';
import React, { useEffect, useState } from 'react';
import { RefreshCw, Leaf, Droplets, Bug, Recycle } from 'lucide-react';
import Image from 'next/image';
import Nav from '@/components/Nav';

const apiEndpoints = [
  {
    name: 'Quotable',
    url: 'https://api.quotable.io/random?tags=science,wisdom',
    transform: (data:any) => `"${data.content}" - ${data.author}`
  },
  {
    name: 'ZenQuotes',
    url: 'https://zenquotes.io/api/random',
    transform: (data:any) => `"${data[0].q}" - ${data[0].a}`
  }
];

const staticFacts = [
  {
    image: '/carbon sequence.png',
    title: 'Soil as a Carbon Sink',
    text: 'Conservation agriculture practices can help sequester carbon in the soil, turning farms into valuable carbon sinks that mitigate climate change. No-till farming, for instance, can sequester 0.5 to 1 tonne of CO2 per hectare per year.',
  },
  {
    image: '/worm.png',
    title: 'The Power of Earthworms',
    text: 'A healthy earthworm population is a sign of healthy soil. These "ecosystem engineers" improve soil structure, water infiltration, and nutrient cycling. A single square meter of healthy soil can contain over 50 earthworms!',
  },
  {
    image: '/mulching.jpg',
    title: 'Saving Water with Mulch',
    text: 'Covering the soil with crop residue (mulch) can reduce water evaporation by up to 75%. This keeps the soil cooler and moister, making more water available for crops, which is crucial in dry climates.',
  },
  {
    image: '/intercropping.png',
    title: 'Intercropping for Pest Control',
    text: 'Planting different crops together (intercropping) can naturally confuse and deter pests, reducing the need for chemical pesticides. For example, planting marigolds alongside tomatoes can repel nematodes.',
  },
];

const fallbackApiFacts = [
  "Agriculture supports over 60% of Africa's workforce and contributes significantly to economic development.",
  "Crop rotation can increase yields by 10-25% compared to continuous monoculture farming.",
  "Cover crops can prevent up to 95% of soil erosion while improving soil fertility.",
  "Integrated pest management can reduce pesticide use by 50% while maintaining crop yields.",
  "Precision agriculture technologies can reduce water usage by up to 30% in irrigated crops.",
  "Composting agricultural waste can reduce methane emissions by 50% compared to conventional disposal.",
  "Agroforestry systems can increase biodiversity by 30% compared to conventional farming.",
  "No-till farming can reduce fuel consumption by 50% compared to conventional tillage.",
];

function EcoQuiz() {
  const [product, setProduct] = useState<any>(null);
  const [guess, setGuess] = useState<'yes' | 'no' | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProduct = async () => {
    setLoading(true);
    setGuess(null);
    setResult(null);
    
    try {
      // Use Open Food Facts API directly (free, no API key needed)
      const response = await fetch('https://world.openfoodfacts.org/api/v0/product/random.json');
      
      if (!response.ok) {
        throw new Error('API failed');
      }
      
      const data = await response.json();
      
      if (data.product) {
        const product = {
          name: data.product.product_name || 'Unknown Product',
          image: data.product.image_url || 'https://via.placeholder.com/200x200?text=No+Image',
          ecoscore: data.product.ecoscore_grade || 'unknown'
        };
        setProduct(product);
      } else {
        throw new Error('No product data');
      }
    } catch (error) {
      // Fallback to mock data if API fails
      const mockProducts = [
        {
          name: 'Organic Bananas',
          image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=200&h=200&fit=crop',
          ecoscore: 'a'
        },
        {
          name: 'Plastic Water Bottle',
          image: 'https://images.unsplash.com/photo-1563227812-0ea4c22e6cc8?w=200&h=200&fit=crop',
          ecoscore: 'd'
        },
        {
          name: 'Local Honey',
          image: 'https://images.unsplash.com/photo-1587049633312-d628ae50a8ae?w=200&h=200&fit=crop',
          ecoscore: 'b'
        },
        {
          name: 'Processed Snacks',
          image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=200&h=200&fit=crop',
          ecoscore: 'e'
        }
      ];
      
      const randomProduct = mockProducts[Math.floor(Math.random() * mockProducts.length)];
      setProduct(randomProduct);
      setResult("⚠️ Using sample data - API temporarily unavailable");
    } finally {
      setLoading(false);
    }
  };

  const handleGuess = (choice: 'yes' | 'no') => {
    if (!product) return;
    setGuess(choice);
    const isEco = ['a', 'b'].includes(product.ecoscore?.toLowerCase());
    const correct = (choice === 'yes' && isEco) || (choice === 'no' && !isEco);
    setResult(correct ? "✅ You're right!" : "❌ Not quite. Try again.");
  };

  return (
    <div>
      {loading && <p className="text-center text-gray-500">Loading product...</p>}
      {!loading && product && (
        <>
          <div className="text-center">
            <img src={product.image} alt={product.name} className="mx-auto rounded h-48 object-contain mb-4" />
            <h3 className="text-xl font-semibold text-green-800">{product.name}</h3>
            <p className="text-gray-600 my-2">Do you think this product is environmentally friendly?</p>

            {!guess ? (
              <div className="flex justify-center gap-4 my-4">
                <button onClick={() => handleGuess('yes')} className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
                  ✅ Yes
                </button>
                <button onClick={() => handleGuess('no')} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
                  ❌ No
                </button>
              </div>
            ) : (
              <>
                <p className={`text-lg font-bold ${result?.includes('✅') ? 'text-green-700' : 'text-red-700'}`}>{result}</p>
                <p className="text-sm mt-1 text-gray-600">
                  Eco Score: <strong>{product.ecoscore?.toUpperCase()}</strong> (A = best, E = worst)
                </p>
                <button
                  onClick={fetchProduct}
                  className="mt-4 px-4 py-2 border border-green-600 text-green-700 rounded hover:bg-green-100"
                >
                  🔄 Try Another
                </button>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}

const fetchRandomFact = async () => {
  const [apiFact, setApiFact] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<any>(null);
  const [error, setError] = useState<any>(null);
  setIsLoading(true);
  setError(null);
  
  // Try multiple free APIs first
  for (const endpoint of apiEndpoints) {
    try {
      const response = await fetch(endpoint.url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      });
      
      if (response.ok) {
        const data = await response.json();
        const transformedFact = endpoint.transform(data);
        setApiFact(`${transformedFact} (via ${endpoint.name})`);
        setIsLoading(false);
        return;
      }
    } catch (err) {
      console.log(`${endpoint.name} API failed:`, err);
      continue;
    }
  }
  
  // If all external APIs fail, use fallback facts
  const randomFact = fallbackApiFacts[Math.floor(Math.random() * fallbackApiFacts.length)];
  setApiFact(randomFact);
  setError('Using curated agriculture facts - External APIs temporarily unavailable');
  setIsLoading(false);
};


export default function DidYouKnowPage() {
  const [apiFact, setApiFact] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRandomFact = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API call - replace with actual endpoint when available
      const response = await fetch('/api/agri-facts');
      
      if (!response.ok) {
        throw new Error('API endpoint not available');
      }
      
      const data = await response.json();
      
      if (data.fact) {
        setApiFact(data.fact);
      } else {
        throw new Error('No fact returned');
      }
    } catch (err) {
      // Use fallback facts when API is not available
      const randomFact = fallbackApiFacts[Math.floor(Math.random() * fallbackApiFacts.length)];
      setApiFact(randomFact);
      setError('Using offline facts - API temporarily unavailable');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRandomFact();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Nav />
     

      <main className="p-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Did You Know?</h1>
            <p className="text-gray-600 text-lg">
              Discover fascinating facts about Conservation Agriculture and soil health
            </p>
          </div>

          <div className="space-y-6">
            {staticFacts.map((fact, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg flex flex-col md:flex-row items-center md:items-start gap-6 p-6 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.12}s` }}
              >
                <div className="w-full md:w-40 h-40 relative flex-shrink-0">
                  <Image src={fact.image} alt={fact.title} fill className="object-cover object-center rounded-xl" />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-green-700 mb-2">{fact.title}</h2>
                  <p className="text-gray-700 text-base">{fact.text}</p>
                </div>
              </div>
            ))}

            {/* Dynamic API fact card */}
            <div className="bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-200 rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                    <Leaf className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-xl font-bold text-green-700">Random Agriculture Fact</h2>
                </div>
                <button
                  onClick={fetchRandomFact}
                  disabled={isLoading}
                  className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
                  {isLoading ? 'Loading...' : 'New Fact'}
                </button>
              </div>
              
              {error && (
                <div className="mb-3 p-2 bg-yellow-100 border border-yellow-300 rounded text-yellow-700 text-sm">
                  ⚠️ {error}
                </div>
              )}
              
              <div className="bg-white rounded-lg p-4 border border-green-200">
                {isLoading ? (
                  <div className="flex items-center gap-3 text-gray-500">
                    <div className="w-4 h-4 border-2 border-green-500 border-t-transparent rounded-full animate-spin"></div>
                    Loading new fact...
                  </div>
                ) : (
                  <p className="text-gray-800 leading-relaxed">
                    🌾 {apiFact || "Click 'New Fact' to discover something interesting!"}
                  </p>
                )}
              </div>
      
            </div>
                     {/* Eco Score Quiz Section */}
      {/* <div className="mt-12 bg-white rounded-2xl shadow-lg p-6 max-w-2xl mx-auto border border-lime-300">
        <h2 className="text-2xl font-bold text-lime-700 text-center mb-4">🌍 Eco-Score Quiz</h2>

        <EcoQuiz />
      </div> */}
          </div>
        </div>
      </main>

     

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}