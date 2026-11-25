import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { productApi } from '@/services/productService'

const LOCAL_PRODUCTS_KEY = 'bromia_products_fallback_v1'

const SEED_CATEGORIES = [
  {
    "id": 33,
    "name": "🎄 Colección Navidad",
    "slug": "coleccion-navidad",
    "subtitle": "Edición especial para compartir y regalar",
    "coverImageUrl": "/products/caja-corazones.png",
    "displayOrder": 0
  },
  {
    "id": 1,
    "name": "Mundo Brookies",
    "slug": "brookies",
    "subtitle": "Brownie melcochudo y galleta artesanal",
    "coverImageUrl": "/products/caja-brookies.png",
    "displayOrder": 1
  },
  {
    "id": 2,
    "name": "Mundo Cheesecakes",
    "slug": "cheesecakes",
    "subtitle": "Tu cheesecake a tu manera",
    "coverImageUrl": "/products/AREQUIPE.png",
    "displayOrder": 2
  },
  {
    "id": 3,
    "name": "Mundo Chocobombas",
    "slug": "chocobombas",
    "subtitle": "Para tardes frías y leche caliente",
    "coverImageUrl": "/products/chocobomb-oreo.png",
    "displayOrder": 3
  },
  {
    "id": 4,
    "name": "Mundo Corazones",
    "slug": "corazones",
    "subtitle": "Corazones geométricos rellenos de trufa",
    "coverImageUrl": "/products/corazon-nutella.png",
    "displayOrder": 4
  },
  {
    "id": 5,
    "name": "Mundo Mini Donas",
    "slug": "mini-donas",
    "subtitle": "Mini donas gourmet rellenas con toppings",
    "coverImageUrl": "/products/caja-party-mini-donas.png",
    "displayOrder": 5
  }
]

