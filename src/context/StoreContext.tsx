import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  BUSINESS_INFO,
  CMSStoreState,
  FeaturedCategory,
  INITIAL_CMS_STATE,
  PaymentMethod,
  Product,
} from '../data/initialStoreData';

export type PageRoute =
  | '/'
  | '/about-us'
  | '/menu'
  | '/cakes'
  | '/gallery'
  | '/order-online'
  | '/contact';

export type OrderType = 'DELIVERY' | 'TAKEAWAY';

export interface CartItem {
  cartItemId: string;
  product: Product;
  selectedSizeLabel: string;
  unitPrice: number;
  quantity: number;
}

interface StoreContextValue {
  // Navigation
  currentRoute: PageRoute;
  navigate: (route: PageRoute, options?: { menuCategory?: string; scrollToId?: string }) => void;
  activeMenuCategory: string;
  setActiveMenuCategory: (category: string) => void;

  // Order Mode & Location
  orderType: OrderType;
  setOrderType: (type: OrderType) => void;
  selectedLocation: string;
  setSelectedLocation: (location: string) => void;
  hasConfirmedLocation: boolean;
  setHasConfirmedLocation: (confirmed: boolean) => void;

  // Modals
  isLocationModalOpen: boolean;
  setIsLocationModalOpen: (open: boolean) => void;
  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;
  isCartDrawerOpen: boolean;
  setIsCartDrawerOpen: (open: boolean) => void;
  isCmsModalOpen: boolean;
  setIsCmsModalOpen: (open: boolean) => void;

  // Cart
  cart: CartItem[];
  addToCart: (
    product: Product,
    quantity?: number,
    sizeLabel?: string,
    unitPrice?: number,
    openDrawer?: boolean
  ) => void;
  updateCartQuantity: (cartItemId: string, quantity: number) => void;
  removeFromCart: (cartItemId: string) => void;
  clearCart: () => void;
  cartCount: number;
  subtotalPKR: number;
  deliveryFeePKR: number;
  totalPKR: number;

  // CMS State & Actions
  cms: CMSStoreState;
  updateProduct: (updated: Product) => void;
  addProduct: (newProduct: Product) => void;
  deleteProduct: (productId: string) => void;
  updateCategories: (categories: FeaturedCategory[], menuCategories: string[]) => void;
  updatePaymentMethods: (methods: PaymentMethod[], deliveryFee: number, showPrices: boolean) => void;
  resetCmsToDefault: () => void;

