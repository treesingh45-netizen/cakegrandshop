import heroCelebrationImg from '../assets/images/hero_celebration_cake_1790662806463.jpg';
import chocolateFudgeImg from '../assets/images/chocolate_fudge_cake_1790662826055.jpg';
import redVelvetImg from '../assets/images/red_velvet_cake_1790662843047.jpg';
import lotusBiscoffImg from '../assets/images/lotus_biscoff_cake_1790662858967.jpg';
import cupcakesBoxImg from '../assets/images/gourmet_cupcakes_box_1790662872590.jpg';
import bespokeWeddingImg from '../assets/images/bespoke_wedding_cake_1790662889377.jpg';

export interface ProductSize {
  label: string;
  price: number;
}

export interface Product {
  id: string;
  name: string;
  category:
    | 'Cakes'
    | 'Custom Cakes'
    | 'Cupcakes'
    | 'Desserts'
    | 'Brownies'
    | 'Cookies'
    | 'Other Treats';
  shortDescription: string;
  fullDescription: string;
  price: number;
  sizes: ProductSize[];
  image: string;
  featuredOnHome?: boolean;
  cakeCollectionTags?: string[];
  prepTime?: string;
}

export interface FeaturedCategory {
  id: string;
  name: string;
  slug: string;
  menuCategory: string;
  description: string;
  image: string;
}

export interface CakeCollection {
  id: string;
  title: string;
  description: string;
  image: string;
  menuFilter: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Cakes' | 'Cupcakes' | 'Desserts' | 'Celebrations' | 'Custom Cakes';
  image: string;
  aspect: 'tall' | 'standard' | 'square';
  caption: string;
}

export interface PaymentMethod {
  id: string;
  name: string;
  description: string;
  accountDetails?: string;
  enabled: boolean;
}

export interface CMSStoreState {
  products: Product[];
  categories: FeaturedCategory[];
  menuCategories: string[];
  paymentMethods: PaymentMethod[];
  deliveryFeePKR: number;
  showPricesInPKR: boolean;
}

export const IMAGES = {
  heroCelebration: heroCelebrationImg,
  chocolateFudge: chocolateFudgeImg,
  redVelvet: redVelvetImg,
  lotusBiscoff: lotusBiscoffImg,
  cupcakesBox: cupcakesBoxImg,
  bespokeWedding: bespokeWeddingImg,
};

export const BUSINESS_INFO = {
  name: 'Cake Grand Shop',
  tagline: 'CAKES • DESSERTS • SWEET MOMENTS',
  address: 'H-13, Islamabad, Pakistan',
  phoneDisplay: '0347 0300950',
  phoneIntl: '+92 347 0300950',
  phoneTelHref: 'tel:+923470300950',
  whatsappNum: '923470300950',
  email: 'cakegrandshopislamabad@gmail.com',
  instagramUrl: 'https://www.instagram.com/cakegrandshopislamabad',
  facebookUrl: 'https://www.facebook.com/cakegrandshopislamabad',
  googleMapsDirectUrl:
    'https://www.google.com/maps/dir/?api=1&destination=H-13,+Islamabad,+Pakistan',
  googleMapsEmbedUrl:
    'https://www.google.com/maps?q=H-13,+Islamabad,+Pakistan&output=embed',
  areas: [
    'H-13, Islamabad',
    'G-13, Islamabad',
    'G-11, Islamabad',
    'F-11, Islamabad',
    'F-10, Islamabad',
    'E-11, Islamabad',
    'G-10, Islamabad',
    'F-8, Islamabad',
    'F-7, Islamabad',
    'Blue Area, Islamabad',
    'I-8, Islamabad',
    'NUST H-12, Islamabad',
    'Bahria Town, Islamabad',
    'DHA, Islamabad',
  ],
};

export const INITIAL_MENU_CATEGORIES: string[] = [
  'All',
  'Cakes',
  'Custom Cakes',
  'Cupcakes',
  'Desserts',
  'Brownies',
  'Cookies',
  'Other Treats',
];

