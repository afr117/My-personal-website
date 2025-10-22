# Design Guidelines: Hacker-Themed Dark Portfolio Website

## Design Approach
**Selected Approach:** Cyberpunk Hacker Aesthetic + Modern Dark UI

Drawing inspiration from hacker culture, terminal interfaces, and cyberpunk aesthetics (Matrix, Blade Runner, Cyberpunk 2077). The design emphasizes dramatic contrast, neon accents, and a mysterious technical atmosphere through the animated landing page.

**Key Design Principles:**
- Dark, immersive atmosphere with near-black backgrounds
- Neon green accents (classic hacker/terminal color)
- High contrast for readability in dark environments
- Tech-focused with monospace elements
- Glowing effects and subtle scanline aesthetics
- Smooth, purposeful animations that enhance the cyber feel

---

## Core Design Elements

### A. Color Palette

**Dark Mode Primary (Default - Hacker Theme):**
- Background Base: 0 0% 4% (nearly black)
- Background Elevated: 0 0% 7% (dark charcoal)
- Text Primary: 0 0% 95% (bright white)
- Text Secondary: 0 0% 65% (dimmed gray)

**Accent Colors:**
- Primary Accent (Hacker Green): 140 90% 50% (neon green for CTAs, links, terminal effects)
- Secondary Accent (Cyber Cyan): 180 85% 55% (electric cyan for highlights)
- Tertiary (Electric Purple): 270 80% 60% (for special highlights, project tags)

**Gradient Overlays:**
- Landing Page: Radial gradient from hacker green to deep black
- Card Highlights: Neon green glow borders at 30% opacity
- Hero Section: Subtle green-to-cyan gradient text

**Glassmorphism Effects:**
- Background: Base color at 40% opacity (more transparent for darker feel)
- Backdrop Filter: blur(12px) with subtle green tint
- Border: 1px solid neon green at 15% opacity

### B. Typography

**Font Families:**
- Display/Headings: 'Space Grotesk' (Bold 700, Medium 500) - technical, modern feel
- Body/UI: 'Inter' (Regular 400, Medium 500, Semibold 600) - excellent readability
- Code/Technical: 'JetBrains Mono' or system monospace for terminal-like elements

**Type Scale:**
- Hero/Landing Title: 72px (4.5rem) desktop / 48px (3rem) mobile, 700 weight, -1% letter-spacing
- H1 (Section Headings): 48px (3rem) desktop / 36px (2.25rem) mobile, 700 weight
- H2 (Project Titles): 32px (2rem) desktop / 24px (1.5rem) mobile, 600 weight
- Body Large: 18px (1.125rem), 400 weight, 1.6 line-height
- Body: 16px (1rem), 400 weight, 1.6 line-height
- Small/Captions: 14px (0.875rem), 500 weight
- Monospace/Code: 14px (0.875rem), monospace font

### C. Layout System

**Spacing Primitives:** Use Tailwind units of 4, 8, 12, 16, 20, 24, 32 (e.g., p-4, m-8, gap-12)

**Container Strategy:**
- Max Width: 1280px (max-w-7xl) for main content
- Project Grid: max-w-6xl
- Section Padding: py-20 desktop / py-12 mobile
- Side Margins: px-6 mobile / px-12 desktop

**Grid Layouts:**
- Project Grid: 1 column mobile, 2 columns tablet (md:), 3 columns desktop (lg:)
- Skills/Tech Stack: 2 columns mobile, 4 columns desktop
- Gap: gap-8 for projects, gap-4 for smaller elements

### D. Component Library

**Landing Page (Full Viewport - Hacker Theme):**
- Full-screen black overlay (100vh) with white hacker silhouette
- Pixel dissolution effect over 5 seconds (random pixel removal)
- Large hero typography with fade-in animation (0.8s ease)
- After 5 seconds: Fade entire landing overlay out revealing main site
- Implementation: Fixed position overlay with z-index: 100

**Navigation Header:**
- Fixed/sticky top navigation with dark glassmorphism background
- Logo/Name (left, neon green on hover), Navigation links (center), Social icons (right)
- Height: 72px, backdrop-filter blur with dark tint
- Mobile: Hamburger menu with slide-in drawer
- Subtle neon green underline on active/hover states

**Hero Section (Main Site):**
- Large heading with animated neon green gradient text effect
- Subheading describing expertise in lighter text
- Primary CTA button with neon green glow effect on hover
- Scroll indicator (animated chevron with green accent)
- Dark background with subtle grid or matrix-style pattern

**Project Cards:**
- Dark glassmorphism container with neon green border on hover
- Project thumbnail/screenshot with green gradient overlay on hover
- Project title in white, tech stack tags (pill-shaped, green/cyan accents)
- Description snippet (2-3 lines) in muted text
- View Project link with arrow icon and green glow
- Shadow: soft green glow on hover (0 0 20px rgba(34, 197, 94, 0.3))

**Social Media Links:**
- Header: Small icon buttons with green glow on hover
- Footer: Larger icons (32px) with neon green glow effect
- LinkedIn: Neon green glow on hover
- GitHub: Neon green glow on hover
- Consistent green accent across all social icons

**About Section:**
- Two-column layout: Bio text (left), Skills grid (right)
- Skill pills with icon + label, neon green/cyan accent backgrounds
- Clean, readable paragraph text with max-width prose
- Icons with green glow on hover

**Footer:**
- Simple, centered layout with dark elevated background
- Social icons prominently displayed with green glow
- Copyright notice in muted text
- Background: Slightly elevated from body with subtle border

### E. Animations

**Landing Page Transition:**
- Hacker logo pixel dissolution: 5s random pixel removal
- Background: Pure black for maximum contrast
- Title fade-in: 0.8s ease at 2.5s delay
- Fade-out sequence: 1.2s ease, opacity 1 → 0

**Micro-interactions:**
- Project card hover: 0.3s ease with green border glow + lift effect
- Button hover: 0.2s ease with neon green glow (box-shadow)
- Social icon hover: 0.25s ease green glow + scale 1.05
- Scroll-triggered reveals: Fade + translateY for sections
- Text gradient animation: Slow green-to-cyan shift on hero text

**Glow Effects:**
- Use green box-shadow for hover states: `0 0 20px rgba(34, 197, 94, 0.4)`
- Subtle pulse animation on CTAs
- Green border glow on focus states

**Scroll Behavior:**
- Smooth scroll for anchor links
- Parallax effect on hero section (subtle, 0.5x scroll speed)

---

## Images

**Project Thumbnails:**
- Required for each project card
- Dimensions: 16:9 aspect ratio, minimum 800x450px
- Style: Screenshots with green tint overlay on hover
- Treatment: Slight border radius (8px), green glow border on hover

**Landing Page:**
- White hacker silhouette on pure black background
- Pixel dissolution effect for dramatic entry

---

## Implementation Tips for Excellence

1. **Performance:** Lazy load project images, preload fonts, minimize animation jank
2. **Accessibility:** Ensure 4.5:1 contrast ratios (easy with bright text on dark bg), keyboard navigation, green focus states
3. **Responsiveness:** Test all breakpoints (320px, 768px, 1024px, 1440px+), touch-friendly hit areas (min 44px)
4. **Polish Details:** 
   - Neon green cursor glow on interactive elements
   - Loading states with green spinner
   - Custom scrollbar with green accent
   - Subtle scanline effect overlay (optional)
   - Green text selection highlight
5. **Content Strategy:** 6-9 featured projects maximum, concise descriptions, prominently display contact with green accents
