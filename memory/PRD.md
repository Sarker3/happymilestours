# HappyMilesTours — Product Requirements Document

## Original Problem Statement
Premium travel website "HappyMilesTours" for car rental + tour packages based in Siliguri, focused on North Bengal & Sikkim tourism. Colors: green, blue, white, orange. Pages: Home, Destinations, Packages, About Us, Contact. Beautiful banner, destination photos section, North Bengal/Sikkim places section with stock imagery, animated home sections.

## Brand
- Name: HappyMilesTours
- Location: Siliguri, West Bengal
- Phone: 9800981049 · Email: happymilestours2026@gmail.com
- Palette: deep green #163A2A, blue #1E3A5F, orange #E25E3E, white #FFFFFF
- Fonts: Playfair Display (display) + Outfit (body)

## Architecture
- Frontend: React 19 + react-router-dom 7 + Tailwind + shadcn primitives (sonner toasts)
- Backend: FastAPI + Motor (MongoDB)
- DB: MongoDB collection `inquiries` (id, name, email, phone, interest, message, created_at)

## User Personas
1. **Family travellers** booking 3–6 night Himalayan tours.
2. **Honeymooners** seeking curated couple packages.
3. **Groups / corporates** renting Tempo Travellers.
4. **Solo / adventure travellers** for North Sikkim circuits.

## Core Requirements (Static)
- 5 routed pages: /, /destinations, /packages, /about, /contact
- Premium hero with Kanchenjunga imagery, animated entrance, two CTAs
- 6 destination bento grid (Darjeeling, Gangtok, Pelling, Kalimpong, Lachung, Tsomgo)
- 6 tour packages with filters (All / Bestseller / Premium / Adventure / Couples)
- Fleet showcase: Sedan, SUV, Innova, Tempo Traveller
- Why-us, stats, testimonials, North Bengal/Sikkim gallery, CTA bands
- Sticky floating WhatsApp + Call buttons on every page
- Inquiry form → POST /api/inquiries → MongoDB

## Implemented (2026-06)
- Backend: POST/GET /api/inquiries, status check regression intact
- Frontend: 5 pages, navbar with scroll-state, footer, layout, floating actions
- Animations: slow-zoom hero, fade-up, scroll-reveal (IntersectionObserver), pulse-ring on WhatsApp
- Bento destinations grid, filterable packages page
- Form validates required fields with sonner toast + persistent success state
- Tested end-to-end (iteration_1.json — 100% pass)

## Prioritized Backlog
### P1
- Admin panel to view/manage inquiries (auth + dashboard)
- Package detail pages with day-by-day itinerary
- Customer testimonials carousel with real reviews
- SEO meta tags, sitemap.xml, OG images
- Custom domain + analytics

### P2
- Online booking with calendar + payment (Razorpay/Stripe)
- Multi-language (Hindi, Bengali)
- Blog / travel guides for SEO
- Image gallery lightbox
- Live chat widget integrated with WhatsApp Business

### P3
- Customer login + trip history
- Loyalty / referral program
- Newsletter capture + email automation (Resend)

## Next Action Items
1. Gather real customer photos / testimonials from owner
2. Consider integrating Resend/SMTP so inquiries also email happymilestours2026@gmail.com
3. Add Google Maps embed for office location
4. Build simple `/admin/inquiries` dashboard