const SEED_PRODUCTS = [
  {
    "id": 33,
    "name": "Caja Navideña x4 Brookies Festivos",
    "tagline": "¡El regalo perfecto para tus Novenas! 🎄",
    "description": "Caja de regalo navideña con 4 brookies artesanales con toppings festivos: 2 de Nutella con chispas doradas, 1 Red Velvet con frosting nevado y 1 de Canela Especiada.",
    "price": 34000,
    "compareAtPrice": 38000,
    "imageUrl": "https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?auto=format&fit=crop&w=800&q=80",
    "badge": "TEMPORADA",
    "active": true,
    "featured": true,
    "stock": 25,
    "flavorsAvailable": "Surtida Navideña, Solo Nutella Dorada",
    "categoryId": 33,
    "categoryName": "🎄 Colección Navidad",
    "categorySlug": "coleccion-navidad"
  },
  {
    "id": 34,
    "name": "Chocobomba Navideña Muñeco de Nieve",
    "tagline": "Para tardes frías y noches de novena ☕",
    "description": "Esfera artesanal de chocolate belga rellena de cocoa especial, mini malvaviscos y chispas de nieve. ¡Solo sumérgela en leche caliente para disfrutar en familia!",
    "price": 14000,
    "compareAtPrice": null,
    "imageUrl": "https://images.unsplash.com/photo-1548907040-4baa42d10919?auto=format&fit=crop&w=800&q=80",
    "badge": "TEMPORADA",
    "active": true,
    "featured": true,
    "stock": 35,
    "flavorsAvailable": "Chocolate Blanco Nieve, Chocolate Oscuro Especiado",
    "categoryId": 33,
    "categoryName": "🎄 Colección Navidad",
    "categorySlug": "coleccion-navidad"
  },
  {
    "id": 35,
    "name": "Cheesecake Festivo Frutos del Bosque & Ciruela",
    "tagline": "El postre estrella para tu cena de Navidad ✨",
    "description": "Cheesecake frío con reducción artesanal de moras, arándanos y ciruelas maceradas al toque de canela navideña sobre base crocante de galleta y almendras.",
    "price": 54000,
    "compareAtPrice": 59000,
    "imageUrl": "https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=800&q=80",
    "badge": "TEMPORADA",
    "active": true,
    "featured": true,
    "stock": 15,
    "flavorsAvailable": "6 Porciones, 10 Porciones",
    "categoryId": 33,
    "categoryName": "🎄 Colección Navidad",
    "categorySlug": "coleccion-navidad"
  },
  {
    "id": 36,
    "name": "Cajita x9 Trufas Navideñas Doradas",
    "tagline": "El detalle más dulce de fin de año 🎁",
    "description": "Caja de regalo con 9 trufitas artesanales: coco nevado, chocolate semiamargo con destellos dorados y praliné de almendras tostadas con lazo navideño.",
    "price": 30000,
    "compareAtPrice": null,
    "imageUrl": "https://images.unsplash.com/photo-1549007994-cb92caebd54b?auto=format&fit=crop&w=800&q=80",
    "badge": "TEMPORADA",
    "active": true,
    "featured": true,
    "stock": 20,
    "flavorsAvailable": "Surtida Festiva, Solo Chocolate Negro",
    "categoryId": 33,
    "categoryName": "🎄 Colección Navidad",
    "categorySlug": "coleccion-navidad"
  },
  {
    "id": 1,
    "name": "Brookie Chocolate",
    "tagline": "Con crumble de galleta y Nutella o Arequipe",
    "description": "Brownie melcochudo con galleta de chips de chocolate, con capa de crumble de galleta y salsa de arequipe o Nutella.",
    "price": 15000,
    "compareAtPrice": null,
    "imageUrl": "/products/brookie-chocolate.png",
    "badge": "FAVORITO",
    "active": true,
    "featured": true,
    "stock": 30,
    "flavorsAvailable": "Salsa Nutella, Salsa Arequipe",
    "categoryId": 1,
    "categoryName": "Mundo Brookies",
    "categorySlug": "brookies"
  },
  {
    "id": 2,
    "name": "Brookie Red Velvet",
    "tagline": "Melcochudo con frosting de queso crema",
    "description": "Brownie melcochudo con galleta de chips de chocolate blanco, con capa de crumble de galleta y frosting de queso crema.",
    "price": 15000,
    "compareAtPrice": null,
    "imageUrl": "/products/brookie-red-velvet.png",
    "badge": "NEW",
    "active": true,
    "featured": true,
    "stock": 25,
    "flavorsAvailable": "Frosting Queso Crema",
    "categoryId": 1,
    "categoryName": "Mundo Brookies",
    "categorySlug": "brookies"
  },
  {
    "id": 3,
    "name": "Brookie Blonkie",
    "tagline": "Brownie rubio con crema de vainilla",
    "description": "Brownie rubio melcochudo con galleta de chips de chocolate blanco, con capa de crumble de galleta y crema de vainilla.",
    "price": 15000,
    "compareAtPrice": null,
    "imageUrl": "/products/brookie-blonkie.png",
    "badge": "FAVORITO",
    "active": true,
    "featured": false,
    "stock": 20,
    "flavorsAvailable": "Crema de Vainilla",
    "categoryId": 1,
    "categoryName": "Mundo Brookies",
    "categorySlug": "brookies"
  },
  {
    "id": 4,
    "name": "Caja x3 Brookies",
    "tagline": "Elige tus 3 sabores favoritos",
    "description": "Brownies melcochudos con galleta de chips y crumble de galleta, los puedes elegir de los sabores de tu preferencia.",
    "price": 42000,
    "compareAtPrice": 45000,
    "imageUrl": "/products/caja-brookies.png",
    "badge": "PERSONALIZABLE",
    "active": true,
    "featured": true,
    "stock": 20,
    "flavorsAvailable": "Surtida a Elección, 3 Chocolate & Nutella, 3 Red Velvet, 3 Blonkie",
    "categoryId": 1,
    "categoryName": "Mundo Brookies",
    "categorySlug": "brookies"
  },
  {
    "id": 5,
    "name": "Caja x4 Brookies",
    "tagline": "Caja de 4 unidades a elección",
    "description": "Brownies melcochudos con galleta de chips y crumble de galleta, los puedes elegir de los sabores de tu preferencia.",
    "price": 56000,
    "compareAtPrice": 60000,
    "imageUrl": "/products/caja-brookies.png",
    "badge": "FAVORITO",
    "active": true,
    "featured": true,
    "stock": 20,
    "flavorsAvailable": "Surtida a Elección, 4 Chocolate & Nutella, 2 Chocolate + 2 Red Velvet",
    "categoryId": 1,
    "categoryName": "Mundo Brookies",
    "categorySlug": "brookies"
  },
  {
    "id": 6,
    "name": "Tu Cheesecake... A Tu Manera",
    "tagline": "Creamos tu cheesecake personalizado",
    "description": "Creamos cheesecakes personalizados, hechos especialmente para cada ocasión. Tú eliges sabores, frutas y toppings, decoración y tamaño, nosotros lo hacemos realidad. *El valor depende de la cotización, del sabor y la cantidad deseada.",
    "price": 55000,
    "compareAtPrice": null,
    "imageUrl": "/products/AREQUIPE.png",
    "badge": "PERSONALIZABLE",
    "active": true,
    "featured": true,
    "stock": 15,
    "flavorsAvailable": "Cremoso Maracuyá & Arequipe, Frutos Rojos, Oreo & Nutella, Cotización Especial",
    "categoryId": 2,
    "categoryName": "Mundo Cheesecakes",
    "categorySlug": "cheesecakes"
  },
  {
    "id": 7,
    "name": "Choco Bomb Individual",
    "tagline": "Rellena de Milo y masmelos",
    "description": "Cobertura de chocolate con relleno de Milo y masmelos. ¡Sumérgela en leche caliente!",
    "price": 8000,
    "compareAtPrice": null,
    "imageUrl": "/products/chocobomb-milo.png",
    "badge": "FAVORITO",
    "active": true,
    "featured": true,
    "stock": 40,
    "flavorsAvailable": "Milo & Masmelos",
    "categoryId": 3,
    "categoryName": "Mundo Chocobombas",
    "categorySlug": "chocobombas"
  },
  {
    "id": 8,
    "name": "Moka Bomb Individual",
    "tagline": "Chocolate blanco y oscuro con toque de café",
    "description": "Cobertura de chocolate blanco y oscuro con relleno de café, leche klim y masmelos.",
    "price": 10000,
    "compareAtPrice": null,
    "imageUrl": "/products/chocobomb-moka.png",
    "badge": "NEW",
    "active": true,
    "featured": false,
    "stock": 30,
    "flavorsAvailable": "Café, Leche Klim & Masmelos",
    "categoryId": 3,
    "categoryName": "Mundo Chocobombas",
    "categorySlug": "chocobombas"
  },
  {
    "id": 9,
    "name": "Choco Oreo Bomb",
    "tagline": "Cobertura de chocolate blanco y trozos de Oreo",
    "description": "Cobertura de chocolate blanco y trozos de galleta con relleno de galleta oreo, milo, leche klim y masmelos.",
    "price": 10000,
    "compareAtPrice": null,
    "imageUrl": "/products/chocobomb-oreo.png",
    "badge": "FAVORITO",
    "active": true,
    "featured": true,
    "stock": 30,
    "flavorsAvailable": "Oreo & Milo",
    "categoryId": 3,
    "categoryName": "Mundo Chocobombas",
    "categorySlug": "chocobombas"
  },
  {
    "id": 10,
    "name": "Berry Bomb Individual",
    "tagline": "Relleno de fresa instantánea y masmelos",
    "description": "Cobertura de chocolate blanco con relleno de fresa instantánea, leche klim y masmelos.",
    "price": 10000,
    "compareAtPrice": null,
    "imageUrl": "/products/chocobomb-berry.png",
    "badge": "NEW",
    "active": true,
    "featured": false,
    "stock": 30,
    "flavorsAvailable": "Fresa & Masmelos",
    "categoryId": 3,
    "categoryName": "Mundo Chocobombas",
    "categorySlug": "chocobombas"
  },
  {
    "id": 11,
    "name": "White Cream Bomb",
    "tagline": "Chocolate blanco con Milo y leche Klim",
    "description": "Cobertura de chocolate blanco con relleno de milo, leche klim y masmelos.",
    "price": 10000,
    "compareAtPrice": null,
    "imageUrl": "/products/chocobomb-white-cream.png",
    "badge": "NINGUNO",
    "active": true,
    "featured": false,
    "stock": 25,
    "flavorsAvailable": "White Cream Milo",
    "categoryId": 3,
    "categoryName": "Mundo Chocobombas",
    "categorySlug": "chocobombas"
  },
  {
    "id": 12,
    "name": "Chococheese Bomb (Con Salsa)",
    "tagline": "¡Incluye salsa para derretir!",
    "description": "Cobertura de chocolate a elección con relleno de Cheesecake de maracuyá o frutos rojos. ¡INCLUYE SALSA PARA DERRETIR!",
    "price": 15000,
    "compareAtPrice": null,
    "imageUrl": "/products/chococheese-bomb.png",
    "badge": "PERSONALIZABLE",
    "active": true,
    "featured": true,
    "stock": 25,
    "flavorsAvailable": "Cheesecake Maracuyá, Cheesecake Frutos Rojos",
    "categoryId": 3,
    "categoryName": "Mundo Chocobombas",
    "categorySlug": "chocobombas"
  },
  {
    "id": 13,
    "name": "Caja x4 Choco Bomb",
    "tagline": "4 chocobombas de chocolate y Milo",
    "description": "4 chocobombas con cobertura de chocolate y relleno de milo y masmelos en cajita para regalar.",
    "price": 28000,
    "compareAtPrice": 32000,
    "imageUrl": "/products/caja-chocobomb-x4.png",
    "badge": "FAVORITO",
    "active": true,
    "featured": true,
    "stock": 20,
    "flavorsAvailable": "4 Choco Bomb Milo",
    "categoryId": 3,
    "categoryName": "Mundo Chocobombas",
    "categorySlug": "chocobombas"
  },
  {
    "id": 14,
    "name": "Caja x4 Mixtas Chocobombas",
    "tagline": "4 chocobombas de sabores a elección",
    "description": "4 chocobombas de los sabores de tu preferencia: Choco Bomb, Moka, Oreo, Berry, White Cream.",
    "price": 35000,
    "compareAtPrice": 40000,
    "imageUrl": "/products/caja-chocobomb-x4-mixtas.png",
    "badge": "PERSONALIZABLE",
    "active": true,
    "featured": true,
    "stock": 20,
    "flavorsAvailable": "Surtida Especial, A Elección",
    "categoryId": 3,
    "categoryName": "Mundo Chocobombas",
    "categorySlug": "chocobombas"
  },
  {
    "id": 15,
    "name": "Caja x6 Choco Bomb",
    "tagline": "6 chocobombas de chocolate y Milo",
    "description": "6 chocobombas con cobertura de chocolate y relleno de milo y masmelos.",
    "price": 42000,
    "compareAtPrice": 48000,
    "imageUrl": "/products/caja-chocobomb-x6.png",
    "badge": "FAVORITO",
    "active": true,
    "featured": false,
    "stock": 15,
    "flavorsAvailable": "6 Choco Bomb Milo",
    "categoryId": 3,
    "categoryName": "Mundo Chocobombas",
    "categorySlug": "chocobombas"
  },
  {
    "id": 16,
    "name": "Caja x6 Mixtas Chocobombas",
    "tagline": "6 chocobombas de sabores a elección",
    "description": "6 chocobombas de los sabores de tu preferencia.",
    "price": 48000,
    "compareAtPrice": 55000,
    "imageUrl": "/products/caja-chocobomb-x6-mixtas.png",
    "badge": "PERSONALIZABLE",
    "active": true,
    "featured": true,
    "stock": 15,
    "flavorsAvailable": "Surtida Especial, A Elección",
    "categoryId": 3,
    "categoryName": "Mundo Chocobombas",
    "categorySlug": "chocobombas"
  },
  {
    "id": 17,
    "name": "Corazón Nutella",
    "tagline": "Relleno de trufa de Nutella",
    "description": "Corazón geométrico con cobertura de chocolate a elección y relleno de trufa de Nutella.",
    "price": 12000,
    "compareAtPrice": null,
    "imageUrl": "/products/corazon-nutella.png",
    "badge": "FAVORITO",
    "active": true,
    "featured": true,
    "stock": 25,
    "flavorsAvailable": "Chocolate Oscuro, Chocolate Blanco",
    "categoryId": 4,
    "categoryName": "Mundo Corazones",
    "categorySlug": "corazones"
  },
  {
    "id": 18,
    "name": "Corazón Leche Condensada",
    "tagline": "Relleno de trufa de leche condensada",
    "description": "Corazón con cobertura de chocolate a elección y relleno de trufa de leche condensada y chispitas.",
    "price": 12000,
    "compareAtPrice": null,
    "imageUrl": "/products/corazon-leche-condensada.png",
    "badge": "NEW",
    "active": true,
    "featured": false,
    "stock": 25,
    "flavorsAvailable": "Chocolate Blanco, Chocolate Oscuro",
    "categoryId": 4,
    "categoryName": "Mundo Corazones",
    "categorySlug": "corazones"
  },
  {
    "id": 19,
    "name": "Corazón Arequipe",
    "tagline": "Relleno de trufa de Arequipe",
    "description": "Corazón con cobertura de chocolate a elección y relleno de trufa de Arequipe y perlas blancas.",
    "price": 12000,
    "compareAtPrice": null,
    "imageUrl": "/products/corazon-arequipe.png",
    "badge": "FAVORITO",
    "active": true,
    "featured": true,
    "stock": 25,
    "flavorsAvailable": "Chocolate Rosado, Chocolate Blanco, Chocolate Oscuro",
    "categoryId": 4,
    "categoryName": "Mundo Corazones",
    "categorySlug": "corazones"
  },
  {
    "id": 20,
    "name": "Corazón Chocoalmendras",
    "tagline": "Trufa de cacao y almendras tostadas",
    "description": "Corazón con cobertura de chocolate a elección y relleno de trufa de cacao y almendras.",
    "price": 12000,
    "compareAtPrice": null,
    "imageUrl": "/products/corazon-chocoalmendras.png",
    "badge": "NEW",
    "active": true,
    "featured": false,
    "stock": 20,
    "flavorsAvailable": "Chocolate Oscuro con Almendras",
    "categoryId": 4,
    "categoryName": "Mundo Corazones",
    "categorySlug": "corazones"
  },
  {
    "id": 21,
    "name": "Corazón Cheesecake",
    "tagline": "Relleno de cheesecake cremoso",
    "description": "Corazón con cobertura de chocolate a elección, relleno de cheesecake de maracuyá o frutos rojos.",
    "price": 13000,
    "compareAtPrice": null,
    "imageUrl": "/products/corazon-cheesecake.png",
    "badge": "PERSONALIZABLE",
    "active": true,
    "featured": true,
    "stock": 25,
    "flavorsAvailable": "Cheesecake Maracuyá, Cheesecake Frutos Rojos",
    "categoryId": 4,
    "categoryName": "Mundo Corazones",
    "categorySlug": "corazones"
  },
  {
    "id": 22,
    "name": "Caja x4 Corazones",
    "tagline": "4 corazones con rellenos a elección",
    "description": "4 Corazones geométricos con cobertura de chocolate y rellenos a elección en caja de regalo.",
    "price": 44000,
    "compareAtPrice": 48000,
    "imageUrl": "/products/caja-corazones.png",
    "badge": "PERSONALIZABLE",
    "active": true,
    "featured": true,
    "stock": 20,
    "flavorsAvailable": "Surtida (Nutella, Arequipe, Leche Condensada, Almendras)",
    "categoryId": 4,
    "categoryName": "Mundo Corazones",
    "categorySlug": "corazones"
  },
  {
    "id": 23,
    "name": "Caja x6 Corazones",
    "tagline": "6 corazones con rellenos a elección",
    "description": "6 Corazones geométricos con cobertura de chocolate y rellenos a elección en caja de regalo.",
    "price": 63000,
    "compareAtPrice": 70000,
    "imageUrl": "/products/caja-corazones.png",
    "badge": "FAVORITO",
    "active": true,
    "featured": true,
    "stock": 15,
    "flavorsAvailable": "Surtida de 6 Sabores, A Elección",
    "categoryId": 4,
    "categoryName": "Mundo Corazones",
    "categorySlug": "corazones"
  },
  {
    "id": 24,
    "name": "Mini Glam Oblea",
    "tagline": "Arequipe, crema, queso y galleta",
    "description": "Mini dona rellena de: Arequipe, crema, queso y galleta. Cobertura arequipe y galleta de oblea.",
    "price": 4000,
    "compareAtPrice": null,
    "imageUrl": "/products/mini-glam-oblea.png",
    "badge": "FAVORITO",
    "active": true,
    "featured": true,
    "stock": 50,
    "flavorsAvailable": "Oblea Tradicional",
    "categoryId": 5,
    "categoryName": "Mundo Mini Donas",
    "categorySlug": "mini-donas"
  },
  {
    "id": 25,
    "name": "Mini Glam Merengón",
    "tagline": "Merengue, crema y fruta fresca",
    "description": "Mini dona rellena de: Trozos de merengue, crema y fruta (mango o fresa). Cobertura de arequipe y merengue.",
    "price": 4000,
    "compareAtPrice": null,
    "imageUrl": "/products/mini-glam-merengon.png",
    "badge": "NEW",
    "active": true,
    "featured": true,
    "stock": 40,
    "flavorsAvailable": "Fruta Fresa, Fruta Mango",
    "categoryId": 5,
    "categoryName": "Mundo Mini Donas",
    "categorySlug": "mini-donas"
  },
  {
    "id": 26,
    "name": "Mini Glam Oreo",
    "tagline": "Crema cookies & cream y galleta oreo",
    "description": "Mini dona rellena de: crema de cookies and cream. Cobertura de arequipe con galleta oreo triturada.",
    "price": 4000,
    "compareAtPrice": null,
    "imageUrl": "/products/mini-glam-oreo.png",
    "badge": "FAVORITO",
    "active": true,
    "featured": true,
    "stock": 45,
    "flavorsAvailable": "Cookies & Cream Oreo",
    "categoryId": 5,
    "categoryName": "Mundo Mini Donas",
    "categorySlug": "mini-donas"
  },
  {
    "id": 27,
    "name": "Mini Glam Barquillos",
    "tagline": "Nutella y barquillos crocantes",
    "description": "Mini dona rellena de: Nutella y barquillos. Cobertura de nutella o arequipe y más barquillos.",
    "price": 4000,
    "compareAtPrice": null,
    "imageUrl": "/products/mini-glam-barquillos.png",
    "badge": "FAVORITO",
    "active": true,
    "featured": false,
    "stock": 40,
    "flavorsAvailable": "Cobertura Nutella, Cobertura Arequipe",
    "categoryId": 5,
    "categoryName": "Mundo Mini Donas",
    "categorySlug": "mini-donas"
  },
  {
    "id": 28,
    "name": "Mini Glam de Cocada",
    "tagline": "Coco caramelizado con arequipe",
    "description": "Mini dona rellena de: coco con arequipe. Cobertura de coco, arequipe y coco rallado.",
    "price": 4000,
    "compareAtPrice": null,
    "imageUrl": "/products/mini-glam-cocada.png",
    "badge": "NEW",
    "active": true,
    "featured": false,
    "stock": 35,
    "flavorsAvailable": "Cocada Artesanal",
    "categoryId": 5,
    "categoryName": "Mundo Mini Donas",
    "categorySlug": "mini-donas"
  },
  {
    "id": 29,
    "name": "Mini Glam de Choco Maní",
    "tagline": "Nutella, maní y chips de chocolate blanco",
    "description": "Mini dona rellena de: Nutella y trozos de maní. Cobertura de maní, nutella y chips de chocolate blanco.",
    "price": 4000,
    "compareAtPrice": null,
    "imageUrl": "/products/mini-glam-choco-mani.png",
    "badge": "FAVORITO",
    "active": true,
    "featured": true,
    "stock": 40,
    "flavorsAvailable": "Choco Maní Blanco",
    "categoryId": 5,
    "categoryName": "Mundo Mini Donas",
    "categorySlug": "mini-donas"
  },
  {
    "id": 30,
    "name": "Caja MINI GLAM (x6)",
    "tagline": "6 mini donas de sabores a elección",
    "description": "Caja con 6 mini donas gourmet de sabores a elección: Oblea, Merengón, Oreo, Barquillos, Cocada y Choco Maní.",
    "price": 22000,
    "compareAtPrice": 24000,
    "imageUrl": "/products/caja-mini-glam.png",
    "badge": "PERSONALIZABLE",
    "active": true,
    "featured": true,
    "stock": 25,
    "flavorsAvailable": "Surtida Clásica (1 de c/u), A Elección",
    "categoryId": 5,
    "categoryName": "Mundo Mini Donas",
    "categorySlug": "mini-donas"
  },
  {
    "id": 31,
    "name": "Caja Party Mini Donas",
    "tagline": "Con toppings y salsas para compartir",
    "description": "Mini donas con toppings y salsas a elección. Salsas: Arequipe, Leche condensada, Nutella, Frutos Rojos. Toppings: Oreo, Chips chocolate blanco, Barquillos, Queso, Gomitas, M&M, Banano, Fresa, Quipitos, Maní, Galletas mini chips, Milo, Coco rallado.",
    "price": 23000,
    "compareAtPrice": 26000,
    "imageUrl": "/products/caja-party-mini-donas.png",
    "badge": "FAVORITO",
    "active": true,
    "featured": true,
    "stock": 25,
    "flavorsAvailable": "12 Donas (2 salsas + 2 toppings), 6 Donas ($12.000), 18 Donas ($34.000), 24 Donas ($46.000)",
    "categoryId": 5,
    "categoryName": "Mundo Mini Donas",
    "categorySlug": "mini-donas"
  },
  {
    "id": 32,
    "name": "Mini Donas Personalizadas para Eventos",
    "tagline": "Corporativos, mesas dulces y más",
    "description": "Mini donas decoradas para eventos, matrimonios, corporativos, mesas dulces y celebraciones especiales. Diseños y colores temáticos bajo pedido.",
    "price": 30000,
    "compareAtPrice": null,
    "imageUrl": "/products/mini-donas-personalizadas.png",
    "badge": "PERSONALIZABLE",
    "active": true,
    "featured": true,
    "stock": 20,
    "flavorsAvailable": "Cotización por docena",
    "categoryId": 5,
    "categoryName": "Mundo Mini Donas",
    "categorySlug": "mini-donas"
  }
]

