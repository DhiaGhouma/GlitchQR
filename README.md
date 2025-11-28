
<img width="1024" height="270" alt="Gemini_Generated_Image_uub8atuub8atuub8" src="https://github.com/user-attachments/assets/b3e30310-9ec1-44b5-900c-d553c017b835" />

GlitchQR is a cyberpunk-themed QR code generator built with a hacking-interface aesthetic.  
It allows users to instantly generate **highly customizable QR codes**, preview them live, and download them as **PNG** or **SVG**.

The entire experience reflects the brand identity:  
**GlitchQR — “Scan the signal inside the noise.”**

---

##Features

### Core Functionality
- Generate QR codes from:
  - Text  
  - URL  
  - Contact info  
- Real-time live preview  
- Download options:
  - **PNG**
  - **SVG**
- Customization options:
  - Color themes  
  - Dot style (rounded, square, pixelated, glitch-style)  
  - Background shape / theme  
  - Error correction level  
  - Optional **logo in the center**  
- Save last used configuration via **localStorage**  

---

## Brand Identity & UI/UX

### Brand
- **Name:** GlitchQR  
- **Slogan:** *“Scan the signal inside the noise.”*  
- Branding integrated throughout the app:
  - Logo in header  
  - Splash screen  
  - Landing page  
  - Download screen watermark  

### Visual Design — Hacking / Cyberpunk aesthetic
- Background: `#020403` / `#0b0f10`
- Primary neon color: `#00ff95`
- Accent colors: `#00e0ff`, `#b700ff`
- Typography: **JetBrains Mono / Fira Code**
- Effects:
  - Glitch hover animations  
  - Terminal-style buttons  
  - Matrix-rain or glitch-noise animated background  
  - Command-line inspired inputs  
  - Glowing borders & neon lines  

---

## Pages & Components

### Home / Main App

#### Left Panel — User Input
- Text/URL input  
- Dropdown selectors:
  - Style preset  
  - Dot style  
  - Color theme  
  - Background theme  
  - Error correction level  
- Logo uploader  
- “Generate QR” button  
- Optional sound effects (keyboard clicks, glitch beeps)

#### Right Panel — Live Preview
- Real-time QR preview
- Neon glowing container
- Buttons:
  - **Download PNG**
  - **Download SVG**
  - **Regenerate with random hacking theme**

---

## 🎛 Theme Presets

At least **6 built-in cyberpunk themes**:

1. **Matrix Green** – classic terminal green  
2. **Cyberpunk Neon** – cyan + magenta glow  
3. **Terminal Classic** – monochrome hacker screen  
4. **Glitch Mode** – distorted colors / static  
5. **Blueprint Tech** – cyan blueprint grid  
6. **Dark Plasma** – purple/blue neon waves  

Each preset applies:
- Dot style  
- Accent colors  
- Background theme  
- Animation intensity  

---

##  Tech Stack

- **React** + TailwindCSS (or Next.js if SSR required)
- **QR generation library**: `qrcode.react` or `qr-code-styling`
- CSS + JS animations (matrix rain, glitch, typing cursor)
- LocalStorage for saving configurations

---

##  Responsiveness

- **Desktop** → 2-panel layout  
- **Mobile** → Vertical stacked layout with smooth transitions  
- Full cyberpunk theme preserved on all screen sizes  


