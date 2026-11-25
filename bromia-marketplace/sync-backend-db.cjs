const http = require('http');
const fs = require('fs');

function request(options, body) {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, data: data ? JSON.parse(data) : null });
        } catch {
          resolve({ status: res.statusCode, data });
        }
      });
    });
    req.on('error', reject);
    if (body) {
      req.write(JSON.stringify(body));
    }
    req.end();
  });
}

async function run() {
  console.log('Connecting to backend API...');
  
  // 1. Update Store Config
  await request({
    hostname: 'localhost',
    port: 8080,
    path: '/api/v1/config',
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' }
  }, {
    storeName: 'Bromia',
    whatsappNumber: '573219879552',
    heroTitle: 'La magia de la Navidad se comparte con Bromia 🎄',
    heroSubtitle: 'Hecho con amor by Cata Puentes • Brookies melcochudos, chocobombas, corazones de mousse y mini donas gourmet.',
    promoBannerText: '✨ Pedidos frescos con mínimo 1 día de anticipación • Envíos en Bogotá ($10.000) • WhatsApp 321 987 9552 ✨',
    instagramHandle: '@bromiaoficial',
    city: 'Bogotá, Colombia'
  });
  console.log('Store config updated!');

  // 2. Fetch existing categories
  const catRes = await request({ hostname: 'localhost', port: 8080, path: '/api/v1/categories', method: 'GET' });
  const existingCats = Array.isArray(catRes.data) ? catRes.data : [];
  console.log('Existing categories:', existingCats.length);

  const desiredCats = [
    { name: '🎄 Colección Navidad', slug: 'coleccion-navidad', subtitle: 'Edición especial para compartir y regalar', coverImageUrl: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=400&q=80', displayOrder: 0 },
    { name: 'Mundo Brookies', slug: 'brookies', subtitle: 'Brownie melcochudo y galleta artesanal', coverImageUrl: '/products/brookie-chocolate.png', displayOrder: 1 },
    { name: 'Mundo Cheesecakes', slug: 'cheesecakes', subtitle: 'Tu cheesecake a tu manera', coverImageUrl: '/products/AREQUIPE.png', displayOrder: 2 },
    { name: 'Mundo Chocobombas', slug: 'chocobombas', subtitle: 'Para tardes frías y leche caliente', coverImageUrl: '/products/chocobomb-milo.png', displayOrder: 3 },
    { name: 'Mundo Corazones', slug: 'corazones', subtitle: 'Corazones geométricos rellenos de trufa', coverImageUrl: '/products/corazon-nutella.png', displayOrder: 4 },
    { name: 'Mundo Mini Donas', slug: 'mini-donas', subtitle: 'Mini donas gourmet rellenas con toppings', coverImageUrl: '/products/mini-glam-oblea.png', displayOrder: 5 }
  ];

  const catMap = new Map();

  for (const des of desiredCats) {
    const found = existingCats.find(c => c.slug === des.slug || c.name.toLowerCase().includes(des.slug));
    if (found) {
      await request({
        hostname: 'localhost',
        port: 8080,
        path: `/api/v1/categories/${found.id}`,
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' }
      }, des);
      catMap.set(des.slug, found.id);
      console.log(`Updated category ${des.name} (ID: ${found.id})`);
    } else {
      const created = await request({
        hostname: 'localhost',
        port: 8080,
        path: '/api/v1/categories',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      }, des);
      let id = created.data?.id;
      if (!id) {
        const refresh = await request({ hostname: 'localhost', port: 8080, path: '/api/v1/categories', method: 'GET' });
        const match = refresh.data.find(c => c.name.includes(des.name) || c.slug === des.slug);
        id = match?.id;
      }
      catMap.set(des.slug, id);
      console.log(`Category ${des.name} (ID: ${id})`);
    }
  }

  // 3. Fetch existing products
  const prodRes = await request({ hostname: 'localhost', port: 8080, path: '/api/v1/products?includeInactive=true', method: 'GET' });
  const existingProds = Array.isArray(prodRes.data) ? prodRes.data : [];
  console.log('Existing products in DB:', existingProds.length);

  // Read desired products from frontend store
  const fileContent = fs.readFileSync('bromia-marketplace/frontend/src/stores/useCatalogStore.js', 'utf8');
  const prodsMatch = fileContent.match(/const SEED_PRODUCTS = (\[[\s\S]*?\])\r?\n\r?\nexport const useCatalogStore/);
  const productsToSync = JSON.parse(prodsMatch[1]);
  console.log('Products to sync:', productsToSync.length);

  for (const p of productsToSync) {
    const catId = catMap.get(p.categorySlug);
    const payload = {
      name: p.name,
      description: p.description,
      tagline: p.tagline,
      price: p.price,
      compareAtPrice: p.compareAtPrice,
      imageUrl: p.imageUrl,
      badge: p.badge || 'NINGUNO',
      active: p.active !== false,
      featured: p.featured === true,
      stock: p.stock || 20,
      flavorsAvailable: p.flavorsAvailable || '',
      categoryId: catId
    };

    const existing = existingProds.find(ep => ep.name.toLowerCase().trim() === p.name.toLowerCase().trim());
    if (existing) {
      await request({
        hostname: 'localhost',
        port: 8080,
        path: `/api/v1/products/${existing.id}`,
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' }
      }, payload);
      console.log(`Updated product: ${p.name}`);
    } else {
      await request({
        hostname: 'localhost',
        port: 8080,
        path: '/api/v1/products',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      }, payload);
      console.log(`Created product: ${p.name}`);
    }
  }

  console.log('Backend database synchronization finished!');
}

run().catch(console.error);
