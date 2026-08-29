import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.rosefashiondesigner.com'; // Apni live domain yahan daal do

  // Static pages jo aapke website par hain
  const staticPages = [
    '',
    '/shop',
    '/custom-design',
    '/about-us',
    '/why-us',
    '/track-order',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  // Agar aapke paas database se dynamic products fetch karke sitemap me dalne hain, 
  // toh aap yahan products fetch karke unhe bhi map kar sakte hain:
  // const products = await fetchProductsFromDB();
  // const productPages = products.map((product) => ({
  //   url: `${baseUrl}/shop/${product.slug}`,
  //   lastModified: new Date(),
  //   changeFrequency: 'weekly' as const,
  //   priority: 0.6,
  // }));

  return [
    ...staticPages,
    // ...productPages
  ];
}