import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import { BUSINESS_INFO, GALLERY_ITEMS, GalleryItem } from '../data/initialStoreData';
import { useStore } from '../context/StoreContext';
import { BakeryImage } from '../components/BakeryImage';
import { FacebookIcon, InstagramIcon } from '../components/HeaderAndFooter';

const GALLERY_CATEGORIES = [
  'All',
  'Cakes',
  'Cupcakes',
  'Desserts',
  'Celebrations',
  'Custom Cakes',
] as const;

export const GalleryPage: React.FC = () => {
  const { navigate } = useStore();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredItems: GalleryItem[] =
    selectedCategory === 'All'
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === selectedCategory);

  const activeLightboxItem =
    lightboxIndex !== null && filteredItems[lightboxIndex]
      ? filteredItems[lightboxIndex]
      : null;

  const handlePrev = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex - 1 + filteredItems.length) % filteredItems.length);
  };

  const handleNext = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % filteredItems.length);
  };

  return (
    <div className="bg-white min-h-screen">
      {/* =================================================================
          HERO SECTION
          ================================================================= */}
      <section className="bg-[#FDF6F8] border-b border-[#EFE2E6] py-14 sm:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center space-y-3">
          <p className="text-xs font-semibold tracking-[0.16em] uppercase text-[#C5A059]">
            CAKE GRAND SHOP PORTFOLIO · ISLAMABAD
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl font-semibold text-[#23191C]">
            Sweet Moments at Cake Grand Shop
          </h1>
          <p className="text-base sm:text-lg text-[#544348]">
            Explore our cakes, desserts, celebrations and latest creations.
          </p>
        </div>
      </section>

      {/* =================================================================
          CATEGORY FILTER BAR
          ================================================================= */}
      <section className="py-8 border-b border-[#EFE6E9]">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center">
          <div
            role="tablist"
            aria-label="Gallery Categories"
            className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1"
          >
            {GALLERY_CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => {
                    setSelectedCategory(cat);
                    setLightboxIndex(null);
                  }}
                  className={`px-4 py-2 rounded-lg text-xs font-semibold tracking-[0.04em] transition-colors whitespace-nowrap cursor-pointer ${
                    isSelected
                      ? 'bg-[#C5A059] text-white'
                      : 'bg-[#FAF6F7] text-[#544348] hover:bg-[#FDF2F6] hover:text-[#23191C] border border-[#EFE6E9]'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* =================================================================
          MASONRY-STYLE GALLERY GRID
          ================================================================= */}
      <section className="py-12 sm:py-18">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {filteredItems.map((item, idx) => {
              const aspectClass =
                item.aspect === 'tall'
                  ? 'aspect-[3/4]'
                  : item.aspect === 'square'
                  ? 'aspect-square'
                  : 'aspect-[4/3]';

              return (
                <div
                  key={item.id}
                  onClick={() => setLightboxIndex(idx)}
                  className="break-inside-avoid group relative rounded-2xl overflow-hidden border border-[#E6D5B8] bg-[#FAF6F7] cursor-pointer"
                >
                  <BakeryImage
                    src={item.image}
                    alt={`${item.title} — Cake Grand Shop H-13 Islamabad`}
                    aspectClass={aspectClass}
                  />

                  <div className="p-4 bg-white border-t border-[#F3E9EC] flex items-center justify-between gap-3">
                    <div>
                      <p className="text-[11px] text-[#876E75]">{item.category}</p>
                      <h3 className="font-serif text-lg font-semibold text-[#23191C]">
                        {item.title}
                      </h3>
                    </div>
                    <span className="w-8 h-8 rounded-full bg-[#FDF6F8] border border-[#E6D5B8] flex items-center justify-center text-[#C5A059] shrink-0">
                      <ZoomIn className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =================================================================
          LIGHTBOX MODAL
          ================================================================= */}
      {activeLightboxItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#23191C]/85 backdrop-blur-xs"
          role="dialog"
          aria-modal="true"
          aria-label={activeLightboxItem.title}
        >
          <button
            type="button"
            onClick={() => setLightboxIndex(null)}
            aria-label="Close lightbox"
            className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white text-[#23191C] flex items-center justify-center hover:bg-[#FDF6F8] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous image"
            className="absolute left-4 sm:left-8 w-10 h-10 rounded-full bg-white/90 text-[#23191C] flex items-center justify-center hover:bg-white cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="max-w-3xl w-full bg-white rounded-2xl overflow-hidden border border-[#E6D5B8] shadow-2xl">
            <div className="aspect-[4/3] bg-[#FAF6F7]">
              <BakeryImage
                src={activeLightboxItem.image}
                alt={activeLightboxItem.title}
                containerClassName="w-full h-full"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <p className="text-xs text-[#876E75]">
                  {activeLightboxItem.category} · Cake Grand Shop H-13, Islamabad
                </p>
                <h3 className="font-serif text-2xl font-semibold text-[#23191C]">
                  {activeLightboxItem.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#5E4B50] mt-1">
                  {activeLightboxItem.caption}
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setLightboxIndex(null);
                  navigate('/order-online');
                }}
                className="px-5 py-2.5 text-xs font-semibold tracking-[0.06em] uppercase text-white bg-[#C5A059] hover:bg-[#B08B44] rounded-lg whitespace-nowrap shrink-0 cursor-pointer"
              >
                Order Now
              </button>
            </div>
          </div>

          <button
            type="button"
            onClick={handleNext}
            aria-label="Next image"
            className="absolute right-4 sm:right-8 w-10 h-10 rounded-full bg-white/90 text-[#23191C] flex items-center justify-center hover:bg-white cursor-pointer"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* =================================================================
          INSTAGRAM & FACEBOOK SECTION
          ================================================================= */}
      <section className="py-16 sm:py-20 bg-[#FDF2F6] border-t border-[#E6D5B8]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center space-y-5">
          <p className="text-xs font-semibold tracking-[0.14em] uppercase text-[#C5A059]">
            Stay Connected
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#23191C]">
            More Sweet Creations on Instagram
          </h2>
          <p className="text-sm sm:text-base text-[#544348]">
            Follow our daily bakes, custom birthday cakes, and behind-the-scenes stories from H-13,
            Islamabad.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
            <a
              href={BUSINESS_INFO.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 text-xs font-semibold tracking-[0.08em] uppercase text-white bg-[#C5A059] hover:bg-[#B08B44] rounded-lg transition-colors whitespace-nowrap"
            >
              <InstagramIcon className="w-4 h-4" />
              <span>VIEW INSTAGRAM</span>
            </a>
            <a
              href={BUSINESS_INFO.facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 text-xs font-semibold tracking-[0.08em] uppercase text-[#23191C] bg-white hover:bg-[#FAF6F7] border border-[#E6D5B8] rounded-lg transition-colors whitespace-nowrap"
            >
              <FacebookIcon className="w-4 h-4 text-[#C5A059]" />
              <span>Follow on Facebook</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
