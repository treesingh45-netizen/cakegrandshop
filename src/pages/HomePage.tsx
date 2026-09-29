import React from 'react';
import {
  Sparkles,
  Award,
  Heart,
  Gift,
  MapPin,
  Phone,
  Mail,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';
import { BUSINESS_INFO, GALLERY_ITEMS, IMAGES } from '../data/initialStoreData';
import { useStore } from '../context/StoreContext';
import { BakeryImage } from '../components/BakeryImage';
import {
  FacebookIcon,
  InstagramIcon,
  ProductCard,
} from '../components/HeaderAndFooter';

export const HomePage: React.FC = () => {
  const {
    cms,
    navigate,
    orderType,
    selectedLocation,
    setIsLocationModalOpen,
    setIsCmsModalOpen,
  } = useStore();

  const bestSellers = cms.products.filter((p) => p.featuredOnHome).slice(0, 6);
  const displayBestSellers =
    bestSellers.length >= 6 ? bestSellers : cms.products.slice(0, 6);

  return (
    <div className="bg-white">
      {/* =================================================================
          1. HERO SECTION
          ================================================================= */}
      <section className="relative bg-gradient-to-b from-[#FDF4F7] via-[#FDF7F9] to-white border-b border-[#F2E2E7] overflow-hidden">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          {/* Subtle top order status strip */}
          <div className="mb-8 flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#EED9E0]/70 text-xs text-[#6B545B]">
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>
                Serving <strong>H-13, Islamabad</strong> &amp; surrounding sectors · Currently set
                to{' '}
                <strong className="text-[#23191C]">
                  {orderType === 'DELIVERY'
                    ? `Delivery (${selectedLocation})`
                    : 'Takeaway Pickup (H-13)'}
                </strong>
              </span>
            </div>
            <button
              type="button"
              onClick={() => setIsLocationModalOpen(true)}
              className="text-xs font-semibold text-[#9E475E] hover:text-[#23191C] underline underline-offset-4 cursor-pointer"
            >
              Change Order Type / Location
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Column: Editorial Copy & Primary CTA */}
            <div className="lg:col-span-6 space-y-6">
              <p className="text-xs font-semibold tracking-[0.18em] text-[#C5A059]">
                CAKES • DESSERTS • SWEET MOMENTS
              </p>

              <h1 className="font-serif text-4xl sm:text-5xl lg:text-[56px] font-semibold text-[#23191C] leading-[1.12]">
                Beautiful Cakes,
                <br />
                Made for Beautiful Moments.
              </h1>

              <p className="text-base sm:text-lg text-[#544348] leading-relaxed max-w-xl">
                Freshly crafted cakes and delicious treats for birthdays, celebrations, gatherings
                and every sweet occasion in Islamabad.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
                <button
                  type="button"
                  onClick={() => navigate('/order-online')}
                  className="px-7 py-4 text-xs font-semibold tracking-[0.1em] uppercase text-white bg-[#C5A059] hover:bg-[#B08B44] rounded-lg shadow-xs transition-colors whitespace-nowrap cursor-pointer"
                >
                  ORDER NOW
                </button>

                <button
                  type="button"
                  onClick={() => navigate('/menu')}
                  className="px-7 py-4 text-xs font-semibold tracking-[0.1em] uppercase text-[#23191C] bg-white hover:bg-[#FDF6F8] border border-[#D9BE8B] rounded-lg transition-colors whitespace-nowrap cursor-pointer"
                >
                  EXPLORE OUR MENU
                </button>
              </div>

              <div className="pt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-[#6B545B]">
                <span>Freshly Baked in H-13, Islamabad</span>
                <span aria-hidden="true">·</span>
                <span>Custom Celebration Designs</span>
                <span aria-hidden="true">·</span>
                <a
                  href={BUSINESS_INFO.phoneTelHref}
                  className="font-medium text-[#23191C] hover:text-[#9E475E] tabular-nums"
                >
                  Call: {BUSINESS_INFO.phoneDisplay}
                </a>
              </div>
            </div>

            {/* Right Column: Large Celebration Cake Photography with Champagne Gold Frame */}
            <div className="lg:col-span-6">
              <div className="relative p-3 sm:p-4 bg-white rounded-2xl border border-[#E6D5B8] shadow-md">
                <div className="aspect-[4/3] rounded-xl overflow-hidden">
                  <BakeryImage
                    src={IMAGES.heroCelebration}
                    alt="Signature Two-Tier Blush Pink and Champagne Gold Celebration Cake by Cake Grand Shop in H-13 Islamabad"
                    containerClassName="w-full h-full"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="mt-3 px-2 flex items-center justify-between text-xs text-[#6B545B]">
                  <span className="font-serif italic text-sm text-[#23191C]">
                    Signature Celebration Collection — Cake Grand Shop
                  </span>
                  <span>H-13, Islamabad</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =================================================================
          2. FEATURED CATEGORIES ("Something Sweet for Every Celebration")
          ================================================================= */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-14 space-y-3">
            <p className="text-xs font-semibold tracking-[0.14em] uppercase text-[#C5A059]">
              Curated Bakery Collections
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#23191C]">
              Something Sweet for Every Celebration
            </h2>
            <div className="w-16 h-[1.5px] bg-[#C5A059] mx-auto" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
            {cms.categories.map((cat) => (
              <div
                key={cat.id}
                className="group bg-[#FAF6F7] border border-[#EFE4E7] hover:border-[#C5A059] rounded-xl overflow-hidden flex flex-col justify-between transition-all duration-200 hover:-translate-y-0.5"
              >
                <div>
                  <div className="aspect-[4/3] overflow-hidden bg-white">
                    <BakeryImage
                      src={cat.image}
                      alt={`${cat.name} in H-13 Islamabad — Cake Grand Shop`}
                      containerClassName="w-full h-full"
                    />
                  </div>
                  <div className="p-5 space-y-2">
                    <h3 className="font-serif text-2xl font-semibold text-[#23191C]">
                      {cat.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#5E4B50] leading-relaxed">
                      {cat.description}
                    </p>
                  </div>
                </div>

                <div className="px-5 pb-5 pt-2">
                  <button
                    type="button"
                    onClick={() =>
                      cat.name === 'Custom Cakes'
                        ? navigate('/cakes')
                        : navigate('/menu', { menuCategory: cat.menuCategory })
                    }
                    className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-semibold tracking-[0.06em] uppercase text-[#23191C] bg-white hover:bg-[#C5A059] hover:text-white border border-[#E6D5B8] rounded-lg transition-colors whitespace-nowrap cursor-pointer"
                  >
                    <span>View Collection</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =================================================================
          3. BEST SELLERS ("Customer Favorites")
          ================================================================= */}
      <section className="py-16 sm:py-24 bg-[#FDF6F8] border-y border-[#F2E2E7]">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
            <div className="space-y-2">
              <p className="text-xs font-semibold tracking-[0.14em] uppercase text-[#C5A059]">
                Most Loved in Islamabad
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#23191C]">
                Customer Favorites
              </h2>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setIsCmsModalOpen(true)}
                className="px-3.5 py-2 text-xs font-medium text-[#6B545B] hover:text-[#23191C] bg-white border border-[#EED9E0] rounded-lg transition-colors cursor-pointer"
              >
                Edit Menu in CMS
              </button>
              <button
                type="button"
                onClick={() => navigate('/menu')}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold tracking-[0.06em] uppercase text-[#23191C] bg-white hover:bg-[#FAF6F7] border border-[#D9BE8B] rounded-lg transition-colors cursor-pointer"
              >
                <span>View Full Menu</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#C5A059]" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {displayBestSellers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* =================================================================
          4. WHY CHOOSE US ("Made Fresh. Made Special.")
          ================================================================= */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <p className="text-xs font-semibold tracking-[0.14em] uppercase text-[#C5A059]">
              The Cake Grand Shop Standard
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#23191C]">
              Made Fresh. Made Special.
            </h2>
            <div className="w-16 h-[1.5px] bg-[#C5A059] mx-auto" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {[
              {
                icon: Sparkles,
                title: 'Freshly Baked',
                description:
                  'Prepared fresh daily in our H-13, Islamabad kitchen so every slice arrives soft, fragrant, and moist.',
              },
              {
                icon: Award,
                title: 'Premium Ingredients',
                description:
                  'Crafted with rich cocoa, silky cream cheese, caramelized biscuits, and pure dairy buttercream.',
              },
              {
                icon: Gift,
                title: 'Beautiful Presentation',
                description:
                  'Finished with delicate piping, elegant textures, and signature packaging ready for gifting.',
              },
              {
                icon: Heart,
                title: 'Made for Your Celebration',
                description:
                  'Personalized cake messages, custom flavors, and attentive service for every milestone.',
              },
            ].map((benefit) => {
              const IconComponent = benefit.icon;
              return (
                <div
                  key={benefit.title}
                  className="p-6 sm:p-7 rounded-xl bg-[#FAF6F7] border border-[#EFE6E9] text-center space-y-3"
                >
                  <div className="w-12 h-12 rounded-full bg-white border border-[#E6D5B8] flex items-center justify-center mx-auto text-[#C5A059]">
                    <IconComponent className="w-5 h-5 stroke-[1.5]" />
                  </div>
                  <h3 className="font-serif text-xl font-semibold text-[#23191C]">
                    {benefit.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#5E4B50] leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =================================================================
          5. CUSTOM CAKES SPLIT SECTION ("Your Cake, Your Way")
          ================================================================= */}
      <section className="py-16 sm:py-24 bg-[#FAF6F7] border-y border-[#EFE2E6]">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left: Custom Cake Photography */}
            <div className="lg:col-span-6">
              <div className="p-3 bg-white rounded-2xl border border-[#E6D5B8]">
                <div className="aspect-[4/3] rounded-xl overflow-hidden">
                  <BakeryImage
                    src={IMAGES.bespokeWedding}
                    alt="Custom Wedding and Celebration Cake by Cake Grand Shop Islamabad"
                    containerClassName="w-full h-full"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Right: Copy & CTA */}
            <div className="lg:col-span-6 space-y-6">
              <p className="text-xs font-semibold tracking-[0.14em] uppercase text-[#C5A059]">
                Bespoke Cake Studio · H-13 Islamabad
              </p>

              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#23191C]">
                Your Cake, Your Way
              </h2>

              <p className="text-base text-[#544348] leading-relaxed">
                Planning a birthday, anniversary, wedding, baby shower or special celebration? Tell
                us what you have in mind and let us create a cake made especially for your
                occasion.
              </p>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => navigate('/cakes', { scrollToId: 'custom-cake-form' })}
                  className="px-7 py-4 text-xs font-semibold tracking-[0.1em] uppercase text-white bg-[#C5A059] hover:bg-[#B08B44] rounded-lg transition-colors whitespace-nowrap cursor-pointer"
                >
                  REQUEST A CUSTOM CAKE
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =================================================================
          6. SOCIAL MEDIA ("Follow Cake Grand Shop")
          ================================================================= */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <p className="text-xs font-semibold tracking-[0.14em] uppercase text-[#C5A059]">
              @cakegrandshopislamabad
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#23191C]">
              Follow Cake Grand Shop
            </h2>
            <p className="text-sm sm:text-base text-[#5E4B50]">
              See our latest cakes, desserts and special creations on Instagram and Facebook.
            </p>
          </div>

          {/* 4-Photo Social Preview Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-10">
            {GALLERY_ITEMS.slice(0, 4).map((item) => (
              <div
                key={item.id}
                onClick={() => navigate('/gallery')}
                className="group relative aspect-square rounded-xl overflow-hidden border border-[#EFE6E9] cursor-pointer"
              >
                <BakeryImage
                  src={item.image}
                  alt={item.title}
                  containerClassName="w-full h-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#23191C]/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-end p-4">
                  <p className="text-xs text-white font-medium line-clamp-2">{item.caption}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={BUSINESS_INFO.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-xs font-semibold tracking-[0.08em] uppercase text-[#23191C] bg-[#FDF6F8] hover:bg-[#F7E3EA] border border-[#E6D5B8] rounded-lg transition-colors whitespace-nowrap"
            >
              <InstagramIcon className="w-4 h-4 text-[#C5A059]" />
              <span>FOLLOW ON INSTAGRAM</span>
            </a>

            <a
              href={BUSINESS_INFO.facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-xs font-semibold tracking-[0.08em] uppercase text-[#23191C] bg-white hover:bg-[#FAF6F7] border border-[#E6D5B8] rounded-lg transition-colors whitespace-nowrap"
            >
              <FacebookIcon className="w-4 h-4 text-[#C5A059]" />
              <span>FOLLOW ON FACEBOOK</span>
            </a>
          </div>
        </div>
      </section>

      {/* =================================================================
          7. LOCATION ("Visit Cake Grand Shop")
          ================================================================= */}
      <section className="py-16 sm:py-24 bg-[#FAF6F7] border-t border-[#EFE2E6]">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-5 space-y-6 bg-white p-7 sm:p-9 rounded-2xl border border-[#E6D5B8]">
              <div className="space-y-2">
                <p className="text-xs font-semibold tracking-[0.14em] uppercase text-[#C5A059]">
                  Our Bakery Location
                </p>
                <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#23191C]">
                  Visit Cake Grand Shop
                </h2>
              </div>

              <div className="space-y-4 text-sm text-[#544348]">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#C5A059] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-[#23191C]">Address</p>
                    <p>{BUSINESS_INFO.address}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-[#C5A059] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-[#23191C]">Phone</p>
                    <a
                      href={BUSINESS_INFO.phoneTelHref}
                      className="hover:text-[#9E475E] tabular-nums"
                    >
                      {BUSINESS_INFO.phoneDisplay}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-[#C5A059] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-[#23191C]">Email</p>
                    <a
                      href={`mailto:${BUSINESS_INFO.email}`}
                      className="hover:text-[#9E475E] break-all"
                    >
                      {BUSINESS_INFO.email}
                    </a>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href={BUSINESS_INFO.googleMapsDirectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs font-semibold tracking-[0.08em] uppercase text-white bg-[#C5A059] hover:bg-[#B08B44] rounded-lg transition-colors whitespace-nowrap"
                >
                  <span>GET DIRECTIONS</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="rounded-2xl overflow-hidden border border-[#E6D5B8] bg-white h-[360px] sm:h-[400px]">
                <iframe
                  title="Cake Grand Shop H-13 Islamabad Map"
                  src={BUSINESS_INFO.googleMapsEmbedUrl}
                  width="100%"
                  height="100%"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full border-0"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =================================================================
          8. FINAL CTA ("Make Your Next Celebration Sweeter")
          ================================================================= */}
      <section className="py-16 sm:py-20 bg-[#FDF2F6] border-t border-[#E6D5B8]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center space-y-5">
          <div className="w-14 h-[1.5px] bg-[#C5A059] mx-auto" />
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#23191C]">
            Make Your Next Celebration Sweeter
          </h2>
          <p className="text-base sm:text-lg text-[#544348]">
            Order your favorite cake and make every occasion memorable.
          </p>
          <div className="pt-2">
            <button
              type="button"
              onClick={() => navigate('/order-online')}
              className="px-8 py-4 text-xs font-semibold tracking-[0.1em] uppercase text-white bg-[#C5A059] hover:bg-[#B08B44] rounded-lg shadow-xs transition-colors whitespace-nowrap cursor-pointer"
            >
              ORDER NOW
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
