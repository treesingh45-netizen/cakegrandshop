import React, { useState } from 'react';
import { Upload, CheckCircle2, Phone, MessageCircle, ArrowRight } from 'lucide-react';
import { BUSINESS_INFO, CAKE_COLLECTIONS } from '../data/initialStoreData';
import { useStore } from '../context/StoreContext';
import { BakeryImage } from '../components/BakeryImage';

interface CustomCakeFormState {
  name: string;
  phone: string;
  email: string;
  eventDate: string;
  cakeType: string;
  cakeFlavor: string;
  cakeSize: string;
  guests: string;
  themeDesign: string;
  specialMessage: string;
  referenceImageName: string;
  referenceImagePreview: string | null;
}

export const OurCakesPage: React.FC = () => {
  const { navigate, showToast } = useStore();

  const [form, setForm] = useState<CustomCakeFormState>({
    name: '',
    phone: '',
    email: '',
    eventDate: '',
    cakeType: 'Birthday Cake',
    cakeFlavor: 'Chocolate Fudge',
    cakeSize: '2 Pounds',
    guests: '10–15 Guests',
    themeDesign: '',
    specialMessage: '',
    referenceImageName: '',
    referenceImagePreview: null,
  });

  const [submittedRequest, setSubmittedRequest] = useState<{
    referenceId: string;
    data: CustomCakeFormState;
  } | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setForm((prev) => ({
        ...prev,
        referenceImageName: file.name,
        referenceImagePreview: typeof reader.result === 'string' ? reader.result : null,
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const refId = `CGS-CUSTOM-${Math.floor(1000 + Math.random() * 9000)}`;
    setSubmittedRequest({
      referenceId: refId,
      data: form,
    });
    showToast('Custom cake request submitted! Our decorator will contact you shortly.');
  };

  const scrollToFormWithCollection = (collectionTitle: string) => {
    setForm((prev) => ({ ...prev, cakeType: collectionTitle }));
    const el = document.getElementById('custom-cake-form');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-white">
      {/* =================================================================
          HERO SECTION
          ================================================================= */}
      <section className="bg-[#FDF6F8] border-b border-[#EFE2E6] py-14 sm:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center space-y-3">
          <p className="text-xs font-semibold tracking-[0.16em] uppercase text-[#C5A059]">
            CELEBRATION &amp; BESPOKE CAKES · ISLAMABAD
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl font-semibold text-[#23191C]">
            Cakes Made for Every Occasion
          </h1>
          <p className="text-base sm:text-lg text-[#544348]">
            From classic favorites to beautifully customized celebration cakes.
          </p>
        </div>
      </section>

      {/* =================================================================
          CAKE COLLECTIONS (8 Collections)
          ================================================================= */}
      <section className="py-16 sm:py-24">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <p className="text-xs font-semibold tracking-[0.14em] uppercase text-[#C5A059]">
              Explore by Occasion
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#23191C]">
              Our Cake Collections
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
            {CAKE_COLLECTIONS.map((col) => (
              <div
                key={col.id}
                className="group bg-[#FAF6F7] border border-[#EFE6E9] hover:border-[#C5A059] rounded-xl overflow-hidden flex flex-col justify-between transition-all duration-200 hover:-translate-y-0.5"
              >
                <div>
                  <div className="aspect-[4/3] overflow-hidden bg-white">
                    <BakeryImage
                      src={col.image}
                      alt={`${col.title} in Islamabad — Cake Grand Shop`}
                      containerClassName="w-full h-full"
                    />
                  </div>
                  <div className="p-5 space-y-2">
                    <h3 className="font-serif text-2xl font-semibold text-[#23191C]">
                      {col.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#5E4B50] leading-relaxed">
                      {col.description}
                    </p>
                  </div>
                </div>

                <div className="px-5 pb-5 pt-2 flex gap-2">
                  <button
                    type="button"
                    onClick={() => navigate('/menu', { menuCategory: 'Cakes' })}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-3 text-xs font-semibold tracking-[0.06em] uppercase text-white bg-[#C5A059] hover:bg-[#B08B44] rounded-lg transition-colors whitespace-nowrap cursor-pointer"
                  >
                    <span>View Cakes</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => scrollToFormWithCollection(col.title)}
                    className="py-2.5 px-3 text-xs font-medium text-[#23191C] bg-white hover:bg-[#FDF6F8] border border-[#E6D5B8] rounded-lg whitespace-nowrap cursor-pointer"
                  >
                    Customize
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =================================================================
          CUSTOM CAKE SECTION ("Have Something Special in Mind?")
          ================================================================= */}
      <section className="py-14 sm:py-18 bg-[#FDF2F6] border-y border-[#E6D5B8]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center space-y-4">
          <p className="text-xs font-semibold tracking-[0.14em] uppercase text-[#C5A059]">
            Bespoke Cake Design
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#23191C]">
            Have Something Special in Mind?
          </h2>
          <p className="text-sm sm:text-base text-[#544348] leading-relaxed">
            Share your idea, theme, colors, flavor or reference image with us and we’ll help you
            plan the perfect cake.
          </p>
          <div className="pt-2">
            <a
              href="#custom-cake-form"
              className="inline-block px-7 py-3.5 text-xs font-semibold tracking-[0.1em] uppercase text-white bg-[#C5A059] hover:bg-[#B08B44] rounded-lg transition-colors whitespace-nowrap"
            >
              REQUEST CUSTOM CAKE
            </a>
          </div>
        </div>
      </section>

      {/* =================================================================
          CAKE ORDER FORM
          ================================================================= */}
      <section id="custom-cake-form" className="py-16 sm:py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#FAF6F7] border border-[#E6D5B8] rounded-2xl p-6 sm:p-10">
            <div className="text-center mb-8 space-y-2">
              <p className="text-xs font-semibold tracking-[0.14em] uppercase text-[#C5A059]">
                Custom Cake Inquiry Form
              </p>
              <h2 className="font-serif text-3xl font-semibold text-[#23191C]">
                Request Your Custom Cake
              </h2>
              <p className="text-xs sm:text-sm text-[#5E4B50]">
                Fill out the details below and our cake artists in H-13, Islamabad will get back to
                you with pricing and design confirmation.
              </p>
            </div>

            {submittedRequest ? (
              <div className="bg-white border border-[#C5A059] rounded-xl p-6 sm:p-8 text-center space-y-5">
                <div className="w-12 h-12 rounded-full bg-[#FDF6F8] border border-[#C5A059] flex items-center justify-center mx-auto text-[#C5A059]">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div className="space-y-1.5">
                  <p className="text-xs font-semibold tracking-[0.12em] uppercase text-[#C5A059]">
                    Request Received · {submittedRequest.referenceId}
                  </p>
                  <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-[#23191C]">
                    Thank You, {submittedRequest.data.name}!
                  </h3>
                  <p className="text-sm text-[#5E4B50] max-w-md mx-auto">
                    Your custom cake request for{' '}
                    <strong>{submittedRequest.data.cakeType}</strong> (
                    {submittedRequest.data.cakeFlavor}, {submittedRequest.data.cakeSize}) has been
                    received by Cake Grand Shop.
                  </p>
                </div>

                <div className="bg-[#FAF6F7] p-4 rounded-lg border border-[#EFE6E9] text-left text-xs space-y-1.5 max-w-md mx-auto">
                  <p>
                    <strong>Contact Phone:</strong>{' '}
                    <span className="tabular-nums">{submittedRequest.data.phone}</span>
                  </p>
                  <p>
                    <strong>Event Date:</strong>{' '}
                    {submittedRequest.data.eventDate || 'To be confirmed'}
                  </p>
                  <p>
                    <strong>Guests:</strong> {submittedRequest.data.guests}
                  </p>
                  {submittedRequest.data.themeDesign && (
                    <p>
                      <strong>Theme / Design:</strong> {submittedRequest.data.themeDesign}
                    </p>
                  )}
                  {submittedRequest.data.specialMessage && (
                    <p>
                      <strong>Cake Message:</strong> &ldquo;{submittedRequest.data.specialMessage}&rdquo;
                    </p>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                  <a
                    href={`https://wa.me/${BUSINESS_INFO.whatsappNum}?text=${encodeURIComponent(
                      `Assalam-o-Alaikum Cake Grand Shop! I submitted Custom Cake Request ${submittedRequest.referenceId} for a ${submittedRequest.data.cakeSize} ${submittedRequest.data.cakeFlavor} (${submittedRequest.data.cakeType}) on ${submittedRequest.data.eventDate}. Name: ${submittedRequest.data.name}`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 text-xs font-semibold uppercase tracking-[0.06em] text-white bg-[#C5A059] hover:bg-[#B08B44] rounded-lg"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Send Details on WhatsApp</span>
                  </a>
                  <a
                    href={BUSINESS_INFO.phoneTelHref}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 text-xs font-semibold uppercase tracking-[0.06em] text-[#23191C] bg-[#FDF6F8] border border-[#E6D5B8] rounded-lg"
                  >
                    <Phone className="w-4 h-4 text-[#C5A059]" />
                    <span>Call {BUSINESS_INFO.phoneDisplay}</span>
                  </a>
                </div>

                <button
                  type="button"
                  onClick={() => setSubmittedRequest(null)}
                  className="text-xs text-[#9E475E] underline cursor-pointer"
                >
                  Submit Another Custom Cake Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#23191C] mb-1.5">
                      Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Your full name"
                      className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#E6D5B8] rounded-lg focus:outline-none focus:border-[#C5A059]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#23191C] mb-1.5">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="03XX XXXXXXX"
                      className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#E6D5B8] rounded-lg focus:outline-none focus:border-[#C5A059] tabular-nums"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#23191C] mb-1.5">
                      Email
                    </label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="your@email.com"
                      className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#E6D5B8] rounded-lg focus:outline-none focus:border-[#C5A059]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#23191C] mb-1.5">
                      Event Date *
                    </label>
                    <input
                      type="date"
                      required
                      value={form.eventDate}
                      onChange={(e) => setForm({ ...form, eventDate: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#E6D5B8] rounded-lg focus:outline-none focus:border-[#C5A059]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#23191C] mb-1.5">
                      Cake Type
                    </label>
                    <select
                      value={form.cakeType}
                      onChange={(e) => setForm({ ...form, cakeType: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#E6D5B8] rounded-lg focus:outline-none focus:border-[#C5A059]"
                    >
                      <option value="Birthday Cakes">Birthday Cake</option>
                      <option value="Wedding Cakes">Wedding Cake</option>
                      <option value="Anniversary Cakes">Anniversary Cake</option>
                      <option value="Custom Cakes">Custom Tiered Cake</option>
                      <option value="Kids Cakes">Kids Theme Cake</option>
                      <option value="Theme Cakes">Bridal / Baby Shower / Theme Cake</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#23191C] mb-1.5">
                      Cake Flavor
                    </label>
                    <select
                      value={form.cakeFlavor}
                      onChange={(e) => setForm({ ...form, cakeFlavor: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#E6D5B8] rounded-lg focus:outline-none focus:border-[#C5A059]"
                    >
                      <option value="Chocolate Fudge">Chocolate Fudge</option>
                      <option value="Red Velvet Cream Cheese">Red Velvet Cream Cheese</option>
                      <option value="Lotus Biscoff">Lotus Biscoff</option>
                      <option value="Ferrero Hazelnut">Ferrero Hazelnut</option>
                      <option value="Vanilla Celebration">Vanilla Bean &amp; Buttercream</option>
                      <option value="Roasted Pistachio">Roasted Pistachio &amp; Rose</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#23191C] mb-1.5">
                      Cake Size
                    </label>
                    <select
                      value={form.cakeSize}
                      onChange={(e) => setForm({ ...form, cakeSize: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#E6D5B8] rounded-lg focus:outline-none focus:border-[#C5A059]"
                    >
                      <option value="1 Pound">1 Pound (Intimate)</option>
                      <option value="2 Pounds">2 Pounds (Standard Celebration)</option>
                      <option value="3 Pounds">3 Pounds (Large Single Tier)</option>
                      <option value="4–5 Pounds (2-Tier)">4–5 Pounds (Two-Tier Custom)</option>
                      <option value="6+ Pounds (3-Tier Wedding)">6+ Pounds (Three-Tier Grand)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#23191C] mb-1.5">
                      Number of Guests
                    </label>
                    <input
                      type="text"
                      value={form.guests}
                      onChange={(e) => setForm({ ...form, guests: e.target.value })}
                      placeholder="e.g. 15–20 Guests"
                      className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#E6D5B8] rounded-lg focus:outline-none focus:border-[#C5A059]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#23191C] mb-1.5">
                    Theme / Design
                  </label>
                  <input
                    type="text"
                    value={form.themeDesign}
                    onChange={(e) => setForm({ ...form, themeDesign: e.target.value })}
                    placeholder="Describe colors, floral details, ribbons, or theme inspiration..."
                    className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#E6D5B8] rounded-lg focus:outline-none focus:border-[#C5A059]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#23191C] mb-1.5">
                    Special Message (Written on Cake / Card)
                  </label>
                  <textarea
                    rows={2}
                    value={form.specialMessage}
                    onChange={(e) => setForm({ ...form, specialMessage: e.target.value })}
                    placeholder="e.g. Happy 25th Birthday Ayesha!"
                    className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#E6D5B8] rounded-lg focus:outline-none focus:border-[#C5A059]"
                  />
                </div>

                {/* Reference Image Upload */}
                <div>
                  <label className="block text-xs font-semibold text-[#23191C] mb-1.5">
                    Reference Image Upload
                  </label>
                  <label className="flex flex-col items-center justify-center p-5 border-2 border-dashed border-[#D9BE8B] rounded-xl bg-white hover:bg-[#FDF6F8] cursor-pointer transition-colors">
                    <Upload className="w-5 h-5 text-[#C5A059] mb-1.5" />
                    <span className="text-xs font-medium text-[#23191C]">
                      {form.referenceImageName
                        ? `Selected: ${form.referenceImageName}`
                        : 'Click to upload a reference cake photo (JPG, PNG)'}
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                  {form.referenceImagePreview && (
                    <div className="mt-3 flex items-center gap-3">
                      <img
                        src={form.referenceImagePreview}
                        alt="Uploaded custom cake reference preview"
                        className="w-16 h-16 rounded-lg object-cover border border-[#E6D5B8]"
                      />
                      <span className="text-xs text-[#5E4B50]">
                        Reference image attached for your custom consultation.
                      </span>
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full py-4 px-6 text-xs font-semibold tracking-[0.1em] uppercase text-white bg-[#C5A059] hover:bg-[#B08B44] rounded-lg transition-colors cursor-pointer"
                >
                  SUBMIT CAKE REQUEST
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
