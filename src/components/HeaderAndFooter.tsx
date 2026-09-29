import React, { useState } from 'react';
import {
  ShoppingBag,
  Menu as MenuIcon,
  X,
  MapPin,
  Phone,
  Mail,
  SlidersHorizontal,
  Eye,
  Plus,
  MessageCircle,
} from 'lucide-react';
import { BUSINESS_INFO, Product } from '../data/initialStoreData';
import { PageRoute, useStore } from '../context/StoreContext';
import { BakeryImage } from './BakeryImage';

export const InstagramIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

export const FacebookIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const NAV_ITEMS: { label: string; route: PageRoute }[] = [
  { label: 'Home', route: '/' },
  { label: 'About Us', route: '/about-us' },
  { label: 'Menu', route: '/menu' },
  { label: 'Our Cakes', route: '/cakes' },
  { label: 'Gallery', route: '/gallery' },
  { label: 'Order Online', route: '/order-online' },
  { label: 'Contact', route: '/contact' },
];

export const GlobalHeader: React.FC = () => {
  const {
    currentRoute,
    navigate,
    cartCount,
    setIsCartDrawerOpen,
    setIsLocationModalOpen,
    setIsCmsModalOpen,
  } = useStore();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (route: PageRoute) => {
    navigate(route);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#E6D5B8]">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Zone 1: Single text element Brand Wordmark */}
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('/');
          }}
          className="font-serif text-xl sm:text-2xl font-semibold tracking-[0.08em] text-[#23191C] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#C5A059]"
        >
          CAKE GRAND SHOP
        </a>

        {/* Zone 2: Navigation links */}
        <nav
          aria-label="Primary Navigation"
          className="hidden lg:flex items-center gap-6 xl:gap-7 text-sm font-medium text-[#544348]"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = currentRoute === item.route;
            return (
              <a
                key={item.route}
                href={item.route}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.route);
                }}
                className={`relative py-1 whitespace-nowrap shrink-0 transition-colors duration-150 ${
                  isActive
                    ? 'text-[#23191C] font-semibold after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1.5px] after:bg-[#C5A059]'
                    : 'hover:text-[#23191C] after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full after:h-[1.5px] after:bg-[#C5A059]/60 after:transition-all after:duration-150'
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Zone 3: Social icons, Cart, Order Now */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Location / Order Mode button */}
          <button
            type="button"
            onClick={() => setIsLocationModalOpen(true)}
            title="Select Delivery or Takeaway Location"
            className="hidden xl:inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-[#544348] hover:text-[#23191C] border border-[#EFE4E7] hover:border-[#C5A059] rounded-md transition-colors whitespace-nowrap"
          >
            <MapPin className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>H-13</span>
          </button>

          {/* CMS Editor Button */}
          <button
            type="button"
            onClick={() => setIsCmsModalOpen(true)}
            title="Open Bakery CMS Editor (Edit Products, Prices, Categories)"
            className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-[#6B545B] hover:text-[#23191C] bg-[#FDF6F8] hover:bg-[#F9E8EE] border border-[#EED9E0] rounded-md transition-colors whitespace-nowrap"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#C5A059]" />
            <span className="hidden md:inline">CMS</span>
          </button>

          {/* Social Links (Desktop) */}
          <a
            href={BUSINESS_INFO.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Follow Cake Grand Shop on Instagram"
            className="hidden md:inline-flex items-center justify-center w-9 h-9 rounded-full text-[#544348] hover:text-[#C5A059] hover:bg-[#FDF6F8] transition-colors"
          >
            <InstagramIcon className="w-4 h-4" />
          </a>

          <a
            href={BUSINESS_INFO.facebookUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Follow Cake Grand Shop on Facebook"
            className="hidden md:inline-flex items-center justify-center w-9 h-9 rounded-full text-[#544348] hover:text-[#C5A059] hover:bg-[#FDF6F8] transition-colors"
          >
            <FacebookIcon className="w-4 h-4" />
          </a>

          {/* Cart Button */}
          <button
            type="button"
            onClick={() => setIsCartDrawerOpen(true)}
            aria-label={`Shopping cart with ${cartCount} items`}
            className="relative inline-flex items-center justify-center w-10 h-10 rounded-full text-[#23191C] hover:bg-[#FDF6F8] border border-transparent hover:border-[#E6D5B8] transition-colors"
          >
            <ShoppingBag className="w-5 h-5 text-[#23191C]" />
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 rounded-full bg-[#C5A059] text-white text-[11px] font-semibold flex items-center justify-center tabular-nums">
                {cartCount}
              </span>
            )}
          </button>

          {/* Primary Button: ORDER NOW */}
          <button
            type="button"
            onClick={() => handleNavClick('/order-online')}
            className="px-4 sm:px-5 py-2.5 text-xs font-semibold tracking-[0.08em] text-white bg-[#C5A059] hover:bg-[#B08B44] rounded-md shadow-xs transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer"
          >
            ORDER NOW
          </button>

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
            className="lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-md text-[#23191C] hover:bg-[#FDF6F8] transition-colors"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-[#E6D5B8] px-4 pt-3 pb-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#F3E9EC]">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                setIsLocationModalOpen(true);
              }}
              className="inline-flex items-center gap-2 text-xs font-medium text-[#544348] hover:text-[#23191C]"
            >
              <MapPin className="w-4 h-4 text-[#C5A059]" />
              <span>Set Order Type &amp; Location (H-13, Islamabad)</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                setIsCmsModalOpen(true);
              }}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium bg-[#FDF6F8] border border-[#EED9E0] rounded text-[#23191C]"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>CMS Editor</span>
            </button>
          </div>

          <nav className="grid grid-cols-1 gap-1">
            {NAV_ITEMS.map((item) => {
              const isActive = currentRoute === item.route;
              return (
                <a
                  key={item.route}
                  href={item.route}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.route);
                  }}
                  className={`px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-[#FDF6F8] text-[#23191C] font-semibold border-l-2 border-[#C5A059]'
                      : 'text-[#544348] hover:bg-[#FAF6F7] hover:text-[#23191C]'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          <div className="pt-3 border-t border-[#F3E9EC] flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <a
                href={BUSINESS_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-medium text-[#544348] hover:text-[#C5A059]"
              >
                <InstagramIcon className="w-4 h-4" />
                <span>Instagram</span>
              </a>
              <span className="text-[#D9C7CD]">·</span>
              <a
                href={BUSINESS_INFO.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-medium text-[#544348] hover:text-[#C5A059]"
              >
                <FacebookIcon className="w-4 h-4" />
                <span>Facebook</span>
              </a>
            </div>
            <a
              href={BUSINESS_INFO.phoneTelHref}
              className="text-xs font-medium text-[#23191C] tabular-nums"
            >
              {BUSINESS_INFO.phoneDisplay}
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const { addToCart, setQuickViewProduct, cms } = useStore();

  return (
    <article className="group bg-white border border-[#EFE6E9] hover:border-[#D9BE8B] rounded-xl overflow-hidden transition-all duration-200 hover:-translate-y-0.5 flex flex-col">
      {/* Product Photo (65-70% visual height) */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#FAF6F7]">
        <BakeryImage
          src={product.image}
          alt={`${product.name} — Cake Grand Shop H-13 Islamabad`}
          containerClassName="w-full h-full"
          className="w-full h-full object-cover transition-transform duration-200 ease-out group-hover:scale-[1.03]"
        />
      </div>

      {/* Content */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
        <div>
          {/* Clean unboxed metadata (Zero-Pill Discipline) */}
          <div className="flex items-center gap-2 text-xs text-[#876E75] mb-1.5">
            <span>{product.category}</span>
            {product.prepTime && (
              <>
                <span aria-hidden="true">·</span>
                <span className="truncate">{product.prepTime}</span>
              </>
            )}
          </div>

          <h3 className="font-serif text-xl font-semibold text-[#23191C] group-hover:text-[#9E475E] transition-colors">
            {product.name}
          </h3>

          <p className="mt-2 text-sm text-[#5E4B50] line-clamp-2 leading-relaxed">
            {product.shortDescription}
          </p>
        </div>

        <div className="mt-5 pt-4 border-t border-[#F5ECEF]">
          <div className="flex items-baseline justify-between mb-4">
            <span className="text-xs text-[#876E75]">
              {product.sizes && product.sizes.length > 1
                ? product.sizes[1].label.split('(')[0].trim()
                : product.sizes?.[0]?.label || 'Standard'}
            </span>
            <span className="text-base font-semibold text-[#23191C] tabular-nums">
              {cms.showPricesInPKR && product.price > 0
                ? `PKR ${product.price.toLocaleString()}`
                : 'Price on Inquiry'}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <button
              type="button"
              onClick={() => setQuickViewProduct(product)}
              className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 text-xs font-medium text-[#23191C] bg-[#FDF6F8] hover:bg-[#F7E6EC] border border-[#EED9E0] rounded-lg transition-colors whitespace-nowrap cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>Quick View</span>
            </button>

            <button
              type="button"
              onClick={() => addToCart(product, 1)}
              className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 text-xs font-semibold text-white bg-[#C5A059] hover:bg-[#B08B44] rounded-lg transition-colors whitespace-nowrap cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add to Cart</span>
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};

export const GlobalFooter: React.FC = () => {
  const { navigate, setIsCmsModalOpen } = useStore();

  return (
    <footer className="bg-[#FAF6F7] border-t border-[#E6D5B8] text-[#23191C]">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* Column 1: Brand & Description */}
          <div className="lg:col-span-4 space-y-4">
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                navigate('/');
              }}
              className="inline-block font-serif text-2xl font-semibold tracking-[0.08em] text-[#23191C]"
            >
              CAKE GRAND SHOP
            </a>
            <p className="text-sm text-[#5E4B50] max-w-sm leading-relaxed">
              Fresh cakes, desserts and sweet creations for every special moment. Proudly serving
              H-13, Islamabad and surrounding sectors with freshly baked celebration treats.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href={BUSINESS_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-md bg-white border border-[#EED9E0] hover:border-[#C5A059] text-xs font-medium text-[#23191C] transition-colors"
              >
                <InstagramIcon className="w-4 h-4 text-[#C5A059]" />
                <span>Instagram</span>
              </a>
              <a
                href={BUSINESS_INFO.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-md bg-white border border-[#EED9E0] hover:border-[#C5A059] text-xs font-medium text-[#23191C] transition-colors"
              >
                <FacebookIcon className="w-4 h-4 text-[#C5A059]" />
                <span>Facebook</span>
              </a>
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="font-serif text-lg font-semibold text-[#23191C]">Navigation</h3>
            <ul className="space-y-2.5 text-sm text-[#5E4B50]">
              {NAV_ITEMS.map((item) => (
                <li key={item.route}>
                  <a
                    href={item.route}
                    onClick={(e) => {
                      e.preventDefault();
                      navigate(item.route);
                    }}
                    className="hover:text-[#9E475E] transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              <li>
                <button
                  type="button"
                  onClick={() => setIsCmsModalOpen(true)}
                  className="text-left text-[#876E75] hover:text-[#23191C] transition-colors text-xs pt-1"
                >
                  Manage Menu &amp; Prices (CMS)
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="font-serif text-lg font-semibold text-[#23191C]">Contact Us</h3>
            <ul className="space-y-3 text-sm text-[#5E4B50]">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#C5A059] shrink-0 mt-1" />
                <span>{BUSINESS_INFO.address}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#C5A059] shrink-0" />
                <a
                  href={BUSINESS_INFO.phoneTelHref}
                  className="hover:text-[#23191C] transition-colors tabular-nums"
                >
                  {BUSINESS_INFO.phoneDisplay}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#C5A059] shrink-0" />
                <a
                  href={`mailto:${BUSINESS_INFO.email}`}
                  className="hover:text-[#23191C] transition-colors break-all"
                >
                  {BUSINESS_INFO.email}
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Footer CTA */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="font-serif text-lg font-semibold text-[#23191C]">Order Fresh</h3>
            <p className="text-xs text-[#5E4B50] leading-relaxed">
              Ready for a sweet celebration in Islamabad? Place your order online or via WhatsApp.
            </p>
            <div className="flex flex-col gap-2.5">
              <button
                type="button"
                onClick={() => navigate('/order-online')}
                className="w-full px-4 py-2.5 text-xs font-semibold tracking-[0.08em] text-white bg-[#C5A059] hover:bg-[#B08B44] rounded-md transition-colors whitespace-nowrap cursor-pointer"
              >
                ORDER NOW
              </button>
              <a
                href={`https://wa.me/${BUSINESS_INFO.whatsappNum}?text=${encodeURIComponent(
                  'Assalam-o-Alaikum Cake Grand Shop! I would like to inquire about ordering a cake in H-13, Islamabad.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-medium text-[#23191C] bg-white hover:bg-[#FDF6F8] border border-[#E6D5B8] rounded-md transition-colors whitespace-nowrap"
              >
                <MessageCircle className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>WhatsApp Us</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="mt-12 pt-8 border-t border-[#EED9E0] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#7D656C]">
          <p>© 2026 Cake Grand Shop. All Rights Reserved.</p>
          <p>Cake Shop &amp; Bakery in H-13, Islamabad · {BUSINESS_INFO.phoneIntl}</p>
        </div>
      </div>
    </footer>
  );
};
