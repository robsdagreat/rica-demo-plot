import { NextResponse } from 'next/server';

const keywords = [
  'soil', 'crop', 'farm', 'agriculture', 'plant', 'harvest', 'irrigation', 'pest', 'yield', 'organic', 'mulch', 'rotation', 'tillage', 'conservation', 'earthworm', 'biodiversity', 'sustainable', 'fertilizer', 'compost', 'livestock', 'drought', 'rain', 'maize', 'beans', 'wheat', 'rice', 'corn', 'barley', 'sorghum', 'legume', 'cover crop', 'erosion'
];

function isAgriFact(fact: string) {
  const lower = fact.toLowerCase();
  return keywords.some(word => lower.includes(word));
}

const fallbackFacts = [
  "Crop rotation can increase yields by 10-25% compared to continuous monoculture farming.",
  "Cover crops can prevent up to 95% of soil erosion while improving soil fertility.",
  "No-till farming can reduce fuel consumption by 50% compared to conventional tillage.",
  "Agroforestry systems can increase biodiversity by 30% compared to conventional farming.",
  "Precision agriculture technologies can reduce water usage by up to 30% in irrigated crops.",
  "Composting agricultural waste can reduce methane emissions by 50% compared to conventional disposal.",
  "Integrated pest management can reduce pesticide use by 50% while maintaining crop yields.",
  "Organic farming can increase soil organic matter by 20% over 5 years compared to conventional farming.",
  "Earthworms are known as ecosystem engineers and can improve soil structure and fertility.",
  "Mulching can reduce water evaporation from soil by up to 75%."
];

export async function GET() {
  // Try Quotable API
  try {
    const res = await fetch('https://api.quotable.io/random?tags=science,wisdom');
    if (res.ok) {
      const data = await res.json();
      return NextResponse.json({ fact: `"${data.content}" — ${data.author}` });
    }
  } catch {}

  // Try ZenQuotes API
  try {
    const res = await fetch('https://zenquotes.io/api/random');
    if (res.ok) {
      const data = await res.json();
      return NextResponse.json({ fact: `"${data[0].q}" — ${data[0].a}` });
    }
  } catch {}

  // Fallback to your own facts
  const randomFact = fallbackFacts[Math.floor(Math.random() * fallbackFacts.length)];
  return NextResponse.json({ fact: randomFact });
}