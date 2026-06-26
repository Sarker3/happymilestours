export const BRAND = {
  name: "HappyMilesTours",
  tagline: "Where every mile turns into a memory.",
  phone: "9800981049",
  whatsapp: "919800981049",
  email: "happymilestours2026@gmail.com",
  location: "Siliguri, West Bengal",
  established: "2024",
};

export const NAV_LINKS = [
  { label: "Home", path: "/" },
  { label: "Destinations", path: "/destinations" },
  { label: "Packages", path: "/packages" },
  { label: "About Us", path: "/about" },
  { label: "Contact", path: "/contact" },
];

export const DESTINATIONS = [
  {
    id: "darjeeling",
    name: "Darjeeling",
    region: "North Bengal",
    tagline: "Queen of the Hills",
    description:
      "Misty tea gardens, the iconic Toy Train, and Tiger Hill sunrise unveiling the Kanchenjunga in pink-gold glory.",
    image:
      "https://images.pexels.com/photos/35151733/pexels-photo-35151733.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1200",
    highlights: ["Tiger Hill Sunrise", "Toy Train Ride", "Happy Valley Tea Estate", "Batasia Loop"],
  },
  {
    id: "gangtok",
    name: "Gangtok",
    region: "Sikkim",
    tagline: "Capital of Clouds",
    description:
      "Sikkim's vibrant capital perched on a misty ridge — MG Road, monasteries, and panoramic ropeways.",
    image:
      "https://images.pexels.com/photos/14916663/pexels-photo-14916663.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1200",
    highlights: ["MG Marg", "Tashi Viewpoint", "Enchey Monastery", "Ropeway Ride"],
  },
  {
    id: "pelling",
    name: "Pelling",
    region: "Sikkim",
    tagline: "Face-to-face with Kanchenjunga",
    description:
      "Wake up to the third-highest peak on Earth. Skywalks, ancient ruins and the sacred Khecheopalri Lake.",
    image:
      "https://images.pexels.com/photos/33547415/pexels-photo-33547415.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1200",
    highlights: ["Skywalk", "Rabdentse Ruins", "Kanchenjunga Falls", "Khecheopalri Lake"],
  },
  {
    id: "kalimpong",
    name: "Kalimpong",
    region: "North Bengal",
    tagline: "The Hidden Hill Town",
    description:
      "Pine-scented air, colonial bungalows and cactus nurseries. A quiet retreat above the Teesta valley.",
    image:
      "https://images.pexels.com/photos/37494566/pexels-photo-37494566.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1200",
    highlights: ["Delo Park", "Durpin Monastery", "Cactus Nursery", "Teesta River View"],
  },
  {
    id: "lachung",
    name: "Lachung & Yumthang",
    region: "North Sikkim",
    tagline: "Valley of Flowers",
    description:
      "A high-altitude village ringed by snow peaks. Yumthang's rhododendron bloom and Zero Point's snowfields.",
    image:
      "https://images.pexels.com/photos/2434269/pexels-photo-2434269.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1200",
    highlights: ["Yumthang Valley", "Zero Point", "Hot Springs", "Bhim Nala Falls"],
  },
  {
    id: "tsomgo",
    name: "Tsomgo Lake",
    region: "East Sikkim",
    tagline: "The Sacred Glacial Mirror",
    description:
      "A sapphire glacial lake at 12,400 ft, frozen in winter, surrounded by yak trails and prayer flags.",
    image:
      "https://images.pexels.com/photos/33547415/pexels-photo-33547415.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1200",
    highlights: ["Cable Car", "Baba Mandir", "Nathula Pass", "Yak Rides"],
  },
];

export const PACKAGES = [
  {
    id: "darjeeling-delight",
    name: "Darjeeling Delight",
    duration: "3N / 4D",
    price: "₹ 11,499",
    perPerson: true,
    cover:
      "https://images.pexels.com/photos/35151733/pexels-photo-35151733.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1200",
    highlights: ["Tiger Hill Sunrise", "Toy Train Joy Ride", "Happy Valley Tea Estate", "Batasia Loop & War Memorial"],
    includes: ["Hotel (3★) with breakfast", "Sedan / SUV transfers", "All sightseeing", "Driver allowance"],
    badge: "Bestseller",
  },
  {
    id: "gangtok-getaway",
    name: "Gangtok Getaway",
    duration: "4N / 5D",
    price: "₹ 15,999",
    perPerson: true,
    cover:
      "https://images.pexels.com/photos/14916663/pexels-photo-14916663.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1200",
    highlights: ["Tsomgo Lake", "Baba Mandir", "MG Marg evenings", "Tashi Viewpoint"],
    includes: ["Hotel (3★/4★)", "Innova / SUV", "Permits for Tsomgo", "Daily breakfast & dinner"],
    badge: "Most Loved",
  },
  {
    id: "north-sikkim",
    name: "North Sikkim Adventure",
    duration: "5N / 6D",
    price: "₹ 22,499",
    perPerson: true,
    cover:
      "https://images.pexels.com/photos/2434269/pexels-photo-2434269.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1200",
    highlights: ["Lachung village stay", "Yumthang Valley of Flowers", "Zero Point snow play", "Bhim Nala Falls"],
    includes: ["Hotel & guesthouse stay", "Sumo / Innova", "All inner-line permits", "All meals in North"],
    badge: "Adventure",
  },
  {
    id: "pelling-kalimpong",
    name: "Pelling & Kalimpong Retreat",
    duration: "4N / 5D",
    price: "₹ 14,499",
    perPerson: true,
    cover:
      "https://images.pexels.com/photos/37494566/pexels-photo-37494566.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1200",
    highlights: ["Kanchenjunga Falls", "Skywalk", "Delo Park", "Durpin Monastery"],
    includes: ["Hotel (3★)", "Sedan / SUV", "All sightseeing", "Breakfast included"],
    badge: "Quiet Escape",
  },
  {
    id: "grand-himalayan",
    name: "Grand Himalayan Circuit",
    duration: "8N / 9D",
    price: "₹ 34,999",
    perPerson: true,
    cover:
      "https://images.pexels.com/photos/12174800/pexels-photo-12174800.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1200",
    highlights: ["Darjeeling + Gangtok + Lachung + Pelling", "Tea estates", "All major viewpoints", "Local cuisine trails"],
    includes: ["Curated 3★/4★ hotels", "Premium Innova Crysta", "All permits & meals", "Personal trip coordinator"],
    badge: "Premium",
  },
  {
    id: "honeymoon-special",
    name: "Honeymoon Hideaway",
    duration: "5N / 6D",
    price: "₹ 28,999",
    perPerson: false,
    cover:
      "https://images.pexels.com/photos/14916663/pexels-photo-14916663.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1200",
    highlights: ["Candle-light dinner", "Private cab", "Cottage stays", "Surprise photo session"],
    includes: ["Boutique stays", "Dedicated SUV", "Couple-only sightseeing", "Welcome gift hamper"],
    badge: "Couples",
  },
];

