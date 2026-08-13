# 💍 CC Wedding — Digital Wedding RSVP & Invitation

![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38BDF8?logo=tailwindcss&logoColor=white)

An elegant, modern, and interactive digital wedding invitation & RSVP web application for **Charlon & Chilzia's Wedding**. Built with **React 18**, **TypeScript**, **Vite**, **Tailwind CSS**, and **Formspree**.

🌐 **Live Demo:** [https://www.ccwedding.page/](https://www.ccwedding.page/)

---

## ✨ Features

- ✉️ **Interactive Invitation Envelope:** Dynamic opening experience featuring custom green-screen canvas chroma-key video processing for animated logo reveals.
- ⏳ **Real-Time Countdown Timer:** Live timer counting down days, hours, minutes, and seconds to the wedding date.
- 📍 **Event Details & Maps:** Comprehensive information for both Ceremony and Reception venues with location cards and map directions.
- 🎨 **Dress Code & Color Swatches:** Visual attire guidelines featuring interactive color palette swatches (Ice Blue, Soft Blue, Deep Teal, Silver, Champagne).
- 👥 **Entourage Showcase:** Organised display of the wedding entourage, including parents, principal sponsors, secondary sponsors, groomsmen, bridesmaids, and flower girls.
- 📸 **Photo Gallery & Lightbox:** Fluid image carousel and full-screen modal lightbox for browsing high-resolution photos.
- 📝 **Formspree RSVP Integration:** Seamless RSVP modal allowing guests to accept/decline and submit personal messages directly to email notifications.
- 🎵 **Background Music Player:** Built-in ambient background music player with toggle controls.
- ❓ **FAQ Accordion:** Interactive collapsible FAQ section addressing common guest queries.
- 📱 **Fully Responsive Design:** Optimized for mobile, tablet, and desktop viewports with responsive typography and dynamic layouts.

---

## 🛠️ Tech Stack

| Category | Technology |
| :--- | :--- |
| **Frontend Framework** | [React 18](https://react.dev/) |
| **Language** | [TypeScript](https://www.typescriptlang.org/) |
| **Build Tool & Server** | [Vite](https://vitejs.dev/) |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) & Custom CSS Variables |
| **Iconography** | [Lucide React](https://lucide.dev/) |
| **Form Backend** | [Formspree](https://formspree.io/) |
| **Database SDK** | [@supabase/supabase-js](https://supabase.com/) |
| **Fonts** | Google Fonts (*Parisienne*, system serif & sans-serif fonts) |

---

## 📁 Project Structure

```text
rsvpcc/
├── public/
│   ├── images/         # Static images & background assets (aicc.png, dresscode.png, etc.)
│   └── videos/         # Logo video assets for canvas chroma-key rendering
├── src/
│   ├── App.tsx         # Main Application Component (UI layout, states, modals, & logic)
│   ├── index.css       # Core design tokens, custom styles, animations & responsive rules
│   ├── main.tsx        # React application entry point
│   └── vite-env.d.ts   # Vite TypeScript environment declarations
├── .env.example        # Template for environment configuration
├── update_colors.py    # Python helper utility for batch CSS color theme adjustments
├── index.html          # Main HTML entry with SEO tags & Google Fonts integration
├── tailwind.config.js  # Tailwind CSS setup
└── vite.config.ts      # Vite configuration
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed on your machine:
- [Node.js](https://nodejs.org/) (v18.0.0 or higher recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Shindawn/rsvpcc-main.git
   cd rsvpcc-main
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env` file in the root directory by copying `.env.example`:
   ```bash
   cp .env.example .env
   ```

   Open `.env` and add your Formspree Form ID:
   ```env
   VITE_FORMSPREE_FORM_ID=your_formspree_form_id_here
   ```

4. **Start the Development Server:**
   ```bash
   npm run dev
   ```
   Open your browser and navigate to `http://localhost:5173`.

---

## 📜 Available Scripts

In the project directory, you can run:

- `npm run dev` — Starts the development server with Hot Module Replacement (HMR).
- `npm run build` — Builds the app for production to the `dist` folder.
- `npm run preview` — Locally previews the production build.
- `npm run typecheck` — Runs TypeScript compiler checks without emitting files.
- `npm run lint` — Runs ESLint to check for syntax and style issues.

---

## 🎨 Theme & Color Customization

The project includes a custom Python script (`update_colors.py`) to streamline theme color modifications in `src/index.css`:

```bash
python update_colors.py
```

---

## 📄 License

This project is created for Charlon & Chilzia's Wedding. All rights reserved.
