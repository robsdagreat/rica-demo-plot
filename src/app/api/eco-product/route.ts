import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const res = await fetch('https://world.openfoodfacts.org/category/plant-based-foods/1.json');
    const data = await res.json();

    const products = data.products.filter((p: any) => p.ecoscore_grade && p.image_url && p.product_name);
    const product = products[Math.floor(Math.random() * products.length)];

    return NextResponse.json({
      name: product.product_name,
      image: product.image_url,
      ecoscore: product.ecoscore_grade, // A–E
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch product' }, { status: 500 });
  }
}
