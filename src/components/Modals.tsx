import React, { useState, useEffect } from 'react';
import {
  X,
  MapPin,
  Navigation,
  Truck,
  Store,
  Minus,
  Plus,
  Trash2,
  ShoppingBag,
  SlidersHorizontal,
  RotateCcw,
  Check,
} from 'lucide-react';
import { BUSINESS_INFO, IMAGES, Product } from '../data/initialStoreData';
import { OrderType, useStore } from '../context/StoreContext';
import { BakeryImage } from './BakeryImage';

/* =========================================================================
   1. ORDER / LOCATION POPUP ("Let’s Get Your Order Started")
   ========================================================================= */
export const OrderLocationModal: React.FC = () => {
  const {
    isLocationModalOpen,
    setIsLocationModalOpen,
    orderType,
    setOrderType,
    selectedLocation,
    setSelectedLocation,
    setHasConfirmedLocation,
    showToast,
  } = useStore();

  const [localOrderType, setLocalOrderType] = useState<OrderType>(orderType);
  const [localLocation, setLocalLocation] = useState<string>(selectedLocation || 'H-13, Islamabad');
  const [locating, setLocating] = useState(false);

  useEffect(() => {
    if (isLocationModalOpen) {
      setLocalOrderType(orderType);
      setLocalLocation(selectedLocation || 'H-13, Islamabad');
    }
  }, [isLocationModalOpen, orderType, selectedLocation]);

  if (!isLocationModalOpen) return null;

  const handleUseCurrentLocation = () => {
    setLocating(true);
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          // Default to H-13, Islamabad with coordinates confirmation
          setLocalLocation(
            latitude && longitude ? 'H-13, Islamabad (Current Location)' : 'H-13, Islamabad'
          );
          setLocating(false);
          showToast('Location detected: H-13, Islamabad');
        },
        () => {
          setLocalLocation('H-13, Islamabad');
          setLocating(false);
          showToast('Location set to H-13, Islamabad');
        },
        { timeout: 4000 }
      );
    } else {
      setLocalLocation('H-13, Islamabad');
      setLocating(false);
    }
  };

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    const finalLoc = localLocation.trim() || 'H-13, Islamabad';
    setOrderType(localOrderType);
    setSelectedLocation(finalLoc);
    setHasConfirmedLocation(true);
    setIsLocationModalOpen(false);
    showToast(
      localOrderType === 'DELIVERY'
        ? `Order mode set to Delivery (${finalLoc})`
        : 'Order mode set to Takeaway from H-13, Islamabad'
    );
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#23191C]/50 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="location-modal-title"
    >
      <div className="relative w-full max-w-lg bg-white border border-[#E6D5B8] rounded-2xl shadow-xl overflow-hidden">
        {/* Top soft blush decorative bar */}
        <div className="bg-[#FDF6F8] px-6 pt-7 pb-5 border-b border-[#F2E2E7] text-center relative">
          <button
            type="button"
            onClick={() => {
              setHasConfirmedLocation(true);
              setIsLocationModalOpen(false);
            }}
            aria-label="Close order popup"
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white border border-[#EED9E0] hover:border-[#C5A059] flex items-center justify-center text-[#544348] hover:text-[#23191C] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>

          <p className="text-xs font-medium tracking-[0.12em] text-[#C5A059] mb-1.5">
            CAKE GRAND SHOP · ISLAMABAD
          </p>
          <h2
            id="location-modal-title"
            className="font-serif text-2xl sm:text-3xl font-semibold text-[#23191C]"
          >
            Let’s Get Your Order Started
          </h2>
          <p className="mt-1.5 text-sm text-[#5E4B50]">
            Choose how you’d like to receive your order.
          </p>
        </div>

        <form onSubmit={handleContinue} className="p-6 sm:p-7 space-y-6">
          {/* DELIVERY / TAKEAWAY Selector */}
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setLocalOrderType('DELIVERY')}
              className={`flex flex-col items-center justify-center gap-2 p-4 rounded-xl border text-center transition-all cursor-pointer ${
                localOrderType === 'DELIVERY'
                  ? 'bg-[#FDF6F8] border-[#C5A059] text-[#23191C] shadow-xs'
                  : 'bg-white border-[#EFE6E9] text-[#6B545B] hover:border-[#D9BE8B]'
              }`}
            >
              <Truck
                className={`w-5 h-5 ${
                  localOrderType === 'DELIVERY' ? 'text-[#C5A059]' : 'text-[#876E75]'
                }`}
              />
              <span className="text-xs font-semibold tracking-[0.08em]">DELIVERY</span>
            </button>

            <button
              type="button"
              onClick={() => setLocalOrderType('TAKEAWAY')}
              className={`flex flex-col items-center justify-center gap-2 p-4 rounded-xl border text-center transition-all cursor-pointer ${
                localOrderType === 'TAKEAWAY'
                  ? 'bg-[#FDF6F8] border-[#C5A059] text-[#23191C] shadow-xs'
                  : 'bg-white border-[#EFE6E9] text-[#6B545B] hover:border-[#D9BE8B]'
              }`}
            >
              <Store
                className={`w-5 h-5 ${
                  localOrderType === 'TAKEAWAY' ? 'text-[#C5A059]' : 'text-[#876E75]'
                }`}
              />
              <span className="text-xs font-semibold tracking-[0.08em]">TAKEAWAY</span>
            </button>
          </div>

          {/* Select Your Location */}
          <div className="space-y-2.5">
            <label
              htmlFor="popup-location-input"
              className="block text-xs font-semibold tracking-[0.04em] text-[#23191C]"
            >
              Select Your Location
            </label>

            <div className="relative">
              <MapPin className="w-4 h-4 text-[#C5A059] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                id="popup-location-input"
                type="text"
                list="islamabad-sectors-list"
                value={localLocation}
                onChange={(e) => setLocalLocation(e.target.value)}
                placeholder="H-13, Islamabad"
                className="w-full pl-10 pr-4 py-3 text-sm bg-[#FAF6F7] border border-[#E6D5B8] rounded-lg text-[#23191C] focus:outline-none focus:border-[#C5A059] focus:bg-white transition-colors"
              />
              <datalist id="islamabad-sectors-list">
                {BUSINESS_INFO.areas.map((area) => (
                  <option key={area} value={area} />
                ))}
              </datalist>
            </div>

            <div className="flex items-center justify-between pt-1">
              <button
                type="button"
                onClick={handleUseCurrentLocation}
                disabled={locating}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-[#9E475E] hover:text-[#23191C] transition-colors cursor-pointer"
              >
                <Navigation className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>{locating ? 'Detecting location...' : 'Use Current Location'}</span>
              </button>

              <span className="text-[11px] text-[#876E75]">
                Main Branch: H-13, Islamabad
              </span>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 px-6 text-xs font-semibold tracking-[0.08em] uppercase text-white bg-[#C5A059] hover:bg-[#B08B44] rounded-lg transition-colors cursor-pointer"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
};

/* =========================================================================
   2. PRODUCT DETAIL POPUP (Quick View Modal)
   ========================================================================= */
export const ProductQuickViewModal: React.FC = () => {
  const { quickViewProduct, setQuickViewProduct, addToCart, navigate, cms } = useStore();
  const [selectedSizeIndex, setSelectedSizeIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (quickViewProduct) {
      // Default to 2 Pounds if available, else index 0
      const defaultIdx =
        quickViewProduct.sizes && quickViewProduct.sizes.length > 1 ? 1 : 0;
      setSelectedSizeIndex(defaultIdx);
      setQuantity(1);
    }
  }, [quickViewProduct]);

  if (!quickViewProduct) return null;

  const sizes =
    quickViewProduct.sizes && quickViewProduct.sizes.length > 0
      ? quickViewProduct.sizes
      : [{ label: 'Standard Size', price: quickViewProduct.price }];

  const activeSize = sizes[selectedSizeIndex] || sizes[0];

  const handleAddToCart = () => {
    addToCart(quickViewProduct, quantity, activeSize.label, activeSize.price, true);
    setQuickViewProduct(null);
  };

  const handleOrderNow = () => {
    addToCart(quickViewProduct, quantity, activeSize.label, activeSize.price, false);
    setQuickViewProduct(null);
    navigate('/order-online', { scrollToId: 'checkout-section' });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#23191C]/55 backdrop-blur-xs overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="quickview-title"
    >
      <div className="relative w-full max-w-3xl bg-white border border-[#E6D5B8] rounded-2xl shadow-xl overflow-hidden my-8">
        <button
          type="button"
          onClick={() => setQuickViewProduct(null)}
          aria-label="Close product details"
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/90 border border-[#EED9E0] hover:border-[#C5A059] flex items-center justify-center text-[#23191C] transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left: Large Product Image */}
          <div className="bg-[#FAF6F7] min-h-[280px] md:min-h-[420px]">
            <BakeryImage
              src={quickViewProduct.image}
              alt={quickViewProduct.name}
              containerClassName="w-full h-full"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Right: Contiguous Purchase Module */}
          <div className="p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs text-[#876E75]">
                <span>{quickViewProduct.category}</span>
                <span aria-hidden="true">·</span>
                <span>Freshly Prepared in H-13, Islamabad</span>
              </div>

              <h2
                id="quickview-title"
                className="font-serif text-2xl sm:text-3xl font-semibold text-[#23191C]"
              >
                {quickViewProduct.name}
              </h2>

              <div className="text-xl font-semibold text-[#9E475E] tabular-nums">
                {cms.showPricesInPKR && activeSize.price > 0
                  ? `PKR ${(activeSize.price * quantity).toLocaleString()}`
                  : 'Price on Inquiry'}
              </div>

              <p className="text-sm text-[#5E4B50] leading-relaxed">
                {quickViewProduct.fullDescription || quickViewProduct.shortDescription}
              </p>

              {/* Available Sizes */}
              <div className="space-y-2 pt-2">
                <label className="block text-xs font-semibold text-[#23191C]">
                  Available Sizes / Options
                </label>
                <div className="grid grid-cols-1 gap-2">
                  {sizes.map((size, idx) => {
                    const isSelected = idx === selectedSizeIndex;
                    return (
                      <button
                        key={size.label}
                        type="button"
                        onClick={() => setSelectedSizeIndex(idx)}
                        className={`flex items-center justify-between px-3.5 py-2.5 rounded-lg border text-xs font-medium transition-colors cursor-pointer ${
                          isSelected
                            ? 'bg-[#FDF6F8] border-[#C5A059] text-[#23191C]'
                            : 'bg-white border-[#EFE6E9] text-[#5E4B50] hover:border-[#D9BE8B]'
                        }`}
                      >
                        <span>{size.label}</span>
                        <span className="font-semibold tabular-nums">
                          {cms.showPricesInPKR && size.price > 0
                            ? `PKR ${size.price.toLocaleString()}`
                            : 'Inquire'}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center justify-between pt-2">
                <span className="text-xs font-semibold text-[#23191C]">Quantity</span>
                <div className="inline-flex items-center border border-[#E6D5B8] rounded-lg bg-[#FAF6F7]">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    aria-label="Decrease quantity"
                    className="w-9 h-9 flex items-center justify-center text-[#23191C] hover:bg-[#FDF6F8] transition-colors cursor-pointer"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-10 text-center text-sm font-semibold tabular-nums text-[#23191C]">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => q + 1)}
                    aria-label="Increase quantity"
                    className="w-9 h-9 flex items-center justify-center text-[#23191C] hover:bg-[#FDF6F8] transition-colors cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-[#F3E9EC]">
              <button
                type="button"
                onClick={handleAddToCart}
                className="py-3 px-4 text-xs font-semibold tracking-[0.06em] uppercase text-[#23191C] bg-[#FDF6F8] hover:bg-[#F7E3EA] border border-[#E6D5B8] rounded-lg transition-colors whitespace-nowrap cursor-pointer"
              >
                Add to Cart
              </button>
              <button
                type="button"
                onClick={handleOrderNow}
                className="py-3 px-4 text-xs font-semibold tracking-[0.06em] uppercase text-white bg-[#C5A059] hover:bg-[#B08B44] rounded-lg transition-colors whitespace-nowrap cursor-pointer"
              >
                Order Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* =========================================================================
   3. SLIDE-OVER CART DRAWER
   ========================================================================= */
export const CartDrawer: React.FC = () => {
  const {
    isCartDrawerOpen,
    setIsCartDrawerOpen,
    cart,
    updateCartQuantity,
    removeFromCart,
    subtotalPKR,
    deliveryFeePKR,
    totalPKR,
    orderType,
    selectedLocation,
    navigate,
  } = useStore();

  if (!isCartDrawerOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-[#23191C]/45 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-label="Shopping Cart"
    >
      <div className="w-full max-w-md bg-white h-full shadow-2xl border-l border-[#E6D5B8] flex flex-col justify-between">
        {/* Top Header */}
        <div className="p-5 sm:p-6 bg-[#FDF6F8] border-b border-[#EFE2E6] flex items-center justify-between">
          <div>
            <h2 className="font-serif text-2xl font-semibold text-[#23191C]">Your Cake Order</h2>
            <p className="text-xs text-[#6B545B] mt-0.5">
              {orderType === 'DELIVERY'
                ? `Delivery to ${selectedLocation}`
                : 'Takeaway from H-13, Islamabad'}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setIsCartDrawerOpen(false)}
            aria-label="Close cart drawer"
            className="w-9 h-9 rounded-full bg-white border border-[#EED9E0] flex items-center justify-center text-[#23191C] hover:border-[#C5A059] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12 space-y-4">
              <div className="w-14 h-14 rounded-full bg-[#FDF6F8] border border-[#E6D5B8] flex items-center justify-center text-[#C5A059]">
                <ShoppingBag className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <p className="font-serif text-xl font-semibold text-[#23191C]">
                  Your cart is currently empty
                </p>
                <p className="text-xs text-[#6B545B] max-w-xs">
                  Explore our freshly baked cakes, cupcakes, brownies, and sweet treats.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setIsCartDrawerOpen(false);
                  navigate('/menu');
                }}
                className="px-5 py-2.5 text-xs font-semibold tracking-[0.06em] uppercase text-white bg-[#C5A059] hover:bg-[#B08B44] rounded-lg transition-colors cursor-pointer"
              >
                Explore Menu
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.cartItemId}
                className="flex gap-3.5 p-3.5 rounded-xl bg-[#FAF6F7] border border-[#EFE6E9]"
              >
                <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0">
                  <BakeryImage
                    src={item.product.image}
                    alt={item.product.name}
                    containerClassName="w-full h-full"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-serif text-base font-semibold text-[#23191C] truncate">
                      {item.product.name}
                    </h3>
                    <button
                      type="button"
                      onClick={() => removeFromCart(item.cartItemId)}
                      aria-label={`Remove ${item.product.name}`}
                      className="text-[#876E75] hover:text-[#9E475E] p-1 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <p className="text-xs text-[#6B545B]">{item.selectedSizeLabel}</p>

                  <div className="mt-2.5 flex items-center justify-between">
                    <div className="inline-flex items-center border border-[#E6D5B8] rounded-md bg-white">
                      <button
                        type="button"
                        onClick={() => updateCartQuantity(item.cartItemId, item.quantity - 1)}
                        className="w-7 h-7 flex items-center justify-center text-xs text-[#23191C] hover:bg-[#FDF6F8] cursor-pointer"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-7 text-center text-xs font-semibold tabular-nums">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateCartQuantity(item.cartItemId, item.quantity + 1)}
                        className="w-7 h-7 flex items-center justify-center text-xs text-[#23191C] hover:bg-[#FDF6F8] cursor-pointer"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                    <span className="text-xs font-semibold text-[#23191C] tabular-nums">
                      PKR {(item.unitPrice * item.quantity).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Bottom Summary & Buttons */}
        {cart.length > 0 && (
          <div className="p-5 sm:p-6 bg-[#FAF6F7] border-t border-[#E6D5B8] space-y-4">
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-[#5E4B50]">
                <span>Subtotal</span>
                <span className="tabular-nums font-medium">
                  PKR {subtotalPKR.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between text-[#5E4B50]">
                <span>
                  Delivery Fee ({orderType === 'TAKEAWAY' ? 'Takeaway Pickup' : selectedLocation})
                </span>
                <span className="tabular-nums font-medium">
                  {deliveryFeePKR === 0 ? 'Free' : `PKR ${deliveryFeePKR.toLocaleString()}`}
                </span>
              </div>
              <div className="pt-2 border-t border-[#EED9E0] flex justify-between text-sm font-semibold text-[#23191C]">
                <span>Total</span>
                <span className="tabular-nums text-[#9E475E]">
                  PKR {totalPKR.toLocaleString()}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-2.5">
              <button
                type="button"
                onClick={() => {
                  setIsCartDrawerOpen(false);
                  navigate('/order-online', { scrollToId: 'checkout-section' });
                }}
                className="w-full py-3 px-4 text-xs font-semibold tracking-[0.08em] uppercase text-white bg-[#C5A059] hover:bg-[#B08B44] rounded-lg transition-colors cursor-pointer"
              >
                PROCEED TO CHECKOUT
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsCartDrawerOpen(false);
                  navigate('/menu');
                }}
                className="w-full py-2.5 px-4 text-xs font-semibold tracking-[0.06em] uppercase text-[#23191C] bg-white hover:bg-[#FDF6F8] border border-[#E6D5B8] rounded-lg transition-colors cursor-pointer"
              >
                CONTINUE SHOPPING
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

/* =========================================================================
   4. CMS STUDIO MODAL (Editable Products, Prices, Images, Categories, Payments)
   ========================================================================= */
export const CmsManagerModal: React.FC = () => {
  const {
    isCmsModalOpen,
    setIsCmsModalOpen,
    cms,
    updateProduct,
    addProduct,
    deleteProduct,
    updateCategories,
    updatePaymentMethods,
    resetCmsToDefault,
  } = useStore();

  const [activeTab, setActiveTab] = useState<'products' | 'categories' | 'settings'>('products');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [deliveryFeeInput, setDeliveryFeeInput] = useState(cms.deliveryFeePKR);
  const [showPricesToggle, setShowPricesToggle] = useState(cms.showPricesInPKR);
  const [localPayments, setLocalPayments] = useState(cms.paymentMethods);

  useEffect(() => {
    setDeliveryFeeInput(cms.deliveryFeePKR);
    setShowPricesToggle(cms.showPricesInPKR);
    setLocalPayments(cms.paymentMethods);
  }, [cms]);

  if (!isCmsModalOpen) return null;

  const handleCreateNewProduct = () => {
    const newProd: Product = {
      id: `prod-${Date.now()}`,
      name: 'New Signature Cake',
      category: 'Cakes',
      shortDescription: 'Freshly baked celebration cake crafted in H-13, Islamabad.',
      fullDescription:
        'Custom recipe prepared with premium ingredients at Cake Grand Shop, H-13 Islamabad.',
      price: 2500,
      sizes: [
        { label: '1 Pound', price: 1500 },
        { label: '2 Pounds', price: 2500 },
      ],
      image: IMAGES.heroCelebration,
      featuredOnHome: false,
      prepTime: 'Freshly prepared daily',
    };
    addProduct(newProd);
    setEditingProduct(newProd);
  };

  const handleSaveProductEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;
    updateProduct(editingProduct);
    setEditingProduct(null);
  };

  const handleAddMenuCategory = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = newCategoryName.trim();
    if (!trimmed || cms.menuCategories.includes(trimmed)) return;
    updateCategories(cms.categories, [...cms.menuCategories, trimmed]);
    setNewCategoryName('');
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#23191C]/60 backdrop-blur-xs overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-label="Cake Grand Shop CMS Manager"
    >
      <div className="w-full max-w-4xl bg-white border border-[#E6D5B8] rounded-2xl shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-5 bg-[#FDF6F8] border-b border-[#EFE2E6] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <SlidersHorizontal className="w-5 h-5 text-[#C5A059]" />
            <div>
              <h2 className="font-serif text-2xl font-semibold text-[#23191C]">
                Cake Grand Shop — Live CMS Studio
              </h2>
              <p className="text-xs text-[#6B545B]">
                Edit products, PKR prices, images, categories, and payment methods in real time.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={resetCmsToDefault}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#6B545B] hover:text-[#23191C] bg-white border border-[#EED9E0] rounded-lg cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Defaults</span>
            </button>
            <button
              type="button"
              onClick={() => setIsCmsModalOpen(false)}
              aria-label="Close CMS Studio"
              className="w-9 h-9 rounded-full bg-white border border-[#EED9E0] flex items-center justify-center text-[#23191C] cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="px-6 pt-3 bg-[#FAF6F7] border-b border-[#EFE2E6] flex gap-2">
          <button
            type="button"
            onClick={() => setActiveTab('products')}
            className={`px-4 py-2.5 text-xs font-semibold rounded-t-lg border-b-2 transition-colors cursor-pointer ${
              activeTab === 'products'
                ? 'bg-white text-[#23191C] border-[#C5A059]'
                : 'text-[#6B545B] border-transparent hover:text-[#23191C]'
            }`}
          >
            Products, Prices &amp; Images ({cms.products.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('categories')}
            className={`px-4 py-2.5 text-xs font-semibold rounded-t-lg border-b-2 transition-colors cursor-pointer ${
              activeTab === 'categories'
                ? 'bg-white text-[#23191C] border-[#C5A059]'
                : 'text-[#6B545B] border-transparent hover:text-[#23191C]'
            }`}
          >
            Categories ({cms.menuCategories.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('settings')}
            className={`px-4 py-2.5 text-xs font-semibold rounded-t-lg border-b-2 transition-colors cursor-pointer ${
              activeTab === 'settings'
                ? 'bg-white text-[#23191C] border-[#C5A059]'
                : 'text-[#6B545B] border-transparent hover:text-[#23191C]'
            }`}
          >
            Payment Methods &amp; Delivery
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {activeTab === 'products' && (
            <>
              {editingProduct ? (
                <form
                  onSubmit={handleSaveProductEdit}
                  className="bg-[#FAF6F7] p-5 rounded-xl border border-[#E6D5B8] space-y-4"
                >
                  <div className="flex items-center justify-between border-b border-[#EFE2E6] pb-3">
                    <h3 className="font-serif text-xl font-semibold text-[#23191C]">
                      Editing: {editingProduct.name}
                    </h3>
                    <button
                      type="button"
                      onClick={() => setEditingProduct(null)}
                      className="text-xs text-[#6B545B] hover:text-[#23191C]"
                    >
                      Cancel
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-semibold mb-1">Product Name</label>
                      <input
                        type="text"
                        required
                        value={editingProduct.name}
                        onChange={(e) =>
                          setEditingProduct({ ...editingProduct, name: e.target.value })
                        }
                        className="w-full px-3 py-2 text-sm bg-white border border-[#E6D5B8] rounded-lg"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold mb-1">Category</label>
                      <select
                        value={editingProduct.category}
                        onChange={(e) =>
                          setEditingProduct({
                            ...editingProduct,
                            category: e.target.value as Product['category'],
                          })
                        }
                        className="w-full px-3 py-2 text-sm bg-white border border-[#E6D5B8] rounded-lg"
                      >
                        {cms.menuCategories
                          .filter((c) => c !== 'All')
                          .map((cat) => (
                            <option key={cat} value={cat}>
                              {cat}
                            </option>
                          ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold mb-1">Base Price (PKR)</label>
                      <input
                        type="number"
                        min={0}
                        required
                        value={editingProduct.price}
                        onChange={(e) => {
                          const val = Number(e.target.value) || 0;
                          setEditingProduct({
                            ...editingProduct,
                            price: val,
                            sizes: editingProduct.sizes.map((s, i) =>
                              i === 1 || editingProduct.sizes.length === 1
                                ? { ...s, price: val }
                                : s
                            ),
                          });
                        }}
                        className="w-full px-3 py-2 text-sm bg-white border border-[#E6D5B8] rounded-lg tabular-nums"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold mb-1">Image URL</label>
                      <input
                        type="text"
                        value={editingProduct.image}
                        onChange={(e) =>
                          setEditingProduct({ ...editingProduct, image: e.target.value })
                        }
                        className="w-full px-3 py-2 text-sm bg-white border border-[#E6D5B8] rounded-lg"
                      />
                      <div className="flex flex-wrap gap-1.5 mt-1.5">
                        {Object.entries(IMAGES).map(([key, url]) => (
                          <button
                            key={key}
                            type="button"
                            onClick={() => setEditingProduct({ ...editingProduct, image: url })}
                            className="text-[11px] px-2 py-0.5 bg-white border border-[#EED9E0] rounded hover:border-[#C5A059]"
                          >
                            Use {key}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold mb-1">Short Description</label>
                      <textarea
                        rows={3}
                        value={editingProduct.shortDescription}
                        onChange={(e) =>
                          setEditingProduct({
                            ...editingProduct,
                            shortDescription: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 text-sm bg-white border border-[#E6D5B8] rounded-lg"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <label className="inline-flex items-center gap-2 text-xs font-medium cursor-pointer">
                      <input
                        type="checkbox"
                        checked={Boolean(editingProduct.featuredOnHome)}
                        onChange={(e) =>
                          setEditingProduct({
                            ...editingProduct,
                            featuredOnHome: e.target.checked,
                          })
                        }
                        className="accent-[#C5A059]"
                      />
                      <span>Feature in Home Page &ldquo;Customer Favorites&rdquo;</span>
                    </label>

                    <button
                      type="submit"
                      className="px-5 py-2.5 text-xs font-semibold text-white bg-[#C5A059] hover:bg-[#B08B44] rounded-lg cursor-pointer"
                    >
                      Save Product Changes
                    </button>
                  </div>
                </form>
              ) : (
                <div className="flex items-center justify-between">
                  <p className="text-xs text-[#5E4B50]">
                    Click any product below to edit its name, PKR price, description, or photo.
                  </p>
                  <button
                    type="button"
                    onClick={handleCreateNewProduct}
                    className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#C5A059] hover:bg-[#B08B44] rounded-lg cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add New Product</span>
                  </button>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {cms.products.map((prod) => (
                  <div
                    key={prod.id}
                    className="flex items-center justify-between gap-3 p-3 rounded-xl border border-[#EFE6E9] hover:border-[#C5A059] bg-white"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0">
                        <BakeryImage
                          src={prod.image}
                          alt={prod.name}
                          containerClassName="w-full h-full"
                        />
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-sm font-semibold text-[#23191C] truncate">
                          {prod.name}
                        </h4>
                        <p className="text-xs text-[#6B545B] tabular-nums">
                          {prod.category} · PKR {prod.price.toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        type="button"
                        onClick={() => setEditingProduct(prod)}
                        className="px-3 py-1.5 text-xs font-medium bg-[#FDF6F8] hover:bg-[#F7E3EA] text-[#23191C] rounded-md cursor-pointer"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => deleteProduct(prod.id)}
                        aria-label={`Delete ${prod.name}`}
                        className="p-1.5 text-[#876E75] hover:text-[#9E475E] cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {activeTab === 'categories' && (
            <div className="space-y-6">
              <form onSubmit={handleAddMenuCategory} className="flex gap-2 max-w-md">
                <input
                  type="text"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  placeholder="Add new menu category (e.g. Pastries)"
                  className="flex-1 px-3.5 py-2 text-sm bg-[#FAF6F7] border border-[#E6D5B8] rounded-lg"
                />
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold text-white bg-[#C5A059] rounded-lg cursor-pointer"
                >
                  Add Category
                </button>
              </form>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {cms.categories.map((cat, idx) => (
                  <div
                    key={cat.id}
                    className="p-4 rounded-xl border border-[#EFE6E9] bg-[#FAF6F7] space-y-2.5"
                  >
                    <label className="block text-xs font-semibold text-[#23191C]">
                      Featured Category #{idx + 1} Title
                    </label>
                    <input
                      type="text"
                      value={cat.name}
                      onChange={(e) => {
                        const updated = [...cms.categories];
                        updated[idx] = { ...cat, name: e.target.value };
                        updateCategories(updated, cms.menuCategories);
                      }}
                      className="w-full px-3 py-2 text-sm bg-white border border-[#E6D5B8] rounded-lg"
                    />
                    <label className="block text-xs font-semibold text-[#23191C]">
                      Description
                    </label>
                    <textarea
                      rows={2}
                      value={cat.description}
                      onChange={(e) => {
                        const updated = [...cms.categories];
                        updated[idx] = { ...cat, description: e.target.value };
                        updateCategories(updated, cms.menuCategories);
                      }}
                      className="w-full px-3 py-2 text-xs bg-white border border-[#E6D5B8] rounded-lg"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-[#FAF6F7] p-4 rounded-xl border border-[#EFE6E9]">
                <div>
                  <label className="block text-xs font-semibold text-[#23191C] mb-1">
                    Standard Delivery Fee in Islamabad (PKR)
                  </label>
                  <input
                    type="number"
                    min={0}
                    value={deliveryFeeInput}
                    onChange={(e) => setDeliveryFeeInput(Number(e.target.value) || 0)}
                    className="w-full px-3.5 py-2 text-sm bg-white border border-[#E6D5B8] rounded-lg tabular-nums"
                  />
                </div>
                <div className="flex items-center pt-5">
                  <label className="inline-flex items-center gap-2.5 text-xs font-medium text-[#23191C] cursor-pointer">
                    <input
                      type="checkbox"
                      checked={showPricesToggle}
                      onChange={(e) => setShowPricesToggle(e.target.checked)}
                      className="accent-[#C5A059] w-4 h-4"
                    />
                    <span>Show Menu Prices in PKR (Uncheck to show &ldquo;Price on Inquiry&rdquo;)</span>
                  </label>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="font-serif text-lg font-semibold text-[#23191C]">
                  Accepted Payment Methods (Checkout)
                </h3>
                {localPayments.map((pm, idx) => (
                  <div
                    key={pm.id}
                    className="p-4 rounded-xl border border-[#EFE6E9] bg-white flex items-start justify-between gap-4"
                  >
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={pm.enabled}
                          onChange={(e) => {
                            const next = [...localPayments];
                            next[idx] = { ...pm, enabled: e.target.checked };
                            setLocalPayments(next);
                          }}
                          className="accent-[#C5A059]"
                        />
                        <input
                          type="text"
                          value={pm.name}
                          onChange={(e) => {
                            const next = [...localPayments];
                            next[idx] = { ...pm, name: e.target.value };
                            setLocalPayments(next);
                          }}
                          className="text-sm font-semibold text-[#23191C] border-b border-transparent focus:border-[#C5A059] focus:outline-none"
                        />
                      </div>
                      <input
                        type="text"
                        value={pm.description}
                        onChange={(e) => {
                          const next = [...localPayments];
                          next[idx] = { ...pm, description: e.target.value };
                          setLocalPayments(next);
                        }}
                        className="w-full text-xs text-[#5E4B50] bg-[#FAF6F7] px-2.5 py-1.5 rounded border border-[#EFE6E9]"
                      />
                    </div>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={() =>
                  updatePaymentMethods(localPayments, deliveryFeeInput, showPricesToggle)
                }
                className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-[#C5A059] hover:bg-[#B08B44] rounded-lg cursor-pointer"
              >
                <Check className="w-4 h-4" />
                <span>Save Store &amp; Payment Settings</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
