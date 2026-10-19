# Mathews Corner — Hillside Homestay Website

A premium, elegant, and warm responsive website for **Mathews Corner**, a family-run hillside homestay in Paruthumpara near Peermade, Idukki, Kerala.

## 🔗 Live Website

- **Live URL**: **[https://pravesh249.github.io/mathews-corner/](https://pravesh249.github.io/mathews-corner/)**
- **GitHub Repository**: **[https://github.com/pravesh249/mathews-corner](https://github.com/pravesh249/mathews-corner)**

---

## 🚀 Quick Start (Running Locally)

This site is built with **pure HTML5, CSS3, and modern Vanilla JavaScript** — **no compilation, bundler, or build step is required**.

### Option 1: Python HTTP Server (Already Installed on macOS)

From the project directory:

```bash
# To run Site (primary version):
cd /Users/pravesh/Projects/MathewsCorner/Site
python3 -m http.server 8080

# To run Site-v2 (alternative version):
cd /Users/pravesh/Projects/MathewsCorner/Site-v2
python3 -m http.server 8081
```

Open your browser and navigate to:
**[http://localhost:8080](http://localhost:8080)**

---

### Option 2: Node.js / npx

```bash
# Using npx serve
npx serve /Users/pravesh/Projects/MathewsCorner/Site -p 8080

# Or http-server
npx http-server /Users/pravesh/Projects/MathewsCorner/Site -p 8080
```

---

### Option 3: Direct File Open
You can also directly open `index.html` in your browser (double-click `Site/index.html` in Finder). Using a local web server (Option 1 or 2) is recommended for full feature support (smooth dialogs, ES modules, etc.).

---

## 📁 Project Directory Structure

```text
MathewsCorner/
├── README.md                # Project documentation and run instructions
├── Site/                    # Primary production-ready website
│   ├── index.html           # Main single-page application structure
│   ├── styles/
│   │   └── main.css         # Kerala hill-station design system, typography & responsive layouts
│   ├── scripts/
│   │   └── main.js          # Room filters, interactive modals, lightbox, form handlers
│   └── assets/
│       └── images/          # Optimized photography & visual assets
└── Site-v2/                 # Alternative design copy
    ├── index.html
    ├── styles/main.css
    ├── scripts/main.js
    └── assets/images/
```

---

## 🌐 Free Hosting & Deployment Guide

Because the project is 100% static files, you can deploy it instantly on any free static hosting provider:

### 1. GitHub Pages (Recommended)
1. Push this repository to GitHub:
   ```bash
   git add .
   git commit -m "Update website"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<repo-name>.git
   git push -u origin main
   ```
2. In GitHub, go to **Settings** > **Pages**.
3. Under **Branch**, select `main` and set the folder to `/Site` or `/root`.
4. Click **Save** — your live link will be generated in under a minute!

### 2. Netlify (Drag & Drop or CLI)
- **Drag & Drop**: Visit [app.netlify.com/drop](https://app.netlify.com/drop) and drag the `Site/` folder into the browser.
- **Netlify CLI**:
  ```bash
  npx netlify-cli deploy --dir=Site --prod
  ```

### 3. Vercel
```bash
cd Site
npx vercel
```

### 4. Cloudflare Pages
- Connect your GitHub repository to Cloudflare Pages or deploy with Wrangler:
  ```bash
  npx wrangler pages deploy Site
  ```

---

## 🎨 Original Design Specification & Brief

The website was designed around the following brand identity and architecture guidelines:

### Brand Identity
- **Business Name**: Mathews Corner
- **Tagline**: *Your Scenic Escape*
- **Location**: Paruthumpara, Peermade, Kerala, India
- **Brand Personality**: Warm, peaceful, elegant, authentic, family-oriented, nature-connected
- **Core Philosophy**: *"This is not just a place to stay. This is a place to feel at home."* Emphasizing slow living and genuine Kerala hospitality rather than a commercial resort.

### Visual Aesthetic & Design System
- **Colors**:
  - Deep Olive Green (`#2C3E2D`)
  - Warm Metallic Gold (`#D4AF37` / `#C5A059`)
  - Warm Ivory & Cream (`#FAF8F5`)
  - Natural Wood & Earth Tones
- **Typography**: Playfair Display (editorial serif) paired with Outfit / Plus Jakarta Sans (clean modern body).
- **Key Sections**:
  1. **Sticky Header**: Navigation + instant "Book Your Stay" CTA.
  2. **Hero Section**: Scenic hill view, headline, tagline, and scroll indicator.
  3. **About Mathews Corner**: *"A Home Built on Hospitality"* — emotional family history and High Ranges connection.
  4. **Tea Heritage Rooms Collection**: Interactive room cards, amenity tags, room details modal dialog, and stay inquiry trigger.
  5. **Experiences & Dining**: Kerala home-cooked cuisine, estate walks, tea tasting, and family dining.
  6. **Nearby Attractions**: Paruthumpara viewpoints, Peermade, Vagamon, Thekkady, and nature trails.
  7. **Guest Reviews & Story Sharing**: Testimonials carousel with interactive review submission modal.
  8. **Photo Gallery**: Filterable masonry gallery with fullscreen lightbox preview.
  9. **Contact & Booking**: Interactive inquiry form, phone & WhatsApp quick links, and embedded Google Maps directions.
  10. **Footer**: Deep olive footer with gold accents, quick links, and copyright info.
