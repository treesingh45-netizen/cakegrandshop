import React, { useState } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/HeaderAndFooter';

export const MenuPage: React.FC = () => {
  const {
    cms,
    activeMenuCategory,
    setActiveMenuCategory,
    setIsCmsModalOpen,
  } = useStore();

  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = cms.products.filter((product) => {
    const matchesCategory =
      activeMenuCategory === 'All' ||
      product.category.toLowerCase() === activeMenuCategory.toLowerCase() ||
      (product.cakeCollectionTags &&
        product.cakeCollectionTags.some(
          (t) => t.toLowerCase() === activeMenuCategory.toLowerCase()
        ));

    const q = searchQuery.trim().toLowerCase();
    const matchesSearch =
      !q ||
      product.name.toLowerCase().includes(q) ||
      product.shortDescription.toLowerCase().includes(q) ||
      product.category.toLowerCase().includes(q);

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-white min-h-screen">
      {/* =================================================================
          HERO SECTION
          ================================================================= */}
      <section className="bg-[#FDF6F8] border-b border-[#EFE2E6] py-14 sm:py-18">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <p className="text-xs font-semibold tracking-[0.16em] uppercase text-[#C5A059]">
            CAKE GRAND SHOP · H-13 ISLAMABAD
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl font-semibold text-[#23191C]">
            Our Menu
          </h1>
          <p className="text-base sm:text-lg text-[#544348] max-w-xl mx-auto">
            Explore our cakes, desserts and freshly prepared sweet treats.
          </p>
        </div>
      </section>

      {/* =================================================================
          CATEGORY FILTER & SEARCH BAR
          ================================================================= */}
      <section className="sticky top-20 z-30 bg-white/95 backdrop-blur-md border-b border-[#EFE6E9] py-4">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Horizontal Scrollable Category Filter */}
          <div
            role="tablist"
            aria-label="Menu Categories"
            className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 lg:pb-0"
          >
            {cms.menuCategories.map((category) => {
              const isSelected = activeMenuCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setActiveMenuCategory(category)}
                  className={`px-4 py-2 rounded-lg text-xs font-semibold tracking-[0.04em] transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    isSelected
                      ? 'bg-[#C5A059] text-white shadow-xs'
                      : 'bg-[#FAF6F7] text-[#544348] hover:bg-[#FDF2F6] hover:text-[#23191C] border border-[#EFE6E9]'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>

          {/* Search & CMS Edit Trigger */}
          <div className="flex items-center gap-2.5 shrink-0">
            <div className="relative flex-1 sm:w-64">
              <Search className="w-4 h-4 text-[#876E75] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search cakes, cupcakes..."
                aria-label="Search menu products"
                className="w-full pl-9 pr-3.5 py-2 text-xs bg-[#FAF6F7] border border-[#E6D5B8] rounded-lg text-[#23191C] focus:outline-none focus:border-[#C5A059] focus:bg-white"
              />
            </div>

            <button
              type="button"
              onClick={() => setIsCmsModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-[#23191C] bg-[#FDF6F8] hover:bg-[#F7E3EA] border border-[#E6D5B8] rounded-lg whitespace-nowrap cursor-pointer"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>Edit Menu</span>
            </button>
          </div>
        </div>
      </section>

      {/* =================================================================
          3-COLUMN DESKTOP PRODUCT GRID
          ================================================================= */}
      <section className="py-12 sm:py-16">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6 flex items-center justify-between text-xs text-[#6B545B]">
            <span>
              Showing <strong className="text-[#23191C] tabular-nums">{filteredProducts.length}</strong>{' '}
              items in <strong className="text-[#23191C]">{activeMenuCategory}</strong>
            </span>
            {activeMenuCategory !== 'All' && (
              <button
                type="button"
                onClick={() => setActiveMenuCategory('All')}
                className="text-[#9E475E] hover:underline cursor-pointer"
              >
                Show All Categories
              </button>
            )}
          </div>

          {filteredProducts.length === 0 ? (
            <div className="py-16 text-center bg-[#FAF6F7] rounded-2xl border border-[#EFE6E9] p-8 space-y-3">
              <h2 className="font-serif text-2xl font-semibold text-[#23191C]">
                No treats matched your search
              </h2>
              <p className="text-xs sm:text-sm text-[#5E4B50]">
                Try clearing your filter or request a custom cake design tailored to your occasion.
              </p>
              <button
                type="button"
                onClick={() => {
                  setActiveMenuCategory('All');
                  setSearchQuery('');
                }}
                className="px-5 py-2.5 text-xs font-semibold text-white bg-[#C5A059] rounded-lg cursor-pointer"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
