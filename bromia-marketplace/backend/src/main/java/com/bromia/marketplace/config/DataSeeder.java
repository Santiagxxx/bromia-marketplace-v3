package com.bromia.marketplace.config;

import com.bromia.marketplace.domain.entity.Category;
import com.bromia.marketplace.domain.entity.Product;
import com.bromia.marketplace.domain.entity.StoreConfig;
import com.bromia.marketplace.domain.enums.ProductBadge;
import com.bromia.marketplace.repository.CategoryRepository;
import com.bromia.marketplace.repository.ProductRepository;
import com.bromia.marketplace.repository.StoreConfigRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.List;

@Component
@RequiredArgsConstructor
public class DataSeeder implements CommandLineRunner {

    private final CategoryRepository categoryRepository;
    private final ProductRepository productRepository;
    private final StoreConfigRepository storeConfigRepository;

    @Override
    public void run(String... args) {
        if (storeConfigRepository.count() == 0) {
            storeConfigRepository.save(StoreConfig.builder()
                    .id(1L)
                    .storeName("Bromia")
                    .whatsappNumber("573001234567")
                    .heroTitle("La magia de la Navidad se comparte con Bromia 🎄")
                    .heroSubtitle("Edición especial navideña: Brookies festivos con Nutella y canela, chocobombas de chocolate caliente y cajitas de regalo ideales para tus novenas.")
                    .promoBannerText("🎄 Especial Navideño: Reserva tus antojitos y regalos de Novenas con anticipación • Envíos en Bogotá ✨")
                    .instagramHandle("@bromiaoficial")
                    .city("Bogotá, Colombia")
                    .build());
        }

        if (categoryRepository.count() == 0) {
            Category brookies = categoryRepository.save(Category.builder()
                    .name("Brookies & Blonkies")
                    .slug("brookies")
                    .subtitle("Mitad brownie, mitad galleta")
                    .coverImageUrl("https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=600&q=80")
                    .displayOrder(1)
                    .build());

            Category cheesecakes = categoryRepository.save(Category.builder()
                    .name("Cheesecakes")
                    .slug("cheesecakes")
                    .subtitle("Tu cheesecake a tu manera")
                    .coverImageUrl("https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=600&q=80")
                    .displayOrder(2)
                    .build());

            Category chocobombas = categoryRepository.save(Category.builder()
                    .name("Chocobombas & Trufas")
                    .slug("chocobombas")
                    .subtitle("Disponibles por unidad o caja")
                    .coverImageUrl("https://images.unsplash.com/photo-1548907040-4baa42d10919?auto=format&fit=crop&w=600&q=80")
                    .displayOrder(3)
                    .build());

            Category regalos = categoryRepository.save(Category.builder()
                    .name("Regalos & Especiales")
                    .slug("regalos")
                    .subtitle("Perfectas para regalar")
                    .coverImageUrl("https://images.unsplash.com/photo-1549007994-cb92caebd54b?auto=format&fit=crop&w=600&q=80")
                    .displayOrder(4)
                    .build());

            productRepository.saveAll(List.of(
                    Product.builder()
                            .name("Brookie Tradicional Nutella")
                            .tagline("¡El favorito de la casa!")
                            .description("Base de brownie súper húmedo de chocolate semiamargo fusionado con masa de galleta chocochips, relleno y coronado con Nutella cremosa.")
                            .price(new BigDecimal("14500"))
                            .compareAtPrice(new BigDecimal("16500"))
                            .imageUrl("https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80")
                            .badge(ProductBadge.NEW)
                            .featured(true)
                            .active(true)
                            .stock(30)
                            .flavorsAvailable("Nutella Clásico, Oreo Crunch, Arequipe")
                            .category(brookies)
                            .build(),

                    Product.builder()
                            .name("Brookie Red Velvet Cream")
                            .tagline("Suave, aterciopelado e irresistible")
                            .description("Brownie aterciopelado Red Velvet con trozos de galleta blanca horneada, frosting de queso crema y lluvia de crumble crocante.")
                            .price(new BigDecimal("15500"))
                            .imageUrl("https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?auto=format&fit=crop&w=800&q=80")
                            .badge(ProductBadge.NEW)
                            .featured(true)
                            .active(true)
                            .stock(24)
                            .flavorsAvailable("Frosting Queso Crema, Chocolate Blanco")
                            .category(brookies)
                            .build(),

                    Product.builder()
                            .name("Blonkie Chips & Caramelo")
                            .tagline("Doradito por fuera, melcochudo por dentro")
                            .description("Blondie de vainilla con mantequilla avellanada, chips de chocolate blanco y leche, y topping de galleta recién horneada.")
                            .price(new BigDecimal("14500"))
                            .imageUrl("https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=800&q=80")
                            .badge(ProductBadge.FAVORITO)
                            .featured(false)
                            .active(true)
                            .stock(20)
                            .flavorsAvailable("Chocolate Blanco, Arequipe")
                            .category(brookies)
                            .build(),

                    Product.builder()
                            .name("Cheesecake Cremoso de Maracuyá y Arequipe")
                            .tagline("Tu cheesecake... a tu manera")
                            .description("Cheesecake frío sobre base crocante de galleta con doble capa artesanal de salsa natural de maracuyá ácido y arequipe sedoso.")
                            .price(new BigDecimal("48000"))
                            .compareAtPrice(new BigDecimal("54000"))
                            .imageUrl("https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=800&q=80")
                            .badge(ProductBadge.PERSONALIZABLE)
                            .featured(true)
                            .active(true)
                            .stock(12)
                            .flavorsAvailable("Maracuyá & Arequipe, Frutos Rojos, Oreo")
                            .category(cheesecakes)
                            .build(),

                    Product.builder()
                            .name("Cheesecake Frutos Rojos & Chocolate")
                            .tagline("Ideal para compartir o celebrar")
                            .description("Cheesecake de chocolate belga coronado con fresas frescas, arándanos y reducción artesanal de frutos del bosque.")
                            .price(new BigDecimal("52000"))
                            .imageUrl("https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=800&q=80")
                            .badge(ProductBadge.FAVORITO)
                            .featured(true)
                            .active(true)
                            .stock(10)
                            .flavorsAvailable("6 Porciones, 10 Porciones")
                            .category(cheesecakes)
                            .build(),

                    Product.builder()
                            .name("Chocobomba Individual en Cajita Regalo")
                            .tagline("Disponibles por unidad • Perfectas para regalar")
                            .description("Esfera de chocolate artesanal presentada en cajita transparente con lazo de cinta y tarjeta dedicatoria. ¡Solo agrega leche caliente!")
                            .price(new BigDecimal("12000"))
                            .imageUrl("https://images.unsplash.com/photo-1548907040-4baa42d10919?auto=format&fit=crop&w=800&q=80")
                            .badge(ProductBadge.PERSONALIZABLE)
                            .featured(true)
                            .active(true)
                            .stock(40)
                            .flavorsAvailable("Chocolate Blanco + Milo, Chocolate Oscuro + Marshmallows, Fresa")
                            .category(chocobombas)
                            .build(),

                    Product.builder()
                            .name("Caja x9 Trufitas Surtidas Bromia")
                            .tagline("Bocados cremosos bañados en chocolate")
                            .description("Caja de regalo con 9 trufas artesanales surtidas: coco tostado, crocante de almendras, chocolate semiamargo y lluvia de colores.")
                            .price(new BigDecimal("28000"))
                            .imageUrl("https://images.unsplash.com/photo-1549007994-cb92caebd54b?auto=format&fit=crop&w=800&q=80")
                            .badge(ProductBadge.FAVORITO)
                            .featured(false)
                            .active(true)
                            .stock(18)
                            .flavorsAvailable("Surtida Clásica, Solo Chocolate")
                            .category(chocobombas)
                            .build(),

                    Product.builder()
                            .name("Trío Corazones Diamante de Mousse")
                            .tagline("Edición especial para regalar")
                            .description("Tres corazones geométricos de chocolate rellenos de mousse artesanal: Maracuyá, Almendras tostadas y Fresa natural.")
                            .price(new BigDecimal("36000"))
                            .imageUrl("https://images.unsplash.com/photo-1511381939415-e44015466834?auto=format&fit=crop&w=800&q=80")
                            .badge(ProductBadge.TEMPORADA)
                            .featured(true)
                            .active(true)
                            .stock(15)
                            .flavorsAvailable("Maracuyá + Almendras + Fresa")
                            .category(regalos)
                            .build()
            ));
        }

        // Asegurar categoría y productos de Colección Navidad permanente
        Category navCat = categoryRepository.findBySlug("coleccion-navidad").orElseGet(() ->
                categoryRepository.save(Category.builder()
                        .name("🎄 Colección Navidad")
                        .slug("coleccion-navidad")
                        .subtitle("Edición especial festiva")
                        .coverImageUrl("https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?auto=format&fit=crop&w=600&q=80")
                        .displayOrder(0)
                        .build())
        );

        if (productRepository.searchProducts("coleccion-navidad", null, false).isEmpty()) {
            productRepository.saveAll(List.of(
                    Product.builder()
                            .name("Caja Navideña x4 Brookies Festivos")
                            .tagline("Edición especial con canela y Nutella")
                            .description("Caja regalo navideña con 4 brookies decorados con chispas de nieve, canela y Nutella cremosa. Incluye tarjeta de deseos.")
                            .price(new BigDecimal("34000"))
                            .compareAtPrice(new BigDecimal("38000"))
                            .imageUrl("https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?auto=format&fit=crop&w=800&q=80")
                            .badge(ProductBadge.TEMPORADA)
                            .featured(true)
                            .active(true)
                            .stock(25)
                            .flavorsAvailable("Nutella Navideño, Canela Crunch, Oreo Festivo")
                            .category(navCat)
                            .build(),

                    Product.builder()
                            .name("Chocobomba Navideña Muñeco de Nieve")
                            .tagline("¡Para chocolate caliente en tus novenas!")
                            .description("Esfera artesanal de chocolate blanco y chispas doradas rellena de malvaviscos navideños y cocoa premium.")
                            .price(new BigDecimal("14000"))
                            .imageUrl("https://images.unsplash.com/photo-1548907040-4baa42d10919?auto=format&fit=crop&w=800&q=80")
                            .badge(ProductBadge.TEMPORADA)
                            .featured(true)
                            .active(true)
                            .stock(50)
                            .flavorsAvailable("Chocolate Blanco Vainilla, Chocolate con Leche y Canela")
                            .category(navCat)
                            .build(),

                    Product.builder()
                            .name("Cheesecake Festivo Frutos del Bosque & Ciruela")
                            .tagline("El postre soñado para tu cena navideña")
                            .description("Cheesecake suave con reducción navideña de frutos del bosque, ciruelas caramelizadas y galleta especiada.")
                            .price(new BigDecimal("54000"))
                            .imageUrl("https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=800&q=80")
                            .badge(ProductBadge.TEMPORADA)
                            .featured(true)
                            .active(true)
                            .stock(15)
                            .flavorsAvailable("6 Porciones, 10 Porciones")
                            .category(navCat)
                            .build(),

                    Product.builder()
                            .name("Cajita x9 Trufas Navideñas Doradas")
                            .tagline("El detalle elegante para compartir")
                            .description("Nueve trufas artesanales con brillo dorado comestible, chocolate semiamargo y toques de avellanas tostadas.")
                            .price(new BigDecimal("30000"))
                            .imageUrl("https://images.unsplash.com/photo-1549007994-cb92caebd54b?auto=format&fit=crop&w=800&q=80")
                            .badge(ProductBadge.TEMPORADA)
                            .featured(true)
                            .active(true)
                            .stock(30)
                            .flavorsAvailable("Avellana Dorada, Chocolate 70%, Coco Nevado")
                            .category(navCat)
                            .build()
            ));
        }
    }
}
