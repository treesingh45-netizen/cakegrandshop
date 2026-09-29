import React from 'react';
import { MessageCircle, Phone } from 'lucide-react';
import { StoreProvider, useStore } from './context/StoreContext';
import { GlobalFooter, GlobalHeader } from './components/HeaderAndFooter';
import {
  CartDrawer,
  CmsManagerModal,
  OrderLocationModal,
  ProductQuickViewModal,
} from './components/Modals';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { MenuPage } from './pages/MenuPage';
import { OurCakesPage } from './pages/OurCakesPage';
import { GalleryPage } from './pages/GalleryPage';
import { OrderOnlinePage } from './pages/OrderOnlinePage';
import { ContactPage } from './pages/ContactPage';
import { BUSINESS_INFO } from './data/initialStoreData';

const AppRouter: React.FC = () => {
  const { currentRoute, toastMessage } = useStore();

  const renderPage = () => {
    switch (currentRoute) {
      case '/':
        return <HomePage />;
      case '/about-us':
        return <AboutPage />;
      case '/menu':
        return <MenuPage />;
      case '/cakes':
        return <OurCakesPage />;
      case '/gallery':
        return <GalleryPage />;
      case '/order-online':
        return <OrderOnlinePage />;
      case '/contact':
        return <ContactPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#23191C]">
      <GlobalHeader />

      <main className="flex-1">{renderPage()}</main>

      <GlobalFooter />

      {/* Modals & Drawers */}
      <OrderLocationModal />
      <ProductQuickViewModal />
      <CartDrawer />
      <CmsManagerModal />

      {/* Quick WhatsApp & Call Floating Action Buttons (Desktop & Mobile safe) */}
      <div className="fixed bottom-5 right-5 z-30 flex items-center gap-2">
        <a
          href={BUSINESS_INFO.phoneTelHref}
          aria-label="Call Cake Grand Shop"
          title="Call 0347 0300950"
          className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-white text-[#23191C] border border-[#E6D5B8] shadow-md hover:border-[#C5A059] transition-colors"
        >
          <Phone className="w-4 h-4 text-[#C5A059]" />
        </a>
        <a
          href={`https://wa.me/${BUSINESS_INFO.whatsappNum}?text=${encodeURIComponent(
            'Assalam-o-Alaikum Cake Grand Shop! I would like to place an order in H-13, Islamabad.'
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp with Cake Grand Shop"
          className="inline-flex items-center gap-2 px-4 h-11 rounded-full bg-[#23191C] hover:bg-[#3A292E] text-white text-xs font-semibold shadow-md border border-[#C5A059] transition-colors whitespace-nowrap"
        >
          <MessageCircle className="w-4 h-4 text-[#C5A059]" />
          <span className="hidden sm:inline">WhatsApp Us</span>
        </a>
      </div>

      {/* Subtle Toast Notification */}
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-20 right-5 z-50 max-w-sm px-4 py-3 rounded-xl bg-[#23191C] text-white text-xs font-medium shadow-lg border border-[#C5A059] flex items-center gap-2.5"
        >
          <span className="w-2 h-2 rounded-full bg-[#C5A059] shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <AppRouter />
    </StoreProvider>
  );
}