  // Toast feedback
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const StoreContext = createContext<StoreContextValue | undefined>(undefined);

const CMS_STORAGE_KEY = 'cake_grand_shop_cms_v1';
const CART_STORAGE_KEY = 'cake_grand_shop_cart_v1';
const ORDER_PREF_KEY = 'cake_grand_shop_order_pref_v1';

function normalizePathname(pathname: string): PageRoute {
  const validRoutes: PageRoute[] = [
    '/',
    '/about-us',
    '/menu',
    '/cakes',
    '/gallery',
    '/order-online',
    '/contact',
  ];
  const clean = pathname.replace(/\/+$/, '') || '/';
  if (validRoutes.includes(clean as PageRoute)) {
    return clean as PageRoute;
  }
  return '/';
}

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentRoute, setCurrentRoute] = useState<PageRoute>(() =>
    normalizePathname(window.location.pathname)
  );
  const [activeMenuCategory, setActiveMenuCategory] = useState<string>('All');

  // Order Mode & Location state
  const [orderType, setOrderType] = useState<OrderType>(() => {
    try {
      const saved = localStorage.getItem(ORDER_PREF_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.orderType === 'DELIVERY' || parsed.orderType === 'TAKEAWAY') {
          return parsed.orderType;
        }
      }
    } catch {
      // ignore
    }
    return 'DELIVERY';
  });

  const [selectedLocation, setSelectedLocation] = useState<string>(() => {
    try {
      const saved = localStorage.getItem(ORDER_PREF_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.selectedLocation) return parsed.selectedLocation;
      }
    } catch {
      // ignore
    }
    return 'H-13, Islamabad';
  });

  const [hasConfirmedLocation, setHasConfirmedLocation] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem(ORDER_PREF_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return Boolean(parsed.confirmed);
      }
    } catch {
      // ignore
    }
    return false;
  });

  // Modals
  const [isLocationModalOpen, setIsLocationModalOpen] = useState<boolean>(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState<boolean>(false);
  const [isCmsModalOpen, setIsCmsModalOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // CMS State
  const [cms, setCms] = useState<CMSStoreState>(() => {
    try {
      const saved = localStorage.getItem(CMS_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && Array.isArray(parsed.products) && parsed.products.length > 0) {
          return parsed;
        }
      }
    } catch {
      // fallback to initial
    }
    return INITIAL_CMS_STATE;
  });

  // Cart State
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch {
      // ignore
    }
    return [];
  });

  // Save CMS to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(CMS_STORAGE_KEY, JSON.stringify(cms));
    } catch {
      // ignore storage errors
    }
  }, [cms]);

  // Save Cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch {
      // ignore
    }
  }, [cart]);

  // Save Order Preferences
  useEffect(() => {
    try {
      localStorage.setItem(
        ORDER_PREF_KEY,
        JSON.stringify({
          orderType,
          selectedLocation,
          confirmed: hasConfirmedLocation,
        })
      );
    } catch {
      // ignore
    }
  }, [orderType, selectedLocation, hasConfirmedLocation]);

  // First-visit Order/Location Popup after >= 10s dwell + user interaction intent
  useEffect(() => {
    if (hasConfirmedLocation) return;
    let interacted = false;
    let timerDone = false;

    const maybeOpen = () => {
      if (interacted && timerDone && !hasConfirmedLocation) {
        setIsLocationModalOpen(true);
        cleanup();
      }
    };

    const onInteract = () => {
      interacted = true;
      maybeOpen();
    };

    const timer = window.setTimeout(() => {
      timerDone = true;
      maybeOpen();
    }, 10500);

    window.addEventListener('scroll', onInteract, { passive: true });
    window.addEventListener('mousemove', onInteract, { passive: true });

    function cleanup() {
      window.clearTimeout(timer);
      window.removeEventListener('scroll', onInteract);
      window.removeEventListener('mousemove', onInteract);
    }

    return cleanup;
  }, [hasConfirmedLocation]);

  // Browser back/forward navigation
  useEffect(() => {
    const handlePopState = () => {
      setCurrentRoute(normalizePathname(window.location.pathname));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Dynamic SEO Title & Product JSON-LD Schema
  useEffect(() => {
    const titles: Record<PageRoute, string> = {
      '/': 'Cake Grand Shop | Cakes & Bakery in H-13 Islamabad',
      '/about-us': 'About Us | Cake Grand Shop H-13 Islamabad',
      '/menu': 'Our Menu | Cakes, Cupcakes & Desserts in Islamabad — Cake Grand Shop',
      '/cakes': 'Our Cakes & Custom Cake Orders | Cake Grand Shop Islamabad',
      '/gallery': 'Gallery | Sweet Moments at Cake Grand Shop H-13 Islamabad',
      '/order-online': 'Order Cakes Online in Islamabad | Cake Grand Shop H-13',
      '/contact': 'Contact Cake Grand Shop | Bakery in H-13 Islamabad',
    };
    document.title = titles[currentRoute] || titles['/'];
  }, [currentRoute]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    window.setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 3200);
  };

  const navigate = (
    route: PageRoute,
    options?: { menuCategory?: string; scrollToId?: string }
  ) => {
    if (options?.menuCategory) {
      setActiveMenuCategory(options.menuCategory);
    }
    if (window.location.pathname !== route) {
      window.history.pushState({}, '', route);
    }
    setCurrentRoute(route);

    if (options?.scrollToId) {
      window.setTimeout(() => {
        const el = document.getElementById(options.scrollToId!);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Cart functions
  const addToCart = (
    product: Product,
    quantity = 1,
    sizeLabel?: string,
    unitPrice?: number,
    openDrawer = false
  ) => {
    const chosenSize =
      sizeLabel ||
      (product.sizes && product.sizes.length > 1
        ? product.sizes[1].label
        : product.sizes?.[0]?.label || 'Standard');
    const chosenPrice =
      typeof unitPrice === 'number'
        ? unitPrice
        : product.sizes?.find((s) => s.label === chosenSize)?.price ?? product.price;

    const cartItemId = `${product.id}__${chosenSize}`;

    setCart((prev) => {
      const existingIndex = prev.findIndex((item) => item.cartItemId === cartItemId);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity,
        };
        return updated;
      }
      return [
        ...prev,
        {
          cartItemId,
          product,
          selectedSizeLabel: chosenSize,
          unitPrice: chosenPrice,
          quantity,
        },
      ];
    });

    showToast(`Added ${product.name} (${chosenSize}) to your order`);
    if (openDrawer) {
      setIsCartDrawerOpen(true);
    }
  };

  const updateCartQuantity = (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.cartItemId === cartItemId ? { ...item, quantity } : item))
    );
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotalPKR = cart.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const deliveryFeePKR =
    cart.length === 0 ? 0 : orderType === 'TAKEAWAY' ? 0 : cms.deliveryFeePKR;
  const totalPKR = subtotalPKR + deliveryFeePKR;

  // CMS Actions
  const updateProduct = (updated: Product) => {
    setCms((prev) => ({
      ...prev,
      products: prev.products.map((p) => (p.id === updated.id ? updated : p)),
    }));
    showToast(`Updated "${updated.name}" in Menu CMS`);
  };

  const addProduct = (newProduct: Product) => {
    setCms((prev) => ({
      ...prev,
      products: [newProduct, ...prev.products],
    }));
    showToast(`Added "${newProduct.name}" to Menu CMS`);
  };

  const deleteProduct = (productId: string) => {
    setCms((prev) => ({
      ...prev,
      products: prev.products.filter((p) => p.id !== productId),
    }));
    showToast('Removed product from Menu CMS');
  };

  const updateCategories = (categories: FeaturedCategory[], menuCategories: string[]) => {
    setCms((prev) => ({
      ...prev,
      categories,
      menuCategories,
    }));
    showToast('Updated categories in CMS');
  };

  const updatePaymentMethods = (
    paymentMethods: PaymentMethod[],
    deliveryFee: number,
    showPricesInPKR: boolean
  ) => {
    setCms((prev) => ({
      ...prev,
      paymentMethods,
      deliveryFeePKR: deliveryFee,
      showPricesInPKR,
    }));
    showToast('Saved store & payment settings');
  };

  const resetCmsToDefault = () => {
    setCms(INITIAL_CMS_STATE);
    localStorage.removeItem(CMS_STORAGE_KEY);
    showToast('Restored default Cake Grand Shop menu data');
  };

  // Structured Product Schema JSON-LD
  const productSchemaJson = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Cake Grand Shop Menu — H-13 Islamabad',
    itemListElement: cms.products.slice(0, 6).map((prod, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      item: {
        '@type': 'Product',
        name: prod.name,
        description: prod.shortDescription,
        brand: {
          '@type': 'Brand',
          name: BUSINESS_INFO.name,
        },
        offers: {
          '@type': 'Offer',
          priceCurrency: 'PKR',
          price: prod.price,
          availability: 'https://schema.org/InStock',
        },
      },
    })),
  };

  return (
    <StoreContext.Provider
      value={{
        currentRoute,
        navigate,
        activeMenuCategory,
        setActiveMenuCategory,
        orderType,
        setOrderType,
        selectedLocation,
        setSelectedLocation,
        hasConfirmedLocation,
        setHasConfirmedLocation,
        isLocationModalOpen,
        setIsLocationModalOpen,
        quickViewProduct,
        setQuickViewProduct,
        isCartDrawerOpen,
        setIsCartDrawerOpen,
        isCmsModalOpen,
        setIsCmsModalOpen,
        cart,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        cartCount,
        subtotalPKR,
        deliveryFeePKR,
        totalPKR,
        cms,
        updateProduct,
        addProduct,
        deleteProduct,
        updateCategories,
        updatePaymentMethods,
        resetCmsToDefault,
        toastMessage,
        showToast,
      }}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchemaJson) }}
      />
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = (): StoreContextValue => {
  const ctx = useContext(StoreContext);
  if (!ctx) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return ctx;
};
