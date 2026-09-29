import React, { useState } from 'react';
import {
  Truck,
  Store,
  MapPin,
  Plus,
  Minus,
  Trash2,
  CheckCircle2,
  Phone,
  MessageCircle,
  SlidersHorizontal,
} from 'lucide-react';
import { BUSINESS_INFO, Product } from '../data/initialStoreData';
import { CartItem, useStore } from '../context/StoreContext';
import { BakeryImage } from '../components/BakeryImage';

interface OrderReceipt {
  orderNumber: string;
  customerName: string;
  phone: string;
  email: string;
  address: string;
  landmark: string;
  notes: string;
  paymentMethod: string;
  orderType: string;
  location: string;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
}

export const OrderOnlinePage: React.FC = () => {
  const {
    cms,
    orderType,
    setOrderType,
    selectedLocation,
    setSelectedLocation,
    cart,
    addToCart,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    subtotalPKR,
    deliveryFeePKR,
    totalPKR,
    navigate,
    showToast,
    setIsCmsModalOpen,
  } = useStore();

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [itemQuantities, setItemQuantities] = useState<Record<string, number>>({});
  const [showCheckoutForm, setShowCheckoutForm] = useState<boolean>(true);

  // Checkout customer fields
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [landmark, setLandmark] = useState('');
  const [orderNotes, setOrderNotes] = useState('');

  const enabledPayments = cms.paymentMethods.filter((pm) => pm.enabled);
  const [selectedPaymentId, setSelectedPaymentId] = useState<string>(
    enabledPayments[0]?.id || 'pay-cod'
  );

  const [confirmedOrder, setConfirmedOrder] = useState<OrderReceipt | null>(null);

  const filteredProducts =
    selectedCategory === 'All'
      ? cms.products
      : cms.products.filter((p) => p.category === selectedCategory);

  const getProductQty = (id: string) => itemQuantities[id] || 1;
  const setProductQty = (id: string, qty: number) => {
    setItemQuantities((prev) => ({ ...prev, [id]: Math.max(1, qty) }));
  };

  const handleContinueLocation = (e: React.FormEvent) => {
    e.preventDefault();
    showToast(
      orderType === 'DELIVERY'
        ? `Delivery location confirmed: ${selectedLocation}`
        : 'Takeaway pickup from Cake Grand Shop, H-13 Islamabad'
    );
    const menuEl = document.getElementById('order-menu-section');
    if (menuEl) menuEl.scrollIntoView({ behavior: 'smooth' });
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) {
      showToast('Please add at least one cake or treat to your cart before placing an order.');
      return;
    }

    const chosenPayment =
      enabledPayments.find((p) => p.id === selectedPaymentId)?.name || 'Cash on Delivery (COD)';

    const receipt: OrderReceipt = {
      orderNumber: `CGS-${Math.floor(10000 + Math.random() * 90000)}`,
      customerName: fullName.trim(),
      phone: phone.trim(),
      email: email.trim(),
      address:
        orderType === 'TAKEAWAY'
          ? 'Takeaway Pickup — Cake Grand Shop, H-13, Islamabad'
          : `${deliveryAddress.trim()}, ${selectedLocation}`,
      landmark: landmark.trim(),
      notes: orderNotes.trim(),
      paymentMethod: chosenPayment,
      orderType,
      location: selectedLocation,
      items: [...cart],
      subtotal: subtotalPKR,
      deliveryFee: deliveryFeePKR,
      total: totalPKR,
    };

    setConfirmedOrder(receipt);
    clearCart();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-white min-h-screen">
      {/* =================================================================
          HERO SECTION
          ================================================================= */}
      <section className="bg-[#FDF6F8] border-b border-[#EFE2E6] py-12 sm:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center space-y-3">
          <p className="text-xs font-semibold tracking-[0.16em] uppercase text-[#C5A059]">
            FRESH DELIVERY &amp; TAKEAWAY · H-13 ISLAMABAD
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl font-semibold text-[#23191C]">
            Order Your Favorites Online
          </h1>
          <p className="text-base sm:text-lg text-[#544348]">
            Choose your favorite treats and place your order easily.
          </p>
        </div>
      </section>

      {/* =================================================================
          ORDER CONFIRMATION STATE (Shown after placing order)
          ================================================================= */}
      {confirmedOrder ? (
        <section className="py-14 sm:py-20">
          <div className="max-w-2xl mx-auto px-4 sm:px-6">
            <div className="bg-[#FAF6F7] border border-[#C5A059] rounded-2xl p-6 sm:p-10 space-y-6 text-center">
              <div className="w-14 h-14 rounded-full bg-white border border-[#C5A059] flex items-center justify-center mx-auto text-[#C5A059]">
                <CheckCircle2 className="w-7 h-7" />
              </div>

              <div className="space-y-1.5">
                <p className="text-xs font-semibold tracking-[0.14em] uppercase text-[#C5A059]">
                  Order Confirmed
                </p>
                <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#23191C]">
                  Thank you for your order!
                </h2>
                <p className="text-sm text-[#5E4B50]">
                  Your order has been received by Cake Grand Shop in H-13, Islamabad.
                </p>
              </div>

              {/* Order Details Card */}
              <div className="bg-white p-5 sm:p-6 rounded-xl border border-[#E6D5B8] text-left space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pb-4 border-b border-[#F3E9EC] text-xs">
                  <div>
                    <span className="text-[#876E75] block">Order Number</span>
                    <strong className="text-sm text-[#23191C] tabular-nums">
                      {confirmedOrder.orderNumber}
                    </strong>
                  </div>
                  <div>
                    <span className="text-[#876E75] block">Customer Name</span>
                    <strong className="text-sm text-[#23191C]">
                      {confirmedOrder.customerName}
                    </strong>
                  </div>
                  <div>
                    <span className="text-[#876E75] block">Contact Number</span>
                    <strong className="text-sm text-[#23191C] tabular-nums">
                      {confirmedOrder.phone}
                    </strong>
                  </div>
                </div>

                {/* Order Summary */}
                <div className="space-y-2">
                  <h3 className="font-serif text-lg font-semibold text-[#23191C]">
                    Order Summary
                  </h3>
                  <div className="divide-y divide-[#F5ECEF] text-xs">
                    {confirmedOrder.items.map((item) => (
                      <div key={item.cartItemId} className="py-2 flex justify-between gap-2">
                        <span>
                          {item.quantity}x {item.product.name} ({item.selectedSizeLabel})
                        </span>
                        <span className="font-semibold tabular-nums">
                          PKR {(item.unitPrice * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-[#EED9E0] space-y-1 text-xs">
                  <div className="flex justify-between text-[#5E4B50]">
                    <span>Subtotal</span>
                    <span className="tabular-nums">
                      PKR {confirmedOrder.subtotal.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between text-[#5E4B50]">
                    <span>Delivery Fee ({confirmedOrder.orderType})</span>
                    <span className="tabular-nums">
                      {confirmedOrder.deliveryFee === 0
                        ? 'Free'
                        : `PKR ${confirmedOrder.deliveryFee.toLocaleString()}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm font-semibold text-[#23191C] pt-1">
                    <span>Total ({confirmedOrder.paymentMethod})</span>
                    <span className="text-[#9E475E] tabular-nums">
                      PKR {confirmedOrder.total.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* CALL US & WHATSAPP US Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <a
                  href={BUSINESS_INFO.phoneTelHref}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs font-semibold tracking-[0.08em] uppercase text-[#23191C] bg-white hover:bg-[#FDF6F8] border border-[#E6D5B8] rounded-lg transition-colors whitespace-nowrap"
                >
                  <Phone className="w-4 h-4 text-[#C5A059]" />
                  <span>CALL US</span>
                </a>

                <a
                  href={`https://wa.me/${BUSINESS_INFO.whatsappNum}?text=${encodeURIComponent(
                    `Assalam-o-Alaikum Cake Grand Shop! Here is my confirmed order ${confirmedOrder.orderNumber} (${confirmedOrder.orderType}). Customer: ${confirmedOrder.customerName}, Phone: ${confirmedOrder.phone}, Total: PKR ${confirmedOrder.total.toLocaleString()}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs font-semibold tracking-[0.08em] uppercase text-white bg-[#C5A059] hover:bg-[#B08B44] rounded-lg transition-colors whitespace-nowrap"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WHATSAPP US</span>
                </a>
              </div>

              <button
                type="button"
                onClick={() => setConfirmedOrder(null)}
                className="text-xs font-medium text-[#9E475E] hover:underline cursor-pointer"
              >
                Place Another Order
              </button>
            </div>
          </div>
        </section>
      ) : (
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
          {/* =================================================================
              1. ORDER TYPE (Two large cards: DELIVERY & TAKEAWAY)
              & 2. LOCATION ("Where Should We Deliver?")
              ================================================================= */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Two Large Order Type Cards */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setOrderType('DELIVERY')}
                className={`p-6 rounded-2xl border text-left transition-all cursor-pointer ${
                  orderType === 'DELIVERY'
                    ? 'bg-[#FDF6F8] border-[#C5A059] shadow-xs'
                    : 'bg-white border-[#EFE6E9] hover:border-[#D9BE8B]'
                }`}
              >
                <div className="w-11 h-11 rounded-full bg-white border border-[#E6D5B8] flex items-center justify-center text-[#C5A059] mb-4">
                  <Truck className="w-5 h-5" />
                </div>
                <h2 className="font-serif text-2xl font-semibold text-[#23191C]">DELIVERY</h2>
                <p className="mt-1.5 text-xs sm:text-sm text-[#5E4B50]">
                  Have your order delivered to your location.
                </p>
              </button>

              <button
                type="button"
                onClick={() => setOrderType('TAKEAWAY')}
                className={`p-6 rounded-2xl border text-left transition-all cursor-pointer ${
                  orderType === 'TAKEAWAY'
                    ? 'bg-[#FDF6F8] border-[#C5A059] shadow-xs'
                    : 'bg-white border-[#EFE6E9] hover:border-[#D9BE8B]'
                }`}
              >
                <div className="w-11 h-11 rounded-full bg-white border border-[#E6D5B8] flex items-center justify-center text-[#C5A059] mb-4">
                  <Store className="w-5 h-5" />
                </div>
                <h2 className="font-serif text-2xl font-semibold text-[#23191C]">TAKEAWAY</h2>
                <p className="mt-1.5 text-xs sm:text-sm text-[#5E4B50]">
                  Place your order and collect it from Cake Grand Shop.
                </p>
              </button>
            </div>

            {/* Location Selection Box */}
            <form
              onSubmit={handleContinueLocation}
              className="lg:col-span-5 bg-[#FAF6F7] p-6 rounded-2xl border border-[#E6D5B8] space-y-4"
            >
              <h2 className="font-serif text-2xl font-semibold text-[#23191C]">
                Where Should We Deliver?
              </h2>

              <div>
                <label className="block text-xs font-semibold text-[#23191C] mb-1.5">
                  Select City / Area
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-[#C5A059] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <select
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 text-sm bg-white border border-[#E6D5B8] rounded-lg text-[#23191C] focus:outline-none focus:border-[#C5A059]"
                  >
                    {BUSINESS_INFO.areas.map((area) => (
                      <option key={area} value={area}>
                        {area}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 px-5 text-xs font-semibold tracking-[0.08em] uppercase text-white bg-[#C5A059] hover:bg-[#B08B44] rounded-lg transition-colors cursor-pointer"
              >
                CONTINUE
              </button>
            </form>
          </section>

          {/* =================================================================
              3. MENU & 4. CART + 5. CHECKOUT
              ================================================================= */}
          <div
            id="order-menu-section"
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start"
          >
            {/* Left 7 Columns: Interactive Ordering Menu */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#EFE6E9] pb-4">
                <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[#23191C]">
                  Select Treats from Our Menu
                </h2>
                <button
                  type="button"
                  onClick={() => setIsCmsModalOpen(true)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#23191C] bg-[#FDF6F8] border border-[#E6D5B8] rounded-lg cursor-pointer"
                >
                  <SlidersHorizontal className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span>Edit Products / Payment Methods</span>
                </button>
              </div>

              {/* Category Filter */}
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
                {cms.menuCategories.map((cat) => {
                  const isSelected = selectedCategory === cat;
                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                        isSelected
                          ? 'bg-[#C5A059] text-white'
                          : 'bg-[#FAF6F7] text-[#544348] hover:bg-[#FDF2F6] border border-[#EFE6E9]'
                      }`}
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>

              {/* Ordering Product List */}
              <div className="space-y-4">
                {filteredProducts.map((product: Product) => {
                  const qty = getProductQty(product.id);
                  return (
                    <div
                      key={product.id}
                      className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-white border border-[#EFE6E9] hover:border-[#D9BE8B] transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-20 h-20 rounded-lg overflow-hidden shrink-0 bg-[#FAF6F7]">
                          <BakeryImage
                            src={product.image}
                            alt={product.name}
                            containerClassName="w-full h-full"
                          />
                        </div>
                        <div className="space-y-1">
                          <span className="text-[11px] text-[#876E75]">{product.category}</span>
                          <h3 className="font-serif text-xl font-semibold text-[#23191C]">
                            {product.name}
                          </h3>
                          <p className="text-xs text-[#5E4B50] line-clamp-1">
                            {product.shortDescription}
                          </p>
                          <p className="text-sm font-semibold text-[#9E475E] tabular-nums">
                            {cms.showPricesInPKR
                              ? `PKR ${product.price.toLocaleString()}`
                              : 'Price on Inquiry'}
                          </p>
                        </div>
                      </div>

                      {/* Quantity + Add to Cart */}
                      <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-[#F5ECEF]">
                        <div className="inline-flex items-center border border-[#E6D5B8] rounded-lg bg-[#FAF6F7]">
                          <button
                            type="button"
                            onClick={() => setProductQty(product.id, qty - 1)}
                            aria-label="Decrease quantity"
                            className="w-8 h-8 flex items-center justify-center text-[#23191C] hover:bg-white cursor-pointer"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-8 text-center text-xs font-semibold tabular-nums">
                            {qty}
                          </span>
                          <button
                            type="button"
                            onClick={() => setProductQty(product.id, qty + 1)}
                            aria-label="Increase quantity"
                            className="w-8 h-8 flex items-center justify-center text-[#23191C] hover:bg-white cursor-pointer"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <button
                          type="button"
                          onClick={() => addToCart(product, qty)}
                          className="px-4 py-2.5 text-xs font-semibold text-white bg-[#C5A059] hover:bg-[#B08B44] rounded-lg whitespace-nowrap cursor-pointer"
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right 5 Columns: CART & CHECKOUT */}
            <div id="checkout-section" className="lg:col-span-5 space-y-6">
              {/* CART CARD */}
              <div className="bg-[#FAF6F7] border border-[#E6D5B8] rounded-2xl p-6 space-y-5">
                <div className="flex items-center justify-between border-b border-[#EFE2E6] pb-3">
                  <h2 className="font-serif text-2xl font-semibold text-[#23191C]">Your Cart</h2>
                  <span className="text-xs font-medium text-[#6B545B]">
                    {orderType} · {selectedLocation}
                  </span>
                </div>

                {cart.length === 0 ? (
                  <p className="text-xs sm:text-sm text-[#5E4B50] py-4">
                    Your cart is empty. Add your favorite cakes or cupcakes from the menu on the
                    left to begin checkout.
                  </p>
                ) : (
                  <div className="space-y-3">
                    {cart.map((item) => (
                      <div
                        key={item.cartItemId}
                        className="flex items-center justify-between gap-3 bg-white p-3 rounded-xl border border-[#EFE6E9]"
                      >
                        <div className="min-w-0 flex-1">
                          <h4 className="text-xs sm:text-sm font-semibold text-[#23191C] truncate">
                            {item.product.name}
                          </h4>
                          <p className="text-[11px] text-[#6B545B]">
                            {item.selectedSizeLabel} · PKR {item.unitPrice.toLocaleString()} each
                          </p>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <div className="inline-flex items-center border border-[#E6D5B8] rounded">
                            <button
                              type="button"
                              onClick={() =>
                                updateCartQuantity(item.cartItemId, item.quantity - 1)
                              }
                              className="w-6 h-6 flex items-center justify-center text-xs cursor-pointer"
                            >
                              -
                            </button>
                            <span className="w-6 text-center text-xs font-semibold tabular-nums">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() =>
                                updateCartQuantity(item.cartItemId, item.quantity + 1)
                              }
                              className="w-6 h-6 flex items-center justify-center text-xs cursor-pointer"
                            >
                              +
                            </button>
                          </div>

                          <span className="text-xs font-semibold tabular-nums w-20 text-right">
                            PKR {(item.unitPrice * item.quantity).toLocaleString()}
                          </span>

                          <button
                            type="button"
                            onClick={() => removeFromCart(item.cartItemId)}
                            className="text-[#876E75] hover:text-[#9E475E] p-1 cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Subtotal / Delivery Fee / Total */}
                <div className="pt-3 border-t border-[#EFE2E6] space-y-2 text-xs">
                  <div className="flex justify-between text-[#5E4B50]">
                    <span>Subtotal</span>
                    <span className="font-medium tabular-nums">
                      PKR {subtotalPKR.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between text-[#5E4B50]">
                    <span>Delivery Fee</span>
                    <span className="font-medium tabular-nums">
                      {deliveryFeePKR === 0
                        ? 'Free (Takeaway)'
                        : `PKR ${deliveryFeePKR.toLocaleString()}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-base font-semibold text-[#23191C] pt-2 border-t border-[#EFE2E6]">
                    <span>Total</span>
                    <span className="text-[#9E475E] tabular-nums">
                      PKR {totalPKR.toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2.5 pt-2">
                  <button
                    type="button"
                    onClick={() => navigate('/menu')}
                    className="py-2.5 px-3 text-xs font-semibold uppercase tracking-[0.05em] text-[#23191C] bg-white hover:bg-[#FDF6F8] border border-[#E6D5B8] rounded-lg whitespace-nowrap cursor-pointer"
                  >
                    CONTINUE SHOPPING
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowCheckoutForm(true);
                      const el = document.getElementById('customer-checkout-form');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="py-2.5 px-3 text-xs font-semibold uppercase tracking-[0.05em] text-white bg-[#C5A059] hover:bg-[#B08B44] rounded-lg whitespace-nowrap cursor-pointer"
                  >
                    PROCEED TO CHECKOUT
                  </button>
                </div>
              </div>

              {/* CHECKOUT FORM */}
              {showCheckoutForm && (
                <form
                  id="customer-checkout-form"
                  onSubmit={handlePlaceOrder}
                  className="bg-white border border-[#E6D5B8] rounded-2xl p-6 space-y-4"
                >
                  <h2 className="font-serif text-2xl font-semibold text-[#23191C]">
                    Checkout Details
                  </h2>

                  <div>
                    <label className="block text-xs font-semibold text-[#23191C] mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Enter your full name"
                      className="w-full px-3.5 py-2.5 text-sm bg-[#FAF6F7] border border-[#E6D5B8] rounded-lg focus:outline-none focus:border-[#C5A059] focus:bg-white"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-xs font-semibold text-[#23191C] mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="03XX XXXXXXX"
                        className="w-full px-3.5 py-2.5 text-sm bg-[#FAF6F7] border border-[#E6D5B8] rounded-lg focus:outline-none focus:border-[#C5A059] focus:bg-white tabular-nums"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#23191C] mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your@email.com"
                        className="w-full px-3.5 py-2.5 text-sm bg-[#FAF6F7] border border-[#E6D5B8] rounded-lg focus:outline-none focus:border-[#C5A059] focus:bg-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#23191C] mb-1">
                      Delivery Address {orderType === 'DELIVERY' ? '*' : '(Optional for Takeaway)'}
                    </label>
                    <input
                      type="text"
                      required={orderType === 'DELIVERY'}
                      value={deliveryAddress}
                      onChange={(e) => setDeliveryAddress(e.target.value)}
                      placeholder="House / Apartment, Street, Sector in Islamabad"
                      className="w-full px-3.5 py-2.5 text-sm bg-[#FAF6F7] border border-[#E6D5B8] rounded-lg focus:outline-none focus:border-[#C5A059] focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#23191C] mb-1">
                      Landmark
                    </label>
                    <input
                      type="text"
                      value={landmark}
                      onChange={(e) => setLandmark(e.target.value)}
                      placeholder="Near NUST Gate, Paris Rose, etc."
                      className="w-full px-3.5 py-2.5 text-sm bg-[#FAF6F7] border border-[#E6D5B8] rounded-lg focus:outline-none focus:border-[#C5A059] focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#23191C] mb-1">
                      Order Notes
                    </label>
                    <textarea
                      rows={2}
                      value={orderNotes}
                      onChange={(e) => setOrderNotes(e.target.value)}
                      placeholder="Cake message, preferred delivery time, candles..."
                      className="w-full px-3.5 py-2.5 text-sm bg-[#FAF6F7] border border-[#E6D5B8] rounded-lg focus:outline-none focus:border-[#C5A059] focus:bg-white"
                    />
                  </div>

                  {/* CMS-Editable Payment Methods */}
                  <div className="space-y-2 pt-1">
                    <div className="flex items-center justify-between">
                      <label className="block text-xs font-semibold text-[#23191C]">
                        Payment Method
                      </label>
                      <button
                        type="button"
                        onClick={() => setIsCmsModalOpen(true)}
                        className="text-[11px] text-[#9E475E] hover:underline cursor-pointer"
                      >
                        Configure in CMS
                      </button>
                    </div>

                    <div className="space-y-2">
                      {enabledPayments.map((pm) => (
                        <label
                          key={pm.id}
                          className={`flex items-start gap-2.5 p-3 rounded-xl border text-xs cursor-pointer transition-colors ${
                            selectedPaymentId === pm.id
                              ? 'bg-[#FDF6F8] border-[#C5A059]'
                              : 'bg-[#FAF6F7] border-[#EFE6E9]'
                          }`}
                        >
                          <input
                            type="radio"
                            name="paymentMethod"
                            checked={selectedPaymentId === pm.id}
                            onChange={() => setSelectedPaymentId(pm.id)}
                            className="mt-0.5 accent-[#C5A059]"
                          />
                          <div>
                            <p className="font-semibold text-[#23191C]">{pm.name}</p>
                            <p className="text-[#5E4B50] mt-0.5">{pm.description}</p>
                            {pm.accountDetails && (
                              <p className="text-[11px] text-[#9E475E] mt-1 font-medium">
                                {pm.accountDetails}
                              </p>
                            )}
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 px-6 text-xs font-semibold tracking-[0.1em] uppercase text-white bg-[#C5A059] hover:bg-[#B08B44] rounded-lg transition-colors cursor-pointer"
                  >
                    PLACE ORDER
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