export const useCatalogStore = defineStore('catalog', () => {
  const products = ref([])
  const categories = ref([...SEED_CATEGORIES])
  const selectedCategory = ref('todos')
  const searchQuery = ref('')
  const loading = ref(false)
  const backendConnected = ref(false)
  const toast = ref({ visible: false, message: '', type: 'success' })

  function showToast(message, type = 'success') {
    toast.value = { visible: true, message, type }
    setTimeout(() => {
      toast.value.visible = false
    }, 3200)
  }

  function loadLocalProducts() {
    const saved = localStorage.getItem(LOCAL_PRODUCTS_KEY)
    if (saved) {
      products.value = JSON.parse(saved)
    } else {
      products.value = [...SEED_PRODUCTS]
      localStorage.setItem(LOCAL_PRODUCTS_KEY, JSON.stringify(products.value))
    }
  }

  function syncLocalProducts() {
    localStorage.setItem(LOCAL_PRODUCTS_KEY, JSON.stringify(products.value))
  }

  async function fetchCatalog(includeInactive = true) {
    loading.value = true
    try {
      const [prodRes, catRes] = await Promise.all([
        productApi.getAll({ includeInactive }),
        productApi.getCategories()
      ])
      if (Array.isArray(prodRes.data)) {
        products.value = prodRes.data
        if (Array.isArray(catRes.data) && catRes.data.length > 0) {
          categories.value = catRes.data
        }
        backendConnected.value = true
      } else {
        throw new Error('Respuesta no válida del servidor')
      }
    } catch {
      backendConnected.value = false
      loadLocalProducts()
    } finally {
      loading.value = false
    }
  }

  const filteredPublicProducts = computed(() => {
    return products.value.filter((p) => {
      if (!p.active) return false
      const matchesCat =
        selectedCategory.value === 'todos' || p.categorySlug === selectedCategory.value
      const q = searchQuery.value.trim().toLowerCase()
      const matchesSearch =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        (p.tagline && p.tagline.toLowerCase().includes(q))
      return matchesCat && matchesSearch
    })
  })

  const stats = computed(() => {
    const total = products.value.length
    const active = products.value.filter((p) => p.active).length
    const featured = products.value.filter((p) => p.featured).length
    const totalStock = products.value.reduce((acc, p) => acc + Number(p.stock || 0), 0)
    const avgPrice = total === 0
      ? 0
      : Math.round(products.value.reduce((acc, p) => acc + Number(p.price || 0), 0) / total)
    return {
      totalProducts: total,
      activeProducts: active,
      featuredProducts: featured,
      totalCategories: categories.value.length,
      averagePrice: avgPrice,
      totalStockUnits: totalStock
    }
  })

  async function createProduct(payload) {
    const cat = categories.value.find((c) => c.id === Number(payload.categoryId)) || categories.value[0]
    try {
      const { data } = await productApi.create(payload)
      products.value.unshift(data)
      backendConnected.value = true
      showToast(`✨ "${data.name}" publicado en Bromia`)
    } catch {
      const newProduct = {
        ...payload,
        id: Date.now(),
        categoryId: cat.id,
        categoryName: cat.name,
        categorySlug: cat.slug
      }
      products.value.unshift(newProduct)
      syncLocalProducts()
      showToast(`✨ "${newProduct.name}" guardado localmente`)
    }
  }

  async function updateProduct(id, payload) {
    const cat = categories.value.find((c) => c.id === Number(payload.categoryId)) || categories.value[0]
    try {
      const { data } = await productApi.update(id, payload)
      const idx = products.value.findIndex((p) => p.id === id)
      if (idx !== -1) products.value[idx] = data
      backendConnected.value = true
      showToast(`🍫 "${data.name}" actualizado`)
    } catch {
      const idx = products.value.findIndex((p) => p.id === id)
      if (idx !== -1) {
        products.value[idx] = {
          ...products.value[idx],
          ...payload,
          categoryId: cat.id,
          categoryName: cat.name,
          categorySlug: cat.slug
        }
        syncLocalProducts()
      }
      showToast('🍫 Producto actualizado en vista previa')
    }
  }

  async function toggleProductActive(id) {
    try {
      const { data } = await productApi.toggleStatus(id)
      const idx = products.value.findIndex((p) => p.id === id)
      if (idx !== -1) products.value[idx] = data
      showToast(data.active ? '👁️ Producto visible en tienda' : '🙈 Producto ocultado')
    } catch {
      const item = products.value.find((p) => p.id === id)
      if (item) {
        item.active = !item.active
        syncLocalProducts()
        showToast(item.active ? '👁️ Producto visible en tienda' : '🙈 Producto ocultado')
      }
    }
  }

  async function deleteProduct(id) {
    try {
      await productApi.remove(id)
      products.value = products.value.filter((p) => p.id !== id)
      showToast('🗑️ Producto eliminado')
    } catch {
      products.value = products.value.filter((p) => p.id !== id)
      syncLocalProducts()
      showToast('🗑️ Producto eliminado')
    }
  }

  return {
    products,
    categories,
    selectedCategory,
    searchQuery,
    loading,
    backendConnected,
    toast,
    filteredPublicProducts,
    stats,
    showToast,
    fetchCatalog,
    createProduct,
    updateProduct,
    toggleProductActive,
    deleteProduct
  }
})
