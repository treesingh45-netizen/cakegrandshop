import React from 'react';
import { CheckCircle2, Sparkles, Award, Palette } from 'lucide-react';
import { IMAGES } from '../data/initialStoreData';
import { useStore } from '../context/StoreContext';
import { BakeryImage } from '../components/BakeryImage';

export const AboutPage: React.FC = () => {
  const { navigate } = useStore();

  return (
    <div className="bg-white">
      {/* =================================================================
          HERO SECTION
          ================================================================= */}
      <section className="bg-[#FDF6F8] border-b border-[#EFE2E6] py-16 sm:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center space-y-3">
          <p className="text-xs font-semibold tracking-[0.16em] uppercase text-[#C5A059]">
            H-13, ISLAMABAD · PAKISTAN
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl font-semibold text-[#23191C]">
            About Cake Grand Shop
          </h1>
          <p className="text-base sm:text-lg text-[#544348]">
            Sweet creations made for memorable moments.
          </p>
        </div>
      </section>

      {/* =================================================================
          OUR STORY & ABOUT IMAGE
          ================================================================= */}
      <section className="py-16 sm:py-24">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <div className="lg:col-span-6 space-y-5">
              <p className="text-xs font-semibold tracking-[0.14em] uppercase text-[#C5A059]">
                Welcome to Our Bakery
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#23191C]">
                Our Story
              </h2>
              <div className="w-12 h-[1.5px] bg-[#C5A059]" />
              <div className="space-y-4 text-sm sm:text-base text-[#544348] leading-relaxed">
                <p>
                  Located in H-13, Islamabad, <strong>Cake Grand Shop</strong> is dedicated to
                  bringing freshly baked cakes, cupcakes, desserts, and custom celebration treats
                  to families, students, and neighbors across the capital.
                </p>
                <p>
                  We believe that every gathering—whether an intimate birthday at home, an
                  anniversary dinner, a graduation milestone, or a joyful wedding celebration—is
                  made warmer with a thoughtfully crafted cake at the center of the table.
                </p>
                <p>
                  From rich Belgian chocolate fudge and classic Red Velvet to bespoke multi-tier
                  custom designs, every item in our kitchen is prepared with care, balanced
                  sweetness, and refined presentation.
                </p>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="p-3.5 bg-[#FAF6F7] rounded-2xl border border-[#E6D5B8]">
                <div className="aspect-[4/3] rounded-xl overflow-hidden">
                  <BakeryImage
                    src={IMAGES.heroCelebration}
                    alt="Signature Celebration Cake crafted at Cake Grand Shop H-13 Islamabad"
                    containerClassName="w-full h-full"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =================================================================
          OUR PHILOSOPHY (Freshness, Quality, Creativity)
          ================================================================= */}
      <section className="py-16 sm:py-24 bg-[#FAF6F7] border-y border-[#EFE2E6]">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <p className="text-xs font-semibold tracking-[0.14em] uppercase text-[#C5A059]">
              What Guides Us
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#23191C]">
              Our Philosophy
            </h2>
            <div className="w-16 h-[1.5px] bg-[#C5A059] mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                icon: Sparkles,
                title: 'Freshness',
                text: 'We bake in small batches throughout the day so every sponge, frosting swirl, and brownie square is served at peak freshness.',
              },
              {
                icon: Award,
                title: 'Quality',
                text: 'We select dependable, high-grade cocoa, dairy, cream cheese, and nuts to ensure consistent flavor in every single order.',
              },
              {
                icon: Palette,
                title: 'Creativity',
                text: 'From delicate buttercream florals to personalized celebration themes, we love turning your ideas into edible art.',
              },
            ].map((val) => {
              const IconComp = val.icon;
              return (
                <div
                  key={val.title}
                  className="bg-white p-7 sm:p-8 rounded-2xl border border-[#E6D5B8] text-center space-y-3"
                >
                  <div className="w-12 h-12 rounded-full bg-[#FDF6F8] border border-[#E6D5B8] flex items-center justify-center mx-auto text-[#C5A059]">
                    <IconComp className="w-5 h-5 stroke-[1.5]" />
                  </div>
                  <h3 className="font-serif text-2xl font-semibold text-[#23191C]">{val.title}</h3>
                  <p className="text-sm text-[#5E4B50] leading-relaxed">{val.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =================================================================
          OUR PROMISE ("Every Order Deserves Special Attention")
          ================================================================= */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <div className="lg:col-span-6 order-2 lg:order-1">
              <div className="grid grid-cols-2 gap-4">
                <div className="aspect-[4/3] rounded-xl overflow-hidden border border-[#E6D5B8]">
                  <BakeryImage
                    src={IMAGES.bespokeWedding}
                    alt="Bespoke Celebration Cake — Cake Grand Shop"
                    containerClassName="w-full h-full"
                  />
                </div>
                <div className="aspect-[4/3] rounded-xl overflow-hidden border border-[#E6D5B8]">
                  <BakeryImage
                    src={IMAGES.cupcakesBox}
                    alt="Gourmet Cupcakes — Cake Grand Shop"
                    containerClassName="w-full h-full"
                  />
                </div>
                <div className="col-span-2 aspect-[16/9] rounded-xl overflow-hidden border border-[#E6D5B8]">
                  <BakeryImage
                    src={IMAGES.chocolateFudge}
                    alt="Chocolate Fudge Cake — Cake Grand Shop Islamabad"
                    containerClassName="w-full h-full"
                  />
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 order-1 lg:order-2 space-y-6">
              <p className="text-xs font-semibold tracking-[0.14em] uppercase text-[#C5A059]">
                Our Commitment
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#23191C]">
                Every Order Deserves Special Attention
              </h2>
              <p className="text-sm sm:text-base text-[#544348] leading-relaxed">
                When you order from Cake Grand Shop in H-13, Islamabad, you are trusting us with a
                meaningful moment. We honor that trust through four everyday pillars:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {[
                  {
                    label: 'Fresh preparation',
                    desc: 'Baked to order with attentive care in our H-13 kitchen.',
                  },
                  {
                    label: 'Quality ingredients',
                    desc: 'Balanced flavors, fine chocolate, and smooth frostings.',
                  },
                  {
                    label: 'Beautiful presentation',
                    desc: 'Elegant piping, gold accents, and protective cake boxes.',
                  },
                  {
                    label: 'Customer satisfaction',
                    desc: 'Responsive communication via online ordering, phone, and WhatsApp.',
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="p-4 rounded-xl bg-[#FAF6F7] border border-[#EFE6E9] space-y-1.5"
                  >
                    <div className="flex items-center gap-2 text-sm font-semibold text-[#23191C]">
                      <CheckCircle2 className="w-4 h-4 text-[#C5A059] shrink-0" />
                      <span>{item.label}</span>
                    </div>
                    <p className="text-xs text-[#5E4B50] pl-6">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =================================================================
          CTA ("Have a Celebration Coming Up?")
          ================================================================= */}
      <section className="py-16 sm:py-20 bg-[#FDF2F6] border-t border-[#E6D5B8]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center space-y-5">
          <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#23191C]">
            Have a Celebration Coming Up?
          </h2>
          <p className="text-sm sm:text-base text-[#544348]">
            Browse our signature cakes and sweet treats or request a custom creation today.
          </p>
          <div className="pt-2">
            <button
              type="button"
              onClick={() => navigate('/order-online')}
              className="px-8 py-4 text-xs font-semibold tracking-[0.1em] uppercase text-white bg-[#C5A059] hover:bg-[#B08B44] rounded-lg transition-colors whitespace-nowrap cursor-pointer"
            >
              ORDER YOUR CAKE
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
