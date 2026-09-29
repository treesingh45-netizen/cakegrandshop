import React, { useState } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  ExternalLink,
  CheckCircle2,
  Send,
} from 'lucide-react';
import { BUSINESS_INFO } from '../data/initialStoreData';
import { useStore } from '../context/StoreContext';
import { FacebookIcon, InstagramIcon } from '../components/HeaderAndFooter';

export const ContactPage: React.FC = () => {
  const { navigate, showToast } = useStore();

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    showToast('Thank you! Your message has been sent to Cake Grand Shop.');
  };

  return (
    <div className="bg-white">
      {/* =================================================================
          HERO SECTION ("Let’s Talk Cake")
          ================================================================= */}
      <section className="bg-[#FDF6F8] border-b border-[#EFE2E6] py-14 sm:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center space-y-3">
          <p className="text-xs font-semibold tracking-[0.16em] uppercase text-[#C5A059]">
            CAKE GRAND SHOP · H-13 ISLAMABAD
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl font-semibold text-[#23191C]">
            Let’s Talk Cake
          </h1>
          <p className="text-base sm:text-lg text-[#544348]">
            We’re here to help with your orders, celebrations and custom cake requests.
          </p>
        </div>
      </section>

      {/* =================================================================
          QUICK CONTACT (Three Cards: CALL US, EMAIL US, VISIT US)
          ================================================================= */}
      <section className="py-12 sm:py-16 border-b border-[#F3E9EC]">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* CALL US */}
            <a
              href={BUSINESS_INFO.phoneTelHref}
              className="p-7 rounded-2xl bg-[#FAF6F7] border border-[#E6D5B8] hover:border-[#C5A059] text-center space-y-2.5 transition-all hover:-translate-y-0.5"
            >
              <div className="w-12 h-12 rounded-full bg-white border border-[#E6D5B8] flex items-center justify-center mx-auto text-[#C5A059]">
                <Phone className="w-5 h-5" />
              </div>
              <h2 className="font-serif text-xl font-semibold tracking-[0.06em] text-[#23191C]">
                CALL US
              </h2>
              <p className="text-base font-semibold text-[#9E475E] tabular-nums">
                {BUSINESS_INFO.phoneDisplay}
              </p>
              <p className="text-xs text-[#6B545B]">Available for phone &amp; WhatsApp orders</p>
            </a>

            {/* EMAIL US */}
            <a
              href={`mailto:${BUSINESS_INFO.email}`}
              className="p-7 rounded-2xl bg-[#FAF6F7] border border-[#E6D5B8] hover:border-[#C5A059] text-center space-y-2.5 transition-all hover:-translate-y-0.5"
            >
              <div className="w-12 h-12 rounded-full bg-white border border-[#E6D5B8] flex items-center justify-center mx-auto text-[#C5A059]">
                <Mail className="w-5 h-5" />
              </div>
              <h2 className="font-serif text-xl font-semibold tracking-[0.06em] text-[#23191C]">
                EMAIL US
              </h2>
              <p className="text-sm font-semibold text-[#9E475E] break-all">
                {BUSINESS_INFO.email}
              </p>
              <p className="text-xs text-[#6B545B]">Send us your event inquiries &amp; photos</p>
            </a>

            {/* VISIT US */}
            <a
              href={BUSINESS_INFO.googleMapsDirectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-7 rounded-2xl bg-[#FAF6F7] border border-[#E6D5B8] hover:border-[#C5A059] text-center space-y-2.5 transition-all hover:-translate-y-0.5"
            >
              <div className="w-12 h-12 rounded-full bg-white border border-[#E6D5B8] flex items-center justify-center mx-auto text-[#C5A059]">
                <MapPin className="w-5 h-5" />
              </div>
              <h2 className="font-serif text-xl font-semibold tracking-[0.06em] text-[#23191C]">
                VISIT US
              </h2>
              <p className="text-base font-semibold text-[#23191C]">{BUSINESS_INFO.address}</p>
              <p className="text-xs text-[#6B545B]">Fresh takeaway &amp; custom consultations</p>
            </a>
          </div>
        </div>
      </section>

      {/* =================================================================
          CONTACT DETAILS + CONTACT FORM + SOCIAL MEDIA
          ================================================================= */}
      <section className="py-16 sm:py-24">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            {/* Left Column: Contact Details & Social Media */}
            <div className="lg:col-span-5 space-y-8">
              <div className="space-y-4">
                <p className="text-xs font-semibold tracking-[0.14em] uppercase text-[#C5A059]">
                  Get in Touch
                </p>
                <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#23191C]">
                  Cake Grand Shop
                </h2>
                <p className="text-sm sm:text-base text-[#544348] leading-relaxed">
                  Have a question about same-day cake delivery in H-13, custom wedding tiers, or
                  bulk cupcake boxes? Reach out to us directly or send a message using the form.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#FAF6F7] border border-[#EFE6E9] space-y-4 text-sm">
                <div>
                  <span className="text-xs text-[#876E75] block">Address</span>
                  <strong className="text-[#23191C]">{BUSINESS_INFO.address}</strong>
                </div>
                <div>
                  <span className="text-xs text-[#876E75] block">Phone / WhatsApp</span>
                  <a
                    href={BUSINESS_INFO.phoneTelHref}
                    className="font-semibold text-[#23191C] hover:text-[#9E475E] tabular-nums"
                  >
                    {BUSINESS_INFO.phoneDisplay} ({BUSINESS_INFO.phoneIntl})
                  </a>
                </div>
                <div>
                  <span className="text-xs text-[#876E75] block">Email</span>
                  <a
                    href={`mailto:${BUSINESS_INFO.email}`}
                    className="font-semibold text-[#23191C] hover:text-[#9E475E] break-all"
                  >
                    {BUSINESS_INFO.email}
                  </a>
                </div>
              </div>

              {/* SOCIAL MEDIA ("Follow Us") */}
              <div className="space-y-3 pt-2">
                <h3 className="font-serif text-2xl font-semibold text-[#23191C]">Follow Us</h3>
                <div className="flex flex-wrap items-center gap-3">
                  <a
                    href={BUSINESS_INFO.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-[#FDF6F8] hover:bg-[#F7E3EA] border border-[#E6D5B8] text-xs font-semibold text-[#23191C] transition-colors"
                  >
                    <InstagramIcon className="w-4 h-4 text-[#C5A059]" />
                    <span>Instagram</span>
                  </a>

                  <a
                    href={BUSINESS_INFO.facebookUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-[#FDF6F8] hover:bg-[#F7E3EA] border border-[#E6D5B8] text-xs font-semibold text-[#23191C] transition-colors"
                  >
                    <FacebookIcon className="w-4 h-4 text-[#C5A059]" />
                    <span>Facebook</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column: Contact Form */}
            <div className="lg:col-span-7">
              <div className="bg-[#FAF6F7] border border-[#E6D5B8] rounded-2xl p-6 sm:p-10">
                <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[#23191C] mb-6">
                  Send Us a Message
                </h2>

                {submitted ? (
                  <div className="bg-white border border-[#C5A059] rounded-xl p-6 text-center space-y-4">
                    <CheckCircle2 className="w-10 h-10 text-[#C5A059] mx-auto" />
                    <h3 className="font-serif text-2xl font-semibold text-[#23191C]">
                      Message Sent Successfully
                    </h3>
                    <p className="text-sm text-[#5E4B50]">
                      Thank you, <strong>{fullName}</strong>. Our team at Cake Grand Shop (H-13,
                      Islamabad) will respond to your inquiry shortly.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setSubmitted(false);
                        setFullName('');
                        setPhone('');
                        setEmail('');
                        setSubject('');
                        setMessage('');
                      }}
                      className="px-5 py-2.5 text-xs font-semibold text-white bg-[#C5A059] rounded-lg cursor-pointer"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-[#23191C] mb-1.5">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
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
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="0347 0300950"
                          className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#E6D5B8] rounded-lg focus:outline-none focus:border-[#C5A059] tabular-nums"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-[#23191C] mb-1.5">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="your@email.com"
                          className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#E6D5B8] rounded-lg focus:outline-none focus:border-[#C5A059]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-[#23191C] mb-1.5">
                          Subject *
                        </label>
                        <input
                          type="text"
                          required
                          value={subject}
                          onChange={(e) => setSubject(e.target.value)}
                          placeholder="Birthday Cake Order / Delivery Question"
                          className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#E6D5B8] rounded-lg focus:outline-none focus:border-[#C5A059]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#23191C] mb-1.5">
                        Message *
                      </label>
                      <textarea
                        rows={4}
                        required
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Tell us how we can help make your celebration sweeter..."
                        className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#E6D5B8] rounded-lg focus:outline-none focus:border-[#C5A059]"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 text-xs font-semibold tracking-[0.08em] uppercase text-white bg-[#C5A059] hover:bg-[#B08B44] rounded-lg transition-colors cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>SEND MESSAGE</span>
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =================================================================
          MAP SECTION (H-13, Islamabad, Pakistan + GET DIRECTIONS)
          ================================================================= */}
      <section className="py-14 sm:py-20 bg-[#FAF6F7] border-t border-[#EFE2E6]">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold tracking-[0.14em] uppercase text-[#C5A059]">
                Find Us in Islamabad
              </p>
              <h2 className="font-serif text-3xl font-semibold text-[#23191C]">
                H-13, Islamabad, Pakistan
              </h2>
            </div>

            <a
              href={BUSINESS_INFO.googleMapsDirectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs font-semibold tracking-[0.08em] uppercase text-white bg-[#C5A059] hover:bg-[#B08B44] rounded-lg transition-colors whitespace-nowrap"
            >
              <span>GET DIRECTIONS</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="rounded-2xl overflow-hidden border border-[#E6D5B8] bg-white h-[380px] sm:h-[440px]">
            <iframe
              title="Cake Grand Shop Location in H-13, Islamabad, Pakistan"
              src={BUSINESS_INFO.googleMapsEmbedUrl}
              width="100%"
              height="100%"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full border-0"
            />
          </div>
        </div>
      </section>

      {/* =================================================================
          FINAL CTA ("Planning Something Special?")
          ================================================================= */}
      <section className="py-16 sm:py-20 bg-[#FDF2F6] border-t border-[#E6D5B8]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center space-y-5">
          <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#23191C]">
            Planning Something Special?
          </h2>
          <p className="text-base sm:text-lg text-[#544348]">
            Let Cake Grand Shop be part of your next celebration.
          </p>
          <div className="pt-2">
            <button
              type="button"
              onClick={() => navigate('/order-online')}
              className="px-8 py-4 text-xs font-semibold tracking-[0.1em] uppercase text-white bg-[#C5A059] hover:bg-[#B08B44] rounded-lg transition-colors whitespace-nowrap cursor-pointer"
            >
              ORDER NOW
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