export const INITIAL_FEATURED_CATEGORIES: FeaturedCategory[] = [
  {
    id: 'cat-celebration',
    name: 'Celebration Cakes',
    slug: 'celebration-cakes',
    menuCategory: 'Cakes',
    description:
      'Signature layer cakes crafted fresh daily for birthdays, family dinners, and special milestones in Islamabad.',
    image: IMAGES.heroCelebration,
  },
  {
    id: 'cat-custom',
    name: 'Custom Cakes',
    slug: 'custom-cakes',
    menuCategory: 'Custom Cakes',
    description:
      'Bespoke multi-tier designs, personalized themes, and handcrafted details tailored to your celebration.',
    image: IMAGES.bespokeWedding,
  },
  {
    id: 'cat-cupcakes',
    name: 'Cupcakes',
    slug: 'cupcakes',
    menuCategory: 'Cupcakes',
    description:
      'Soft sponge cupcakes crowned with silky buttercream swirls, chocolate ganache, and artisanal toppings.',
    image: IMAGES.cupcakesBox,
  },
  {
    id: 'cat-desserts',
    name: 'Desserts',
    slug: 'desserts',
    menuCategory: 'Desserts',
    description:
      'Layered dessert cups, fudgy brownies, warm cookies, and indulgent sweet treats for every craving.',
    image: IMAGES.lotusBiscoff,
  },
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-chocolate-fudge',
    name: 'Chocolate Fudge Cake',
    category: 'Cakes',
    shortDescription:
      'Moist dark chocolate sponge layered with warm Belgian fudge ganache and chocolate curls.',
    fullDescription:
      'Our signature Chocolate Fudge Cake features rich, velvety cocoa layers generously filled and coated with glossy dark chocolate fudge ganache. Finished with delicate chocolate curls and a subtle touch of gold leaf.',
    price: 2450,
    sizes: [
      { label: '1 Pound (Serves 4–6)', price: 1450 },
      { label: '2 Pounds (Serves 8–12)', price: 2450 },
      { label: '3 Pounds (Serves 14–18)', price: 3600 },
    ],
    image: IMAGES.chocolateFudge,
    featuredOnHome: true,
    cakeCollectionTags: ['Birthday Cakes', 'Chocolate Cakes', 'Anniversary Cakes'],
    prepTime: 'Available for same-day delivery in H-13',
  },
  {
    id: 'prod-red-velvet',
    name: 'Red Velvet Cake',
    category: 'Cakes',
    shortDescription:
      'Classic crimson velvet sponge paired with smooth vanilla bean cream cheese frosting.',
    fullDescription:
      'Tender crimson cocoa sponge balanced with our signature whipped cream cheese frosting, finished with fine red velvet crumbs and elegant rosette piping for birthdays and anniversaries.',
    price: 2600,
    sizes: [
      { label: '1 Pound (Serves 4–6)', price: 1550 },
      { label: '2 Pounds (Serves 8–12)', price: 2600 },
      { label: '3 Pounds (Serves 14–18)', price: 3800 },
    ],
    image: IMAGES.redVelvet,
    featuredOnHome: true,
    cakeCollectionTags: ['Anniversary Cakes', 'Birthday Cakes', 'Wedding Cakes'],
    prepTime: 'Available for same-day delivery in H-13',
  },
  {
    id: 'prod-lotus-cake',
    name: 'Lotus Cake',
    category: 'Cakes',
    shortDescription:
      'Caramelized biscuit sponge layered with creamy Biscoff spread and crushed Lotus crumb.',
    fullDescription:
      'Crafted for caramelized biscuit lovers, our Lotus Cake combines warm spiced vanilla sponge, silky Lotus Biscoff buttercream, a rich speculoos drip, and a generous crown of crushed Lotus biscuits.',
    price: 2750,
    sizes: [
      { label: '1 Pound (Serves 4–6)', price: 1650 },
      { label: '2 Pounds (Serves 8–12)', price: 2750 },
      { label: '3 Pounds (Serves 14–18)', price: 3950 },
    ],
    image: IMAGES.lotusBiscoff,
    featuredOnHome: true,
    cakeCollectionTags: ['Birthday Cakes', 'Anniversary Cakes'],
    prepTime: 'Freshly prepared daily',
  },
  {
    id: 'prod-ferrero-cake',
    name: 'Ferrero Cake',
    category: 'Cakes',
    shortDescription:
      'Decadent chocolate hazelnut sponge with roasted hazelnut praline and Ferrero ganache.',
    fullDescription:
      'Layered with imported hazelnut chocolate praline, crisp wafer crunch, roasted Piedmont hazelnut nibs, and silky milk chocolate ganache for an unforgettable celebration centerpiece.',
    price: 2950,
    sizes: [
      { label: '1 Pound (Serves 4–6)', price: 1750 },
      { label: '2 Pounds (Serves 8–12)', price: 2950 },
      { label: '3 Pounds (Serves 14–18)', price: 4250 },
    ],
    image: IMAGES.chocolateFudge,
    featuredOnHome: true,
    cakeCollectionTags: ['Chocolate Cakes', 'Birthday Cakes', 'Anniversary Cakes'],
    prepTime: 'Freshly prepared daily',
  },
  {
    id: 'prod-vanilla-celebration',
    name: 'Vanilla Celebration Cake',
    category: 'Custom Cakes',
    shortDescription:
      'Light Madagascar vanilla sponge dressed in blush pink buttercream and champagne gold details.',
    fullDescription:
      'A timeless celebration cake featuring airy vanilla bean sponge, delicate fruit or vanilla diplomat cream filling, and smooth blush-pink Swiss meringue buttercream accented with edible gold leaf.',
    price: 2500,
    sizes: [
      { label: '1 Pound (Serves 4–6)', price: 1500 },
      { label: '2 Pounds (Serves 8–12)', price: 2500 },
      { label: '4 Pounds Two-Tier (Serves 20+)', price: 5400 },
    ],
    image: IMAGES.heroCelebration,
    featuredOnHome: true,
    cakeCollectionTags: [
      'Birthday Cakes',
      'Wedding Cakes',
      'Custom Cakes',
      'Kids Cakes',
      'Theme Cakes',
    ],
    prepTime: 'Custom message included',
  },
  {
    id: 'prod-pistachio-cake',
    name: 'Pistachio Cake',
    category: 'Cakes',
    shortDescription:
      'Fragrant roasted pistachio sponge with white chocolate rosewater cream and crushed nuts.',
    fullDescription:
      'Delicately infused with ground green pistachios, cardamom notes, and whipped white chocolate mascarpone frosting. Garnished with roasted pistachio slivers and dried rose petals.',
    price: 2850,
    sizes: [
      { label: '1 Pound (Serves 4–6)', price: 1700 },
      { label: '2 Pounds (Serves 8–12)', price: 2850 },
      { label: '3 Pounds (Serves 14–18)', price: 4100 },
    ],
    image: IMAGES.bespokeWedding,
    featuredOnHome: true,
    cakeCollectionTags: ['Wedding Cakes', 'Anniversary Cakes', 'Fruit Cakes'],
    prepTime: 'Freshly prepared daily',
  },
  {
    id: 'prod-vanilla-cake',
    name: 'Vanilla Cake',
    category: 'Cakes',
    shortDescription:
      'Classic soft vanilla sponge with whipped cream frosting and white chocolate shavings.',
    fullDescription:
      'Simple, pure, and comforting. Baked fresh with farm eggs and pure vanilla extract, layered with light vanilla bean cream for afternoon tea or intimate birthdays.',
    price: 2200,
    sizes: [
      { label: '1 Pound (Serves 4–6)', price: 1300 },
      { label: '2 Pounds (Serves 8–12)', price: 2200 },
    ],
    image: IMAGES.heroCelebration,
    featuredOnHome: false,
    cakeCollectionTags: ['Birthday Cakes', 'Fruit Cakes', 'Kids Cakes'],
    prepTime: 'Same-day delivery available',
  },
  {
    id: 'prod-chocolate-cupcake',
    name: 'Chocolate Cupcake',
    category: 'Cupcakes',
    shortDescription:
      'Box of 6 rich Belgian chocolate cupcakes topped with whipped fudge ganache swirls.',
    fullDescription:
      'Six moist dark cocoa cupcakes piped high with silky Belgian chocolate buttercream and finished with chocolate pearls. Ideal for gifting, office treats, and birthday tables.',
    price: 1350,
    sizes: [
      { label: 'Box of 6 Cupcakes', price: 1350 },
      { label: 'Box of 12 Cupcakes', price: 2550 },
    ],
    image: IMAGES.cupcakesBox,
    featuredOnHome: false,
    prepTime: 'Ready in 45 mins',
  },
  {
    id: 'prod-red-velvet-cupcake',
    name: 'Red Velvet Cupcake',
    category: 'Cupcakes',
    shortDescription:
      'Box of 6 crimson velvet cupcakes crowned with signature cream cheese frosting.',
    fullDescription:
      'Our classic Red Velvet recipe in individual cupcake form, topped with generous swirls of tangy-sweet cream cheese frosting and fine velvet crumb.',
    price: 1400,
    sizes: [
      { label: 'Box of 6 Cupcakes', price: 1400 },
      { label: 'Box of 12 Cupcakes', price: 2650 },
    ],
    image: IMAGES.cupcakesBox,
    featuredOnHome: false,
    prepTime: 'Ready in 45 mins',
  },
  {
    id: 'prod-brownies',
    name: 'Brownies',
    category: 'Brownies',
    shortDescription:
      'Box of 6 crackle-top fudgy chocolate brownies with Walnut, Nutella, and Lotus toppings.',
    fullDescription:
      'Baked with dark couverture chocolate for a dense, fudgy center and paper-thin crackly top. Each box includes an assortment of Classic Fudge, Hazelnut Rocher, and Lotus Biscoff squares.',
    price: 1250,
    sizes: [
      { label: 'Box of 6 Squares', price: 1250 },
      { label: 'Box of 12 Squares', price: 2350 },
    ],
    image: IMAGES.chocolateFudge,
    featuredOnHome: false,
    prepTime: 'Ready in 30 mins',
  },
  {
    id: 'prod-cookies',
    name: 'Cookies',
    category: 'Cookies',
    shortDescription:
      'Warm New York-style chunky chocolate chip and double cocoa soft-baked cookies.',
    fullDescription:
      'Thick, golden-edged gourmet cookies with gooey melted chocolate chunks and a touch of flaky sea salt. Freshly baked throughout the day at our H-13 kitchen.',
    price: 1100,
    sizes: [
      { label: 'Box of 4 Giant Cookies', price: 1100 },
      { label: 'Box of 8 Giant Cookies', price: 2050 },
    ],
    image: IMAGES.lotusBiscoff,
    featuredOnHome: false,
    prepTime: 'Baked fresh daily',
  },
  {
    id: 'prod-dessert-cups',
    name: 'Dessert Cups',
    category: 'Desserts',
    shortDescription:
      'Individual three-milk tres leches and Belgian chocolate mousse layered dessert cups.',
    fullDescription:
      'Chilled single-serve patisserie cups featuring alternating layers of soaked sponge, silky diplomat cream, caramelized biscuit crunch, and rich ganache.',
    price: 950,
    sizes: [
      { label: 'Pack of 2 Dessert Cups', price: 950 },
      { label: 'Pack of 4 Dessert Cups', price: 1800 },
    ],
    image: IMAGES.redVelvet,
    featuredOnHome: false,
    prepTime: 'Chilled & ready for delivery',
  },
  {
    id: 'prod-celebration-box',
    name: 'Mini Celebration Bento & Cupcake Box',
    category: 'Other Treats',
    shortDescription:
      'A petite lunchbox cake paired with 5 matching buttercream cupcakes in a gift box.',
    fullDescription:
      'Designed for intimate surprises, dorm celebrations in H-13, and thoughtful gifts. Includes a customizable mini bento cake and five coordinated cupcakes.',
    price: 2150,
    sizes: [
      { label: 'Bento + 2 Cupcakes', price: 1450 },
      { label: 'Bento + 5 Cupcakes', price: 2150 },
    ],
    image: IMAGES.heroCelebration,
    featuredOnHome: false,
    cakeCollectionTags: ['Custom Cakes', 'Birthday Cakes', 'Theme Cakes'],
    prepTime: 'Custom ribbon & note included',
  },
];