export const FLEET = [
  {
    name: "Sedan",
    model: "Dzire / Etios",
    seats: "4 + 1",
    luggage: "2 large bags",
    ideal: "Couples & solo trips",
    image:
      "https://images.pexels.com/photos/2876788/pexels-photo-2876788.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1200",
  },
  {
    name: "SUV",
    model: "Bolero / Scorpio",
    seats: "6 + 1",
    luggage: "4 large bags",
    ideal: "Hill terrain & families",
    image:
      "https://images.pexels.com/photos/35353704/pexels-photo-35353704.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1200",
  },
  {
    name: "Innova",
    model: "Innova Crysta",
    seats: "6 + 1",
    luggage: "5 large bags",
    ideal: "Premium family travel",
    image:
      "https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1200",
  },
  {
    name: "Tempo Traveller",
    model: "Force Traveller 12/17",
    seats: "12 / 17",
    luggage: "Large boot",
    ideal: "Groups & corporate tours",
    image:
      "https://images.pexels.com/photos/35353704/pexels-photo-35353704.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1200",
  },
];

export const GALLERY = [
  "https://images.pexels.com/photos/35151733/pexels-photo-35151733.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=600&w=800",
  "https://images.pexels.com/photos/14916663/pexels-photo-14916663.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=600&w=800",
  "https://images.pexels.com/photos/37494566/pexels-photo-37494566.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=600&w=800",
  "https://images.pexels.com/photos/33547415/pexels-photo-33547415.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=600&w=800",
  "https://images.pexels.com/photos/12174800/pexels-photo-12174800.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=600&w=800",
  "https://images.pexels.com/photos/2434269/pexels-photo-2434269.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=600&w=800",
  "https://images.pexels.com/photos/35353704/pexels-photo-35353704.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=600&w=800",
  "https://images.pexels.com/photos/2901209/pexels-photo-2901209.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=600&w=800",
];

export const TESTIMONIALS = [
  {
    name: "Ananya Sharma",
    place: "Bengaluru",
    text:
      "From the Siliguri pickup to Yumthang Valley — every kilometer was magical. Driver Pemba was a gem. HappyMilesTours, you have a customer for life!",
    rating: 5,
  },
  {
    name: "Rohit & Megha",
    place: "Mumbai",
    text:
      "We booked the Honeymoon Hideaway and it was the most thoughtful trip we have ever taken. The candle-light dinner in Pelling was unforgettable.",
    rating: 5,
  },
  {
    name: "Family Iyer",
    place: "Chennai",
    text:
      "Travelled in a 12-seater Tempo Traveller across North Sikkim with kids and grandparents. Smooth, safe, and incredibly well planned.",
    rating: 5,
  },
];

export const STATS = [
  { value: "12+", label: "Years of Himalayan Expertise" },
  { value: "8,500+", label: "Happy Travellers" },
  { value: "40+", label: "Curated Routes" },
  { value: "24/7", label: "On-trip Support" },
];

export const WHY_US = [
  {
    title: "Born in Siliguri",
    text: "We're locals. Our drivers know every hairpin, every viewpoint, every chai stop in North Bengal & Sikkim.",
    icon: "MapPin",
  },
  {
    title: "Vetted Fleet",
    text: "Newer model Innova, SUV and Tempo Travellers — maintained, insured, and driven by trained mountain experts.",
    icon: "ShieldCheck",
  },
  {
    title: "All Permits Sorted",
    text: "From Tsomgo to Nathula and North Sikkim — we handle inner-line permits so you only worry about the views.",
    icon: "BadgeCheck",
  },
  {
    title: "Transparent Pricing",
    text: "No surprises. What you see is what you pay. Detailed inclusions on every package.",
    icon: "ReceiptIndianRupee",
  },
];