export const CAKE_COLLECTIONS: CakeCollection[] = [
  {
    id: 'col-birthday',
    title: 'Birthday Cakes',
    description:
      'Festive buttercream, chocolate drip, and personalized birthday cakes crafted for memorable celebrations.',
    image: IMAGES.heroCelebration,
    menuFilter: 'Birthday Cakes',
  },
  {
    id: 'col-wedding',
    title: 'Wedding Cakes',
    description:
      'Elegant multi-tier cakes with handcrafted sugar florals, satin finishes, and champagne gold accents.',
    image: IMAGES.bespokeWedding,
    menuFilter: 'Wedding Cakes',
  },
  {
    id: 'col-anniversary',
    title: 'Anniversary Cakes',
    description:
      'Romantic Red Velvet, blush rosette, and heart-shaped cakes designed to celebrate milestones together.',
    image: IMAGES.redVelvet,
    menuFilter: 'Anniversary Cakes',
  },
  {
    id: 'col-chocolate',
    title: 'Chocolate Cakes',
    description:
      'Rich Belgian chocolate fudge, Ferrero hazelnut praline, and double ganache cakes for true cocoa lovers.',
    image: IMAGES.chocolateFudge,
    menuFilter: 'Chocolate Cakes',
  },
  {
    id: 'col-fruit',
    title: 'Fruit Cakes',
    description:
      'Light vanilla sponge layered with seasonal fresh cream, berry compotes, and roasted pistachio.',
    image: IMAGES.lotusBiscoff,
    menuFilter: 'Fruit Cakes',
  },
  {
    id: 'col-custom',
    title: 'Custom Cakes',
    description:
      'Tailored cake designs made to match your exact color palette, reference photo, and flavor preference.',
    image: IMAGES.bespokeWedding,
    menuFilter: 'Custom Cakes',
  },
  {
    id: 'col-kids',
    title: 'Kids Cakes',
    description:
      'Joyful, colorful birthday creations with playful themes and child-favorite chocolate or vanilla layers.',
    image: IMAGES.cupcakesBox,
    menuFilter: 'Kids Cakes',
  },
  {
    id: 'col-theme',
    title: 'Theme Cakes',
    description:
      'Graduations, bridal showers, baby reveals, and corporate milestones brought to life in buttercream.',
    image: IMAGES.heroCelebration,
    menuFilter: 'Theme Cakes',
  },
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Two-Tier Blush & Champagne Gold Celebration Cake',
    category: 'Celebrations',
    image: IMAGES.heroCelebration,
    aspect: 'tall',
    caption: 'Hand-piped rosettes with edible 24k gold leaf and sugar pearls.',
  },
  {
    id: 'gal-2',
    title: 'Signature Belgian Chocolate Fudge Cake',
    category: 'Cakes',
    image: IMAGES.chocolateFudge,
    aspect: 'standard',
    caption: 'Glossy dark chocolate ganache drip and chocolate curls.',
  },
  {
    id: 'gal-3',
    title: 'Bespoke Three-Tier Ivory & Peony Wedding Cake',
    category: 'Custom Cakes',
    image: IMAGES.bespokeWedding,
    aspect: 'tall',
    caption: 'Custom wedding centerpiece crafted for an Islamabad reception.',
  },
  {
    id: 'gal-4',
    title: 'Assorted Luxury Cupcake Gift Box',
    category: 'Cupcakes',
    image: IMAGES.cupcakesBox,
    aspect: 'square',
    caption: 'Rosewater buttercream, roasted pistachio, and dark chocolate swirls.',
  },
  {
    id: 'gal-5',
    title: 'Crimson Red Velvet Celebration Cake',
    category: 'Cakes',
    image: IMAGES.redVelvet,
    aspect: 'standard',
    caption: 'Classic Red Velvet layered with whipped Madagascar vanilla cream cheese.',
  },
  {
    id: 'gal-6',
    title: 'Artisanal Lotus Biscoff Speculoos Cake',
    category: 'Desserts',
    image: IMAGES.lotusBiscoff,
    aspect: 'square',
    caption: 'Caramelized biscuit drip and crushed speculoos crown.',
  },
  {
    id: 'gal-7',
    title: 'Bridal Shower Pastel Buttercream Creation',
    category: 'Celebrations',
    image: IMAGES.heroCelebration,
    aspect: 'standard',
    caption: 'Soft pink buttercream textures tailored for intimate gatherings in Islamabad.',
  },
  {
    id: 'gal-8',
    title: 'Custom Anniversary Tiered Cake',
    category: 'Custom Cakes',
    image: IMAGES.bespokeWedding,
    aspect: 'square',
    caption: 'Handcrafted sugar blooms and brushed gold detailing.',
  },
  {
    id: 'gal-9',
    title: 'Gourmet Party Cupcake Assortment',
    category: 'Cupcakes',
    image: IMAGES.cupcakesBox,
    aspect: 'standard',
    caption: 'Freshly piped every morning at Cake Grand Shop H-13.',
  },
];

export const INITIAL_PAYMENT_METHODS: PaymentMethod[] = [
  {
    id: 'pay-cod',
    name: 'Cash on Delivery (COD)',
    description: 'Pay in cash (PKR) when your cake arrives at your doorstep or upon takeaway pickup.',
    enabled: true,
  },
  {
    id: 'pay-bank',
    name: 'Bank Transfer / Raast ID',
    description: 'Instant IBFT or Raast transfer to our Cake Grand Shop business account.',
    accountDetails: 'Raast ID: 0347 0300950 · Share screenshot on WhatsApp after placing order',
    enabled: true,
  },
  {
    id: 'pay-wallet',
    name: 'JazzCash / EasyPaisa',
    description: 'Convenient mobile wallet payment for fast order confirmation.',
    accountDetails: 'Account Number: 0347 0300950 (Cake Grand Shop)',
    enabled: true,
  },
];

export const INITIAL_CMS_STATE: CMSStoreState = {
  products: INITIAL_PRODUCTS,
  categories: INITIAL_FEATURED_CATEGORIES,
  menuCategories: INITIAL_MENU_CATEGORIES,
  paymentMethods: INITIAL_PAYMENT_METHODS,
  deliveryFeePKR: 250,
  showPricesInPKR: true,
};
